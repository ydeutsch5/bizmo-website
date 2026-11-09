import { specs } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

/*
  Tech specs in four group cards (performance, display & cameras, connectivity, security & software),
  then the travel trio. Figures come from lib/content.ts and follow the publish rule there.
*/
export default function SpecSheet() {
  return (
    <section id="spec-sheet" aria-labelledby="spec-title" className="relative bg-night py-24 md:py-36">
      <div className="wrap">
        <p className="act" data-reveal>
          Full specifications
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <h2 id="spec-title" className="display display-lg text-white" data-reveal-lines>
            <span className="line-mask">
              <span>{specs.title}</span>
            </span>
          </h2>
          <p className="max-w-[26rem] text-mist md:pb-2" data-reveal>
            {specs.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {specs.groups.map((g, i) => {
            const I = Icon[g.icon as IconName];
            return (
              <section key={g.title} aria-label={g.title} className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan/[0.08] text-cyan">
                    <I className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-white">{g.title}</h3>
                </div>
                <dl>
                  {g.rows.map(([k, v]) => (
                    <div key={k} className="border-t border-white/[0.05] py-3">
                      <dt className="text-[0.68rem] font-medium tracking-[0.16em] text-mist uppercase">{k}</dt>
                      <dd className="mt-1 text-[0.95rem] leading-snug text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>
        <p className="mt-5 text-[0.82rem] text-dim">{specs.note}</p>

        {/* wherever work takes you: international, dual SIM with eSIM, Android Auto */}
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-20" data-reveal>
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
      </div>
    </section>
  );
}
