"use client";

import { useEffect, useState } from "react";

export default function VoyageEffects() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    if (!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "visible";
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight) element.dataset.reveal = "pending";
        observer?.observe(element);
      });
    }
    const showAll = () => {
      if (reduced.matches) {
        observer?.disconnect();
        elements.forEach(element => { element.dataset.reveal = "visible"; });
      }
    };
    let frame = 0;
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      const bar = document.getElementById("reading-progress");
      if (bar) bar.style.transform = `scaleX(${progress})`;
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", showAll);
    update();
    return () => {
      observer?.disconnect();
      elements.forEach(element => { element.dataset.reveal = ""; });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", showAll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <><div id="reading-progress" className="reading-progress" aria-hidden="true" /><button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume animations" : "Pause animations"}</button></>;
}
