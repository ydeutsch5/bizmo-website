import { apps, ed } from "@/lib/content";

/* Eight categories, eight tiles; the biggest category gets the biggest tile. */
const LAYOUT: Record<string, string> = {
  finance: "lg:col-span-2 lg:row-span-2",
  work: "lg:col-span-2",
  pay: "",
  talk: "",
  security: "",
  building: "",
  travel: "",
  more: "",
};

export default function AppsBento() {
  return (
    <section id="apps" data-surface="light" aria-labelledby="apps-title" className="bg-canvas py-24 md:py-36">
      <div className="wrap text-center">
        <h2 id="apps-title" className="t-h1" data-reveal>
          {ed.apps.title}
        </h2>
        <p className="t-intro mx-auto mt-5 max-w-[40rem] text-ink-2" data-reveal style={{ ["--d" as string]: "0.08s" }}>
          {ed.apps.sub}
        </p>
      </div>

      <div className="wrap-wide mt-14 md:mt-20">
        <ul className="mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(15rem,auto))]">
          {apps.categories.map((c, i) => {
            const big = c.id === "finance";
            return (
              <li key={c.id} className={`tile flex flex-col bg-white p-7 md:p-8 ${LAYOUT[c.id]}`} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
                <h3 className={`t-grad font-semibold tracking-[-0.03em] ${big ? "text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1]" : "text-[1.5rem] leading-tight"}`}>{c.name}</h3>
                <p className={`mt-auto pt-6 text-ink-2 ${big ? "text-[1.0625rem] leading-relaxed" : "text-[0.9375rem] leading-snug"}`}>
                  {(big ? c.apps.slice(0, 14) : c.apps.slice(0, c.id === "work" ? 8 : 4)).join(", ")}
                  {" and more."}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* app approval: the big, bold promise */}
      <div className="wrap-wide mt-6 md:mt-8">
        <div className="tile relative mx-auto max-w-[1180px] overflow-hidden bg-night px-8 py-16 text-center text-snow md:px-16 md:py-24" data-reveal>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-[radial-gradient(50%_60%_at_50%_100%,rgb(4_99_239/0.45),transparent)]" />
          <p className="t-small relative text-snow-2">{ed.apps.request.title}</p>
          <p className="t-h1 relative mx-auto mt-4 max-w-[18ch]">{ed.apps.request.lead}</p>
          <p className="t-intro relative mx-auto mt-6 max-w-[34rem] text-snow-2">{ed.apps.request.body}</p>
          <div className="relative mt-9">
            <a href="#notify" className="btn btn-blue">
              {ed.apps.request.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap mt-24 text-center md:mt-32">
        <p className="t-h2" data-reveal>
          {ed.apps.control.title}
        </p>
        <p className="t-intro mx-auto mt-5 max-w-[40rem] text-ink-2" data-reveal style={{ ["--d" as string]: "0.08s" }}>
          {ed.apps.control.body}
        </p>
        <p className="t-small mx-auto mt-10 max-w-[36rem] text-ink-3">{apps.note}</p>
      </div>
    </section>
  );
}
