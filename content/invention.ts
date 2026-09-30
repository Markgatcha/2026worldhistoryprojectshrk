/**
 * All site copy lives here, so the whole pitch can be edited in one place.
 * Currently written for THE CARAVEL — researched from the World History
 * Encyclopedia and HISTORY.com caravel articles (see footer sources).
 */

export const invention = {
  name: "The Caravel",
  tagline: "The ship that learned to sail into the wind.",
  eyebrow: "Shark Tank · Exploration Inventions",
  heroPitch:
    "Sharks, every ship in Europe has the same flaw: the wind decides where it goes. We built the vessel that takes that power back — fast enough to outrun storms, nimble enough to thread unmapped coasts, and able to sail home against the very wind that carried it out. The ocean is about to get a lot smaller.",

  stats: [
    { value: "20°", label: "how close she can point to the wind — unheard of" },
    { value: "3.5:1", label: "sleek length-to-beam ratio, built for speed" },
    { value: "1492", label: "the Niña and Pinta crossed an ocean in caravels" },
  ],

  problem: {
    heading: "The problem: the wind is a one-way street",
    body: "Today's ships are prisoners of the wind. Square sails only pull when the wind is behind you — so every voyage out is easy, and every voyage home is a prayer.",
    cards: [
      {
        title: "You can sail out, but can you sail back?",
        body: "Captains creeping down the African coast face winds that blow one way. Square-rigged barcas that fly south cannot beat back north — expeditions get stranded by the very weather that delivered them.",
      },
      {
        title: "Fat hulls fear the shallows",
        body: "Bulky ships draw deep water. Unmapped coasts, river mouths, and reefs — exactly where discoveries hide — are death traps for them. Exploration stops where the depth sounder panics.",
      },
      {
        title: "Slow ships, starving crews",
        body: "A wallowing ship takes months to cross water it could cross in weeks. Every extra week at sea is more scurvy, more rot, more wages — and investors who swear off funding the next voyage.",
      },
    ],
  },

  howItWorks: {
    heading: "How it works: wings, not walls",
    body: "Instead of hanging square sails like curtains to be pushed, the caravel rigs its sails like wings to generate lift — and reshapes everything below them to match.",
    steps: [
      {
        title: "Lateen sails that bite the wind",
        body: "Triangular sails hung at an angle on long yards work like wings. The caravel can point just 20 degrees off the wind and still drive forward — she tacks where square-riggers stall.",
      },
      {
        title: "A hull built like an arrow",
        body: "A narrow frame with a 3.5-to-1 length-to-beam ratio and a shallow draft slips through water instead of shoving it. Fast in the open ocean, fearless in the shallows.",
      },
      {
        title: "A rudder that actually steers",
        body: "We moved the rudder to the rear centerline on a sternpost, replacing the old side-mounted steering oars. One helmsman, total control — even in a heavy sea.",
      },
      {
        title: "The best of both rigs",
        body: "The caravela redonda flies square sails on the fore and main masts for raw open-ocean speed, with a lateen mizzen for coastal maneuvering. Two sail plans, one ship, zero compromises.",
      },
    ],
  },

  whyItWins: {
    heading: "Why it wins: every coast becomes reachable",
    body: "The sharks don't invest in ships. They invest in what ships unlock. Here is the math that changes the day a caravel leaves Lisbon.",
    benefits: [
      {
        title: "Sail home against the wind",
        body: "The volta do mar — the great circular return route — only works for a ship that can beat windward. The caravel turns one-way expeditions into round trips, which turns exploration into a business.",
      },
      {
        title: "Map the coasts others can't reach",
        body: "Shallow draft means river mouths, bays, and reef-strewn shores are hunting grounds, not hazards. Every mile of new coastline is a potential trading post.",
      },
      {
        title: "Fast crossings, living crews",
        body: "Speed is safety: shorter voyages mean less scurvy, less spoilage, lower wages per mile. A small crew can do what used to take twice the sailors.",
      },
      {
        title: "Outmaneuver any storm",
        body: "A nimble ship with a centerline rudder can claw off a lee shore that would wreck a wallowing barca. Fewer wrecks, fewer lost cargoes, calmer investors.",
      },
      {
        title: "Proven on the hardest routes",
        body: "Bartolomeu Dias rounded the Cape of Good Hope in 1488. Columbus crossed the Atlantic in the Niña and Pinta in 1492. This isn't a prototype — it's a track record.",
      },
      {
        title: "Unlocks the spice trade",
        body: "Pepper, cinnamon, and cloves sell for a fortune in Europe. The caravel is the key to the sea road that reaches them — whoever controls the ships controls the market.",
      },
    ],
    comparison: {
      heading: "Old way vs. our way",
      rows: [
        { old: "Square sails — fast only with the wind behind you", ours: "Lateen sails — tack within 20° of the wind" },
        { old: "Deep, tubby hulls stuck to known deep-water routes", ours: "Shallow draft — explore any coast, river, or reef" },
        { old: "Side steering oars, sluggish in heavy seas", ours: "Sternpost rudder — precise control in any weather" },
      ],
    },
  },

  theAsk: {
    heading: "The ask",
    amount: "50,000 gold cruzados",
    equity: "10% equity",
    body: "We are not selling planks and canvas. We are selling the round trip — the ship that made the African coast, the Atlantic crossing, and the spice route possible. Every future fortune of the Age of Discovery sails in a hull like this one.",
    funding: [
      "Build a fleet of twelve caravels for the African coast expedition",
      "Fund the voyage that proves the sea route to the spice markets",
      "Establish the first trading posts on the newly mapped coast",
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
    sources: "Sources: World History Encyclopedia (“Caravel”), HISTORY.com (“The Ships of Christopher Columbus”).",
  },
};
