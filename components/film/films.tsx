"use client";

import ScrollFilm, { type Callout, type Copy, type Screen } from "./ScrollFilm";
import InsideDiagram from "./InsideDiagram";
import { easeOut, timeline, type Beat, type ClipId } from "@/lib/film/engine";
import { camera, display, explode, hero, layers, trust, turn } from "@/lib/content";

/*
  Camera values: x/y shift the frame centre (fraction of the viewport), s scales it (1 = cover).
  Desktop copy sits on the start side, so the device is mostly framed towards the end side.
*/

const DESK_START = "lg:start-[clamp(1.5rem,5.5vw,6.5rem)]";

/* ================================================================== Act I: the device */

const A_CLIPS: ClipId[] = ["turn", "explode", "layers"];
const R = { x: 0.2, y: 0.03, s: 0.8, ms: 1.0 }; // device framed to the right of the headline; larger on phones

const A = timeline([
  // the pointer turns the device (see "mouse" layers in ScrollFilm)
  { id: "hero", len: 1.0, layers: [{ clip: "turn", t0: "mouse", m0: 0.04, m1: 0.2 }], cam0: R, parallax: true },
  { id: "hero-out", len: 0.45, layers: [{ clip: "turn", t0: "mouse", t1: 0.36, m0: 0.2, m1: 0.36 }], cam0: R, cam1: { x: 0.2, y: 0.03, s: 0.85, ms: 1.0 } },
  { id: "turn", len: 1.8, layers: [{ clip: "turn", t0: 0.36, t1: 1 }], cam0: { x: 0.2, y: 0.03, s: 0.85, ms: 1.0 }, cam1: { x: 0.17, y: 0.02, s: 0.88, ms: 1.0 } },
  { id: "explode", len: 2.2, layers: [{ clip: "explode", t0: 0, t1: 1 }], cam0: { x: 0.17, y: 0.02, s: 0.88 }, cam1: { x: 0.03, y: 0.0, s: 0.94 } },
  { id: "explode-hold", len: 1.5, layers: [{ clip: "explode", t0: 1 }], cam0: { x: 0.03, y: 0.0, s: 0.94 }, cam1: { x: 0.02, y: 0.0, s: 0.99 }, ease: easeOut },
  { id: "to-layers", len: 0.55, layers: [{ clip: "layers", t0: 0 }, { clip: "explode", t0: 1, a0: 1, a1: 0 }], cam0: { x: 0.02, y: 0.0, s: 0.99 }, cam1: { x: 0.18, y: 0.04, s: 0.88, my: 0.3 } },
  // the device holds still, screen on, and the in-device filtering diagram is drawn onto the screen (see aScreens)
  { id: "layers", len: 2.0, layers: [{ clip: "layers", t0: 0 }], cam0: { x: 0.18, y: 0.04, s: 0.88, my: 0.3 }, cam1: { x: 0.17, y: 0.03, s: 0.96, my: 0.28 } },
  { id: "layers-hold", len: 1.3, layers: [{ clip: "layers", t0: 0 }], cam0: { x: 0.17, y: 0.03, s: 0.96, my: 0.28 }, cam1: { x: 0.17, y: 0.03, s: 0.98, my: 0.28 }, ease: easeOut },
] satisfies Beat[]);

