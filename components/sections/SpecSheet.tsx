import { specs } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

/*
  Tech specs: four headline figures, the travel trio, then the full sheet as a two-column list with a
  monoline icon per row. Figures come from lib/content.ts and follow the publish/hold rule there.
*/
export default function SpecSheet() {
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

        {/* headline figures */}
        <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-24 lg:grid-cols-4">
          {specs.stats.map((s, i) => {
            const I = Icon[s.icon as IconName];
            return (
              <div key={s.label} className="min-w-0 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-6 md:p-7" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-night text-cyan">
                  <I className="h-5 w-5" />
                </span>
                <dd className="mt-7 font-display text-[clamp(1.6rem,2.3vw,2.6rem)] leading-none font-semibold tracking-[-0.03em] break-words text-white">{s.value}</dd>
                <dt className="mt-3 text-[0.92rem] leading-snug text-mist">{s.label}</dt>
              </div>
            );
          })}
        </dl>

        {/* wherever work takes you: international, eSIM, Android Auto */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-20" data-reveal>
          <h3 className="display display-md text-white">{specs.extras.title}</h3>
          <ul className="grid gap-3 sm:grid-cols-3">
            {specs.extras.items.map((it, i) => {
              const I = Icon[it.icon as IconName];
              return (
                <li key={it.k} className="rounded-[1.25rem] border border-cyan/15 bg-[linear-gradient(160deg,rgb(4_99_239/0.14),rgb(45_218_255/0.02))] p-6" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-cyan">
                    <I className="h-5 w-5" />
                  </span>
                  <p className="mt-6 font-display text-[1.2rem] leading-tight font-semibold tracking-[-0.02em] text-white">{it.k}</p>
                  <p className="mt-2 text-[0.9rem] leading-snug text-mist">{it.v}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* the full sheet */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-20">
          <div>
            <p className="act">Full specifications</p>
            <p className="mt-4 max-w-[22rem] text-[0.88rem] leading-relaxed text-dim">{specs.note}</p>
          </div>
          <dl className="border-t border-white/10">
            {specs.rows.map((r, i) => {
              const I = Icon[r.icon as IconName];
              return (
                <div key={r.k} className="grid grid-cols-[2.5rem_minmax(0,9rem)_1fr] items-start gap-4 border-b border-white/10 py-5 max-sm:grid-cols-[2.5rem_1fr]" data-reveal style={{ ["--d" as string]: `${Math.min(i, 6) * 0.04}s` }}>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-aluminium">
                    <I className="h-[18px] w-[18px]" />
                  </span>
                  <dt className="pt-2 font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-white">{r.k}</dt>
                  <dd className="pt-2 text-[1.02rem] leading-snug text-aluminium/85 max-sm:col-start-2">{r.v}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
