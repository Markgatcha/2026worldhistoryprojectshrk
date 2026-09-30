/** Decorative compass rose rendered as pure SVG — no image assets needed. */
export default function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Compass rose">
      <defs>
        <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="196" fill="url(#roseGlow)" />
      <circle cx="200" cy="200" r="170" fill="none" stroke="#c9a227" strokeWidth="2" opacity="0.9" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="200" r="60" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.4" />

      {/* 32-point star */}
      {Array.from({ length: 32 }).map((_, i) => {
        const long = i % 8 === 0;
        const mid = i % 4 === 0;
        const len = long ? 165 : mid ? 130 : 105;
        const w = long ? 9 : mid ? 6 : 3.5;
        const angle = (i * 360) / 32;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <polygon
              points={`200,${200 - len} ${200 + w},200 200,${200 - 40} ${200 - w},200`}
              fill={i % 2 === 0 ? "#e8c766" : "#8a6d1c"}
              opacity={long ? 1 : 0.75}
            />
          </g>
        );
      })}

      <circle cx="200" cy="200" r="26" fill="#081426" stroke="#c9a227" strokeWidth="2" />
      <circle cx="200" cy="200" r="6" fill="#c9a227" />

      {/* Cardinal labels */}
      <text x="200" y="26" textAnchor="middle" fill="#e8c766" fontSize="22" fontWeight="700" fontFamily="Georgia, serif">N</text>
      <text x="200" y="392" textAnchor="middle" fill="#e8c766" fontSize="22" fontWeight="700" fontFamily="Georgia, serif" opacity="0.7">S</text>
      <text x="382" y="208" textAnchor="middle" fill="#e8c766" fontSize="22" fontWeight="700" fontFamily="Georgia, serif" opacity="0.7">E</text>
      <text x="18" y="208" textAnchor="middle" fill="#e8c766" fontSize="22" fontWeight="700" fontFamily="Georgia, serif" opacity="0.7">W</text>
    </svg>
  );
}
