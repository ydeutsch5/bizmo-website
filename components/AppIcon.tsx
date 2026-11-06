"use client";

import { useState, type ReactNode } from "react";

/*
  A home-screen tile. Shows the real app icon from /public/apps/<icon>.png when the file is there,
  and falls back to the lettered tile until it is. Drop the icon files in and nothing else changes.
  Accepted: /public/apps/<icon>.png (square, 256 px or larger; .webp also works if named .png is absent
  and you change ICON_EXT).
*/
const ICON_EXT = "png";

export default function AppIcon({ icon, fallback, className = "" }: { icon?: string; fallback: ReactNode; className?: string }) {
  const [ok, setOk] = useState(!!icon);
  if (!icon || !ok) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/apps/${icon}.${ICON_EXT}`}
      alt=""
      draggable={false}
      onError={() => setOk(false)}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
