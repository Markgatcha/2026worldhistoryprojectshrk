"use client";

import { useEffect, useRef } from "react";

/**
 * An engraved nautical chart, drawn to a canvas.
 *
 * The interaction is borrowed from the cursor-reactive dot-grid pattern: a
 * field of points that lifts and darkens inside a soft pool around the
 * pointer. The rendering is not — everything here is drawn the way a
 * chart-engraver would set it: flat ink dots, a hairline compass rose, and
 * rhumb lines radiating from the centre.
 *
 * Nothing glows and nothing is a gradient. The dots are the same poster gold
 * the rest of the hero uses, so the chart reads as printed onto the deep field
 * rather than as a light source sitting on top of it.
 *
 * Performance: one canvas, one rAF loop, and the loop only runs while the
 * pointer is inside the window. The grid is rebuilt on resize via
 * ResizeObserver, and the whole component is skipped entirely when the user
 * prefers reduced motion.
 */

const SPACING = 26; // px between dot centres
const INFLUENCE = 150; // cursor radius of effect
const RESTING_ALPHA = 0.16; // dot opacity at rest
const LIFTED_ALPHA = 0.5; // dot opacity under the cursor
// Below this per-frame step a dot is visually at its target; we snap and use
// it to detect when the whole field has settled and the rAF loop can park.
const LIFT_EPSILON = 0.002;
// Drawn in gold rather than black: the chart sits on the hero's deep prussian
// field, and near-black ink would simply vanish against it.
const INK = "216, 165, 32"; // poster gold

type Dot = { x: number; y: number; lift: number };

export default function NauticalChart({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / SPACING) + 2;
      const rows = Math.floor(height / SPACING) + 2;
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      dots = [];
      for (let c = 0; c < cols; c += 1) {
        for (let r = 0; r < rows; r += 1) {
          dots.push({ x: offsetX + c * SPACING, y: offsetY + r * SPACING, lift: 0 });
        }
      }
    };

    /** A hairline compass rose, drawn in ink at the centre of the field. */
    const drawCompassRose = (cx: number, cy: number, radius: number) => {
      ctx.save();
      ctx.strokeStyle = `rgba(${INK}, 0.22)`;
      ctx.lineWidth = 0.75;

      // Outer ring, and an inner ring for the degree scale.
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
      ctx.stroke();

      // Sixteen points, long on the cardinals, short on the intercardinals.
      for (let i = 0; i < 16; i += 1) {
        const angle = (i * Math.PI * 2) / 16 - Math.PI / 2;
        const long = i % 4 === 0;
        const inner = radius * (long ? 0.2 : 0.55);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.stroke();
      }

      // No fill on the north point. Filled, this one triangle is large enough on
      // the hero's open field to read as a solid beam rather than as a point on
      // a rose; the stroked sixteen points already carry the compass.

      ctx.restore();
    };

    /** Rhumb lines: the radiating web a portolan chart is built on. */
    const drawRhumbLines = (cx: number, cy: number, reach: number) => {
      ctx.save();
      ctx.strokeStyle = `rgba(${INK}, 0.07)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 32; i += 1) {
        const angle = (i * Math.PI * 2) / 32;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * reach, cy + Math.sin(angle) * reach);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      drawRhumbLines(cx, cy, Math.hypot(width, height));
      drawCompassRose(cx, cy, radius);

      // The dot field, lifted inside the pointer's influence. `settled` is
      // false while any dot still has distance to travel this frame.
      let settled = true;
      for (const dot of dots) {
        let target = 0;
        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            // Falloff: full lift at the centre, easing to nothing at the edge.
            target = Math.pow(1 - dist / INFLUENCE, 1.6);
          }
        }
        // Ease toward the target so the field trails the cursor rather than
        // snapping to it. Past the epsilon the dot is visually there, so snap
        // exactly — that both kills the asymptotic crawl and lets the loop
        // below detect a fully settled field.
        const delta = (target - dot.lift) * (target > dot.lift ? 0.18 : 0.08);
        if (Math.abs(delta) > LIFT_EPSILON) settled = false;
        dot.lift = Math.abs(delta) > LIFT_EPSILON ? dot.lift + delta : target;

        const alpha = RESTING_ALPHA + (LIFTED_ALPHA - RESTING_ALPHA) * dot.lift;
        const size = 1 + dot.lift * 1.1;

        ctx.fillStyle = `rgba(${INK}, ${alpha.toFixed(3)})`;
        ctx.fillRect(dot.x - size / 2, dot.y - size / 2, size, size);
      }

      // Park the loop once nothing is animating. render() reschedules itself,
      // so without this the rAF chain runs forever after the first pointermove
      // — the only other stops are window blur and unmount — redrawing an
      // unchanged canvas at 60fps for the rest of the session. Every
      // pointermove calls start() again, so parking costs no responsiveness.
      if (settled) {
        running = false;
        frame = 0;
        return;
      }

      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      start();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    // Draw one static frame so the chart is present before any interaction.
    render();
    stop();

    const observer = new ResizeObserver(() => {
      build();
      if (!running) {
        render();
        stop();
      }
    });
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", stop);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", stop);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
