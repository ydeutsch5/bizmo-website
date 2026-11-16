"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FrameStore,
  STAGE,
  pointer,
  trackPointer,
  clamp01,
  drawFrame,
  feather,
  lerp,
  loadManifest,
  placement,
  project,
  smooth,
  type ClipId,
  type Manifest,
  type View,
  type timeline,
  FILM_VERSION,
} from "@/lib/film/engine";

export type Copy = {
  id: string;
  in: number; // scroll position (viewport heights) where it fades in; < 0 = visible from the start
  out: number; // where it fades out; Infinity = stays
  className: string; // placement on desktop (mobile placement is shared)
  still: string; // still used by the reduced-motion layout, e.g. "explode-last"
  node: ReactNode;
};

export type Callout = {
  id: string;
  u: number; // anchor in frame space (0..1)
  v: number;
  side: "left" | "right";
  reach: number; // line length as a fraction of viewport width
  in: number;
  out: number;
  label: string;
  sub?: string;
};

/** HTML drawn onto a rectangle of the frame (for example the device's screen); follows the virtual camera. */
export type Screen = {
  id: string;
  u: number; // top-left corner in frame space (0..1)
  v: number;
  w: number; // size as fractions of the frame
  h: number;
  in: number;
  out: number;
  node: ReactNode;
};

export type FilmProps = {
  id: string;
  label: string;
  clips: ClipId[];
  tl: ReturnType<typeof timeline>;
  copy: Copy[];
  callouts?: Callout[];
  screens?: Screen[];
  /** extra scroll (viewport heights) after the last beat before the section unpins */
  tail?: number;
  scrim?: "start" | "both" | "strong" | "none";
  /** warm light from the screen spilling into the room, faded out by this scroll position */
  glow?: { until: number };
};

const FADE = 0.32;
// How far over the device is (0 = front, 1 = back) to clip time, following the pose curve the turn
// clip was built with (scripts/turn-frames.py: frames 0-52 cover the first 17 degrees).
const TURN_POSE = Array.from({ length: 145 }, (_, f) => {
  if (f <= 52) return (3.5 * f) / 52 / 36;
  const t = (f - 52) / 92;
  return (3.5 + 32.5 * (0.25 * t + 0.75 * (3 * t * t - 2 * t * t * t))) / 36;
});
function angleToClip(a: number) {
  a = clamp01(a);
  let lo = 0;
  let hi = TURN_POSE.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (TURN_POSE[mid] <= a) lo = mid;
    else hi = mid;
  }
  const span = TURN_POSE[hi] - TURN_POSE[lo];
  return (lo + (span > 0 ? (a - TURN_POSE[lo]) / span : 0)) / (TURN_POSE.length - 1);
}

const opacityAt = (pos: number, a: number, b: number) =>
  Math.min(a < 0 ? 1 : smooth((pos - a) / FADE), b === Infinity ? 1 : smooth((b - pos) / FADE));

/**
 * The film is scrubbed by the reader's own scrolling, so it stays on when the system asks for
 * reduced motion; what goes away then is everything that moves by itself (the idle sway, the
 * pointer parallax, the inertial scroll, the intro). ?motion=off forces the static layout.
 */
export default function ScrollFilm(props: FilmProps) {
  const [mode, setMode] = useState<"film" | "static">("film");
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("motion");
    setMode(q === "off" ? "static" : "film");
  }, []);
  return mode === "static" ? <StaticFilm {...props} /> : <PinnedFilm {...props} />;
}

/* ================================================================== pinned film */

