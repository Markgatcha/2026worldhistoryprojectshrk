"use client";

import { useEffect } from "react";

/**
 * Progressive reveal for the printed page.
 *
 * Everything this component used to also render — a reading-progress bar
 * pinned under the masthead and a floating "Pause animations" pill — has
 * been removed. Both were interface furniture, not print: a poster has no
 * scroll indicator and no control panel. The motion notice now lives in the
 * colophon, set as part of the imprint.
 *
 * All this component does now is mark sections visible as they come up the
 * page, and leave them alone entirely when the reader has asked for reduced
 * motion.
 */
export default function VoyageEffects() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    if (!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.reveal = "visible";
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.dataset.reveal = "pending";
        }
        observer?.observe(element);
      });
    }

    const showAll = () => {
      if (reduced.matches) {
        observer?.disconnect();
        elements.forEach((element) => {
          element.dataset.reveal = "visible";
        });
      }
    };

    reduced.addEventListener("change", showAll);

    return () => {
      observer?.disconnect();
      elements.forEach((element) => {
        element.dataset.reveal = "";
      });
      reduced.removeEventListener("change", showAll);
    };
  }, []);

  return null;
}
