"use client";

import { useEffect, useState } from "react";
import { legalNav, nav } from "@/lib/content";

/**
 * Quiet top bar. Steps out of the way while you scroll down; returns when you scroll up.
 * On phones and tablets the section links live in a full-screen menu behind the menu button.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > innerHeight * 0.9);
        last = y;
      }
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // the menu locks the page and closes on Escape or when the screen grows past the phone layout
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => mq.matches && setOpen(false);
    addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      root.classList.remove("menu-open");
      removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden && !open ? "-translate-y-full" : ""} ${
        solid && !open ? "bg-night/40 backdrop-blur-xl" : ""
      }`}
    >
      <div className="wrap relative z-10 flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="block shrink-0" aria-label="Bizmo, back to top" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/bizmo-wordmark-white.svg" alt="" width={75} height={22} className="h-[22px] w-auto md:h-[25px]" />
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-[0.72rem] font-medium tracking-[0.18em] text-aluminium/60 uppercase">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors duration-300 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#notify" className="btn btn-ghost min-h-10 px-5 text-[0.85rem] max-sm:hidden" onClick={() => setOpen(false)}>
            Get notified
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            <span className={`absolute h-px w-[18px] bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-[18px] bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      {/* phone menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-night transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-[20%] -end-[30%] h-[70%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgb(4_99_239/0.22),transparent)]" />
        <nav aria-label="Main, phone" className="wrap relative flex h-full flex-col pt-24 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col border-t border-white/10">
            {nav.map((n, i) => (
              <li key={n.href} className="border-b border-white/10">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block py-5 font-display text-[2rem] font-semibold tracking-[-0.03em] text-white transition-[opacity,transform] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#notify" onClick={() => setOpen(false)} className="btn btn-light mt-10 self-start">
            Get notified at launch
          </a>
          <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-mist">
            {legalNav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