function PinnedFilm({ id, label, clips, tl, copy, callouts = [], screens = [], tail = 0.6, scrim = "start", glow }: FilmProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const copyEls = new Map<string, HTMLElement>();
    stage.querySelectorAll<HTMLElement>("[data-copy]").forEach((el) => copyEls.set(el.dataset.copy!, el));
    const copyParts = new Map<string, HTMLElement[]>();
    copyEls.forEach((el, key) => {
      const root = el.children.length === 1 ? el.firstElementChild! : el;
      const parts = (Array.from(root.children) as HTMLElement[]).filter((n) => !n.hasAttribute("data-reveal-at"));
      // blocks whose lines already animate from CSS (the hero's entrance) keep moving as one
      copyParts.set(key, parts.some((n) => n.matches(".intro-fade, .intro-lines")) ? [] : parts);
    });
    const calloutEls = new Map<string, HTMLElement>();
    stage.querySelectorAll<HTMLElement>("[data-callout]").forEach((el) => calloutEls.set(el.dataset.callout!, el));
    const screenEls = new Map<string, HTMLElement>();
    stage.querySelectorAll<HTMLElement>("[data-screen]").forEach((el) => screenEls.set(el.dataset.screen!, el));

    let view: View = { W: 1, H: 1, mobile: false };
    let dpr = 1;
    let store: FrameStore | null = null;
    let m: Manifest | null = null;
    let raf = 0;
    let inView = false;
    let alive = true;
    let started = false;
    let setName: "lg" | "sm" = "lg";
    // The hero device is turned by hand. `spin` counts half turns: 0 is the front, 1 the back, 2 the
    // front again, and so on in both directions, so a drag any way (up, down, left, right) turns it and
    // can keep turning. Let go and it carries on a little with the speed of the hand, then settles on
    // the nearest face. A click turns it once. Hovering only tips it a few degrees towards the pointer.
    let spin = 0.02;
    let spinV = 0;
    let rest = 0; // the face (whole number of half turns) it settles on
    let steer = 0.02; // 0 front .. 1 back, folded out of spin
    let lastT = performance.now();
    let drag: { x0: number; y0: number; x: number; y: number; p0: number; axis: "x" | "y" | null } | null = null;
    let heroLive = false;
    let hinted = false;
    let lastBox: ReturnType<typeof placement> | null = null;
    const hasMouse = tl.beats.some((b) => b.layers.some((L) => L.t0 === "mouse"));
    const html = document.documentElement;
    const onDevice = (x: number, y: number) => {
      if (!heroLive || !lastBox) return false;
      const u = (x - lastBox.dx) / lastBox.dw; // the device sits at u .23-.77, v .16-.78 of the frame
      const v = (y - lastBox.dy) / lastBox.dh;
      return u > 0.21 && u < 0.79 && v > 0.13 && v < 0.81;
    };
    const endDrag = () => {
      drag = null;
      html.classList.remove("is-turning");
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || !onDevice(e.clientX, e.clientY)) return;
      if ((e.target as Element | null)?.closest?.("a, button, input, textarea, select, label")) return;
      e.preventDefault();
      drag = { x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, p0: spin, axis: null };
      hinted = true;
      html.classList.add("is-turning");
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (hasMouse && e.pointerType === "mouse") html.classList.toggle("can-turn", !!drag || onDevice(e.clientX, e.clientY));
      if (!drag) return;
      drag.x = e.clientX;
      drag.y = e.clientY;
      // the drag follows whichever way the hand set off, up-down or sideways, and keeps to it
      if (!drag.axis && Math.hypot(drag.x - drag.x0, drag.y - drag.y0) > 6) drag.axis = Math.abs(drag.x - drag.x0) > Math.abs(drag.y - drag.y0) ? "x" : "y";
    };
    const onUp = () => {
      if (!drag) return;
      if (!drag.axis) rest = Math.round(spin) + 1; // a click: one turn
      else rest = Math.round(spin + spinV * 0.28); // a flick carries it over to the next face
      endDrag();
    };
    if (hasMouse) {
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // nothing moves on its own
    const debug = new URLSearchParams(location.search).get("debug") === "1";
    const dbg = debug ? Object.assign(document.createElement("pre"), { className: "film-debug" }) : null;
    if (dbg) stage.appendChild(dbg);
    trackPointer();

    const resize = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      // portrait phones and tablets get the stacked layout (device on top, copy below); matches the lg: breakpoint
      view = { W, H, mobile: W < 1024 && H > W };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      sizeSection();
      kick();
    };

    // posters: the first frame of each clip as a single still, so the stage is never empty while
    // frames are still arriving (slow or flaky connections, phones on cellular)
    const posters = new Map<ClipId, HTMLImageElement>();
    for (const c of clips) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        posters.set(c, im);
        kick();
      };
      im.src = `/film/stills/${c}-first.webp?v=${FILM_VERSION}`;
    }

    const ensureStore = () => {
      if (started || !m) return;
      started = true;
      setName = view.W < 700 ? "sm" : "lg";
      store = new FrameStore(m, setName, clips);
      store.start();
    };

    loadManifest().then((man) => {
      if (!alive || !man) return;
      m = man;
      if (inView || nearView) ensureStore();
      kick();
    });

    // phones: a swipe is about one screen, so the film runs at 0.6 of its desktop length to keep every swipe doing something
    const speed = () => (view.mobile ? 0.6 : 1);
    const pos = () => -section.getBoundingClientRect().top / Math.max(stage.clientHeight, 1) / speed();
    const sizeSection = () => {
      section.style.height = `${((tl.total + tail) * 100 * speed()).toFixed(1)}svh`;
    };

    function render(now: number) {
      raf = 0;
      if (!alive) return;
      const p = pos();
      const { W, H } = view;
      const at = tl.at(p);
      const { beat, k } = at;
      let cam = at.cam;
      if (beat.parallax && !view.mobile && !calm) cam = { x: cam.x + (pointer.x - 0.5) * 0.018, y: cam.y + (pointer.y - 0.5) * 0.026, s: cam.s };
      const box = placement(view, 1600, 900, cam);
      lastBox = box;
      heroLive = hasMouse && !view.mobile && !calm && beat.id === "hero" && k < 0.04;
      if (!heroLive) {
        // once the page scrolls, the scroll owns the turn: hands off, and round to the nearest front
        if (drag) endDrag();
        rest = 2 * Math.round(spin / 2);
        html.classList.remove("can-turn");
      }
      const idle = !drag && now - pointer.moved > 2200;
      // the device faces the pointer a little: higher on the screen tips its top away, a few degrees at most
      const tilt = calm ? 0.02 : idle ? 0.02 + 0.012 * Math.sin(now / 1700) : 0.012 + 0.05 * smooth(1 - pointer.y);
      let spinTarget = rest + (rest % 2 === 0 ? tilt : tilt * 0.6);
      // dragging: about half a device height of travel is one turn, in whichever direction the hand goes
      if (drag) spinTarget = drag.axis ? drag.p0 + (drag.axis === "x" ? drag.x - drag.x0 : drag.y0 - drag.y) / (box.dh * 0.3) : drag.p0;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastT) / 1000));
      lastT = now;
      const stiff = drag ? 300 : idle ? 8 : 38;
      const damp = 2 * Math.sqrt(stiff) * (drag || idle ? 1 : 0.78); // let go, it settles with a little life
      spinV += (stiff * (spinTarget - spin) - damp * spinV) * dt;
      spin += spinV * dt;
      const fold = ((spin % 2) + 2) % 2;
      steer = fold > 1 ? 2 - fold : fold;
      const steerClip = angleToClip(steer);

      if (hasMouse && hintRef.current) {
        const hEl = hintRef.current;
        const show = heroLive && !hinted && document.documentElement.dataset.intro === "done";
        hEl.style.opacity = show ? "1" : "0";
        const c = project(box, 0.5, 0.845);
        hEl.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) translate(-50%, 0)`;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = STAGE;
      ctx.fillRect(0, 0, W, H);

      let place: ReturnType<typeof placement> | null = null;
      if (!(store && m)) {
        const poster = posters.get(beat.layers[0]?.clip);
        if (poster) {
          place = placement(view, 1600, 900, cam);
          drawFrame(ctx, poster, place, 1);
          feather(ctx, place, W, H);
        }
      }
      if (store && m) {
        const fw = m.sets[setName];
        const fh = Math.round((fw * 9) / 16);
        place = placement(view, fw, fh, cam);
        for (const L of beat.layers) {
          const n = store.count(L.clip);
          let t: number;
          if (L.t0 === "loop") {
            const dur = n / m.fps;
            t = ((now / 1000) % dur) / dur;
          } else if (L.t0 === "mouse") t = view.mobile && L.m0 !== undefined ? lerp(L.m0, L.m1 ?? L.m0, k) : lerp(steerClip, L.t1 ?? steerClip, k);
          else t = lerp(L.t0, L.t1 ?? L.t0, k);
          const i = Math.round(clamp01(t) * (n - 1));
          store.want(L.clip, i);
          const img = store.get(L.clip, i) ?? posters.get(L.clip) ?? null;
          const a = lerp(L.a0 ?? 1, L.a1 ?? L.a0 ?? 1, k);
          if (img) drawFrame(ctx, img, place, a);
        }
        feather(ctx, place, W, H);
      }

      if (glow && glowRef.current) {
        const g = glowRef.current;
        const o = place ? 1 - smooth(p / glow.until) : 0;
        g.style.opacity = (o * 0.62).toFixed(3);
        if (place && o > 0.01) {
          const c = project(place, 0.5, 0.47);
          const w = place.dw * 0.62;
          g.style.width = `${w}px`;
          g.style.height = `${w * 0.62}px`;
          g.style.transform = `translate3d(${(c.x - w / 2).toFixed(1)}px, ${(c.y - w * 0.31).toFixed(1)}px, 0)`;
        }
      }

      // copy
      for (const c of copy) {
        const el = copyEls.get(c.id);
        if (!el) continue;
        const o = opacityAt(p, c.in, c.out);
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
        // the lines of a block come in one after another (label, headline, body...) and leave the same way
        const parts = copyParts.get(c.id) ?? [];
        if (parts.length > 1) {
          el.style.opacity = "1";
          const step = 0.5 / (parts.length - 1);
          parts.forEach((part, i) => {
            const po = smooth(o * 1.5 - i * step);
            part.style.opacity = po > 0.999 ? "" : po.toFixed(3);
            part.style.transform = po > 0.999 ? "" : `translate3d(0, ${((1 - po) * 26).toFixed(1)}px, 0)`;
          });
        } else {
          el.style.opacity = o.toFixed(3);
          el.style.transform = `translate3d(0, ${((1 - o) * 18).toFixed(1)}px, 0)`;
        }
        const inert = o < 0.5;
        if (el.inert !== inert) el.inert = inert;
        if (o > 0.01)
          el.querySelectorAll<HTMLElement>("[data-reveal-at]").forEach((r) => {
            const ro = smooth((p - Number(r.dataset.revealAt)) / 0.25);
            r.style.opacity = (0.18 + 0.82 * ro).toFixed(3);
            r.style.transform = `translate3d(${((1 - ro) * -10).toFixed(1)}px, 0, 0)`;
          });
      }

      // callouts follow the virtual camera
      for (const c of callouts) {
        const el = calloutEls.get(c.id);
        if (!el) continue;
        const o = view.mobile || !place ? 0 : opacityAt(p, c.in, c.out);
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
        if (o < 0.01 || !place) continue;
        const pt = project(place, c.u, c.v);
        const shift = c.side === "left" ? "-100%" : "0%";
        el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(${shift}, -50%)`;
        const line = el.querySelector<HTMLElement>(".callout-line");
        if (line) {
          line.style.width = `${Math.round(c.reach * W)}px`;
          line.style.transform = `scaleX(${smooth(o * 1.2).toFixed(3)})`;
        }
      }

      // screens are laid onto the frame, so they move and scale with the camera
      for (const s of screens) {
        const el = screenEls.get(s.id);
        if (!el) continue;
        const o = !place ? 0 : opacityAt(p, s.in, s.out);
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
        if (o < 0.01 || !place) continue;
        const pt = project(place, s.u, s.v);
        el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0)`;
        el.style.width = `${(s.w * place.dw).toFixed(1)}px`;
        el.style.height = `${(s.h * place.dh).toFixed(1)}px`;
        el.querySelectorAll<HTMLElement>("[data-reveal-at]").forEach((r) => {
          const ro = smooth((p - Number(r.dataset.revealAt)) / 0.22);
          r.style.opacity = ro.toFixed(3);
          r.style.transform = `translate3d(0, ${((1 - ro) * 6).toFixed(1)}px, 0)`;
        });
      }

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${clamp01(p / tl.total).toFixed(4)})`;

      if (dbg) dbg.textContent = `${id} pos ${p.toFixed(2)} turn ${steer.toFixed(3)} beat ${beat.id} ${view.W}x${view.H} ${view.mobile ? "stacked" : "wide"} dpr ${dpr}\nset ${setName} frames ${store?.loaded ?? 0}/${store?.total ?? 0} ${m ? "" : "manifest missing"} ${calm ? "reduced-motion" : ""}\nua ${navigator.userAgent.slice(0, 90)}`;

      if (inView) raf = requestAnimationFrame(render);
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    let nearView = false;
    const near = new IntersectionObserver(
      ([e]) => {
        nearView = e.isIntersecting;
        if (nearView) ensureStore();
      },
      { rootMargin: "150% 0px 150% 0px" },
    );
    near.observe(section);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) {
        ensureStore();
        kick();
      }
    });
    io.observe(section);
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      near.disconnect();
      io.disconnect();
      ro.disconnect();
      store?.destroy();
      if (hasMouse) {
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        endDrag();
        html.classList.remove("can-turn");
      }
    };
  }, [clips, tl, copy, callouts, screens, tail]);

  return (
    <section ref={sectionRef} id={id} aria-label={label} className="relative bg-graphite" style={{ height: `${(tl.total + tail) * 100}svh` }}>
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {glow && (
          <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 opacity-0 mix-blend-screen">
            {/* the official wallpaper, blurred into light; masked so it surrounds the device rather than covering it */}
            <div
              className="absolute -inset-[55%] bg-[url('/brand/wallpaper-glow.webp')] bg-cover bg-center blur-[110px] saturate-[1.3] [mask-image:radial-gradient(closest-side,transparent_30%,rgb(0_0_0/0.85)_62%,transparent_100%)]"
            />
          </div>
        )}

        {scrim !== "none" && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className={`absolute inset-y-0 start-0 hidden lg:block ${
                scrim === "strong"
                  ? "w-[68%] bg-[linear-gradient(to_right,rgb(16_18_22/0.96),rgb(16_18_22/0.82)_40%,transparent)] rtl:bg-[linear-gradient(to_left,rgb(16_18_22/0.96),rgb(16_18_22/0.82)_40%,transparent)]"
                  : "w-[52%] bg-[linear-gradient(to_right,rgb(16_18_22/0.88),rgb(16_18_22/0.55)_45%,transparent)] rtl:bg-[linear-gradient(to_left,rgb(16_18_22/0.88),rgb(16_18_22/0.55)_45%,transparent)]"
              }`}
            />
            {scrim === "both" && <div className="absolute inset-y-0 end-0 hidden w-[40%] bg-[linear-gradient(to_left,rgb(16_18_22/0.8),transparent)] lg:block" />}
            <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(to_top,rgb(16_18_22/0.97)_30%,rgb(16_18_22/0.6)_65%,transparent)] lg:h-40 lg:bg-[linear-gradient(to_top,rgb(16_18_22/0.7),transparent)]" />
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgb(16_18_22/0.7),transparent)]" />
          </div>
        )}

        {screens.map((s) => (
          <div key={s.id} data-screen={s.id} aria-hidden="true" dir="ltr" className="pointer-events-none absolute top-0 left-0 overflow-hidden opacity-0 will-change-transform" style={{ visibility: "hidden" }}>
            {s.node}
          </div>
        ))}

        {callouts.map((c) => (
          <div key={c.id} data-callout={c.id} aria-hidden="true" dir="ltr" className="callout">
            <div className={`flex items-center ${c.side === "left" ? "flex-row" : "flex-row-reverse"}`}>
              <div className={`[text-shadow:0_1px_12px_rgb(16_18_22/0.9)] ${c.side === "left" ? "pr-4 text-right" : "pl-4 text-left"}`}>
                <p className="text-[0.95rem] leading-tight font-medium whitespace-nowrap text-aluminium">{c.label}</p>
                {c.sub && <p className={`mt-1 max-w-[15rem] text-[0.8rem] leading-snug text-mist ${c.side === "left" ? "ms-auto" : ""}`}>{c.sub}</p>}
              </div>
              <div
                className="callout-line"
                style={{ ["--to" as string]: c.side === "left" ? "left" : "right", ["--origin" as string]: c.side === "left" ? "right" : "left" }}
              />
              <div className="callout-dot shrink-0" />
            </div>
          </div>
        ))}

        {tl.beats.some((b) => b.layers.some((L) => L.t0 === "mouse")) && (
          <div ref={hintRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-[1] hidden opacity-0 transition-opacity duration-700 lg:block">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-night/55 px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap text-aluminium/80 uppercase backdrop-blur">
              <svg viewBox="0 0 16 16" className="turn-hint-icon h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1.5v13M1.5 8h13M5.8 3.7 8 1.5l2.2 2.2M5.8 12.3 8 14.5l2.2-2.2M3.7 5.8 1.5 8l2.2 2.2M12.3 5.8 14.5 8l-2.2 2.2" />
              </svg>
              Drag to turn
            </span>
          </div>
        )}

        <div className="absolute inset-0">
          {copy.map((c) => (
            <div key={c.id} data-copy={c.id} className={`film-copy max-lg:inset-x-5 max-lg:bottom-[max(2.25rem,env(safe-area-inset-bottom))] ${c.className}`}>
              {c.node}
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]">
          <div ref={progressRef} className="h-full origin-left bg-aluminium/40 rtl:origin-right" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== reduced motion */

function StaticFilm({ id, label, copy, callouts = [] }: FilmProps) {
  return (
    <section id={id} aria-label={label} className="static-film bg-graphite py-20 lg:py-28">
      <div className="wrap flex flex-col gap-20 lg:gap-28">
        {copy.map((c) => {
          const notes = callouts.filter((k) => k.in >= c.in - 0.01 && k.in < c.out);
          return (
            <div key={c.id} className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
              <div className="max-w-xl">
                {c.node}
                {notes.length > 0 && (
                  <ul className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-[0.95rem]">
                    {notes.map((n) => (
                      <li key={n.id}>
                        <span className="text-aluminium">{n.label}</span>
                        {n.sub && <span className="text-mist">, {n.sub}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/film/stills/${c.still}.webp?v=${FILM_VERSION}`} alt="" loading="lazy" width={1600} height={900} className="h-auto w-full rounded-[1.25rem]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
