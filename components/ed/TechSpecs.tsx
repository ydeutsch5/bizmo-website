import { specs } from "@/lib/content";

/* No spec sheet: Bizmo is described in plain words, not numbers. */
export default function TechSpecs() {
  return (
    <section id="specs" data-surface="light" aria-labelledby="specs-title" className="border-t border-hair/60 bg-white py-24 md:py-36">
      <div className="wrap">
        <h2 id="specs-title" className="t-h1" data-reveal>
          {specs.title}
        </h2>
        <p className="t-intro mt-4 max-w-[36rem] text-ink-2" data-reveal>
          {specs.lead}
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-y-10 md:mt-20 md:grid-cols-4">
          {specs.stats.map((s, i) => (
            <div key={s.label} className="pe-6" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
              <dd className="t-grad text-[clamp(1.9rem,2.9vw,2.75rem)] leading-none font-semibold tracking-[-0.03em]">{s.value}</dd>
              <dt className="mt-3 text-[15px] text-ink-2">{s.label}</dt>
            </div>
          ))}
        </dl>

        <h3 className="t-h2 mt-20 md:mt-28" data-reveal>
          {specs.extras.title}
        </h3>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {specs.extras.items.map((it, i) => (
            <li key={it.k} className="tile bg-canvas p-7" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
              <p className="text-[21px] font-semibold tracking-[-0.02em]">{it.k}</p>
              <p className="mt-2 text-[15px] leading-snug text-ink-2">{it.v}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-16 border-t border-hair md:mt-24">
          {specs.rows.map((r) => (
            <div key={r.k} className="grid gap-2 border-b border-hair py-7 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="text-[21px] font-semibold tracking-[-0.02em]">{r.k}</dt>
              <dd className="text-[17px] text-ink">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
