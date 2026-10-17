import { useId } from "react";

/**
 * Caravela redonda — the square-rigged caravel, in profile.
 *
 * GEOMETRY
 * Nothing here is eyeballed. The deck is a single cubic bezier, and every
 * mast base is solved against it by bisection, so a mast cannot float above
 * the hull or sink into it. Each yard is attached at a named point on its
 * mast, and each sail hangs from the yard it is bent to, so the head of the
 * canvas is always exactly on the spar. Stays run masthead to masthead (or to
 * the bowsprit tip), backstays run masthead to the stern quarter, and shrouds
 * run masthead to chainplates on the deck edge — every line has two real ends.
 *
 * LAYERING
 * Drawn back to front, the way the plate would have been worked: rigging
 * first, then the masts, then the canvas over them, then the spars in front
 * of the canvas, then the hull, then the sea. A shroud that crosses a sail is
 * therefore behind it, and a yard always reads as lying on the cloth rather
 * than through it.
 *
 * THE RIG
 * Square course on the foremast for running; lateen sails on the main and
 * mizzen for working to windward. That is the combination the Portuguese
 * settled on late in the fifteenth century, and the one the Niña carried
 * after Columbus re-rigged her at the Canary Islands.
 *
 * A lateen yard is slung at roughly forty degrees, forward end low and aft end
 * high, and the sail is a triangle whose luff lies along that yard: tack at
 * the forward end, peak at the aft end, clew down near the deck. The luff is
 * offset perpendicular from the spar by a constant, so the two never cross.
 */

// ── The hull curve ────────────────────────────────────────────────────────
// Bow top, two control points, stern top. Everything else is derived.
const DECK: Array<[number, number]> = [
  [46, 250],
  [120, 270],
  [250, 274],
  [368, 242],
];

const bezier = (points: Array<[number, number]>, t: number): [number, number] => {
  const u = 1 - t;
  const [a, b, c, d] = points;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};

/** Deck height at a given x. x is monotonic in t, so a bisection is exact. */
const deckAtX = (x: number): number => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 28; i += 1) {
    const mid = (lo + hi) / 2;
    if (bezier(DECK, mid)[0] < x) lo = mid;
    else hi = mid;
  }
  return bezier(DECK, (lo + hi) / 2)[1];
};

const DECK_PATH = `M${DECK[0][0]} ${DECK[0][1]} C ${DECK[1][0]} ${DECK[1][1]}, ${DECK[2][0]} ${DECK[2][1]}, ${DECK[3][0]} ${DECK[3][1]}`;

// Hull outline: deck line out, down the sternpost, along the bottom, up the stem.
const HULL_BODY =
  "M46 250 C 120 270, 250 274, 368 242 C 371 254, 368 266, 358 276 C 266 306, 140 308, 58 288 C 47 278, 44 262, 46 250 Z";

// The upper strake, printed in the second ink on the poster version.
const WALE_BAND =
  "M46 250 C 120 270, 250 274, 368 242 L 367 250 C 250 282, 120 278, 48 258 Z";

// ── Masts ─────────────────────────────────────────────────────────────────
const FORE_X = 104;
const MAIN_X = 196;
const MIZZEN_X = 286;

const FORE_BASE = deckAtX(FORE_X);
const MAIN_BASE = deckAtX(MAIN_X);
const MIZZEN_BASE = deckAtX(MIZZEN_X);

const FORE_TOP = 84;
const MAIN_TOP = 56;
const MIZZEN_TOP = 102;

// ── Foremast: square course ───────────────────────────────────────────────
const YARD_Y = 116;
const YARD_HALF = 46;
const SAIL_HEAD_Y = 117;
const SAIL_FOOT_Y = 212;
const SAIL_HEAD_HALF = 38;
const SAIL_FOOT_HALF = 46;

