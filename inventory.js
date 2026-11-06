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
//  id        unique code people can mention in messages (e.g. "P014")
//  name      what it is
//  category  one of: "pokemon-singles", "pokemon-sealed", "pokemon-graded",
//            "nintendo-games", "nintendo-hardware"
//  details   set / platform / extra notes (optional)
//  condition e.g. "Near Mint", "Lightly Played", "Sealed", "Complete in box"
//  price     number in USD
//  qty       how many you have; 0 = shows as SOLD
//  pending   true if someone has it on hold (optional)
//  image     photo path like "images/P001.jpg" (optional — art is drawn if blank)
//  added     date listed, YYYY-MM-DD (used for "Newest" sort and NEW badge)
//
//  NOTE: the items below are SAMPLES — replace them with your real stock.
// =====================================================================
const INVENTORY = [
  {
    id: "P001",
    name: "Charizard ex — Special Illustration Rare",
    category: "pokemon-singles",
    details: "Obsidian Flames 223/197",
    condition: "Near Mint",
    price: 85,
    qty: 1,
    image: "",
    added: "2026-11-04",
  },
  {
    id: "P002",
    name: "Pikachu ex — Ultra Rare",
    category: "pokemon-singles",
    details: "Surging Sparks 238/191",
    condition: "Near Mint",
    price: 120,
    qty: 1,
    image: "",
    added: "2026-11-01",
  },
  {
    id: "P003",
    name: "Pokémon 151 Booster Bundle",
    category: "pokemon-sealed",
    details: "6 booster packs, factory sealed",
    condition: "Sealed",
    price: 45,
    qty: 3,
    image: "",
    added: "2026-10-28",
  },
  {
    id: "P004",
    name: "Prismatic Evolutions Elite Trainer Box",
    category: "pokemon-sealed",
    details: "Factory sealed",
    condition: "Sealed",
    price: 90,
    qty: 2,
    image: "",
    added: "2026-11-05",
  },
  {
    id: "P005",
    name: "Umbreon VMAX — PSA 9",
    category: "pokemon-graded",
    details: "Evolving Skies 215/203 (Alt Art)",
    condition: "PSA 9 Mint",
    price: 1150,
    qty: 1,
    pending: true,
    image: "",
    added: "2026-10-20",
  },
  {
    id: "P006",
    name: "Bulk Pokémon Commons & Uncommons",
    category: "pokemon-singles",
    details: "Lot of 100, mixed sets",
    condition: "Mixed",
    price: 10,
    qty: 8,
    image: "",
    added: "2026-10-15",
  },
  {
    id: "N001",
    name: "Pokémon Legends: Z-A",
    category: "nintendo-games",
    details: "Nintendo Switch 2",
    condition: "Like new, complete in case",
    price: 55,
    qty: 1,
    image: "",
    added: "2026-11-03",
  },
  {
    id: "N002",
    name: "Mario Kart 8 Deluxe",
    category: "nintendo-games",
    details: "Nintendo Switch",
    condition: "Good, complete in case",
    price: 35,
    qty: 2,
    image: "",
    added: "2026-10-22",
  },
  {
    id: "N003",
    name: "Pokémon Emerald",
    category: "nintendo-games",
    details: "Game Boy Advance — cartridge only, saves",
    condition: "Authentic, tested",
    price: 120,
    qty: 0,
    image: "",
    added: "2026-10-10",
  },
  {
    id: "N004",
    name: "Nintendo Switch OLED — White",
    category: "nintendo-hardware",
    details: "Dock, Joy-Cons, charger included",
    condition: "Excellent",
    price: 240,
    qty: 1,
    image: "",
    added: "2026-10-30",
  },
  {
    id: "N005",
    name: "Pro Controller",
    category: "nintendo-hardware",
    details: "Nintendo Switch",
    condition: "Good, no drift",
    price: 40,
    qty: 1,
    image: "",
    added: "2026-10-18",
  },
];
