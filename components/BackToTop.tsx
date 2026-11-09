"use client";

import { useEffect, useState } from "react";

/* A round arrow, bottom corner, that appears once you are well down the page and scrolls back to the top. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(scrollY > innerHeight * 2);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed end-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-night/70 text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] backdrop-blur-xl transition-[opacity,transform,border-color] duration-500 hover:border-cyan/50 md:end-8 md:bottom-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </a>
  );
}