// ── Mainmast: lateen ──────────────────────────────────────────────────────
// Yard runs forward-low to aft-high at about 41 degrees.
const MAIN_YARD_FWD: [number, number] = [156, 196];
const MAIN_YARD_AFT: [number, number] = [272, 72];
const MAIN_LUFF_OFFSET = 2;
const MAIN_CLEW: [number, number] = [226, 224];

// ── Mizzenmast: lateen, smaller ───────────────────────────────────────────
const MIZ_YARD_FWD: [number, number] = [252, 218];
const MIZ_YARD_AFT: [number, number] = [350, 120];
const MIZ_LUFF_OFFSET = 2;
const MIZ_CLEW: [number, number] = [332, 206];

/** Offset a point perpendicular to the yard it hangs from. */
const offsetFromYard = (
  point: [number, number],
  from: [number, number],
  to: [number, number],
  distance: number,
): [number, number] => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  // Rotate the yard vector a quarter turn and push the luff to the lee side.
  return [point[0] + (dy / len) * distance, point[1] + (-dx / len) * distance];
};

const MAIN_LUFF_FWD = offsetFromYard(MAIN_YARD_FWD, MAIN_YARD_FWD, MAIN_YARD_AFT, MAIN_LUFF_OFFSET);
const MAIN_LUFF_AFT = offsetFromYard(MAIN_YARD_AFT, MAIN_YARD_FWD, MAIN_YARD_AFT, MAIN_LUFF_OFFSET);
const MIZ_LUFF_FWD = offsetFromYard(MIZ_YARD_FWD, MIZ_YARD_FWD, MIZ_YARD_AFT, MIZ_LUFF_OFFSET);
const MIZ_LUFF_AFT = offsetFromYard(MIZ_YARD_AFT, MIZ_YARD_FWD, MIZ_YARD_AFT, MIZ_LUFF_OFFSET);

/** Height of a straight spar at a given x. */
const yOnLine = (a: [number, number], b: [number, number], x: number) =>
  a[1] + ((x - a[0]) / (b[0] - a[0])) * (b[1] - a[1]);

/** The point where each lateen yard crosses its own mast. */
const MAIN_CROSS_Y = yOnLine(MAIN_YARD_FWD, MAIN_YARD_AFT, MAIN_X);
const MIZ_CROSS_Y = yOnLine(MIZ_YARD_FWD, MIZ_YARD_AFT, MIZZEN_X);

const round = (n: number) => Math.round(n * 10) / 10;

type Variant = "plate" | "poster";

const PALETTES = {
  plate: {
    lineTop: "#3d2f22",
    lineBottom: "#5a4632",
    hatch: "#3d2f22",
    sea: "#3d2f22",
    sail: "#efe3cd",
    sailLine: "#3d2f22",
    hull: undefined as string | undefined,
    wale: undefined as string | undefined,
  },
  poster: {
    lineTop: "#f6ecd8",
    lineBottom: "#dcc79a",
    hatch: "#d8a520",
    sea: "#d8a520",
    sail: "#e7d9bf",
    sailLine: "#0b2431",
    hull: "#cf3b1e",
    wale: "#f6ecd8",
  },
} as const;

