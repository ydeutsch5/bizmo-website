import type { SVGProps } from "react";

/*
  Brand monoline icons: 24-unit grid, 1.9 px strokes, rounded caps and joins, single colour.
  Drawn here so nothing third-party is reproduced.
*/
type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const Icon = {
  // comparison rows
  filter: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 5h16l-6.5 7.5V19l-3-1.5V12.5L4 5Z" />
    </svg>
  ),
  apps: (p: P) => (
    <svg {...base(p)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8" />
      <path d="M16.75 13.5v6.5M13.5 16.75H20" />
    </svg>
  ),
  control: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="10" cy="17" r="2.2" />
    </svg>
  ),
  speed: (p: P) => (
    <svg {...base(p)}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
    </svg>
  ),
  eye: (p: P) => (
    <svg {...base(p)}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  ),
  lock: (p: P) => (
    <svg {...base(p)}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  ),
  certified: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3.5 14.4 5l2.8.3 1 2.7 2.2 1.8-.6 2.7.6 2.7-2.2 1.8-1 2.7-2.8.3L12 21.5 9.6 20l-2.8-.3-1-2.7-2.2-1.8.6-2.7-.6-2.7 2.2-1.8 1-2.7L9.6 5 12 3.5Z" />
      <path d="m8.8 12.4 2.2 2.2 4.3-4.6" />
    </svg>
  ),
  // audience
  owner: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" />
    </svg>
  ),
  sales: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 19 10 13l3.5 3.5L20 10" />
      <path d="M15.5 10H20v4.5" />
    </svg>
  ),
  contractor: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 16v-1a8 8 0 0 1 16 0v1" />
      <path d="M3 16h18M9 8.5V5h6v3.5" />
      <path d="M12 8V5" />
    </svg>
  ),
  field: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  ),
  traveler: (p: P) => (
    <svg {...base(p)}>
      <path d="M10.5 21 13 14l5.5-5.5a2.1 2.1 0 0 0-3-3L10 11 3 8.5l2-2 5.5.8L13 4.7 15.5 3 21 8.5 19.3 11l-2.6 2.5.8 5.5-2 2L13 14" />
    </svg>
  ),
  office: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21M3 21h18" />
      <path d="M7 8h3M7 12h3M7 16h3M17 14h0M17 17.5h0" />
    </svg>
  ),
  // specs
  chip: (p: P) => (
    <svg {...base(p)}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </svg>
  ),
  memory: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 17v3M12 17v3M17 17v3M7 10.5v3M12 10.5v3M17 10.5v3" />
    </svg>
  ),
  storage: (p: P) => (
    <svg {...base(p)}>
      <path d="M7 3h7l4 4v13a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V4.5A1.5 1.5 0 0 1 7 3Z" />
      <path d="M9 10v4M12 8.5V14M15 11.5V14" />
    </svg>
  ),
  display: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="4.5" width="18" height="13" rx="2" />
      <path d="M9 20.5h6" />
    </svg>
  ),
  camera: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.4-2h5.6l1.4 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="12.8" r="3.4" />
    </svg>
  ),
  signal: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 20V14M9 20V10M14 20V6M19 20V3" />
    </svg>
  ),
  wifi: (p: P) => (
    <svg {...base(p)}>
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a10 10 0 0 1 13 0M8.5 16a5.5 5.5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  sim: (p: P) => (
    <svg {...base(p)}>
      <path d="M7 3h7l4 4v12.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3Z" />
      <rect x="9" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  usb: (p: P) => (
    <svg {...base(p)}>
      <rect x="5" y="9" width="14" height="6" rx="3" />
      <path d="M8.5 12h7" />
    </svg>
  ),
  car: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 13.5 6 8.5A2 2 0 0 1 7.9 7h8.2a2 2 0 0 1 1.9 1.3l2 5.2V18H4v-4.5Z" />
      <path d="M4 13.5h16M7.5 18v2M16.5 18v2" />
      <circle cx="8" cy="15.5" r="0.7" fill="currentColor" />
      <circle cx="16" cy="15.5" r="0.7" fill="currentColor" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3 5 6v5.5c0 4.5 3 7.8 7 9.5 4-1.7 7-5 7-9.5V6l-7-3Z" />
      <path d="m9.2 12 2 2 3.8-4" />
    </svg>
  ),
  globe: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.6 3.9 5.4 3.9 8.5s-1.3 5.9-3.9 8.5c-2.6-2.6-3.9-5.4-3.9-8.5S9.4 6.1 12 3.5Z" />
    </svg>
  ),
  code: (p: P) => (
    <svg {...base(p)}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5 10.5 19" />
    </svg>
  ),
  // marks
  check: (p: P) => (
    <svg {...base(p)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  cross: (p: P) => (
    <svg {...base(p)}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
