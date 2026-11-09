import { compare } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

/*
  Two columns, one verdict per row. The filter column is muted with a cross; the Bizmo column is a lit
  card with a cobalt check. Each row carries a monoline icon for its topic. On phones the two columns
  sit side by side inside each row, so the comparison is still read left to right.
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

        <div className="relative mt-16 md:mt-20" data-reveal>
          {/* the Bizmo column is lit from within */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-[calc((100%-14rem)/2)] rounded-[1.5rem] bg-[linear-gradient(180deg,rgb(4_99_239/0.16),rgb(45_218_255/0.04))] ring-1 ring-cyan/20 shadow-[0_40px_120px_-40px_rgb(4_99_239/0.55)] md:block"
          />

          <table className="relative w-full table-fixed border-collapse max-md:table-auto">
            <caption className="sr-only">An ordinary device with a filter compared with Bizmo</caption>
            <thead>
              <tr className="max-md:hidden">
                <th scope="col" className="w-[14rem] py-7 text-start max-md:w-auto">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="py-7 pe-8 text-start align-middle font-normal">
                  <p className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-aluminium/80">{compare.head[1]}</p>
                  <p className="mt-1 text-[0.85rem] text-mist">{compare.headSub[1]}</p>
                </th>
                <th scope="col" className="px-8 py-7 text-start align-middle font-normal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/bizmo-wordmark-white.svg" alt="Bizmo" width={82} height={24} className="h-6 w-auto" />
                  <p className="mt-2 text-[0.85rem] text-cyan/80">{compare.headSub[2]}</p>
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {compare.rows.map(([k, a, b, icon], i) => {
                const I = Icon[icon as IconName];
                return (
                  <tr key={k} className="border-t border-white/[0.08] align-top max-md:grid max-md:grid-cols-[2.25rem_1fr] max-md:gap-x-4 max-md:py-5" style={{ ["--d" as string]: `${i * 0.05}s` }}>
                    <th scope="row" className="py-6 pe-6 text-start font-normal max-md:row-span-2 max-md:p-0">
                      <span className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-aluminium">
                          <I className="h-[18px] w-[18px]" />
                        </span>
                        <span className="act max-md:hidden">{k}</span>
                      </span>
                    </th>
                    <td className="py-6 pe-8 max-md:p-0">
                      <span className="act md:hidden">{k}</span>
                      <span className="flex items-start gap-3 max-md:mt-2">
                        <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.08] text-aluminium/60">
                          <Icon.cross className="h-3 w-3" />
                        </span>
                        <span className="text-[1.02rem] leading-snug text-mist">{a}</span>
                      </span>
                    </td>
                    <td className="px-8 py-6 max-md:px-0 max-md:pt-3 max-md:pb-0">
                      <span className="flex items-start gap-3">
                        <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-cobalt to-cyan text-white shadow-[0_0_14px_rgb(45_218_255/0.6)]">
                          <Icon.check className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        <span className="font-display text-[1.15rem] leading-snug font-semibold tracking-[-0.02em] text-white">{b}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
