import { compare } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

/*
  One row per topic. The topic is a real heading with its icon; beside it, a muted card for the
  ordinary device with a filter (cross) and a lit card for Bizmo (check). On phones the topic sits
  on its own line and the two cards stack under it, filter first.
*/
export default function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="relative bg-night py-28 md:py-44">
      <div className="wrap">
        <p className="act" data-reveal>
          Act VII <span className="px-2 text-dim">/</span> Compare
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <h2 id="compare-title" className="display display-lg text-white" data-reveal-lines>
            <span className="line-mask">
              <span>{compare.title[0]}</span>
            </span>
            <span className="line-mask">
              <span className="text-aluminium/50" style={{ ["--d" as string]: "0.12s" }}>
                {compare.title[1]}
              </span>
            </span>
          </h2>
          <p className="lede max-w-[28rem] text-aluminium/70" data-reveal>
            {compare.body}
          </p>
        </div>

        <div className="mt-16 md:mt-20" role="table" aria-label="An ordinary device with a filter compared with Bizmo">
          {/* column heads */}
          <div role="row" className="mb-4 hidden grid-cols-[16.5rem_1fr_1fr] gap-4 md:grid">
            <span role="columnheader">
              <span className="sr-only">Topic</span>
            </span>
            <span role="columnheader" className="px-1 font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-mist">
              {compare.head[1]}
            </span>
            <span role="columnheader" className="px-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/bizmo-wordmark-white.svg" alt="Bizmo" width={82} height={24} className="h-[22px] w-auto" />
            </span>
          </div>

          <div className="grid gap-3">
            {compare.rows.map(([k, a, b, icon], i) => {
              const I = Icon[icon as IconName];
              return (
                <div
                  key={k}
                  role="row"
                  className="grid gap-3 md:grid-cols-[16.5rem_1fr_1fr] md:gap-4"
                  data-reveal
                  style={{ ["--d" as string]: `${i * 0.05}s` }}
                >
                  <div role="rowheader" className="flex items-center gap-4 px-1 max-md:mt-5 max-md:first:mt-0">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-white/10 bg-white/[0.04] text-cyan">
                      <I className="h-5 w-5" />
                    </span>
                    <span className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-white">{k}</span>
                  </div>

                  <div role="cell" className="flex items-start gap-3.5 rounded-[18px] border border-white/[0.06] bg-white/[0.025] px-6 py-5">
                    <span className="mt-[2px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-white/[0.08] text-aluminium/55">
                      <Icon.cross className="h-3 w-3" />
                    </span>
                    <span className="text-[1.05rem] leading-snug text-mist">
                      <span className="sr-only md:hidden">{compare.head[1]}: </span>
                      <span className="me-1.5 text-[0.75rem] font-medium tracking-[0.14em] text-aluminium/40 uppercase md:hidden">Filter</span>
                      {a}
                    </span>
                  </div>

                  <div role="cell" className="flex items-start gap-3.5 rounded-[18px] border border-cyan/20 bg-[linear-gradient(135deg,rgb(4_99_239/0.2),rgb(45_218_255/0.04))] px-6 py-5 shadow-[0_24px_70px_-40px_rgb(4_99_239/0.7)]">
                    <span className="mt-[2px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-gradient-to-tr from-cobalt to-cyan text-white shadow-[0_0_14px_rgb(45_218_255/0.6)]">
                      <Icon.check className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    <span className="font-display text-[1.12rem] leading-snug font-semibold tracking-[-0.015em] text-white">
                      <span className="sr-only">Bizmo: </span>
                      {b}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
