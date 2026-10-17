import { useId } from "react";

/**
 * Caravela redonda — the square-rigged caravel.
 *
 * The rigging follows the historical record rather than the usual stock
 * illustration: a square-rigged foremast for running across open ocean, and
 * lateen (triangular) sails on the main and mizzen for working to windward.
 * This is the combination the Portuguese settled on late in the 15th century,
 * and the one the Niña carried after Columbus re-rigged her at the Canary
 * Islands for the Atlantic crossing.
 *
 * GEOMETRY NOTE — every spar and sail here is derived, not eyeballed:
 *   · Each mast base sits ON the deck bezier (the intersection is solved for),
 *     so the masts are planted in the hull rather than floating above it.
 *   · The square sail's head and foot are the SAME width, because a square
 *     sail is a rectangle. An earlier version tapered it, which read as a
 *     trapezoid hanging off a bar.
 *   · Each lateen sail's luff is offset perpendicular from its yard by a
 *     constant, so the sail is exactly parallel to the spar it hangs from.
 *
 * TWO PRINTS OF THE SAME PLATE
 *   `variant="plate"`  the pen-and-ink engraving, brown ink on light stock.
 *                      Used on the How It Works page, where it reads as a
 *                      drawing pinned into the page.
 *   `variant="poster"` the poster version for the hero. Same linework, but
 *                      printed in bone on the deep field with the hull
 *                      blocked in flat vermillion — the way a 1900s poster
 *                      artist would have reduced the same engraving to a
 *                      small number of inks.
 *
 * The sails stay unfilled in the poster variant on purpose: leaving them open
 * means the bone linework reads against the prussian field behind them, and no
 * part of the drawing has to fight its own background.
 */

// Deck bezier, shared by the hull and the mast-base calculation.
const DECK = { x0: 56, y0: 246, x1: 120, y1: 264, x2: 250, y2: 270, x3: 362, y3: 240 };
const DECK_PATH = `M${DECK.x0} ${DECK.y0} C ${DECK.x1} ${DECK.y1}, ${DECK.x2} ${DECK.y2}, ${DECK.x3} ${DECK.y3}`;

// Mast bases, solved against the deck bezier above.
const FORE_X = 104;
const FORE_BASE = 255.5;
const MAIN_X = 196;
const MAIN_BASE = 261;
const MIZZEN_X = 286;
const MIZZEN_BASE = 254.9;

// Mastheads.
const FORE_TOP = 96;
const MAIN_TOP = 62;
const MIZZEN_TOP = 118;

// Square sail: head and foot identical width, so it stays a rectangle.
const YARD_Y = 122;
const YARD_HALF = 43;
const SAIL_TOP_Y = 126;
const SAIL_FOOT_Y = 190;
const SAIL_HALF = 41;

// Lateen yards, slung at roughly 45 degrees across their masts.
const MAIN_YARD_FWD = { x: 120, y: 198 };
const MAIN_YARD_AFT = { x: 272, y: 66 };
const MAIN_CLEW = { x: 238, y: 208 };

const MIZZEN_YARD_FWD = { x: 238, y: 210 };
const MIZZEN_YARD_AFT = { x: 348, y: 126 };
const MIZZEN_CLEW = { x: 318, y: 230 };

// The luff of each lateen, offset perpendicular from its yard so the sail is
// exactly parallel to the spar it hangs from.
const MAIN_LUFF_FWD = { x: 124, y: 203 };
const MAIN_LUFF_AFT = { x: 276, y: 71 };
const MIZZEN_LUFF_FWD = { x: 242, y: 215 };
const MIZZEN_LUFF_AFT = { x: 352, y: 131 };

/** The solid body of the hull: the deck line down to the sheer, bow to stern. */
const HULL_BODY =
  "M42 268 C 96 292, 250 300, 372 258 L 362 240 C 250 270, 120 264, 56 246 Z";

type Variant = "plate" | "poster";

