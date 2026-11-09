"use client";

import { useState, type ReactNode } from "react";

/*
  An app icon slot. Shows the real icon from /public/apps/<icon>.png once it has loaded, and the
  fallback (the app's initial, or a glyph) until then or when there is no file. The image is kept
  invisible until it has loaded, so a missing file never shows a broken-image mark.
  Accepted: /public/apps/<icon>.png, square, 256 px or larger.
*/
const ICON_EXT = "png";

export default function AppIcon({ icon, fallback, className = "" }: { icon?: string; fallback: ReactNode; className?: string }) {
  const [state, setState] = useState<"loading" | "ok" | "missing">(icon ? "loading" : "missing");
  return (
    <span className={`relative block h-full w-full ${className}`}>
      {state !== "ok" && <span className="grid h-full w-full place-items-center">{fallback}</span>}
      {icon && state !== "missing" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/apps/${icon}.${ICON_EXT}`}
          alt=""
          width={256}
          height={256}
          draggable={false}
          loading="lazy"
          onLoad={() => setState("ok")}
          onError={() => setState("missing")}
          className={`absolute inset-0 block h-full w-full object-cover ${state === "ok" ? "" : "opacity-0"}`}
        />
      )}
    </span>
  );
}
