// =====================================================================
//  STORE SETTINGS — your contact info and how people buy from you.
//  Leave a field as "" to hide that contact button.
// =====================================================================
const STORE = {
  name: "Scheiber's Vault",
  city: "Boise, ID",
  updated: "2026-11-06",              // bump this when you change inventory (YYYY-MM-DD)

  // Contact options (fill in the ones you want shown)
  messenger: "",                      // e.g. "https://m.me/your.username"
  facebook: "",                       // e.g. your Facebook Marketplace profile URL
  phone: "",                          // for texts, e.g. "2085551234"
  email: "",                          // e.g. "you@example.com"

  payments: ["Cash", "Venmo", "Zelle"],
  pickup: "Local pickup around Boise & Meridian — we'll meet at a public spot.",
};

// =====================================================================
//  INVENTORY — one entry per listing. Copy a block to add a new item.
//
//  id          unique code people can mention in messages (e.g. "P014")
//  name        what it is
//  category    one of: "pokemon-singles", "pokemon-sealed", "pokemon-graded",
//              "nintendo-games", "nintendo-hardware"
//  details     set / platform / short note shown on the card (optional)
//  condition   e.g. "Factory sealed", "Near Mint", "Complete in box"
//  price       number in USD
//  qty         how many you have; 0 = shows as SOLD
//  pending     true if someone has it on hold (optional)
//  image       photo path like "images/P001.jpg" (optional — art is drawn if blank)
//  description longer text shown when the item is opened (optional)
//  contents    list of what's inside, shown when opened (optional)
//  added       date listed, YYYY-MM-DD (used for "Newest" sort and NEW badge)
//
//  Photos & descriptions: TCGplayer product listings. Prices: TCGplayer
//  market price on 2026-11-06, rounded — adjust to what you want to charge.
// =====================================================================
const INVENTORY = [
  {
    id: "P001",
    name: "Delta Reign Elite Trainer Box",
    category: "pokemon-sealed",
    details: "Mega Evolution — Delta Reign (ME06)",
    condition: "Factory sealed",
    price: 83,
    qty: 1,
    image: "images/P001.jpg",
    description: "A Legendary Storm Is Stirring! Mega Rayquaza ex brings unparalleled strength to battle, inspiring Mega Golurk ex, Mega Malamar ex, and Mega Golisopod ex to come forth and put their own skills to the test.",
    contents: [
      "9 Delta Reign booster packs",
      "65 card sleeves",
      "45 Pokémon TCG Energy cards",
      "Player's guide to the expansion",
      "6 damage-counter dice",
      "1 competition-legal coin-flip die",
      "2 plastic condition markers",
      "Collector's box with 4 dividers",
      "Pokémon TCG Live code card",
    ],
    added: "2026-11-06",
  },
  {
    id: "P002",
    name: "Pitch Black Elite Trainer Box",
    category: "pokemon-sealed",
    details: "Mega Evolution — Pitch Black (ME05)",
    condition: "Factory sealed",
    price: 70,
    qty: 1,
    image: "images/P002.jpg",
    description: "Delve into Darkness Beyond Limits! Mega Darkrai ex arrives with mystery and malice, but Mega Zeraora ex fights back with thunderous strikes of lightning, leading the way for Mega Chandelure ex, Mega Excadrill ex, and more.",
    contents: [
      "9 Pitch Black booster packs",
      "65 card sleeves",
      "45 Pokémon TCG Energy cards",
      "Player's guide to the expansion",
      "6 damage-counter dice",
      "1 competition-legal coin-flip die",
      "2 plastic condition markers",
      "Collector's box with 4 dividers",
      "Pokémon TCG Live code card",
    ],
    added: "2026-11-06",
  },
  {
    id: "P003",
    name: "Chaos Rising Elite Trainer Box",
    category: "pokemon-sealed",
    details: "Mega Evolution — Chaos Rising (ME04)",
    condition: "Factory sealed",
    price: 69,
    qty: 1,
    image: "images/P003.jpg",
    description: "Mega Floette ex brings turmoil to the streets! Mega Greninja ex gathers other powerful Mega Evolution Pokémon ex, including Mega Pyroar ex and Mega Dragalge ex, to ward off this growing threat.",
    contents: [
      "9 Chaos Rising booster packs",
      "1 full-art foil promo card featuring Fennekin",
      "65 card sleeves",
      "40 Pokémon TCG Energy cards",
      "Player's guide to the expansion",
      "6 damage-counter dice",
      "1 competition-legal coin-flip die",
      "1 plastic coin",
      "Collector's box with 6 dividers",
      "Pokémon TCG Live code card",
    ],
    added: "2026-11-06",
  },
  {
    id: "P004",
    name: "Destined Rivals Booster Bundle",
    category: "pokemon-sealed",
    details: "Scarlet & Violet — Destined Rivals (SV10)",
    condition: "Factory sealed",
    price: 63,
    qty: 1,
    image: "images/P004.jpg",
    description: "Whose side are you on? Join forces with Cynthia and Garchomp ex, Ethan and Ho-Oh ex, or Arven and Mabosstiff ex… or fight alongside Team Rocket's Pokémon like Mewtwo ex under the command of Giovanni!",
    contents: ["6 Destined Rivals booster packs"],
    added: "2026-11-06",
  },
  {
    id: "P005",
    name: "30th Celebration Booster Bundle",
    category: "pokemon-sealed",
    details: "Pokémon 30th Anniversary",
    condition: "Factory sealed",
    price: 63,
    qty: 1,
    image: "images/P005.jpg",
    description: "Commemorate 30 years of Pokémon with Mewtwo ex, Mew ex, Umbreon ex, Salamence ex, Greninja ex and more. Every booster pack contains a Pikachu — with 30 unique Pikachu rare variations to collect!",
    contents: ["6 30th Celebration booster packs"],
    added: "2026-11-06",
  },
  {
    id: "P006",
    name: "30th Celebration Knock Out Collection",
    category: "pokemon-sealed",
    details: "Pokémon 30th Anniversary",
    condition: "Factory sealed",
    price: 21,
    qty: 1,
    image: "images/P006.jpg",
    description: "Thirty years of Pokémon, one awesome set! Features the Evolution Pokémon Eevee as a foil promo card, plus two 30th Celebration booster packs.",
    contents: [
      "2 30th Celebration booster packs",
      "1 foil promo card featuring Eevee",
      "1 plastic coin",
    ],
    added: "2026-11-06",
  },
  {
    id: "P007",
    name: "30th Celebration Sylveon ex Box",
    category: "pokemon-sealed",
    details: "Pokémon 30th Anniversary",
    condition: "Factory sealed",
    price: 45,
    qty: 1,
    image: "images/P007.jpg",
    description: "Sylveon ex brings color to your day! Includes Sylveon ex as both a ready-to-play foil promo and a dazzling oversize card, plus four 30th Celebration booster packs.",
    contents: [
      "4 30th Celebration booster packs",
      "1 foil promo card featuring Sylveon ex",
      "1 foil oversize card featuring Sylveon ex",
    ],
    added: "2026-11-06",
  },
];
