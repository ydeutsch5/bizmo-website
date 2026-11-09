import { audience } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

export default function Audience() {
  return (
    <section id="who" aria-labelledby="who-title" className="relative overflow-hidden bg-night py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute end-[-10%] top-[10%] h-[80%] w-[60%] bg-[radial-gradient(closest-side,rgb(242_167_116/0.14),rgb(4_99_239/0.06)_55%,transparent)]" />
      <div className="wrap relative grid items-center gap-16 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:gap-10">
        <div className="max-w-[36rem]">
          <p className="act" data-reveal>
            For you
          </p>
          <h2 id="who-title" className="display display-lg mt-8 text-white" data-reveal-lines>
            <span className="line-mask">
              <span>{audience.title[0]}</span>
            </span>
            <span className="line-mask">
              <span className="text-aluminium/50" style={{ ["--d" as string]: "0.12s" }}>
                {audience.title[1]}
              </span>
            </span>
          </h2>
          <p className="lede mt-8 text-aluminium/70" data-reveal>
            {audience.body}
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {audience.roles.map((r, i) => {
              const I = Icon[r.icon as IconName];
              return (
                <li key={r.name} className="group flex items-start gap-4 rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 transition-colors duration-500 hover:border-cyan/30 hover:bg-white/[0.05]" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-night text-aluminium transition-colors duration-500 group-hover:text-cyan">
                    <I className="h-[22px] w-[22px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-white">{r.name}</span>
                    <span className="mt-1 block text-[0.88rem] leading-snug text-mist">{r.sub}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[36rem]" data-reveal style={{ ["--d" as string]: "0.2s" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/renders/front-back.webp"
            alt="Bizmo, front and back. The screen shows the official beach wallpaper; the back carries the engraved bizmo logo."
            loading="lazy"
            width={1500}
            height={1594}
            className="relative h-auto w-full drop-shadow-[0_50px_60px_rgb(0_0_0/0.6)]"
          />
        </div>
      </div>
    </section>
  );
}
