/**
 * Art Nouveau ornament for the poster frame.
 *
 * The 1900s poster artist never left a corner bare. A whiplash curve — the
 * long, asymmetric sweep that came out of Art Nouveau and Vienna Secession —
 * turns the corner, a tighter echo line runs inside it, and an almond leaf
 * fills the space the curve leaves open.
 *
 * Four of these, rotated, frame the hero. They are `aria-hidden`: pure
 * decoration, and a screen reader should skip straight past them.
 */

/** One corner. Rotate with `corner` to place it in any of the four positions. */
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
      {/* The whiplash sweep, turning the corner. */}
      <path d="M6 114 C6 48 48 6 114 6" stroke="currentColor" strokeWidth="2.4" />
      {/* The inner echo — a second curve, offset, thinner. */}
      <path d="M24 114 C24 58 58 24 114 24" stroke="currentColor" strokeWidth="1" opacity=".75" />
      {/* The curl at the inner terminus. */}
      <path
        d="M114 24 c-7.5 0-12 5-12 10.5 0 5.4 4.4 8.6 8.6 6.8 3-1.3 2.8-5.4.2-6-2-.5-3.2 1.4-2.6 3"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".85"
      />
      {/* Almond leaf filling the inside of the sweep. */}
      <path d="M28 98 C46 94 62 78 70 56 C52 60 36 76 28 98 Z" fill="currentColor" opacity=".9" />
      {/* A second, smaller leaf. */}
      <path d="M46 76 C55 79 61 85 63 93 C54 90 48 84 46 76 Z" fill="currentColor" opacity=".5" />
      {/* The stem line joining the two leaves. */}
      <path d="M28 98 C44 92 58 78 66 62" stroke="currentColor" strokeWidth=".8" opacity=".6" />
    </svg>
  );
}

/**
 * A small turned-diamond mark, used to punctuate a line of type. Same device
 * as the lozenges in `.ornament-rule`, but standalone.
 */
export function Lozenge({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1 L11 6 L6 11 L1 6 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.4 L8.6 6 L6 8.6 L3.4 6 Z" fill="currentColor" opacity=".5" />
    </svg>
  );
}