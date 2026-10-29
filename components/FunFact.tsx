"use client";

import { useState } from "react";

/* Facts from my research paper. */
const facts = [
  "The Niña started its 1492 voyage with lateen sails, but they were changed to square sails at the Canary Islands.",
  "Lateen sails were “almost like wings” — that is how one of my sources described them.",
  "The caravel could point its bow at an angle of just 20 degrees off the wind and still move forward.",
  "Prince Henry the Navigator never went on the voyages himself. He sponsored them from Portugal.",
  "The caravela redonda had square sails on the front masts and kept a lateen sail on the back mast.",
  "Caravels averaged 50 to 60 tons, and the Niña and Pinta were only about 15 to 20 meters long.",
];

export default function FunFact() {
  const [index, setIndex] = useState(0);

  return (
    <div className="fun-fact">
      <div className="fun-fact-text" aria-live="polite">
        <p key={index}>{facts[index]}</p>
      </div>
      <button
        type="button"
        className="fun-fact-button"
        onClick={() => setIndex((index + 1) % facts.length)}
      >
        Show me another
      </button>
    </div>
  );
}
