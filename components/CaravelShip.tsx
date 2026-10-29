/**
 * My drawing of the caravel. Not to scale. The lines wobble on purpose,
 * because I drew it by hand and I am not a printer.
 */

type Variant = "plate" | "poster";

const inks = {
  plate: {
    line: "#141a20",
    sail: "#f4ece0",
    shade: "#e9dcc6",
    hull: "#ddcdb2",
    sea: "#141a20",
  },
  poster: {
    line: "#f6ecd8",
    sail: "#efe3cd",
    shade: "#d9c8ad",
    hull: "#a3270f",
    sea: "#d8a520",
  },
} as const;

export default function CaravelShip({
  className = "",
  variant = "plate",
  showKey = false,
}: {
  className?: string;
  variant?: Variant;
  showKey?: boolean;
}) {
  const p = inks[variant];

  return (
    <svg
      viewBox="0 0 420 350"
      className={className}
      role="img"
      aria-label={
        showKey
          ? "Hand drawing of a caravel with the sails, hull, keel and rudder marked A to D"
          : "Hand drawing of a caravel under sail"
      }
    >
      <g
        fill="none"
        stroke={p.line}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-.5 210 190)"
      >
        {/* sea, drawn first so the hull sits in it */}
        <g stroke={p.sea} opacity={variant === "poster" ? 0.9 : 0.55}>
          <path d="M18 282 C 58 274, 96 290, 136 282 C 176 274, 214 290, 254 282 C 294 274, 332 290, 402 280" strokeWidth="1.5" />
          <path d="M30 302 C 70 294, 108 310, 148 302 C 188 294, 226 310, 266 302 C 306 294, 346 310, 392 300" strokeWidth="1.1" />
          <path d="M54 320 C 94 312, 132 328, 172 320 C 212 312, 250 328, 290 320" strokeWidth=".9" opacity=".7" />
          <path d="M316 326 c 8 -5, 16 -5, 24 0" strokeWidth=".9" opacity=".6" />
        </g>

        {/* bowsprit */}
        <path d="M66 238 L 20 214" strokeWidth="2.2" />
        <path d="M62 234 L 70 230 M 64 230 L 72 226" strokeWidth=".8" opacity=".7" />

        {/* masts, a little crooked */}
        <path d="M118 249 C 117 202, 119 142, 122 86" strokeWidth="2.5" />
        <path d="M208 254 C 207 202, 205 126, 204 54" strokeWidth="2.7" />
        <path d="M302 248 C 303 208, 304 150, 306 96" strokeWidth="2.2" />

        {/* rigging, some ends just miss */}
        <g strokeWidth=".7" opacity=".7">
          <path d="M20 214 L 122 88" />
          <path d="M122 90 L 352 230" />
          <path d="M204 56 L 142 244" />
          <path d="M306 98 L 214 250" />
          <path d="M204 60 L 336 244" />
          <path d="M306 100 L 214 60" />
        </g>
        <g strokeWidth=".55" opacity=".6">
          <path d="M120 96 L 105 246" />
          <path d="M124 96 L 136 245" />
          <path d="M204 64 L 188 252" />
          <path d="M207 64 L 219 251" />
          <path d="M304 106 L 292 245" />
          <path d="M308 106 L 318 245" />
        </g>
        <g strokeWidth=".4" opacity=".4">
          <path d="M109 168 L 132 168" />
          <path d="M107 192 L 135 192" />
          <path d="M193 176 L 218 176" />
          <path d="M191 204 L 220 204" />
          <path d="M296 158 L 315 158" />
          <path d="M294 184 L 317 184" />
        </g>

        {/* main lateen sail */}
        <path
          d="M168 196 L 276 80 C 260 150, 246 198, 232 224 C 210 220, 186 212, 168 196 Z"
          fill={p.sail}
          strokeWidth="1.6"
        />
        <path
          d="M214 137 L 276 80 C 266 130, 252 186, 236 220 L 218 212 Z"
          fill={p.shade}
          stroke="none"
        />
        <path d="M184 190 C 214 158, 246 120, 268 94" strokeWidth=".55" opacity=".45" />
        <path d="M198 202 C 224 172, 250 140, 266 116" strokeWidth=".55" opacity=".35" />

        {/* mizzen lateen sail */}
        <path
          d="M264 212 L 352 126 C 344 168, 338 192, 330 206 C 310 204, 286 206, 264 212 Z"
          fill={p.sail}
          strokeWidth="1.5"
        />
        <path d="M304 170 L 350 128 C 342 164, 336 186, 329 203 L 310 202 Z" fill={p.shade} stroke="none" />
        <path d="M282 206 C 304 182, 326 158, 340 138" strokeWidth=".5" opacity=".4" />

        {/* square sail on the foremast */}
        <path
          d="M82 118 C 78 150, 74 184, 76 212 C 100 220, 140 220, 162 211 C 163 182, 160 148, 156 114 Z"
          fill={p.sail}
          strokeWidth="1.6"
        />
        <path
          d="M120 117 L 156 114 C 158 148, 160 182, 160 210 L 121 213 Z"
          fill={p.shade}
          stroke="none"
        />
        <path d="M84 142 C 106 148, 138 148, 158 141" strokeWidth=".5" opacity=".45" />
        <path d="M81 170 C 106 177, 138 177, 160 169" strokeWidth=".5" opacity=".4" />
        <path d="M79 195 C 104 202, 138 202, 161 194" strokeWidth=".45" opacity=".35" />

        {/* spars in front of the cloth */}
        <path d="M76 118 L 160 112" strokeWidth="2.1" />
        <path d="M166 198 L 278 79" strokeWidth="2.2" />
        <path d="M262 214 L 354 124" strokeWidth="1.9" />
        <path d="M168 196 L 146 220" strokeWidth=".9" opacity=".7" />
        <path d="M264 212 L 248 236" strokeWidth=".8" opacity=".7" />

        {/* hull */}
        <path
          d="M62 238 C 100 252, 160 258, 230 255 C 292 252, 334 244, 360 230 C 363 242, 358 258, 348 268 C 288 292, 164 294, 84 274 C 70 268, 62 254, 62 238 Z"
          fill={p.hull}
          strokeWidth="2"
        />
        <path
          d="M62 238 C 100 252, 160 258, 230 255 C 292 252, 334 244, 360 230"
          strokeWidth="1.5"
        />
        <path d="M70 250 C 116 266, 186 272, 250 266 C 304 261, 334 251, 354 240" strokeWidth=".8" opacity=".55" />
        <path d="M78 260 C 126 276, 194 282, 258 276 C 304 271, 330 261, 348 252" strokeWidth=".7" opacity=".45" />
        <path d="M88 270 C 136 284, 198 289, 258 284 C 300 280, 322 271, 340 262" strokeWidth=".6" opacity=".35" />

        {/* stern and rudder */}
        <path d="M320 248 L 326 218 L 360 214 L 360 230" strokeWidth="1.5" />
        <path d="M328 220 L 358 216" strokeWidth="1" opacity=".7" />
        <path d="M330 228 L 358 224" strokeWidth=".7" opacity=".5" />
        <path d="M360 246 C 366 256, 366 268, 361 278" strokeWidth="1.4" />
        <path d="M361 278 L 350 272" strokeWidth="1" />
        <path d="M361 254 L 367 254 M 363 264 L 368 264" strokeWidth=".7" opacity=".6" />

        {/* hatch and deck bits */}
        <path d="M160 258 L 184 260 L 182 270 L 158 268 Z" strokeWidth=".8" opacity=".8" />
        <path d="M162 263 L 181 265" strokeWidth=".5" opacity=".5" />
        <path d="M112 246 L 122 246 M 200 250 L 210 250 M 296 246 L 306 246" strokeWidth="1" opacity=".6" />

        {/* hand-lettered label */}
        <g transform="rotate(-2.4 288 330)">
          <text
            x="240"
            y="337"
            fill={p.line}
            stroke="none"
            fontFamily='"EB Garamond", Georgia, serif'
            fontStyle="italic"
            fontSize="19"
            letterSpacing=".4"
          >
            the caravel
          </text>
          <path d="M239 344 C 266 341, 300 342, 336 339" strokeWidth="1" opacity=".8" />
          <path d="M228 329 C 220 320, 214 312, 202 304" strokeWidth=".9" opacity=".7" />
          <path d="M202 304 l 8 1 l -4 7" strokeWidth=".9" opacity=".7" />
        </g>

        {/* key letters for the drawing */}
        {showKey && (
          <g
            fill={p.sail}
            stroke={p.line}
            strokeWidth="1.2"
            fontFamily='"Goudy Bookletter 1911", Georgia, serif'
            fontSize="11"
            textAnchor="middle"
          >
            <circle cx="248" cy="154" r="10" />
            <text x="248" y="158" fill={p.line} stroke="none">A</text>
            <circle cx="174" cy="266" r="10" />
            <text x="174" y="270" fill={p.line} stroke="none">B</text>
            <circle cx="140" cy="290" r="10" />
            <text x="140" y="294" fill={p.line} stroke="none">C</text>
            <circle cx="370" cy="276" r="10" />
            <text x="370" y="280" fill={p.line} stroke="none">D</text>
          </g>
        )}
      </g>
    </svg>
  );
}
