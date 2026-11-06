"use client";

import ScrollFilm, { type Callout, type Copy, type Screen } from "@/components/film/ScrollFilm";
import InsideDiagram from "@/components/film/InsideDiagram";
import { easeOut, timeline, type Beat, type ClipId } from "@/lib/film/engine";
import { ed, explode, layers } from "@/lib/content";

/* The device on black: it turns, comes apart, then the system rises out of the screen. */

const CLIPS: ClipId[] = ["turn", "explode", "layers"];
const C0 = { x: 0, y: 0.12, s: 0.74 };

const T = timeline([
  { id: "front", len: 0.7, layers: [{ clip: "turn", t0: 0 }], cam0: C0, cam1: { x: 0, y: 0.11, s: 0.77 } },
  { id: "turn", len: 1.8, layers: [{ clip: "turn", t0: 0, t1: 1 }], cam0: { x: 0, y: 0.11, s: 0.77 }, cam1: { x: 0, y: 0.08, s: 0.84 } },
  { id: "explode", len: 2.0, layers: [{ clip: "explode", t0: 0, t1: 1 }], cam0: { x: 0, y: 0.08, s: 0.84 }, cam1: { x: 0, y: 0.07, s: 0.92 } },
  { id: "explode-hold", len: 1.5, layers: [{ clip: "explode", t0: 1 }], cam0: { x: 0, y: 0.07, s: 0.92 }, cam1: { x: 0, y: 0.07, s: 0.95 }, ease: easeOut },
  { id: "to-layers", len: 0.55, layers: [{ clip: "layers", t0: 0 }, { clip: "explode", t0: 1, a0: 1, a1: 0 }], cam0: { x: 0, y: 0.07, s: 0.95 }, cam1: { x: 0, y: 0.06, s: 0.8 } },
  // the device holds still, screen on, and the in-device filtering diagram is drawn onto the screen (see screens)
  { id: "layers", len: 2.0, layers: [{ clip: "layers", t0: 0 }], cam0: { x: 0, y: 0.06, s: 0.8 }, cam1: { x: 0, y: 0.06, s: 0.86 } },
  { id: "layers-hold", len: 1.3, layers: [{ clip: "layers", t0: 0 }], cam0: { x: 0, y: 0.06, s: 0.86 }, cam1: { x: 0, y: 0.06, s: 0.88 }, ease: easeOut },
] satisfies Beat[]);

const TOP = "md:inset-x-0 md:top-[clamp(4.75rem,11vh,8rem)] md:text-center";

const copy: Copy[] = [
  {
    id: "a",
    in: -1,
    out: T.end("turn") - 0.1,
    className: TOP,
    still: "turn-first",
    node: (
      <div className="mx-auto max-w-[64rem] px-[22px]">
        <h2 className="t-h1 text-snow">{ed.film.a.title}</h2>
        <p className="t-intro mt-4 text-snow-2">{ed.film.a.sub}</p>
      </div>
    ),
  },
  {
    id: "b",
    in: T.start("explode-hold") - 0.4,
    out: T.end("explode-hold") - 0.05,
    className: TOP,
    still: "explode-last",
    node: (
      <div className="mx-auto max-w-[64rem] px-[22px]">
        <h2 className="t-h1 text-snow">{ed.film.b.title}</h2>
        <p className="t-intro mt-4 text-snow-2">{ed.film.b.sub}</p>
      </div>
    ),
  },
  {
    id: "c",
    in: T.start("layers") + 0.2,
    out: Infinity,
    className: TOP,
    still: "layers-first",
    node: (
      <div className="mx-auto max-w-[64rem] px-[22px]">
        <h2 className="t-h1 text-snow">
          <span className="block">{ed.film.c.title}</span>
          <span className="block text-snow-2">{ed.film.c.titleB}</span>
        </h2>
      </div>
    ),
  },
  {
    id: "chips",
    in: T.start("layers") + 0.5,
    out: Infinity,
    className: "max-md:hidden md:inset-x-0 md:bottom-[6vh]",
    still: "layers-last",
    node: (
      <ol className="mx-auto flex max-w-[60rem] flex-wrap justify-center gap-3 px-[22px]">
        {layers.stack.map((l, i) => (
          <li key={l.id} data-reveal-at={T.start("layers") + 0.6 + i * 0.32} style={{ opacity: 0.18 }} className="rounded-full bg-white/[0.08] px-5 py-2.5 text-[15px] text-snow backdrop-blur-md">
            {l.label}
          </li>
        ))}
      </ol>
    ),
  },
];

const callouts: Callout[] = [
  {
    id: "board",
    u: 0.385,
    v: 0.285,
    side: "left",
    reach: 0.14,
    in: T.start("explode-hold") - 0.1,
    out: T.end("explode-hold") - 0.1,
    label: explode.callouts.processor.label,
    sub: explode.callouts.processor.sub,
  },
  {
    id: "camera",
    u: 0.425,
    v: 0.49,
    side: "left",
    reach: 0.13,
    in: T.start("explode-hold") + 0.1,
    out: T.end("explode-hold") - 0.1,
    label: explode.callouts.camera.label,
    sub: explode.callouts.camera.sub,
  },
  {
    id: "display",
    u: 0.78,
    v: 0.42,
    side: "right",
    reach: 0.04,
    in: T.start("explode-hold") + 0.3,
    out: T.end("explode-hold") - 0.1,
    label: explode.callouts.display.label,
  },
];

/* the screen of the "layers" frame, measured on the frame: left 24.7%, top 18.9%, 45.9% wide, 56.9% tall */
const screens: Screen[] = [
  {
    id: "inside",
    u: 0.247,
    v: 0.189,
    w: 0.459,
    h: 0.569,
    in: T.start("layers") + 0.05,
    out: Infinity,
    node: <InsideDiagram at={T.start("layers") + 0.35} step={0.3} />,
  },
];

export default function InsideFilm() {
  return (
    <div id="inside" data-surface="dark">
      <ScrollFilm id="inside-film" label="How Bizmo is built" clips={CLIPS} tl={T} copy={copy} callouts={callouts} screens={screens} scrim="none" tail={0.4} />
    </div>
  );
}
