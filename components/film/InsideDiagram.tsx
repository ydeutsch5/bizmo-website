import { layers } from "@/lib/content";

/*
  In-device filtering, drawn on Bizmo's own screen.
  Approved apps on the left, the filter in the middle (inside the device), the internet on the right.
  Every packet goes through the filter before it leaves; nothing goes around it.
  Elements carry data-reveal-at so they appear in order as the film scrolls (see ScrollFilm "screens").
*/

type Props = {
  /** scroll position (viewport heights) at which the first element appears */
  at: number;
  /** spacing between reveals */
  step?: number;
};

const W = 760;
const H = 480;

export default function InsideDiagram({ at, step = 0.28 }: Props) {
  const d = layers.diagram;
  const tiles = d.apps;
  const tileH = 54;
  const gap = 26;
  const stackH = tiles.length * tileH + (tiles.length - 1) * gap;
  const top = 70;
  const tileX = 70;
  const tileW = 150;
  const bandX = 352;
  const bandW = 72;
  const bandY = top - 18;
  const bandH = stackH + 36;
  const outX = 612;
  const cy = top + stackH / 2;
  const r = (i: number) => at + i * step;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" style={{ fontFamily: "var(--font-sans)" }}>
      <defs>
        <linearGradient id="idg-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2DDAFF" />
          <stop offset="1" stopColor="#0463EF" />
        </linearGradient>
        <radialGradient id="idg-glow">
          <stop offset="0" stopColor="#2DDAFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2DDAFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="idg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13161b" />
          <stop offset="1" stopColor="#0b0d11" />
        </linearGradient>
      </defs>

      {/* the system screen */}
      <rect width={W} height={H} fill="url(#idg-bg)" />

      {/* lines from each app into the filter */}
      <g data-reveal-at={r(1)} style={{ opacity: 0 }}>
        {tiles.map((_, i) => {
          const y = top + i * tileH + tileH / 2 + i * gap;
          const x0 = tileX + tileW;
          const path = `M ${x0} ${y} C ${x0 + 60} ${y}, ${bandX - 60} ${cy}, ${bandX} ${cy + (y - cy) * 0.25}`;
          return (
            <g key={i}>
              <path d={path} fill="none" stroke="rgb(228 230 233 / 0.22)" strokeWidth="1.5" />
              <circle r="4" fill="#e4e6e9">
                <animateMotion dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" path={path} begin={`${i * 0.5}s`} />
              </circle>
            </g>
          );
        })}
      </g>

      {/* the filter band, inside the device */}
      <g data-reveal-at={r(2)} style={{ opacity: 0 }}>
        <rect x={bandX - 60} y={bandY - 60} width={bandW + 120} height={bandH + 120} rx="120" fill="url(#idg-glow)" />
        <rect x={bandX} y={bandY} width={bandW} height={bandH} rx="18" fill="url(#idg-band)" />
        <rect x={bandX + 1} y={bandY + 1} width={bandW - 2} height={bandH - 2} rx="17" fill="none" stroke="rgb(255 255 255 / 0.35)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={bandX + 20} x2={bandX + bandW - 20} y1={bandY + 28 + i * ((bandH - 56) / 4)} y2={bandY + 28 + i * ((bandH - 56) / 4)} stroke="rgb(255 255 255 / 0.55)" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x={bandX + bandW / 2} y={bandY + bandH + 30} textAnchor="middle" fontSize="18" fontWeight="600" fill="#ffffff">
          {d.filter}
        </text>
        <text x={bandX + bandW / 2} y={bandY + bandH + 52} textAnchor="middle" fontSize="13" fill="#9fb2c8">
          {d.filterSub}
        </text>
      </g>

      {/* out to the internet, one clean line */}
      <g data-reveal-at={r(3)} style={{ opacity: 0 }}>
        <path d={`M ${bandX + bandW} ${cy} L ${outX - 40} ${cy}`} fill="none" stroke="url(#idg-band)" strokeWidth="2.5" />
        <circle r="5" fill="#2DDAFF">
          <animateMotion dur="1.6s" repeatCount="indefinite" path={`M ${bandX + bandW} ${cy} L ${outX - 40} ${cy}`} />
        </circle>
        <circle cx={outX} cy={cy} r="38" fill="none" stroke="rgb(228 230 233 / 0.35)" strokeWidth="1.5" />
        <ellipse cx={outX} cy={cy} rx="16" ry="38" fill="none" stroke="rgb(228 230 233 / 0.35)" strokeWidth="1.5" />
        <line x1={outX - 38} x2={outX + 38} y1={cy} y2={cy} stroke="rgb(228 230 233 / 0.35)" strokeWidth="1.5" />
        <line x1={outX - 33} x2={outX + 33} y1={cy - 18} y2={cy - 18} stroke="rgb(228 230 233 / 0.35)" strokeWidth="1.5" />
        <line x1={outX - 33} x2={outX + 33} y1={cy + 18} y2={cy + 18} stroke="rgb(228 230 233 / 0.35)" strokeWidth="1.5" />
        <text x={outX} y={cy + 66} textAnchor="middle" fontSize="15" fill="#e4e6e9">
          {d.out}
        </text>
      </g>

      {/* approved apps */}
      <g data-reveal-at={r(0)} style={{ opacity: 0 }}>
        {tiles.map((t, i) => {
          const y = top + i * (tileH + gap);
          return (
            <g key={t}>
              <rect x={tileX} y={y} width={tileW} height={tileH} rx="14" fill="rgb(255 255 255 / 0.1)" stroke="rgb(255 255 255 / 0.22)" />
              <rect x={tileX + 12} y={y + 12} width={30} height={30} rx="8" fill="rgb(255 255 255 / 0.85)" />
              <text x={tileX + 56} y={y + 34} fontSize="16" fontWeight="500" fill="#ffffff">
                {t}
              </text>
            </g>
          );
        })}
        <text x={tileX} y={top + stackH + 28} fontSize="13" fill="#9fb2c8" letterSpacing="0.08em">
          {layers.stack[0].label.toUpperCase()}
        </text>
      </g>

      {/* the device boundary: the filter is inside it */}
      <g data-reveal-at={r(4)} style={{ opacity: 0 }}>
        <rect x="34" y="28" width={bandX + bandW + 56 - 34} height={414} rx="26" fill="none" stroke="rgb(45 218 255 / 0.45)" strokeWidth="1.5" strokeDasharray="6 8" />
        <text x="54" y="54" fontSize="13" fill="#2DDAFF" letterSpacing="0.08em">
          {d.frame.toUpperCase()}
        </text>
        <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="17" fontWeight="500" fill="#ffffff">
          {d.note}
        </text>
      </g>
    </svg>
  );
}
