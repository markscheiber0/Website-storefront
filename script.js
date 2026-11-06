// ---------- Catalog ----------
// Edit this list to change what's in the store. `cover` picks the artwork style below.
const PRODUCTS = [
  { id: 1, title: "Echoes of the Silent Sentry",  genre: "Atmospheric Horror", price: 49, cover: "aurora" },
  { id: 2, title: "Neon Protocol: Redux Edition", genre: "Cyberpunk RPG",      price: 59, cover: "neon" },
  { id: 3, title: "Throne of Glass & Iron",       genre: "Tactical Strategy",  price: 34, cover: "throne" },
  { id: 4, title: "Whispers of the Great Divide", genre: "Open World",         price: 45, cover: "divide" },
  { id: 5, title: "Architect of the Void",        genre: "Puzzle Adventure",   price: 19, cover: "void" },
  { id: 6, title: "Starbound Odyssey",            genre: "Space Simulation",   price: 64, cover: "stars" },
];

const CURRENCY = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

// ---------- Cover art (inline SVG, no external images) ----------
const COVERS = {
  aurora: `
    <defs><linearGradient id="g-aurora" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff5fa2"/><stop offset=".35" stop-color="#ffd86b"/>
      <stop offset=".65" stop-color="#9ef0b5"/><stop offset="1" stop-color="#5fa8ff"/></linearGradient>
      <filter id="b-aurora"><feGaussianBlur stdDeviation="14"/></filter></defs>
    <rect width="400" height="300" fill="url(#g-aurora)"/>
    <ellipse cx="120" cy="90" rx="120" ry="60" fill="#fff" opacity=".35" filter="url(#b-aurora)"/>
    <path d="M190 300 L190 210 Q200 190 210 210 L210 300 Z" fill="#2b2140" opacity=".55"/>
    <circle cx="200" cy="196" r="7" fill="#fff" opacity=".9"/>`,
  neon: `
    <defs><linearGradient id="g-neon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a0638"/><stop offset="1" stop-color="#3d0a4f"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g-neon)"/>
    <circle cx="200" cy="150" r="70" fill="#ff2fa3" opacity=".85"/>
    <g fill="#120326">
      <rect x="20" y="140" width="50" height="160"/><rect x="80" y="100" width="40" height="200"/>
      <rect x="130" y="170" width="60" height="130"/><rect x="200" y="120" width="45" height="180"/>
      <rect x="255" y="155" width="55" height="145"/><rect x="320" y="90" width="60" height="210"/></g>
    <g fill="#24e6ff" opacity=".8">
      <rect x="88" y="115" width="6" height="6"/><rect x="104" y="140" width="6" height="6"/>
      <rect x="210" y="140" width="6" height="6"/><rect x="330" y="110" width="6" height="6"/>
      <rect x="350" y="150" width="6" height="6"/><rect x="265" y="175" width="6" height="6"/></g>
    <g stroke="#24e6ff" stroke-width="2" opacity=".55">
      <line x1="0" y1="270" x2="400" y2="270"/><line x1="0" y1="285" x2="400" y2="285"/></g>`,
  throne: `
    <defs><linearGradient id="g-throne" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b1464"/><stop offset=".55" stop-color="#7b2ff7"/>
      <stop offset="1" stop-color="#ff1f4b"/></linearGradient>
      <linearGradient id="g-throne2" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#00e5ff" stop-opacity=".9"/><stop offset=".5" stop-color="#00e5ff" stop-opacity="0"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g-throne)"/>
    <rect width="400" height="300" fill="url(#g-throne2)"/>
    <path d="M160 250 L160 120 L180 140 L200 100 L220 140 L240 120 L240 250 Z" fill="#0d0a2e" opacity=".7"/>
    <rect x="145" y="245" width="110" height="12" rx="3" fill="#0d0a2e" opacity=".7"/>`,
  divide: `
    <defs><linearGradient id="g-divide" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfd8e3"/><stop offset="1" stop-color="#8e9aab"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g-divide)"/>
    <circle cx="300" cy="80" r="34" fill="#fff" opacity=".7"/>
    <path d="M0 210 L80 130 L140 180 L210 90 L270 160 L330 120 L400 190 L400 300 L0 300 Z" fill="#5b6b80"/>
    <path d="M0 250 L100 190 L180 235 L260 185 L400 245 L400 300 L0 300 Z" fill="#3a4658"/>
    <path d="M196 300 L204 300 L215 190 L185 190 Z" fill="#cfd8e3" opacity=".6"/>`,
  void: `
    <defs><radialGradient id="g-void" cx=".5" cy=".55" r=".7">
      <stop offset="0" stop-color="#3fbf5f"/><stop offset=".6" stop-color="#1c4a2c"/>
      <stop offset="1" stop-color="#0c1712"/></radialGradient></defs>
    <rect width="400" height="300" fill="url(#g-void)"/>
    <g fill="none" stroke="#c8ffd6" stroke-width="3" opacity=".75">
      <rect x="150" y="100" width="100" height="100" transform="rotate(45 200 150)"/>
      <rect x="170" y="120" width="60" height="60" transform="rotate(20 200 150)"/>
      <rect x="185" y="135" width="30" height="30"/></g>
    <circle cx="200" cy="150" r="5" fill="#fff"/>`,
  stars: `
    <defs><linearGradient id="g-stars" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd23f"/><stop offset=".5" stop-color="#ff8a3d"/>
      <stop offset="1" stop-color="#2a7bff"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g-stars)"/>
    <circle cx="290" cy="200" r="70" fill="#1240a8" opacity=".85"/>
    <ellipse cx="290" cy="200" rx="110" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".7" transform="rotate(-15 290 200)"/>
    <g fill="#fff"><circle cx="60" cy="50" r="2.5"/><circle cx="120" cy="90" r="1.8"/>
      <circle cx="200" cy="40" r="2.2"/><circle cx="80" cy="160" r="1.6"/><circle cx="160" cy="230" r="2"/></g>
    <path d="M90 120 L130 105 L118 118 L150 125 L118 132 L130 145 Z" fill="#fff"/>`,
};

