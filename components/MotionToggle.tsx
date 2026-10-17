"use client";

import { useEffect, useState } from "react";

/**
 * The motion control, set as a printed note in the colophon.
 *
 * It used to be a pill fixed to the bottom-right corner of the viewport —
 * the single most application-like object on the site, and the clearest
 * signal that a web app had been dressed as a poster. A printer would have
 * put the notice in the imprint, so that is where it lives now.
 */
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused]);

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={paused}
      onClick={() => setPaused((value) => !value)}
    >
      Motion <span className="motion-toggle-state">{paused ? "held" : "running"}</span>
    </button>
  );
}
