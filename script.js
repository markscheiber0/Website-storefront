// Storefront logic. Inventory and contact settings live in inventory.js.

const CATEGORIES = {
  "pokemon-singles":   { label: "Pokémon Singles", short: "Singles", art: "card" },
  "pokemon-sealed":    { label: "Pokémon Sealed",  short: "Sealed",  art: "box" },
  "pokemon-graded":    { label: "Graded Cards",    short: "Graded",  art: "slab" },
  "nintendo-games":    { label: "Nintendo Games",  short: "Games",   art: "game" },
  "nintendo-hardware": { label: "Consoles & Accessories", short: "Hardware", art: "console" },
};

const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const fmtPrice = (n) => USD.format(n).replace(/\.00$/, "");
const NEW_DAYS = 7;

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Item helpers ----------
function statusOf(item) {
  if (!item.qty || item.qty <= 0) return "sold";
  if (item.pending) return "pending";
  return "available";
}

function isNew(item) {
  if (!item.added) return false;
  const days = (Date.now() - new Date(item.added + "T00:00:00")) / 86400000;
  return days >= 0 && days <= NEW_DAYS;
}

function badgeFor(item) {
  const s = statusOf(item);
  if (s === "sold") return `<span class="badge badge-sold">Sold</span>`;
  if (s === "pending") return `<span class="badge badge-pending">On hold</span>`;
  if (item.qty === 1) return `<span class="badge badge-stock">In stock</span>`;
  return `<span class="badge badge-stock">${item.qty} in stock</span>`;
}