const coverSvg = (key) =>
  `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${COVERS[key] || ""}</svg>`;

// ---------- Rendering ----------
const grid = document.getElementById("grid");
const filterEl = document.getElementById("filter");
const sortEl = document.getElementById("sort");

[...new Set(PRODUCTS.map((p) => p.genre))].forEach((genre) => {
  filterEl.add(new Option(genre, genre));
});

function render() {
  const genre = filterEl.value;
  const sort = sortEl.value;

  let items = PRODUCTS.filter((p) => genre === "all" || p.genre === genre);
  if (sort === "low") items.sort((a, b) => a.price - b.price);
  if (sort === "high") items.sort((a, b) => b.price - a.price);
  if (sort === "az") items.sort((a, b) => a.title.localeCompare(b.title));

  grid.innerHTML = items
    .map(
      (p, i) => `
      <article class="card" style="animation-delay:${i * 60}ms">
        <div class="cover">${coverSvg(p.cover)}</div>
        <span class="genre">${p.genre}</span>
        <h3>${p.title}</h3>
        <div class="card-foot">
          <span class="price">${CURRENCY.format(p.price)}</span>
          <button class="add-btn" type="button" data-id="${p.id}">Add to cart</button>
        </div>
      </article>`
    )
    .join("");
}

filterEl.addEventListener("change", render);
sortEl.addEventListener("change", render);
render();

// ---------- Cart (count only, in-browser) ----------
const cartCountEl = document.getElementById("cartCount");
const toastEl = document.getElementById("toast");
let cart = JSON.parse(localStorage.getItem("archive-cart") || "[]");
let toastTimer;

function updateCartCount() {
  cartCountEl.textContent = cart.length;
  cartCountEl.classList.remove("bump");
  void cartCountEl.offsetWidth; // restart animation
  cartCountEl.classList.add("bump");
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.id));
  cart.push(product.id);
  localStorage.setItem("archive-cart", JSON.stringify(cart));
  updateCartCount();

  toastEl.textContent = `Added “${product.title}” to cart`;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
});

cartCountEl.textContent = cart.length;
document.getElementById("year").textContent = new Date().getFullYear();
