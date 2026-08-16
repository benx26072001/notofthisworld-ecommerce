# Image checklist — Not Of This World storefront

Every filename below is the **exact** name to use. Drop them in this chat and I'll place them,
rename anything that needs it, and update `createProductMedia()` so the extensions match.

Current state: **3 real photos, 45 placeholder/orphan files.** Every `.svg` in `public/images/`
is a ~7KB generated placeholder — none of them are real artwork.

---

## PRIORITY 0 — the duplicate bug (fix first, it's live)

These three files are **byte-identical** (md5 `55929683`) — one photo doing three jobs:

| Path | Currently showing |
|---|---|
| `products/front/not-of-this-world-tee-front.png` | the real NOTW tee front ✅ |
| `products/details/not-of-this-world-tee-detail-1.png` | ❌ same photo, labelled "fabric detail" |
| `products/front/sacred-textiles-tee-front.png` | ❌ same photo, labelled "Sacred Textiles Tee" |

So the Sacred Textiles product page shows a Not Of This World tee, and the NOTW "detail" tab
shows the same full-garment shot as the main image. Two replacements needed:

1. `sacred-textiles-tee-front.png` — real front of TS-02
2. `not-of-this-world-tee-detail-1.png` — close-up: fabric weave, print edge, or stitching

---

## PRIORITY 1 — products with zero real photos (6 of 8)

Four shots per product: **front**, **back**, **detail** (close-up), **editorial** (styled/on-body).

### LS-01 · Faith Archive Long Sleeve · Washed Charcoal
- `products/front/faith-archive-long-sleeve-front.jpg`
- `products/back/faith-archive-long-sleeve-back.jpg`
- `products/details/faith-archive-long-sleeve-detail.jpg`
- `editorial/faith-archive-long-sleeve-editorial.jpg`

### HD-01 · Crown of Thorns Hoodie · Night Charcoal
- `products/front/crown-of-thorns-hoodie-front.jpg`
- `products/back/crown-of-thorns-hoodie-back.jpg`
- `products/details/crown-of-thorns-hoodie-detail.jpg`
- `editorial/crown-of-thorns-hoodie-editorial.jpg`

### CR-01 · Washed Cross Crewneck · Faded Coal
- `products/front/washed-cross-crewneck-front.jpg`
- `products/back/washed-cross-crewneck-back.jpg`
- `products/details/washed-cross-crewneck-detail.jpg`
- `editorial/washed-cross-crewneck-editorial.jpg`

### CP-01 · Archive Cap · Washed Black
- `products/front/archive-cap-front.jpg`
- `products/back/archive-cap-back.jpg`
- `products/details/archive-cap-detail.jpg`
- `editorial/archive-cap-editorial.jpg`

### BG-01 · Utility Tote · Coal
- `products/front/utility-tote-front.jpg`
- `products/back/utility-tote-back.jpg`
- `products/details/utility-tote-detail.jpg`
- `editorial/utility-tote-editorial.jpg`

### JK-01 · Heavy Washed Jacket · Deep Wash
- `products/front/heavy-washed-jacket-front.jpg`
- `products/back/heavy-washed-jacket-back.jpg`
- `products/details/heavy-washed-jacket-detail.jpg`
- `editorial/heavy-washed-jacket-editorial.jpg`

### Fill the gaps on the two tees you've shot
- `products/details/sacred-textiles-tee-detail.jpg`
- `editorial/sacred-textiles-tee-editorial.jpg`
- `editorial/not-of-this-world-tee-editorial.jpg`

---

## PRIORITY 2 — site-level artwork

| Filename | Where it appears | Shape |
|---|---|---|
| `collections/collection-01-cover.jpg` | Shop page hero panel | portrait ~1:1.2 |
| `collections/collection-01-grid.jpg` | Collections page, large left panel | square-ish 1:1 |
| `editorial/brand-story.jpg` | About page + inside the size-guide modal | square-ish 1:1 |
| `editorial/archive-signal.jpg` | Global fallback when any image fails to load | flexible |

`editorial/collection-01-editorial.jfif` is already a real photo (248KB) — leave it, though
converting to `.jpg` would be tidier since `.jfif` confuses some tools.

---

## Specs

- **Product shots** — 4:5 portrait, 1600×2000px. Plain seamless background, consistent across all
  8 products. Same lighting, same distance, garment flat or on an invisible mannequin.
- **Editorial shots** — 4:5 or 3:2, 2000px on the long edge. On-body, styled, moodier.
- **Format** — JPG at quality 80, or WebP. **Not PNG.** Your current PNGs are 1.2–1.8MB each;
  the same photo as JPG is ~200KB. Next.js re-encodes on delivery, but oversized sources bloat
  the repo and slow every build.
- **Consistency matters more than production value.** Eight products shot the same way reads as
  a real brand; four beautiful shots and four mismatched ones reads as unfinished.

---

## Files to delete (orphans — referenced by nothing)

- `products/front/not-of-this-world-tee-fron.png` — typo duplicate, 1.3MB dead weight
- `products/front/not-of-this-world-bottom-front.png` — no "bottom" product exists in `products.ts`
- `products/back/not-of-this-world-bottom-back.png` — same
- `products/back/archive crewneck.jfif` — spaces in filename, unreferenced
- `products/back/archive crewneck.jpg` — same
- `editorial/newsletter-altar.svg` — unreferenced
- All 30 remaining `.svg` placeholders, once their real replacements land

That's ~5MB of dead files currently in the repo.

---

## Minimum viable set

If 33 shots is too many to start: the **8 front shots** carry the shop grid, the homepage, and
every OG share image. Get those consistent first and the site reads as finished. Back, detail,
and editorial can follow — the fallback chain in `BrandImage` already degrades to the front
image, so nothing breaks while they're missing.
