/** Simple printed ornaments. All decorative, so they stay aria-hidden. */

/** One corner of the poster frame. */
export function CornerOrnament({
  corner = "tl",
  className = "",
}: {
  corner?: "tl" | "tr" | "br" | "bl";
  className?: string;
}) {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M5 115 L5 5 L115 5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 115 L16 16 L115 16" stroke="currentColor" strokeWidth=".9" opacity=".75" />
      <path d="M5 46 L5 16 L16 16 M46 5 L16 5 L16 16" stroke="currentColor" strokeWidth="2.2" />
      <path d="M38 38 l6 -6 6 6 -6 6 z" fill="currentColor" opacity=".8" />
    </svg>
  );
}

/** Small turned diamond. */
export function Lozenge({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1 L11 6 L6 11 L1 6 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.4 L8.6 6 L6 8.6 L3.4 6 Z" fill="currentColor" opacity=".5" />
    </svg>
  );
}

/** A wavy line, like the sea in an old chart. */
export function SeaRule({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 9 C 8 2, 16 2, 24 9 S 40 16, 48 9 S 64 2, 72 9 S 88 16, 96 9 S 112 2, 120 9 S 136 16, 144 9 S 160 2, 168 9 S 184 16, 192 9 S 208 2, 216 9 S 232 16, 240 9"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M0 15 C 8 8, 16 8, 24 15 S 40 22, 48 15 S 64 8, 72 15 S 88 22, 96 15 S 112 8, 120 15 S 136 22, 144 15 S 160 8, 168 15 S 184 22, 192 15 S 208 8, 216 15 S 232 22, 240 15"
        stroke="currentColor"
        strokeWidth=".7"
        opacity=".45"
      />
    </svg>
  );
}

/** The straight bearings a portolan chart draws out from its compass. */
export function RhumbWeb({ className = "" }: { className?: string }) {
  const cx = 500;
  const cy = 500;
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16;
    return {
      x: cx + Math.cos(angle) * 700,
      y: cy + Math.sin(angle) * 700,
      major: i % 4 === 0,
    };
  });

  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor">
        {rays.map((ray, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={ray.x}
            y2={ray.y}
            strokeWidth={ray.major ? 1.1 : 0.5}
          />
        ))}
      </g>
      <g stroke="currentColor" opacity=".55">
        <circle cx={cx} cy={cy} r="300" strokeWidth=".7" />
        <circle cx={cx} cy={cy} r="440" strokeWidth=".5" strokeDasharray="1.5 10" />
      </g>
    </svg>
  );
}

/** The outer ring of a chart compass. It turns; the rose does not. */
export function CompassBezel({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="1.6 8"
      />
      <circle cx="100" cy="10" r="1.7" fill="currentColor" />
    </svg>
  );
}

/** A flat compass rose. */
export function CompassRose({ className = "" }: { className?: string }) {
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16 - Math.PI / 2;
    const long = i % 4 === 0;
    const inner = long ? 34 : 68;
    return {
      x1: 100 + Math.cos(angle) * inner,
      y1: 100 + Math.sin(angle) * inner,
      x2: 100 + Math.cos(angle) * 94,
      y2: 100 + Math.sin(angle) * 94,
    };
  });

  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth=".6" opacity=".7" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth=".8" />
      {points.map((point, i) => (
        <line
          key={i}
          x1={point.x1}
          y1={point.y1}
          x2={point.x2}
          y2={point.y2}
          stroke="currentColor"
          strokeWidth={i % 4 === 0 ? 1.4 : 0.7}
        />
      ))}
      <path d="M100 48 L108 100 L100 152 L92 100 Z" stroke="currentColor" strokeWidth=".9" />
      <path d="M48 100 L100 92 L152 100 L100 108 Z" stroke="currentColor" strokeWidth=".9" />
      <circle cx="100" cy="100" r="4" fill="currentColor" />
    </svg>
  );
}
