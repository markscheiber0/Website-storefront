# CLAUDE.md

**Scheiber's Vault**: an unlisted storefront for selling Pokémon and Nintendo items locally in Boise, ID. It is static HTML/CSS/JS with no build step.

- Live: https://storefront.scheiberintelligence.com
- Repo: github.com/markscheiber0/Website-storefront (`main`). Cloudflare Pages auto-deploys on push (no build command, output dir `/`).
- This is NOT the main scheiberintelligence.com site (that is the `mark-scheiber-website` repo). Never mix them.

## Files
- `inventory.js` holds the `STORE` settings (contact links, payments, pickup text, `updated` date) and the `INVENTORY` array. **All routine edits happen here.**
- `script.js` handles rendering, category chips, search, sort, the item dialog (`#ID` deep links such as `/#P001`), the copy-message and copy-link buttons, and the drawn SVG art used when an item has no photo.
- `styles.css` uses the sky-blue/red theme. CSS variables are on `:root`.
- `images/` holds item photos, referenced as `image: "images/P001.jpg"`.
- `og-image.png` is the 1200×630 link-preview card for Facebook and others.
- `list.html` is the hidden Facebook Marketplace listing helper, not linked from the site. It reads `inventory.js` and shows ready-to-copy Title, Price, Category, Condition, Description and Photo for each item. Items are grouped into Ready to post, Already on Facebook and Sold. It includes instructions for Claude in Chrome and a JSON dump.

## Facebook sync workflow
`inventory.js` is the single source of truth, because Marketplace has no API for personal sellers.
- When an item gets posted to Marketplace, set `fbListed: "YYYY-MM-DD"` on it.
- When an item sells, set `qty: 0`. `list.html` then shows it under "Sold — mark as sold on Facebook".

## Inventory rules
- Each item needs a unique `id` (P### = Pokémon, N### = Nintendo), a `category` (`pokemon-singles`, `pokemon-sealed`, `pokemon-graded`, `nintendo-games` or `nintendo-hardware`), `price` (USD number), `qty` and `added` (YYYY-MM-DD).
- `qty: 0` marks the item as Sold. It stays hidden unless "Show sold" is on. `pending: true` marks it On hold.
- When inventory changes, bump `STORE.updated`.
- Keep photos under ~300 KB (resize to about 1200px wide).

## Must keep
- The page stays unlisted. Keep the `noindex` meta tag, the `X-Robots-Tag` in `_headers`, and `robots.txt`, which blocks crawlers but allows link-preview bots (facebookexternalhit etc.).
- Keep the "not affiliated with Nintendo / The Pokémon Company" disclaimer. Don't use official logos.