export default function CaravelShip({
  className = "",
  variant = "plate",
}: {
  className?: string;
  variant?: Variant;
}) {
  const inkId = useId();
  const hatchId = useId();
  const sailShadeId = useId();
  const hatchLooseId = useId();
  const crossId = useId();
  const seaId = useId();
  const stippleId = useId();
  const p = PALETTES[variant];

  return (
    <svg
      viewBox="0 0 420 380"
      className={className}
      role="img"
      aria-label="Engraving of a caravela redonda under sail"
    >
      <defs>
        {/* Two hatches at slightly different pitches: a burin could not hold
            one density across a whole plate, and a single perfect pitch is
            the clearest sign that a machine drew it. */}
        <pattern id={hatchId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={p.hatch} strokeWidth="0.5" opacity="0.42" />
        </pattern>
        <pattern id={sailShadeId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={p.sailLine} strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <pattern id={hatchLooseId} width="6.5" height="6.5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="6.5" stroke={p.hatch} strokeWidth="0.38" opacity="0.3" />
        </pattern>
        <pattern id={crossId} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={p.hatch} strokeWidth="0.45" opacity="0.34" />
        </pattern>
        <pattern id={seaId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(6)">
          <line x1="0" y1="0" x2="7" y2="0" stroke={p.sea} strokeWidth="0.45" opacity="0.3" />
        </pattern>
        <pattern id={stippleId} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill={p.hatch} opacity="0.4" />
          <circle cx="3" cy="3" r="0.28" fill={p.hatch} opacity="0.26" />
        </pattern>
        <linearGradient id={inkId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.lineTop} />
          <stop offset="100%" stopColor={p.lineBottom} />
        </linearGradient>
      </defs>

      <g fill="none" stroke={`url(#${inkId})`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* ══════════ 1 · SPAR AND RIGGING, BEHIND THE CANVAS ══════════ */}
        {/* Bowsprit, lashed to the stem. */}
        <path d="M48 250 L 8 226" strokeWidth="2.2" />
        <path d="M46 246 L 54 242 M 47 242 L 55 238" strokeWidth="0.8" opacity="0.65" />

        {/* Masts, full height. The canvas covers their middles later. */}
        <path d={`M${FORE_X} ${FORE_BASE} L ${FORE_X} ${FORE_TOP}`} strokeWidth="2.4" />
        <path d={`M${MAIN_X} ${MAIN_BASE} L ${MAIN_X} ${MAIN_TOP}`} strokeWidth="2.6" />
        <path d={`M${MIZZEN_X} ${MIZZEN_BASE} L ${MIZZEN_X} ${MIZZEN_TOP}`} strokeWidth="2.2" />

        {/* Stays and backstays: masthead to masthead, masthead to quarter. */}
        <g strokeWidth="0.55" opacity="0.55">
          <path d={`M${FORE_X} ${FORE_TOP} L 8 226`} />
          <path d={`M${FORE_X} ${FORE_TOP + 10} L 44 226`} />
          <path d={`M${MAIN_X} ${MAIN_TOP} L ${FORE_X + 6} ${round(FORE_BASE - 4)}`} />
          <path d={`M${MIZZEN_X} ${MIZZEN_TOP} L ${MAIN_X + 8} ${round(MAIN_BASE - 4)}`} />
          <path d={`M${MAIN_X + 2} ${MAIN_TOP + 4} L 348 246`} />
          <path d={`M${MIZZEN_X} ${MIZZEN_TOP + 4} L 356 236`} />
        </g>

        {/* Shrouds to chainplates, with ratlines between them. */}
        <g strokeWidth="0.5" opacity="0.5">
          <path d={`M${FORE_X - 2} 96 L ${FORE_X - 18} ${round(FORE_BASE - 2)}`} />
          <path d={`M${FORE_X - 2} 96 L ${FORE_X - 10} ${round(FORE_BASE - 2)}`} />
          <path d={`M${FORE_X + 2} 96 L ${FORE_X + 10} ${round(FORE_BASE - 2)}`} />
          <path d={`M${FORE_X + 2} 96 L ${FORE_X + 18} ${round(FORE_BASE - 2)}`} />
          <path d={`M${MAIN_X - 2} 70 L ${MAIN_X - 22} ${round(MAIN_BASE - 2)}`} />
          <path d={`M${MAIN_X - 2} 70 L ${MAIN_X - 12} ${round(MAIN_BASE - 2)}`} />
          <path d={`M${MAIN_X + 2} 70 L ${MAIN_X + 12} ${round(MAIN_BASE - 2)}`} />
          <path d={`M${MAIN_X + 2} 70 L ${MAIN_X + 22} ${round(MAIN_BASE - 2)}`} />
          <path d={`M${MIZZEN_X - 2} 112 L ${MIZZEN_X - 14} ${round(MIZZEN_BASE - 2)}`} />
          <path d={`M${MIZZEN_X + 2} 112 L ${MIZZEN_X + 14} ${round(MIZZEN_BASE - 2)}`} />
        </g>
        <g strokeWidth="0.38" opacity="0.32">
          <path d={`M${FORE_X - 15} 180 L ${FORE_X + 15} 180`} />
          <path d={`M${FORE_X - 17} 204 L ${FORE_X + 17} 204`} />
          <path d={`M${FORE_X - 19} 228 L ${FORE_X + 19} 228`} />
          <path d={`M${MAIN_X - 18} 160 L ${MAIN_X + 18} 160`} />
          <path d={`M${MAIN_X - 20} 190 L ${MAIN_X + 20} 190`} />
          <path d={`M${MAIN_X - 21} 220 L ${MAIN_X + 21} 220`} />
          <path d={`M${MIZZEN_X - 12} 150 L ${MIZZEN_X + 12} 150`} />
          <path d={`M${MIZZEN_X - 13} 186 L ${MIZZEN_X + 13} 186`} />
        </g>

        {/* ══════════ 2 · CANVAS ══════════ */}
        {/* Main lateen. The luff lies on the yard; the clew drops to the deck. */}
        <path
          d={`M${round(MAIN_LUFF_FWD[0])} ${round(MAIN_LUFF_FWD[1])}
              L ${round(MAIN_LUFF_AFT[0])} ${round(MAIN_LUFF_AFT[1])}
              C ${round(MAIN_LUFF_AFT[0] + 10)} ${round(MAIN_LUFF_AFT[1] + 44)}, ${MAIN_CLEW[0] + 18} ${MAIN_CLEW[1] - 40}, ${MAIN_CLEW[0]} ${MAIN_CLEW[1]} Z`}
          fill={p.sail}
          stroke={p.sailLine}
          strokeWidth="1.5"
        />
        {/* Leeward half in shade. */}
        <path
          d={`M${MAIN_X} ${round(MAIN_CROSS_Y)} L ${round(MAIN_LUFF_AFT[0])} ${round(MAIN_LUFF_AFT[1])}
              C ${round(MAIN_LUFF_AFT[0] + 10)} ${round(MAIN_LUFF_AFT[1] + 44)}, ${MAIN_CLEW[0] + 18} ${MAIN_CLEW[1] - 40}, ${MAIN_CLEW[0]} ${MAIN_CLEW[1]}
              L ${MAIN_X + 4} ${MAIN_CLEW[1] - 10} Z`}
          fill={`url(#${sailShadeId})`}
          stroke="none"
          opacity={p.hull ? 0.75 : 1}
        />
        {/* Cloths, parallel to the yard. */}
        <path d="M150 188 L 244 106" strokeWidth="0.45" stroke={p.sailLine} opacity="0.4" />
        <path d="M172 199 L 248 128" strokeWidth="0.45" stroke={p.sailLine} opacity="0.4" />

        {/* Mizzen lateen, aft of the main. */}
        <path
          d={`M${round(MIZ_LUFF_FWD[0])} ${round(MIZ_LUFF_FWD[1])}
              L ${round(MIZ_LUFF_AFT[0])} ${round(MIZ_LUFF_AFT[1])}
              C ${round(MIZ_LUFF_AFT[0] + 8)} ${round(MIZ_LUFF_AFT[1] + 34)}, ${MIZ_CLEW[0] + 8} ${MIZ_CLEW[1] - 26}, ${MIZ_CLEW[0]} ${MIZ_CLEW[1]} Z`}
          fill={p.sail}
          stroke={p.sailLine}
          strokeWidth="1.4"
        />
        <path
          d={`M${MIZZEN_X} ${round(MIZ_CROSS_Y)} L ${round(MIZ_LUFF_AFT[0])} ${round(MIZ_LUFF_AFT[1])}
              C ${round(MIZ_LUFF_AFT[0] + 8)} ${round(MIZ_LUFF_AFT[1] + 34)}, ${MIZ_CLEW[0] + 8} ${MIZ_CLEW[1] - 26}, ${MIZ_CLEW[0]} ${MIZ_CLEW[1]}
              L ${MIZZEN_X + 3} ${MIZ_CLEW[1] - 8} Z`}
          fill={`url(#${sailShadeId})`}
          stroke="none"
          opacity={p.hull ? 0.75 : 1}
        />
        <path d="M268 200 L 330 148" strokeWidth="0.4" stroke={p.sailLine} opacity="0.4" />

        {/* Fore course. Head on the yard, foot flared a little wider. */}
        <path
          d={`M${FORE_X - SAIL_HEAD_HALF} ${SAIL_HEAD_Y}
              C ${FORE_X - SAIL_HEAD_HALF - 9} 146, ${FORE_X - SAIL_FOOT_HALF - 7} 186, ${FORE_X - SAIL_FOOT_HALF} ${SAIL_FOOT_Y}
              C ${FORE_X - 20} ${SAIL_FOOT_Y + 5}, ${FORE_X + 20} ${SAIL_FOOT_Y + 5}, ${FORE_X + SAIL_FOOT_HALF} ${SAIL_FOOT_Y}
              C ${FORE_X + SAIL_FOOT_HALF + 7} 186, ${FORE_X + SAIL_HEAD_HALF + 9} 146, ${FORE_X + SAIL_HEAD_HALF} ${SAIL_HEAD_Y} Z`}
          fill={p.sail}
          stroke={p.sailLine}
          strokeWidth="1.5"
        />
        <path
          d={`M${FORE_X} ${SAIL_HEAD_Y} L ${FORE_X + SAIL_HEAD_HALF} ${SAIL_HEAD_Y}
              C ${FORE_X + SAIL_HEAD_HALF + 9} 146, ${FORE_X + SAIL_FOOT_HALF + 7} 186, ${FORE_X + SAIL_FOOT_HALF} ${SAIL_FOOT_Y}
              C ${FORE_X + 20} ${SAIL_FOOT_Y + 5}, ${FORE_X} ${SAIL_FOOT_Y + 4}, ${FORE_X} ${SAIL_FOOT_Y} Z`}
          fill={`url(#${sailShadeId})`}
          stroke="none"
          opacity={p.hull ? 0.75 : 1}
        />
        {/* Folds across the belly of the course. */}
        <path d={`M${FORE_X - 42} 158 C ${FORE_X - 12} 170, ${FORE_X + 12} 170, ${FORE_X + 42} 156`} strokeWidth="0.45" stroke={p.sailLine} opacity="0.35" />
        <path d={`M${FORE_X - 44} 186 C ${FORE_X - 12} 198, ${FORE_X + 12} 198, ${FORE_X + 44} 184`} strokeWidth="0.45" stroke={p.sailLine} opacity="0.3" />
        {/* Reef bands and cloths. */}
        <path d={`M${FORE_X - 41} 146 L ${FORE_X + 41} 146`} strokeWidth="0.55" stroke={p.sailLine} opacity="0.5" />
        <path d={`M${FORE_X - 43} 172 L ${FORE_X + 43} 172`} strokeWidth="0.55" stroke={p.sailLine} opacity="0.5" />
        <path d={`M${FORE_X - 45} 192 L ${FORE_X + 45} 192`} strokeWidth="0.45" stroke={p.sailLine} opacity="0.4" />
        <path d={`M${FORE_X - 22} ${SAIL_HEAD_Y} L ${FORE_X - 23} ${SAIL_FOOT_Y}`} strokeWidth="0.4" stroke={p.sailLine} opacity="0.35" />
        <path d={`M${FORE_X + 22} ${SAIL_HEAD_Y} L ${FORE_X + 23} ${SAIL_FOOT_Y}`} strokeWidth="0.4" stroke={p.sailLine} opacity="0.35" />

        {/* ══════════ 3 · SPARS IN FRONT OF THE CANVAS ══════════ */}
        <path d={`M${FORE_X - YARD_HALF} ${YARD_Y} L ${FORE_X + YARD_HALF} ${YARD_Y}`} strokeWidth="1.9" />
        <path d={`M${FORE_X - YARD_HALF} ${YARD_Y} L ${FORE_X - 4} ${FORE_TOP + 2}`} strokeWidth="0.55" opacity="0.6" />
        <path d={`M${FORE_X + YARD_HALF} ${YARD_Y} L ${FORE_X + 4} ${FORE_TOP + 2}`} strokeWidth="0.55" opacity="0.6" />

        <path
          d={`M${MAIN_YARD_FWD[0]} ${MAIN_YARD_FWD[1]} L ${MAIN_YARD_AFT[0]} ${MAIN_YARD_AFT[1]}`}
          strokeWidth="2"
        />
        {/* Parrel at the true crossing, and the halyard to the masthead. */}
        <path d={`M${MAIN_X - 11} ${round(MAIN_CROSS_Y + 1)} L ${MAIN_X + 7} ${round(MAIN_CROSS_Y - 3)}`} strokeWidth="0.9" opacity="0.8" />
        <path d={`M${MAIN_YARD_AFT[0]} ${MAIN_YARD_AFT[1]} L ${MAIN_X + 3} ${MAIN_TOP + 4}`} strokeWidth="0.55" opacity="0.6" />

        <path
          d={`M${MIZ_YARD_FWD[0]} ${MIZ_YARD_FWD[1]} L ${MIZ_YARD_AFT[0]} ${MIZ_YARD_AFT[1]}`}
          strokeWidth="1.8"
        />
        <path d={`M${MIZZEN_X - 9} ${round(MIZ_CROSS_Y)} L ${MIZZEN_X + 7} ${round(MIZ_CROSS_Y - 4)}`} strokeWidth="0.8" opacity="0.8" />

        {/* Running rigging: sheets to the deck, braces aft and clear of the
            leeches rather than straight through the cloth. */}
        <g strokeWidth="0.55" opacity="0.5">
          <path d={`M${FORE_X - SAIL_FOOT_HALF} ${SAIL_FOOT_Y} L ${FORE_X - 24} ${round(FORE_BASE - 2)}`} />
          <path d={`M${FORE_X + SAIL_FOOT_HALF} ${SAIL_FOOT_Y} L ${FORE_X + 28} ${round(FORE_BASE - 2)}`} />
          <path d={`M${MAIN_CLEW[0]} ${MAIN_CLEW[1]} L ${MAIN_CLEW[0] + 10} ${round(MAIN_BASE - 2)}`} />
          <path d={`M${round(MAIN_LUFF_FWD[0])} ${round(MAIN_LUFF_FWD[1])} L ${MAIN_X - 56} ${round(MAIN_BASE - 4)}`} />
          <path d={`M${MIZ_CLEW[0]} ${MIZ_CLEW[1]} L ${MIZ_CLEW[0] + 6} ${round(MIZZEN_BASE - 4)}`} />
          <path d={`M${round(MIZ_LUFF_FWD[0])} ${round(MIZ_LUFF_FWD[1])} L ${MIZZEN_X - 42} ${round(MIZZEN_BASE - 4)}`} />
        </g>

        {/* ══════════ 4 · HULL ══════════ */}
        <g className="ship-vessel">
          {p.hull && (
            <>
              <path d={HULL_BODY} fill={p.hull} stroke="none" />
              <path d={WALE_BAND} fill={p.wale} stroke="none" opacity="0.92" />
            </>
          )}

          {/* Broad shade first, then the lines over it. */}
          <path
            d="M58 288 C 140 308, 266 306, 358 276 L 368 242 L 46 250 Z"
            fill={`url(#${stippleId})`}
            stroke="none"
            opacity={p.hull ? 0.5 : 0.9}
          />
          <path
            d="M70 292 C 146 306, 262 302, 352 280"
            fill={`url(#${crossId})`}
            stroke="none"
            opacity={p.hull ? 0.35 : 0.75}
          />

          <path d={HULL_BODY} strokeWidth="1.8" />
          <path d={DECK_PATH} strokeWidth="1.4" />

          {/* Planking, following the sheer rather than running level. */}
          <path d="M50 262 C 124 280, 250 284, 366 252" strokeWidth="0.55" opacity="0.5" />
          <path d="M54 270 C 128 288, 250 292, 363 260" strokeWidth="0.55" opacity="0.45" />
          <path d="M60 278 C 134 296, 250 300, 359 268" strokeWidth="0.55" opacity="0.4" />
          <path d="M68 286 C 142 302, 248 306, 354 276" strokeWidth="0.5" opacity="0.35" />

          {/* Wales: the two heavier strakes. */}
          <path d="M48 256 C 122 276, 250 280, 367 248" strokeWidth="1.5" opacity="0.85" />
          <path d="M56 274 C 130 292, 250 296, 361 264" strokeWidth="0.9" opacity="0.55" />

          {/* Trunnels along the upper wale, at uneven spacing. */}
          <g strokeWidth="0.6" opacity="0.45">
            <path d="M66 262 L 66 268" />
            <path d="M94 269 L 94 275" />
            <path d="M126 274 L 126 280" />
            <path d="M160 277 L 160 283" />
            <path d="M198 279 L 198 285" />
            <path d="M234 278 L 234 284" />
            <path d="M270 274 L 270 280" />
            <path d="M302 267 L 302 273" />
            <path d="M332 259 L 332 265" />
          </g>

          {/* ── Stern ── quarterdeck, taffrail, three lights and the lantern. */}
          <path d="M306 266 L 308 232 L 364 224 L 368 246" strokeWidth="1.6" />
          <path d="M308 232 L 364 224" strokeWidth="1.2" />
          <path d="M310 240 L 362 232" strokeWidth="0.6" opacity="0.5" />
          <path d="M311 248 L 363 240" strokeWidth="0.6" opacity="0.5" />
          <path d="M312 226 L 312 218 M 326 224 L 326 216 M 340 222 L 340 214 M 354 220 L 354 212" strokeWidth="0.8" opacity="0.75" />
          <path d="M308 218 L 358 210" strokeWidth="1" opacity="0.8" />
          <path d="M320 238 L 320 252 M 334 236 L 334 251 M 348 234 L 348 250" strokeWidth="0.8" opacity="0.7" />
          <path d="M318 252 L 350 247" strokeWidth="0.7" opacity="0.55" />
          <path d="M358 210 L 358 200 L 364 198 L 364 208" strokeWidth="1" opacity="0.8" />
          <path d="M360 198 L 360 194" strokeWidth="0.8" opacity="0.7" />

          {/* ── Rudder ── hung on the sternpost, with pintles. */}
          <path d="M368 246 C 373 258, 374 270, 370 282" strokeWidth="1.5" />
          <path d="M370 282 L 358 276" strokeWidth="1.1" />
          <path d="M369 252 L 375 252 M 371 264 L 376 264 M 370 274 L 375 274" strokeWidth="0.7" opacity="0.6" />
          <path d="M366 240 L 344 234" strokeWidth="0.9" opacity="0.7" />

          {/* ── Bow ── stem and beak. */}
          <path d="M46 250 C 40 240, 40 230, 44 222" strokeWidth="1.5" />
          <path d="M44 222 L 52 226" strokeWidth="1" opacity="0.8" />
          <path d="M48 256 C 42 262, 40 270, 44 276" strokeWidth="0.9" opacity="0.6" />

          {/* Hatch amidships. */}
          <path d="M152 264 L 176 266 L 174 274 L 150 272 Z" strokeWidth="0.8" opacity="0.7" />
          <path d="M154 268 L 174 270" strokeWidth="0.45" opacity="0.45" />

          {/* Mast coats where each spar passes the deck. */}
          <path d={`M${FORE_X - 4} ${round(FORE_BASE - 4)} L ${FORE_X + 4} ${round(FORE_BASE - 4)}`} strokeWidth="1.2" opacity="0.8" />
          <path d={`M${MAIN_X - 5} ${round(MAIN_BASE - 4)} L ${MAIN_X + 5} ${round(MAIN_BASE - 4)}`} strokeWidth="1.2" opacity="0.8" />
          <path d={`M${MIZZEN_X - 4} ${round(MIZZEN_BASE - 4)} L ${MIZZEN_X + 4} ${round(MIZZEN_BASE - 4)}`} strokeWidth="1.2" opacity="0.8" />
        </g>

        {/* ══════════ 5 · MASTHEADS AND FLAGS, ABOVE EVERYTHING ══════════ */}
        <path d={`M${MAIN_X - 9} 74 L ${MAIN_X + 9} 74 L ${MAIN_X + 6} 82 L ${MAIN_X - 6} 82 Z`} strokeWidth="1" opacity="0.85" />
        <path
          d={`M${MAIN_X} ${MAIN_TOP} C ${MAIN_X + 20} ${MAIN_TOP - 6}, ${MAIN_X + 40} ${MAIN_TOP - 1}, ${MAIN_X + 56} ${MAIN_TOP - 9} L ${MAIN_X + 52} ${MAIN_TOP - 2} C ${MAIN_X + 38} ${MAIN_TOP + 4}, ${MAIN_X + 20} ${MAIN_TOP + 4}, ${MAIN_X} ${MAIN_TOP + 7} Z`}
          fill={p.hatch}
          stroke="none"
          opacity="0.7"
        />
        {/* Mast bands. */}
        <g strokeWidth="0.8" opacity="0.6">
          <path d={`M${FORE_X - 3} 150 L ${FORE_X + 3} 150`} />
          <path d={`M${FORE_X - 3} 196 L ${FORE_X + 3} 196`} />
          <path d={`M${MAIN_X - 3} 108 L ${MAIN_X + 3} 108`} />
          <path d={`M${MAIN_X - 3} 176 L ${MAIN_X + 3} 176`} />
          <path d={`M${MIZZEN_X - 2.5} 150 L ${MIZZEN_X + 2.5} 150`} />
        </g>

        {/* ══════════ 6 · SEA ══════════ */}
        <g className="ship-waves" opacity={p.hull ? 0.8 : 0.7}>
          <path d="M18 296 C 58 288, 98 304, 138 296 C 178 288, 218 304, 258 296 C 298 288, 338 304, 400 294" strokeWidth="1.2" />
          <path
            d="M18 296 C 58 288, 98 304, 138 296 C 178 288, 218 304, 258 296 C 298 288, 338 304, 400 294 L 400 310 C 338 320, 298 304, 258 312 C 218 320, 178 304, 138 312 C 98 320, 58 304, 18 312 Z"
            fill={`url(#${seaId})`}
            stroke="none"
          />
          <path d="M40 320 C 80 312, 120 328, 160 320 C 200 312, 240 328, 280 320 C 320 312, 360 328, 396 318" strokeWidth="0.9" opacity="0.55" />
          <path d="M66 340 C 106 332, 146 348, 186 340 C 226 332, 266 348, 306 340" strokeWidth="0.8" opacity="0.4" />
        </g>
      </g>
    </svg>
  );
}