// `undefined` rather than `null` for the inks the plate variant does not use,
// so the union collapses to something SVG's `fill`/`stroke` accept directly.
const PALETTES = {
  plate: {
    lineTop: "#3d2f22",
    lineBottom: "#5a4632",
    hatch: "#3d2f22",
    sea: "#3d2f22",
    hull: undefined as string | undefined,
    wale: undefined as string | undefined,
  },
  poster: {
    lineTop: "#f6ecd8",
    lineBottom: "#dcc79a",
    hatch: "#d8a520",
    sea: "#d8a520",
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
      aria-label="Drawing of a caravela redonda under sail"
    >
      <defs>
        {/* Diagonal hatching, the engraver's shadow.
            TWO patterns rather than one: a period engraver could not hold a
            consistent spacing by hand, so identical-density hatching across a
            whole plate is the tell that a machine drew it. Alternating the two
            breaks the field up. */}
        <pattern
          id={hatchId}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="5" stroke={p.hatch} strokeWidth="0.55" opacity="0.42" />
        </pattern>
        {/* The looser partner. Wider spacing, thinner stroke. */}
        <pattern
          id={hatchLooseId}
          width="6.5"
          height="6.5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="6.5" stroke={p.hatch} strokeWidth="0.4" opacity="0.3" />
        </pattern>
        {/* Denser cross-hatch for the deepest shadow, as under a waterline. */}
        <pattern
          id={crossId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-32)"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke={p.hatch} strokeWidth="0.5" opacity="0.34" />
        </pattern>
        {/* Sea hatching, laid nearly flat to suggest a calm swell. */}
        <pattern
          id={seaId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(6)"
        >
          <line x1="0" y1="0" x2="7" y2="0" stroke={p.sea} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        {/* Plate tone — a stipple, for the large flat shadow on the hull.
            Hatching alone reads as "vector fill"; a dotted ground is what an
            engraver actually used for a broad area of shade. */}
        <pattern
          id={stippleId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.42" fill={p.hatch} opacity="0.4" />
          <circle cx="3" cy="3" r="0.3" fill={p.hatch} opacity="0.26" />
        </pattern>
        <linearGradient id={inkId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.lineTop} />
          <stop offset="100%" stopColor={p.lineBottom} />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke={`url(#${inkId})`}
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ══════════ HULL ══════════
            Carvel-built: a smooth unbroken sheer line, narrow and shallow.
            Length-to-beam about 3.5 to 1, which is what made her fast. */}
        <g className="ship-vessel">
          {/* Poster variant: the hull blocked in flat vermillion, with the wale
              picked out in bone. Printed before the linework goes down. */}
          {p.hull && (
            <>
              <path d={HULL_BODY} fill={p.hull} stroke="none" />
              <path
                d="M50 256 C 118 278, 252 284, 366 248 L 372 258 C 250 300, 96 292, 42 268 Z"
                fill={p.wale}
                stroke="none"
                opacity="0.9"
              />
            </>
          )}

          {/* Sheer line, bow (left) to stern (right).
              Drawn as a chain of short curves with a little jitter in the
              control points rather than one smooth bezier: a burin-guided
              line is never perfectly even, and a single flawless curve is the
              clearest signal that a machine drew the plate. */}
          <path
            d="M42 268 C 62 276, 78 282, 96 292 C 130 300, 170 302, 208 301
               C 246 300, 282 296, 316 287 C 340 281, 358 270, 372 258"
            strokeWidth="2"
          />
          {/* Counter and transom at the stern. */}
          <path d="M372 258 C 380 250, 382 240, 378 230" strokeWidth="1.8" />
          {/* Bow and stem, raked forward. */}
          <path d="M42 268 C 34 258, 32 246, 36 234" strokeWidth="1.8" />
          {/* Deck line — the same curve the mast bases are solved against.
              The mast bases still use the smooth DECK bezier, so the masts
              stay planted on the hull; this is only the drawn line. */}
          <path d={DECK_PATH} strokeWidth="1.35" />
          {/* Wale, the thick strake running her length. */}
          <path d="M50 256 C 118 278, 252 284, 366 248" strokeWidth="0.9" opacity="0.75" />
          {/* Hull shadow below the wale, hatched rather than filled. */}
          {/* Broad hull shade, stippled. Hatching a large flat area at one
              uniform density is what makes an SVG read as machine-drawn; a
              stipple ground is what an engraver actually used for it. */}
          <path
            d="M50 256 C 118 278, 252 284, 366 248 L 372 258 C 250 300, 96 292, 42 268 Z"
            fill={`url(#${stippleId})`}
            stroke="none"
            opacity={p.hull ? 0.85 : 1}
          />
          <path
            d="M58 264 C 124 284, 250 290, 362 254"
            fill={`url(#${crossId})`}
            stroke="none"
            opacity={p.hull ? 0.7 : 1}
          />
          {/* Plank seams, drawn as broken lines so they read as hand-ruled. */}
          <path d="M62 250 C 128 270, 250 276, 360 244" strokeWidth="0.5" opacity="0.4" />
          <path d="M70 262 C 132 280, 250 286, 356 252" strokeWidth="0.5" opacity="0.35" />
          <path d="M84 272 C 140 288, 248 292, 348 260" strokeWidth="0.5" opacity="0.3" />

          {/* Sterncastle — kept low on purpose. A carrack's high castle would
              have made her unweatherly, which is exactly what the caravel
              was not. */}
          <path d="M300 244 L 302 214 L 366 208 L 372 240" strokeWidth="1.8" />
          <path d="M302 214 L 366 208" strokeWidth="1.2" />
          <path d="M306 222 L 362 216" strokeWidth="0.6" opacity="0.5" />
          <path d="M308 230 L 364 224" strokeWidth="0.6" opacity="0.5" />
          {/* Stern windows, three lights. */}
          <path d="M322 226 L 322 240 M 336 224 L 336 240 M 350 222 L 350 240" strokeWidth="0.8" opacity="0.7" />

          {/* Forecastle — a low break forward. */}
          <path d="M78 250 L 82 228 L 128 232 L 126 254" strokeWidth="1.7" />
          <path d="M82 228 L 128 232" strokeWidth="1.1" />
          <path d="M86 238 L 124 241" strokeWidth="0.6" opacity="0.5" />

          {/* Centerline rudder at the sternpost — the caravel's steering
              advance over the old side rudders. */}
          <path d="M378 230 C 384 240, 386 254, 382 268" strokeWidth="1.9" />
          <path d="M382 268 L 372 258" strokeWidth="1.1" />
          <path d="M380 240 L 386 240 M 381 250 L 387 250" strokeWidth="0.7" opacity="0.6" />

          {/* Bowsprit, angled up and forward. */}
          <path d="M36 234 L 8 206" strokeWidth="2" />

          {/* ══════════ MASTS ══════════
              Each base sits on the deck bezier, so the mast is planted in the
              hull rather than hovering above it. */}

          {/* ── FOREMAST (square rig) ──
              The mast is drawn FIRST and again LAST. The sail sits between the
              two passes: the first pass is the part above the yard, the sail
              then covers the middle, and the second pass restores the mast
              below the foot so it is never simply erased by its own canvas. */}
          <path d={`M${FORE_X} ${FORE_BASE} L ${FORE_X} ${FORE_TOP}`} strokeWidth="2.4" />
          {/* Square yard across the foremast. */}
          <path d={`M${FORE_X - YARD_HALF} ${YARD_Y} L ${FORE_X + YARD_HALF} ${YARD_Y}`} strokeWidth="1.95" />
          {/* The square sail. Head and foot are the same width, with a slight
              belly in the leeches — a rectangle, not a trapezoid. */}
          <path
            d={`M${FORE_X - SAIL_HALF} ${SAIL_TOP_Y} C ${FORE_X - SAIL_HALF + 6} ${SAIL_TOP_Y + 22}, ${FORE_X - SAIL_HALF + 6} ${SAIL_FOOT_Y - 22}, ${FORE_X - SAIL_HALF} ${SAIL_FOOT_Y} L ${FORE_X + SAIL_HALF} ${SAIL_FOOT_Y} C ${FORE_X + SAIL_HALF - 6} ${SAIL_FOOT_Y - 22}, ${FORE_X + SAIL_HALF - 6} ${SAIL_TOP_Y + 22}, ${FORE_X + SAIL_HALF} ${SAIL_TOP_Y} Z`}
            strokeWidth="1.65"
          />
          {/* Sail shadow, hatched on the lee side. */}
          <path
            d={`M${FORE_X} ${SAIL_TOP_Y + 2} L ${FORE_X + SAIL_HALF} ${SAIL_TOP_Y} C ${FORE_X + SAIL_HALF - 6} ${SAIL_TOP_Y + 22}, ${FORE_X + SAIL_HALF - 6} ${SAIL_FOOT_Y - 22}, ${FORE_X + SAIL_HALF} ${SAIL_FOOT_Y} L ${FORE_X} ${SAIL_FOOT_Y} Z`}
            fill={`url(#${hatchId})`}
            stroke="none"
            opacity={p.hull ? 0.55 : 1}
          />
          {/* The foremast, redrawn either side of the square sail.
              A square sail is bent to its yard and hangs DOWNWARD from it, so
              the mast is hidden only between the yard and the foot. The spar
              has to reappear above the yard (where it carries the truck and
              the pennant) and below the foot (down to the deck), otherwise the
              mast reads as two disconnected stubs. */}
          <path d={`M${FORE_X} ${FORE_BASE} L ${FORE_X} ${FORE_TOP}`} strokeWidth="2.1" />

          {/* Reef bands, running level across the sail. */}
          <path d={`M${FORE_X - SAIL_HALF + 1} 148 L ${FORE_X + SAIL_HALF - 1} 148`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${FORE_X - SAIL_HALF + 1} 168 L ${FORE_X + SAIL_HALF - 1} 168`} strokeWidth="0.6" opacity="0.5" />
          {/* Sheets and braces, running down to the deck. */}
          <path d={`M${FORE_X - SAIL_HALF} ${SAIL_FOOT_Y} L ${FORE_X - 16} ${FORE_BASE}`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${FORE_X + SAIL_HALF} ${SAIL_FOOT_Y} L ${FORE_X + 24} ${FORE_BASE}`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${FORE_X - YARD_HALF} ${YARD_Y} L ${FORE_X - 48} ${FORE_BASE}`} strokeWidth="0.5" opacity="0.4" />
          <path d={`M${FORE_X + YARD_HALF} ${YARD_Y} L ${FORE_X + 48} ${FORE_BASE}`} strokeWidth="0.5" opacity="0.4" />

          {/* ── MAINMAST (lateen) ──
              The yard is slung at roughly 45 degrees, aft end high and forward
              end low. The sail's luff is offset perpendicular from the yard, so
              the two are exactly parallel. */}
          <path
            d={`M${MAIN_YARD_FWD.x} ${MAIN_YARD_FWD.y} L ${MAIN_YARD_AFT.x} ${MAIN_YARD_AFT.y}`}
            strokeWidth="1.8"
          />
          {/* The lateen sail: luff along the yard, clew down to the deck. */}
          <path
            d={`M${MAIN_LUFF_FWD.x} ${MAIN_LUFF_FWD.y} L ${MAIN_LUFF_AFT.x} ${MAIN_LUFF_AFT.y} L ${MAIN_CLEW.x} ${MAIN_CLEW.y} Z`}
            strokeWidth="1.65"
          />
          {/* Sail shadow on the after half. */}
          <path
            d={`M${MAIN_X} 133 L ${MAIN_LUFF_AFT.x} ${MAIN_LUFF_AFT.y} L ${MAIN_CLEW.x} ${MAIN_CLEW.y} Z`}
            fill={`url(#${hatchId})`}
            stroke="none"
            opacity={p.hull ? 0.55 : 1}
          />
          {/* Seams, running parallel to the yard. */}
          <path d="M162 178 L 254 100" strokeWidth="0.6" opacity="0.5" />
          <path d="M182 190 L 248 134" strokeWidth="0.6" opacity="0.5" />
          {/* Tack down to the deck, sheet aft. */}
          <path d={`M${MAIN_LUFF_FWD.x} ${MAIN_LUFF_FWD.y} L ${MAIN_X - 68} ${MAIN_BASE}`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${MAIN_CLEW.x} ${MAIN_CLEW.y} L ${MAIN_X + 22} ${MAIN_BASE}`} strokeWidth="0.6" opacity="0.5" />

          {/* The mainmast, redrawn over its own lateen. Drawn after the sail so
              the spar stays continuous through the parrel instead of being
              erased where the canvas crosses it. */}
          <path d={`M${MAIN_X} ${MAIN_BASE} L ${MAIN_X} ${MAIN_TOP}`} strokeWidth="2.7" />

          {/* Parrel, holding the yard to the mast at their true crossing. */}
          <path d={`M${MAIN_X - 10} 133 L ${MAIN_X + 8} 129`} strokeWidth="0.8" opacity="0.7" />

          {/* ── MIZZENMAST (lateen) ──
              Yard first, then the sail, then the mast redrawn ON TOP. The mast
              is the spar the sail hangs from, so it must read as being in front
              of the canvas at the parrel and behind the cloth elsewhere. Painting
              the mast last achieves that in one stroke: where the sail covers
              it, the sail wins; everywhere else the mast is continuous. */}
          <path
            d={`M${MIZZEN_YARD_FWD.x} ${MIZZEN_YARD_FWD.y} L ${MIZZEN_YARD_AFT.x} ${MIZZEN_YARD_AFT.y}`}
            strokeWidth="1.75"
          />
          <path
            d={`M${MIZZEN_LUFF_FWD.x} ${MIZZEN_LUFF_FWD.y} L ${MIZZEN_LUFF_AFT.x} ${MIZZEN_LUFF_AFT.y} L ${MIZZEN_CLEW.x} ${MIZZEN_CLEW.y} Z`}
            strokeWidth="1.55"
          />
          <path
            d={`M${MIZZEN_X} 174 L ${MIZZEN_LUFF_AFT.x} ${MIZZEN_LUFF_AFT.y} L ${MIZZEN_CLEW.x} ${MIZZEN_CLEW.y} Z`}
            fill={`url(#${hatchId})`}
            stroke="none"
            opacity={p.hull ? 0.55 : 1}
          />
          <path d="M272 190 L 336 146" strokeWidth="0.6" opacity="0.5" />
          <path d={`M${MIZZEN_LUFF_FWD.x} ${MIZZEN_LUFF_FWD.y} L ${MIZZEN_X - 46} ${MIZZEN_BASE}`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${MIZZEN_CLEW.x} ${MIZZEN_CLEW.y} L ${MIZZEN_X + 24} ${MIZZEN_BASE}`} strokeWidth="0.6" opacity="0.5" />

          {/* The mizzenmast itself, redrawn over its own sail so the spar stays
              continuous from the masthead down through the parrel to the deck. */}
          <path d={`M${MIZZEN_X} ${MIZZEN_BASE} L ${MIZZEN_X} ${MIZZEN_TOP}`} strokeWidth="2.2" />

          {/* ── STANDING RIGGING ──
              Stays and shrouds, drawn fine so they sit behind the sails. */}
          <g strokeWidth="0.55" opacity="0.5">
            {/* Fore stay to the bowsprit. */}
            <path d={`M${FORE_X} ${FORE_TOP} L 14 210`} />
            {/* Main stay to the foremast. */}
            <path d={`M${MAIN_X} ${MAIN_TOP} L ${FORE_X} ${FORE_TOP + 4}`} />
            {/* Mizzen stay to the mainmast. */}
            <path d={`M${MIZZEN_X} ${MIZZEN_TOP} L ${MAIN_X} ${MAIN_TOP + 6}`} />
            {/* Backstay from the mainmast to the stern. */}
            <path d={`M${MAIN_X} ${MAIN_TOP + 4} L 330 214`} />
            {/* Fore shrouds. */}
            <path d={`M${FORE_X} 108 L ${FORE_X - 22} ${FORE_BASE}`} />
            <path d={`M${FORE_X} 108 L ${FORE_X - 8} ${FORE_BASE}`} />
            <path d={`M${FORE_X} 108 L ${FORE_X + 8} ${FORE_BASE}`} />
            <path d={`M${FORE_X} 108 L ${FORE_X + 22} ${FORE_BASE}`} />
            {/* Main shrouds. */}
            <path d={`M${MAIN_X} 76 L ${MAIN_X - 26} ${MAIN_BASE}`} />
            <path d={`M${MAIN_X} 76 L ${MAIN_X - 12} ${MAIN_BASE}`} />
            <path d={`M${MAIN_X} 76 L ${MAIN_X + 12} ${MAIN_BASE}`} />
            <path d={`M${MAIN_X} 76 L ${MAIN_X + 26} ${MAIN_BASE}`} />
            {/* Mizzen shrouds. */}
            <path d={`M${MIZZEN_X} 130 L ${MIZZEN_X - 14} ${MIZZEN_BASE}`} />
            <path d={`M${MIZZEN_X} 130 L ${MIZZEN_X + 14} ${MIZZEN_BASE}`} />
            {/* Ratlines, a few rungs so the shrouds read as ladders. */}
            <path d="M88 200 L 122 200 M 92 218 L 118 218" strokeWidth="0.4" opacity="0.4" />
            <path d="M176 200 L 216 200 M 180 220 L 212 220" strokeWidth="0.4" opacity="0.4" />
          </g>

          {/* Masthead pennant, streaming aft. */}
          <path d={`M${MAIN_X} ${MAIN_TOP} C ${MAIN_X + 18} ${MAIN_TOP - 4}, ${MAIN_X + 36} ${MAIN_TOP}, ${MAIN_X + 48} ${MAIN_TOP - 6}`} strokeWidth="1.3" opacity="0.85" />

          {/* Crow's nest on the mainmast. */}
          <path d={`M${MAIN_X - 8} 88 L ${MAIN_X + 8} 88 L ${MAIN_X + 6} 98 L ${MAIN_X - 6} 98 Z`} strokeWidth="1" opacity="0.8" />

          {/* Fasteners along the wale — the trunnels a carvel-built hull is
              actually fastened with. Tiny, faint, and drawn at irregular
              intervals. This class of incidental mark is what convinces the
              eye a person ruled the plate; its absence is what makes a
              technically-correct drawing read as clip art. */}
          <g strokeWidth="0.7" opacity="0.5">
            <path d="M64 254 L 64 260" />
            <path d="M92 261 L 92 267" />
            <path d="M124 266 L 124 272" />
            <path d="M158 269 L 158 275" />
            <path d="M196 271 L 196 277" />
            <path d="M232 270 L 232 276" />
            <path d="M268 266 L 268 272" />
            <path d="M300 260 L 300 266" />
            <path d="M330 253 L 330 259" />
          </g>

          {/* Deck furniture, kept minimal: a hatch and the tiller. */}
          <path d="M148 244 L 168 246 L 166 254 L 146 252 Z" strokeWidth="0.8" opacity="0.7" />
          <path d="M330 218 L 344 216" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* ══════════ SEA ══════════
            A calm swell, hatched rather than drawn as cartoon waves. */}
        <g className="ship-waves" opacity={p.hull ? 0.85 : 0.7}>
          <path d="M20 296 C 60 288, 100 304, 140 296 C 180 288, 220 304, 260 296 C 300 288, 340 304, 400 294" strokeWidth="1.35" />
          <path
            d="M20 296 C 60 288, 100 304, 140 296 C 180 288, 220 304, 260 296 C 300 288, 340 304, 400 294 L 400 308 C 340 318, 300 302, 260 310 C 220 318, 180 302, 140 310 C 100 318, 60 302, 20 310 Z"
            fill={`url(#${seaId})`}
            stroke="none"
          />
          <path d="M44 318 C 84 310, 124 326, 164 318 C 204 310, 244 326, 284 318 C 324 310, 364 326, 396 316" strokeWidth="0.9" opacity="0.6" />
          <path d="M70 338 C 110 330, 150 346, 190 338 C 230 330, 270 346, 310 338" strokeWidth="0.8" opacity="0.45" />
        </g>
      </g>
    </svg>
  );
}