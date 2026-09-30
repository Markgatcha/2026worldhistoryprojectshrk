/**
 * PLACEHOLDER CONTENT
 * -------------------
 * This file holds every word on the site so the whole pitch can be swapped
 * in one place. It is currently written for THE MARINER'S COMPASS as a
 * stand-in. Tell Jarvis which invention your group actually picked
 * (compass, sextant, astrolabe, caravel, lateen sail, Chinese rudder,
 * cross-staff/quadrant, or Mercator projection) and he will rewrite this
 * file with real, researched pitch copy for it.
 */

export const invention = {
  name: "The Mariner's Compass",
  tagline: "Never lose your way again.",
  eyebrow: "Shark Tank · Exploration Inventions",
  heroPitch:
    "Sharks, for a thousand years sailors have crossed oceans by guessing. We built the one instrument that turns the entire planet into a signpost — and we are asking you to help us put one on every ship on Earth.",

  stats: [
    { value: "360°", label: "of certainty, in every direction" },
    { value: "24/7", label: "works day and night, rain or shine" },
    { value: "0", label: "stars required to find your way" },
  ],

  problem: {
    heading: "The problem: the ocean is a blank map",
    body: "Before our invention, a captain who lost sight of land had exactly two options: the sun and the stars. Clouds, storms, or fog turned every voyage into a gamble — and the house usually won.",
    cards: [
      {
        title: "Dead reckoning is dead wrong",
        body: "Guessing your position from speed and time drifts fast. A tiny error each day becomes hundreds of miles of error across an ocean.",
      },
      {
        title: "The sky keeps secrets",
        body: "Celestial navigation needs a clear night and a trained navigator. One stormy week and the whole crew is sailing blind.",
      },
      {
        title: "Lost ships, lost fortunes",
        body: "Every wrecked vessel is a lost cargo, a lost crew, and investors who never fund a second voyage. Exploration stalls.",
      },
    ],
  },

  howItWorks: {
    heading: "How it works: the Earth does the pointing",
    body: "The planet itself is a giant magnet. Our compass simply listens to it.",
    steps: [
      {
        title: "A needle that knows north",
        body: "A sliver of iron, magnetized by lodestone, is balanced on a near-frictionless pivot so it can swing freely.",
      },
      {
        title: "The card that speaks sailor",
        body: "The needle sits under a compass card marked with the 32 winds — north, north-by-east, and every heading a helmsman needs.",
      },
      {
        title: "A housing built for storms",
        body: "The whole assembly floats in a gimballed bowl that stays level while the ship rolls, so the reading never lies.",
      },
      {
        title: "Steer by the number",
        body: "Pick a heading, keep the needle on it. Any sailor — not just the navigator — can hold a course through the night.",
      },
    ],
  },

  whyItWins: {
    heading: "Why it wins: every voyage, de-risked",
    body: "The sharks don't invest in instruments. They invest in outcomes. Here is what changes the day a compass comes aboard.",
    benefits: [
      {
        title: "Sail in any weather",
        body: "Clouds, fog, and moonless nights stop mattering. The magnetic field never hides.",
      },
      {
        title: "Faster crossings",
        body: "Hold a straight course instead of zig-zagging by guesswork. Shorter voyages mean lower costs and fresher crews.",
      },
      {
        title: "Safer crews, happier investors",
        body: "Fewer wrecks, fewer lost cargoes. Backing a voyage goes from a gamble to a calculation.",
      },
      {
        title: "New routes, new markets",
        body: "Captains can finally attempt open-ocean crossings instead of hugging coastlines. That is where the spices are.",
      },
      {
        title: "Democratizes navigation",
        body: "You no longer need a master navigator on every ship. Any trained sailor can steer true.",
      },
      {
        title: "Compounds with every voyage",
        body: "Reliable headings make maps reliable, which makes the next voyage even safer. It is a flywheel.",
      },
    ],
    comparison: {
      heading: "Old way vs. our way",
      rows: [
        { old: "Navigate by stars — when visible", ours: "Navigate by the Earth's field — always on" },
        { old: "One expert navigator per ship", ours: "Any sailor can hold a heading" },
        { old: "Coast-hugging routes", ours: "Direct open-ocean crossings" },
      ],
    },
  },

  theAsk: {
    heading: "The ask",
    amount: "10,000 gold doubloons",
    equity: "10% equity",
    body: "We are not selling a needle in a bowl. We are selling the end of getting lost — the key that unlocks every trade route on the map.",
    useOfFunds: [
      "Equip 50 ships with compasses for the maiden trading fleet",
      "Train navigators and publish the first printed sailing directions",
      "Fund the expedition that proves the direct ocean route",
    ],
  },

  crew: {
    heading: "Meet the crew",
    body: "Replace these cards with your real group members and their roles.",
    members: [
      { name: "Crew Member 1", role: "Lead presenter" },
      { name: "Crew Member 2", role: "Research & script" },
      { name: "Crew Member 3", role: "Design & visuals" },
      { name: "Crew Member 4", role: "Demo & Q&A" },
    ],
  },

  footer: {
    note: "Built as a class project for the Exploration Inventions Shark Tank assignment.",
  },
};
