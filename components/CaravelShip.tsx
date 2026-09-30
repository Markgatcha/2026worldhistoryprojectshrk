/** Stylized caravel rendered as pure SVG line art — no image assets needed. */
export default function CaravelShip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Caravel ship">
      <defs>
        <radialGradient id="seaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="196" fill="url(#seaGlow)" />

      {/* rigging */}
      <g stroke="#c9a227" strokeWidth="1.2" opacity="0.45">
        <line x1="190" y1="78" x2="330" y2="248" />
        <line x1="190" y1="78" x2="80" y2="238" />
        <line x1="258" y1="128" x2="330" y2="248" />
        <line x1="258" y1="128" x2="120" y2="240" />
      </g>

      {/* lateen yard + sail on the mizzen mast */}
      <line x1="212" y1="138" x2="304" y2="172" stroke="#e8c766" strokeWidth="3" strokeLinecap="round" />
      <polygon
        points="220,144 296,176 258,238"
        fill="#c9a227"
        fillOpacity="0.28"
        stroke="#e8c766"
        strokeWidth="1.6"
      />

      {/* square sail on the main mast */}
      <polygon
        points="150,96 230,96 220,182 160,182"
        fill="#c9a227"
        fillOpacity="0.22"
        stroke="#e8c766"
        strokeWidth="1.6"
      />
      <line x1="146" y1="96" x2="234" y2="96" stroke="#e8c766" strokeWidth="3" strokeLinecap="round" />

      {/* masts */}
      <line x1="190" y1="78" x2="190" y2="252" stroke="#e8c766" strokeWidth="3.4" strokeLinecap="round" />
      <line x1="258" y1="128" x2="258" y2="252" stroke="#e8c766" strokeWidth="3" strokeLinecap="round" />

      {/* pennant */}
      <polygon points="190,78 226,86 190,95" fill="#e8c766" />

      {/* bowsprit */}
      <line x1="318" y1="246" x2="366" y2="212" stroke="#e8c766" strokeWidth="2.6" strokeLinecap="round" />

      {/* sterncastle + forecastle */}
      <path
        d="M84 238 L84 206 L132 206 L132 240 Z"
        fill="#0d2240"
        stroke="#e8c766"
        strokeWidth="1.8"
      />
      <path
        d="M292 242 L292 216 L322 216 L322 244 Z"
        fill="#0d2240"
        stroke="#e8c766"
        strokeWidth="1.8"
      />

      {/* hull */}
      <path
        d="M72 250 Q200 296 328 244 L312 226 Q200 268 88 230 Z"
        fill="#0d2240"
        stroke="#e8c766"
        strokeWidth="2.2"
      />
      <line x1="96" y1="248" x2="304" y2="248" stroke="#c9a227" strokeWidth="1.2" opacity="0.6" />

      {/* waves */}
      <g fill="none" stroke="#1e7fae" strokeWidth="2.4" strokeLinecap="round">
        <path d="M48 318 q16 -12 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" />
        <path d="M84 344 q16 -12 32 0 t32 0 t32 0 t32 0 t32 0 t32 0" opacity="0.6" />
        <path d="M120 296 q16 -12 32 0 t32 0 t32 0 t32 0" opacity="0.35" />
      </g>
    </svg>
  );
}
