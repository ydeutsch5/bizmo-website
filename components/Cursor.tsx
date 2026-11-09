"use client";

import { useEffect, useRef } from "react";

/**
 * A ring with the Bizmo dot at its centre, following the pointer. Over anything interactive it opens up.
 * The dot is drawn inside the ring, so the two always move together.
 * Only on fine pointers (mouse, trackpad); touch screens keep their normal behaviour.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let x = innerWidth / 2,
      y = innerHeight / 2,
      shown = false,
      big = false;

    const update = (target: Element | null) => {
      const t = target?.closest?.("a, button, [role='tab'], input, label, [data-cursor]") as HTMLElement | null;
      const nextBig = !!t && !(t instanceof HTMLInputElement);
      if (nextBig !== big) {
        big = nextBig;
        ring.current!.dataset.big = String(big);
      }
    };
    // scrolling moves the page under a still pointer, so look again after each scroll
    let scrollRaf = 0;
    const onScroll = () => {
      if (!shown || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        update(document.elementFromPoint(x, y));
      });
    };
    const place = () => {
      ring.current!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        ring.current!.style.opacity = "1";
      }
      // positioned straight from the event, not on the next animation frame: no lag behind the pointer
      place();
      update(e.target as Element | null);
    };
    const leave = () => {
      shown = false;
      ring.current!.style.opacity = "0";
    };
    const down = () => ring.current!.style.setProperty("--press", "0.86");
    const up = () => ring.current!.style.setProperty("--press", "1");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="cursor-ring absolute top-0 left-0 opacity-0 transition-opacity duration-300" data-big="false">
        <div className="cursor-ring-inner">
          <div className="h-[6px] w-[6px] rounded-full bg-gradient-to-tr from-cobalt to-cyan shadow-[0_0_10px_rgb(45_218_255/0.9)]" />
        </div>
      </div>
    </div>
  );
}