const aCopy: Copy[] = [
  {
    id: "hero",
    in: -1,
    out: A.start("turn") + 0.1,
    // one column from below the nav to the bottom of the screen, so nothing in it can overlap
    className: `${DESK_START} lg:top-[clamp(5.5rem,13vh,9rem)] lg:bottom-[5vh] lg:flex lg:w-[min(56rem,50vw)] lg:flex-col max-lg:bottom-[max(1.75rem,env(safe-area-inset-bottom))]`,
    still: "turn-first",
    node: (
      <div className="lg:flex lg:h-full lg:flex-col">
        <p className="act intro-fade" style={{ ["--d" as string]: "0.2s" }}>
          Act I <span className="px-2 text-dim">/</span> The kosher business device
        </p>
        <h1 className="display display-xxl intro-lines mt-6 text-white lg:mt-[clamp(1rem,3vh,2rem)]">
          <span className="line-mask">
            <span className="whitespace-nowrap" style={{ ["--d" as string]: "0.05s" }}>
              {hero.title[0]}
            </span>
          </span>
          <span className="line-mask">
            <span className="whitespace-nowrap text-aluminium/80" style={{ ["--d" as string]: "0.18s" }}>
              {hero.title[1].replace(/\.$/, "")}
              <span className="bizmo-dot" aria-hidden="true" />
              <span className="sr-only">.</span>
            </span>
          </span>
        </h1>
        <p
          className="intro-fade mt-[clamp(1.25rem,3.5vh,2.25rem)] max-w-[31rem] text-[1.15rem] leading-snug text-aluminium lg:text-[clamp(1.05rem,0.5rem+1.3vh,1.35rem)]"
          style={{ ["--d" as string]: "0.55s" }}
        >
          {hero.tagline}
        </p>
        <p className="intro-fade mt-[clamp(0.75rem,2vh,1.25rem)] max-w-[29rem] text-[0.98rem] text-mist max-lg:hidden [@media(max-height:760px)]:hidden" style={{ ["--d" as string]: "0.7s" }}>
          {hero.lead}
        </p>
        <div className="intro-fade mt-[clamp(1.25rem,3.5vh,2rem)]" style={{ ["--d" as string]: "0.85s" }}>
          <a href="#notify" className="btn btn-light" data-cursor="Notify">
            {hero.cta}
          </a>
        </div>
        <dl
          className="intro-fade mt-auto hidden grid-cols-3 gap-8 border-t border-white/10 pt-5 lg:grid [@media(max-height:680px)]:!hidden"
          style={{ ["--d" as string]: "1s" }}
        >
          {hero.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="act">{k}</dt>
              <dd className="mt-2 text-[0.88rem] leading-snug text-aluminium/85">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    id: "turn",
    in: A.start("turn") + 0.55,
    out: A.end("turn") - 0.05,
    className: `${DESK_START} lg:top-[30vh] lg:max-w-[30rem]`,
    still: "turn-last",
    node: (
      <div>
        <p className="act">Visually distinct</p>
        <h2 className="display display-lg mt-5 text-white">{turn.title}</h2>
        <p className="lede mt-6 text-aluminium/75">{turn.body}</p>
      </div>
    ),
  },
  {
    id: "explode",
    in: A.start("explode-hold") - 0.35,
    out: A.end("explode-hold") - 0.05,
    className: `${DESK_START} lg:bottom-[8vh] lg:max-w-[32rem]`,
    still: "explode-last",
    node: (
      <div>
        <p className="act">Its own operating system</p>
        <h2 className="display display-md mt-4 text-white">{explode.title}</h2>
        <p className="mt-5 text-aluminium/75">{explode.body}</p>
      </div>
    ),
  },
  {
    id: "layers",
    in: A.start("layers") + 0.3,
    out: Infinity,
    className: `${DESK_START} lg:top-[max(6rem,calc(50%-17rem))] lg:max-w-[30rem]`,
    still: "layers-first",
    node: (
      <div>
        <p className="act">Inside the device</p>
        <h2 className="display display-md mt-4 text-white">{layers.title}</h2>
        <p className="mt-5 text-aluminium/75 max-lg:hidden">{layers.body}</p>
        <ol className="mt-8 border-s border-white/12 max-lg:mt-4">
          {layers.stack.map((l, i) => (
            <li
              key={l.id}
              data-reveal-at={A.start("layers") + 0.55 + i * 0.38}
              className="relative py-2.5 ps-6 max-lg:py-1"
              style={{ opacity: 0.18 }}
            >
              <span aria-hidden="true" className="absolute top-1/2 -start-[4.5px] h-2 w-2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cobalt to-cyan shadow-[0_0_10px_rgb(45_218_255/0.8)]" />
              <span className="block text-white">{l.label}</span>
              <span className="block text-[0.88rem] text-mist max-lg:hidden">{l.sub}</span>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
];

const aCallouts: Callout[] = [
  {
    id: "board",
    u: 0.385,
    v: 0.285,
    side: "left",
    reach: 0.15,
    in: A.start("explode-hold") - 0.15,
    out: A.end("explode-hold") - 0.1,
    label: explode.callouts.processor.label,
    sub: explode.callouts.processor.sub,
  },
  {
    id: "camera",
    u: 0.425,
    v: 0.49,
    side: "left",
    reach: 0.12,
    in: A.start("explode-hold") + 0.05,
    out: A.end("explode-hold") - 0.1,
    label: explode.callouts.camera.label,
    sub: explode.callouts.camera.sub,
  },
  {
    id: "display",
    u: 0.7,
    v: 0.135,
    side: "right",
    reach: 0.035,
    in: A.start("explode-hold") + 0.25,
    out: A.end("explode-hold") - 0.1,
    label: explode.callouts.display.label,
  },
];

/* the screen of the "layers" frame, measured on the frame: left 24.7%, top 18.9%, 45.9% wide, 56.9% tall */
const aScreens: Screen[] = [
  {
    id: "inside",
    u: 0.247,
    v: 0.189,
    w: 0.459,
    h: 0.569,
    in: A.start("layers") + 0.05,
    out: Infinity,
    node: <InsideDiagram at={A.start("layers") + 0.35} step={0.3} />,
  },
];

export function DeviceFilm() {
  return (
    <ScrollFilm id="system" label="How Bizmo is built" clips={A_CLIPS} tl={A} copy={aCopy} callouts={aCallouts} screens={aScreens} tail={0.5} glow={{ until: A.start("turn") }} />
  );
}

/* ================================================================== Act V: close-ups */

const B_CLIPS: ClipId[] = ["camera", "edge"];
const B = timeline([
  { id: "camera", len: 2.2, layers: [{ clip: "camera", t0: 0, t1: 1 }], cam0: { x: 0.14, y: 0, s: 1.14 }, cam1: { x: 0.1, y: 0, s: 1.06 } },
  { id: "camera-hold", len: 0.7, layers: [{ clip: "camera", t0: 1 }], cam0: { x: 0.1, y: 0, s: 1.06 }, cam1: { x: 0.1, y: 0, s: 1.04 } },
  { id: "to-edge", len: 0.5, layers: [{ clip: "edge", t0: 0 }, { clip: "camera", t0: 1, a0: 1, a1: 0 }], cam0: { x: 0.16, y: 0.02, s: 0.9 } },
  { id: "edge", len: 2.0, layers: [{ clip: "edge", t0: 0, t1: 1 }], cam0: { x: 0.16, y: 0.02, s: 0.9 }, cam1: { x: 0.19, y: 0.03, s: 0.86 } },
  { id: "edge-hold", len: 0.9, layers: [{ clip: "edge", t0: 1 }], cam0: { x: 0.19, y: 0.03, s: 0.86 }, cam1: { x: 0.2, y: 0.03, s: 0.88 }, ease: easeOut },
] satisfies Beat[]);

const bCopy: Copy[] = [
  {
    id: "camera",
    in: B.start("camera") + 0.5,
    out: B.end("camera-hold") - 0.05,
    className: `${DESK_START} lg:top-[34vh] lg:max-w-[28rem]`,
    still: "camera-last",
    node: (
      <div>
        <p className="act">
          Act V <span className="px-2 text-dim">/</span> Close up
        </p>
        <h2 className="display display-lg mt-5 text-white">{camera.title}</h2>
        <p className="lede mt-6 text-aluminium/75">{camera.body}</p>
      </div>
    ),
  },
  {
    id: "display",
    in: B.start("edge") + 1.0,
    out: Infinity,
    className: `${DESK_START} lg:top-[36vh] lg:max-w-[26rem]`,
    still: "edge-last",
    node: (
      <div>
        <p className="act">Display</p>
        <h2 className="display display-lg mt-5 text-white">
          <span className="block">{display.title}</span>
          <span className="block text-aluminium/75">{display.titleSecond}</span>
        </h2>
      </div>
    ),
  },
];

export function DetailFilm() {
  return <ScrollFilm id="specs" label="Camera and display" clips={B_CLIPS} tl={B} copy={bCopy} tail={0.35} />;
}

/* ================================================================== Act VI: certification */

const C_CLIPS: ClipId[] = ["logo"];
const C = timeline([
  { id: "logo", len: 1.8, layers: [{ clip: "logo", t0: 0, t1: 1 }], cam0: { x: 0.14, y: 0, s: 1.1 }, cam1: { x: 0.11, y: 0, s: 1.2 } },
  { id: "logo-hold", len: 0.6, layers: [{ clip: "logo", t0: 1 }], cam0: { x: 0.11, y: 0, s: 1.2 }, cam1: { x: 0.11, y: 0, s: 1.22 }, ease: easeOut },
] satisfies Beat[]);

const cCopy: Copy[] = [
  {
    id: "trust",
    in: 0.25,
    out: Infinity,
    className: `${DESK_START} lg:top-1/2 lg:-mt-[11rem] lg:max-w-[38rem]`,
    still: "logo-last",
    node: (
      <div>
        <p className="act">
          Act VI <span className="px-2 text-dim">/</span> Certification
        </p>
        <h2 className="display display-lg mt-6 text-white">
          <span className="block">{trust.title}</span>
          <span className="block text-aluminium/80">{trust.titleSecond}</span>
        </h2>
        <p className="lede mt-7 max-w-[26rem] text-aluminium/75">{trust.body}</p>
      </div>
    ),
  },
];

export function TrustFilm() {
  return <ScrollFilm id="trust" label="Certification" clips={C_CLIPS} tl={C} copy={cCopy} scrim="strong" tail={0.45} />;
}
