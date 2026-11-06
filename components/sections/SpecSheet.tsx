"use client";

import { useState } from "react";
import { specs } from "@/lib/content";

/* No spec sheet: Bizmo is described in plain words, not numbers. */
export default function SpecSheet() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="spec-sheet" aria-labelledby="spec-title" className="relative bg-night py-28 md:py-44">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <h2 id="spec-title" className="display display-lg text-white" data-reveal-lines>
            <span className="line-mask">
              <span>{specs.title}</span>
            </span>
          </h2>
          <p className="max-w-[26rem] text-mist md:pb-2" data-reveal>
            {specs.lead}
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-y border-white/10 md:mt-24 lg:grid-cols-4">
          {specs.stats.map((s, i) => (
            <div key={s.label} className={`px-1 py-10 md:px-8 md:py-14 ${i % 2 ? "border-s border-white/10" : ""} ${i > 0 ? "lg:border-s lg:border-white/10" : ""} ${i < 2 ? "max-lg:border-b max-lg:border-white/10" : ""}`} data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
              <dd className="font-display text-[clamp(2rem,3.4vw,3.5rem)] leading-none font-semibold tracking-[-0.03em] text-white">{s.value}</dd>
              <dt className="mt-4 text-[0.95rem] text-mist">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* wherever work takes you: international, eSIM, Android Auto */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-20" data-reveal>
          <h3 className="display display-md text-white">{specs.extras.title}</h3>
          <ul className="grid gap-4 sm:grid-cols-3">
            {specs.extras.items.map((it, i) => (
              <li key={it.k} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-6" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span aria-hidden="true" className="mb-5 block h-2 w-2 rounded-full bg-gradient-to-tr from-cobalt to-cyan shadow-[0_0_10px_rgb(45_218_255/0.8)]" />
                <p className="font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.02em] text-white">{it.k}</p>
                <p className="mt-3 text-[0.92rem] leading-snug text-mist">{it.v}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-20">
          <p className="act">In plain words</p>
          <ul className="border-t border-white/10">
            {specs.rows.map((r, i) => {
              const on = open === i;
              return (
                <li key={r.k} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`spec-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      data-cursor={on ? "Close" : "Open"}
                      className="flex w-full items-center justify-between gap-6 py-6 text-start"
                    >
                      <span className={`font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-semibold tracking-[-0.02em] transition-colors duration-500 ${on ? "text-white" : "text-aluminium/70"}`}>{r.k}</span>
                      <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                        <span className="absolute top-1/2 left-0 h-px w-4 bg-aluminium/70" />
                        <span className={`absolute top-0 left-1/2 h-4 w-px bg-aluminium/70 transition-transform duration-500 ${on ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <div id={`spec-${i}`} className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[40rem] pb-7 text-[1.05rem] text-aluminium/80">{r.v}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