// Stable hue per item so drawn artwork varies
function hueOf(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

// ---------- Drawn artwork (used when an item has no photo) ----------
function artSvg(item) {
  const kind = (CATEGORIES[item.category] || {}).art || "card";
  const h = hueOf(item.id + item.name);
  const a = `hsl(${h} 85% 62%)`, b = `hsl(${(h + 60) % 360} 85% 55%)`, c = `hsl(${(h + 200) % 360} 70% 45%)`;
  const gid = "g" + item.id.replace(/\W/g, "");
  const bg = `<defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
      <linearGradient id="${gid}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs><rect width="400" height="300" fill="url(#${gid})"/>
    <g fill="#fff" opacity=".35"><circle cx="40" cy="40" r="3"/><circle cx="360" cy="60" r="2"/><circle cx="330" cy="250" r="3"/><circle cx="70" cy="240" r="2"/></g>`;

  const shapes = {
    card: `<g transform="rotate(-8 200 150)">
        <rect x="140" y="45" width="120" height="168" rx="10" fill="#ffd84a" stroke="#fff" stroke-width="5"/>
        <rect x="152" y="60" width="96" height="70" rx="4" fill="${c}"/>
        <rect x="152" y="60" width="96" height="70" rx="4" fill="url(#${gid}h)"/>
        <path d="M200 75 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2z" fill="#fff" opacity=".9"/>
        <rect x="152" y="140" width="96" height="8" rx="3" fill="#fff" opacity=".8"/>
        <rect x="152" y="154" width="70" height="6" rx="3" fill="#fff" opacity=".6"/>
        <rect x="152" y="166" width="82" height="6" rx="3" fill="#fff" opacity=".6"/></g>`,
    box: `<path d="M120 105 L200 75 L280 105 L280 215 L200 245 L120 215 Z" fill="${c}" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
        <path d="M120 105 L200 135 L280 105" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
        <path d="M200 135 L200 245" stroke="#fff" stroke-width="5"/>
        <path d="M120 105 L200 135 L200 245 L120 215 Z" fill="#fff" opacity=".18"/>
        <path d="M240 150 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd84a"/>`,
    slab: `<rect x="135" y="30" width="130" height="240" rx="12" fill="#eef4fb" stroke="#fff" stroke-width="5"/>
        <rect x="148" y="42" width="104" height="36" rx="5" fill="#e23b3b"/>
        <rect x="156" y="52" width="60" height="6" rx="3" fill="#fff"/><rect x="156" y="63" width="40" height="5" rx="2" fill="#fff" opacity=".8"/>
        <text x="236" y="69" font-family="Arial Black,Arial" font-weight="900" font-size="22" fill="#fff" text-anchor="middle">10</text>
        <rect x="152" y="90" width="96" height="164" rx="7" fill="#ffd84a"/>
        <rect x="160" y="100" width="80" height="62" rx="3" fill="${c}"/>
        <rect x="160" y="100" width="80" height="62" rx="3" fill="url(#${gid}h)"/>`,
    game: `<rect x="135" y="50" width="130" height="200" rx="10" fill="#fff"/>
        <rect x="143" y="58" width="114" height="184" rx="6" fill="${c}"/>
        <rect x="143" y="58" width="114" height="22" rx="6" fill="#e23b3b"/>
        <circle cx="200" cy="155" r="38" fill="#fff" opacity=".9"/>
        <path d="M188 137 L218 155 L188 173 Z" fill="${c}"/>
        <rect x="160" y="210" width="80" height="8" rx="4" fill="#fff" opacity=".8"/>`,
    console: `<rect x="95" y="95" width="210" height="120" rx="20" fill="#2a2f3a" stroke="#fff" stroke-width="5"/>
        <rect x="140" y="110" width="120" height="90" rx="6" fill="${c}"/>
        <rect x="140" y="110" width="120" height="90" rx="6" fill="url(#${gid}h)"/>
        <circle cx="117" cy="135" r="9" fill="#fff" opacity=".85"/>
        <g fill="#fff" opacity=".85"><circle cx="283" cy="125" r="5"/><circle cx="283" cy="145" r="5"/><circle cx="273" cy="135" r="5"/><circle cx="293" cy="135" r="5"/></g>
        <rect x="108" y="170" width="18" height="6" rx="3" fill="#fff" opacity=".6"/><rect x="114" y="164" width="6" height="18" rx="3" fill="#fff" opacity=".6"/>`,
  };
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}${shapes[kind]}</svg>`;
}

function mediaFor(item, large = false) {
  if (item.image) {
    return `<img src="${esc(item.image)}" alt="${esc(item.name)}" loading="${large ? "eager" : "lazy"}">`;
  }
  return artSvg(item);
}

// ---------- Contact ----------
const SELLER = STORE.sellerName || "Mark";

function inquiryText(item) {
  return item
    ? `Hey ${SELLER}, can I come and get the ${item.name}?`
    : `Hey ${SELLER}, I saw your Pokémon shop and wanted to ask about `;
}

// (530) 902-8791 style for display
function prettyPhone(p) {
  const d = p.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p;
}

function contactLinks(item) {
  const msg = inquiryText(item);
  const links = [];
  if (STORE.messenger) links.push({ cls: "c-messenger", label: "Messenger", href: STORE.messenger });
  if (STORE.phone) {
    let digits = STORE.phone.replace(/\D/g, "");
    if (digits.length === 10) digits = "1" + digits;
    // "?&body=" works on both iPhone and Android
    links.push({
      cls: "c-text",
      label: `💬 Text me · ${prettyPhone(STORE.phone)}`,
      href: `sms:+${digits}?&body=${encodeURIComponent(msg)}`,
    });
  }
  if (STORE.email) {
    const subject = item ? `${item.name} — ${STORE.name}` : `${STORE.name} question`;
    links.push({
      cls: "c-email",
      label: "✉️ Email me",
      href: `mailto:${STORE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`,
    });
  }
  if (STORE.facebook) links.push({ cls: "c-facebook", label: "Facebook", href: STORE.facebook });
  return links;
}

const linkBtn = (l) =>
  `<a class="contact-btn ${l.cls}" href="${esc(l.href)}" target="${l.href.startsWith("http") ? "_blank" : "_self"}" rel="noopener">${l.label}</a>`;

// ---------- Filters & rendering ----------
const state = { cat: "all", q: "", sort: "new", showSold: false };

function buildChips() {
  const counts = {};
  INVENTORY.filter((i) => statusOf(i) !== "sold").forEach((i) => (counts[i.category] = (counts[i.category] || 0) + 1));
  const pokemon = Object.keys(counts).filter((k) => k.startsWith("pokemon")).reduce((n, k) => n + counts[k], 0);
  const nintendo = Object.keys(counts).filter((k) => k.startsWith("nintendo")).reduce((n, k) => n + counts[k], 0);

  const chips = [
    ["all", "All", pokemon + nintendo],
    ["pokemon", "Pokémon", pokemon],
    ...Object.entries(CATEGORIES).filter(([k]) => k.startsWith("pokemon")).map(([k, v]) => [k, v.short, counts[k] || 0]),
    ["nintendo", "Nintendo", nintendo],
    ...Object.entries(CATEGORIES).filter(([k]) => k.startsWith("nintendo")).map(([k, v]) => [k, v.short, counts[k] || 0]),
  ];

  $("chips").innerHTML = chips
    .filter(([key, , n]) => key === "all" || n > 0)
    .map(
      ([key, label, n]) =>
        `<button type="button" class="chip${key === "pokemon" || key === "nintendo" || key === "all" ? " chip-main" : ""}" role="tab" data-cat="${key}" aria-selected="${state.cat === key}">${label}<span>${n}</span></button>`
    )
    .join("");
}

function matches(item) {
  if (!state.showSold && statusOf(item) === "sold") return false;
  if (state.cat !== "all") {
    if ((state.cat === "pokemon" || state.cat === "nintendo") && !item.category.startsWith(state.cat)) return false;
    if (state.cat !== "pokemon" && state.cat !== "nintendo" && item.category !== state.cat) return false;
  }
  if (state.q) {
    const hay = `${item.id} ${item.name} ${item.details} ${item.condition} ${(CATEGORIES[item.category] || {}).label}`.toLowerCase();
    if (!state.q.split(/\s+/).every((w) => hay.includes(w))) return false;
  }
  return true;
}

function render() {
  const items = INVENTORY.filter(matches);
  const order = { available: 0, pending: 1, sold: 2 };
  items.sort((a, b) => {
    const s = order[statusOf(a)] - order[statusOf(b)];
    if (s) return s;
    if (state.sort === "low") return a.price - b.price;
    if (state.sort === "high") return b.price - a.price;
    if (state.sort === "az") return a.name.localeCompare(b.name);
    return (b.added || "").localeCompare(a.added || "");
  });

  $("grid").innerHTML = items
    .map((item, i) => {
      const s = statusOf(item);
      const cat = CATEGORIES[item.category] || { label: item.category };
      return `
      <article class="card status-${s}" style="animation-delay:${Math.min(i, 12) * 40}ms">
        <button type="button" class="card-open" data-id="${esc(item.id)}" aria-label="View ${esc(item.name)}">
          <div class="cover">
            ${mediaFor(item)}
            ${isNew(item) && s === "available" ? `<span class="new-flag">NEW</span>` : ""}
            ${badgeFor(item)}
          </div>
          <span class="genre">${esc(cat.label)}</span>
          <h3>${esc(item.name)}</h3>
          ${item.details ? `<p class="details">${esc(item.details)}</p>` : ""}
          <p class="condition">${esc(item.condition || "")}</p>
        </button>
        <div class="card-foot">
          <span class="price">${fmtPrice(item.price)}</span>
          ${s === "sold"
            ? `<span class="sold-note">Sold</span>`
            : `<button class="want-btn" type="button" data-id="${esc(item.id)}">I want this</button>`}
        </div>
      </article>`;
    })
    .join("");

  const n = items.length;
  $("resultCount").textContent = n ? `Showing ${n} item${n === 1 ? "" : "s"}` : "";
  $("empty").hidden = n > 0;
  $("grid").hidden = n === 0;
}

// ---------- Item dialog ----------
const modal = $("modal");

function openItem(id, push = true) {
  const item = INVENTORY.find((i) => i.id === id);
  if (!item) return;
  const s = statusOf(item);
  const cat = CATEGORIES[item.category] || { label: item.category };
  const links = contactLinks(item);
  const statusLine =
    s === "sold" ? "This item has sold." :
    s === "pending" ? "On hold for another buyer — message me to get on the backup list." :
    item.qty === 1 ? "1 available" : `${item.qty} available`;

  $("modalBody").innerHTML = `
    <div class="modal-media">${mediaFor(item, true)}</div>
    <div class="modal-info">
      <span class="genre">${esc(cat.label)}</span>
      <h2 id="modalTitle">${esc(item.name)}</h2>
      ${item.details ? `<p class="details">${esc(item.details)}</p>` : ""}
      ${item.description ? `<p class="description">${esc(item.description)}</p>` : ""}
      ${item.contents && item.contents.length
        ? `<div class="contents"><p class="ask-label">What's inside</p><ul>${item.contents.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>`
        : ""}
      <dl class="facts">
        <div><dt>Price</dt><dd class="price">${fmtPrice(item.price)}</dd></div>
        <div><dt>Condition</dt><dd>${esc(item.condition || "—")}</dd></div>
        <div><dt>Availability</dt><dd>${statusLine}</dd></div>
        <div><dt>Pickup</dt><dd>${esc(STORE.city)}</dd></div>
      </dl>
      ${s === "sold" ? "" : `
        <div class="ask">
          <p class="ask-label">Message me about it:</p>
          <p class="ask-msg">“${esc(inquiryText(item))}”</p>
          <div class="contact-btns">
            ${links.map(linkBtn).join("")}
            <button type="button" class="contact-btn c-copy" data-copy="msg" data-id="${esc(item.id)}">Copy message</button>
          </div>
        </div>`}
      <button type="button" class="share-link" data-copy="link" data-id="${esc(item.id)}">🔗 Copy link to this item</button>
    </div>`;

  if (!modal.open) modal.showModal();
  if (push && location.hash !== "#" + id) history.pushState(null, "", "#" + id);
}

function closeItem() {
  if (modal.open) modal.close();
}

modal.addEventListener("close", () => {
  if (INVENTORY.some((i) => "#" + i.id === location.hash)) {
    history.pushState(null, "", location.pathname + location.search);
  }
});
modal.addEventListener("click", (e) => { if (e.target === modal) closeItem(); });
$("modalClose").addEventListener("click", closeItem);

function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (INVENTORY.some((i) => i.id === id)) openItem(id, false);
  else closeItem();
}
window.addEventListener("popstate", openFromHash);

// ---------- Clipboard + toast ----------
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

async function copy(text, done) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast(done);
}

// ---------- Events ----------
document.addEventListener("click", (e) => {
  const open = e.target.closest(".card-open, .want-btn");
  if (open) return openItem(open.dataset.id);

  const chip = e.target.closest(".chip");
  if (chip) {
    state.cat = chip.dataset.cat;
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-selected", c === chip));
    return render();
  }

  const cp = e.target.closest("[data-copy]");
  if (cp) {
    const item = INVENTORY.find((i) => i.id === cp.dataset.id);
    if (cp.dataset.copy === "link") {
      const url = `${location.origin}${location.pathname}#${item.id}`;
      return copy(url, "Link copied — paste it anywhere to share this item");
    }
    return copy(inquiryText(item), "Message copied — paste it into Messenger or a text");
  }
});

let searchTimer;
$("search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = e.target.value.trim().toLowerCase();
    render();
  }, 120);
});
$("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
$("showSold").addEventListener("change", (e) => { state.showSold = e.target.checked; render(); });

// ---------- Page setup ----------
function setupPage() {
  const inStock = INVENTORY.filter((i) => statusOf(i) === "available");
  $("statStock").textContent = inStock.reduce((n, i) => n + i.qty, 0);
  $("statFrom").textContent = inStock.length ? fmtPrice(Math.min(...inStock.map((i) => i.price))) : "–";
  $("statUpdated").textContent = STORE.updated
    ? new Date(STORE.updated + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "–";

  $("pickupText").textContent = STORE.pickup;
  $("payText").innerHTML = STORE.payments.length ? `<b>Payment:</b> ${STORE.payments.map(esc).join(" · ")}` : "";

  const links = contactLinks(null);
  $("contactBtns").innerHTML = links.map(linkBtn).join("");
  $("contactMissing").hidden = links.length > 0;
  $("contactPlain").textContent = [STORE.phone && prettyPhone(STORE.phone), STORE.email].filter(Boolean).join("  ·  ");
}

setupPage();
buildChips();
render();
openFromHash();
