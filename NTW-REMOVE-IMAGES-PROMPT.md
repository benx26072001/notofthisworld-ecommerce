# Task: strip all imagery from the NTW storefront

Remove every image file and every image-rendering path from the site, and redesign the affected
sections so the result looks **intentionally typographic** — not like a site with missing pictures.
Real photography will be added back later; that is a separate future task.

Obey `AGENTS.md` first: read the relevant guides in `node_modules/next/dist/docs/` before touching
metadata, `opengraph-image`, or anything else Next-specific. This Next version differs from your
training data.

---

## Non-negotiable outcome

After this task, a visitor must not be able to tell that images were ever planned. No empty frames,
no reserved-but-blank aspect-ratio boxes, no lonely fallback panels. Every place that used to hold
an image either **carries typographic content that stands on its own** or **is gone and the
surrounding grid is rebalanced**.

`npm run lint` and `npm run build` must both pass clean at the end.

---

## Step 0 — save what you're deleting (do this first)

Before removing anything, write `docs/removed-media-layer.md` containing the **complete current
source** of everything you are about to delete or gut:

- `src/components/ui/brand-image.tsx` (full file)
- the `ProductImage` / `ProductMedia` types and `CartItem.image` from `src/types/product.ts`
- the `createImage` / `createProductMedia` helpers and one full example `images: {...}` block from `src/data/products.ts`
- `getProductPrimaryImage` / `getProductSecondaryImage` / `getProductGallery`
- `src/components/product/product-gallery.tsx` (full file)
- the raster-compositing half of `src/app/shop/[slug]/opengraph-image.tsx`
- a plain-text inventory of every deleted file path under `public/images/`

This is the restore reference. Nothing else in this task is reversible without it.

---

## Step 1 — delete the files

- Delete the entire `public/images/` directory (48 files, ~13MB).
- Leave `src/app/favicon.ico` and `src/app/icon.svg` alone — those are the browser icon, not content.
- Confirm `public/` contains nothing else that is still referenced.

---

## Step 2 — find every image touchpoint

Do not trust the list below as complete — verify with your own search first:

```
grep -rn "BrandImage\|next/image\|/images/\|ProductImage\|ProductMedia\|getProductGallery\|getProductPrimaryImage\|getProductSecondaryImage" src/
```

Known touchpoints, as a starting map:

| File | What it does with images |
|---|---|
| `components/ui/brand-image.tsx` | the wrapper component itself — delete |
| `components/product/product-gallery.tsx` | PDP gallery — delete |
| `components/product/product-card.tsx` | shop-grid card with hover crossfade |
| `components/product/recommended-carousel.tsx` | related products |
| `components/cart/cart-drawer.tsx` | line-item thumbnails |
| `components/cart/cart-page-client.tsx` | line-item thumbnails |
| `components/checkout/checkout-page-client.tsx` | order-review thumbnails |
| `components/sections/hero-section.tsx` | two-panel image hero |
| `components/sections/editorial-split.tsx` | split image/copy block |
| `components/sections/newsletter-section.tsx` | check for a background panel |
| `components/shop/shop-page-client.tsx` | shop hero panel |
| `components/ui/size-guide-modal.tsx` | decorative panel |
| `app/about/page.tsx` | editorial panel |
| `app/collections/page.tsx` | large left panel |
| `app/shop/[slug]/opengraph-image.tsx` | composites a product raster |
| `data/products.ts` | `createImage`, `createProductMedia`, all `images:` blocks |
| `types/product.ts` | `ProductImage`, `ProductMedia`, `CartItem.image` |

---

## Step 3 — redesign each slot

The site's existing language does the work here: `.editorial-frame`, `.surface-panel`,
`.surface-subtle`, `.grain`, `.divider-line`, `.text-kicker`, `.badge-shell`, `font-display` with
wide uppercase tracking, and the near-black gradient background. Reuse them — introduce no new
colors, no new fonts, no borrowed layout ideas from outside this codebase.

**Hero (`hero-section.tsx`)** — collapse to a single full-width `editorial-frame`. The wordmark
becomes the entire visual: oversized `font-display`, uppercase, wide tracking, filling the frame.
Keep the eyebrow, subtitle, both CTAs, and surface `homeContent.hero.meta` as a spec row along the
bottom edge. Keep the `grain` treatment. Target the same vertical presence it has today
(`min-h-[74svh]`) so the page rhythm survives.

**Product card (`product-card.tsx`)** — this is the most important one; it repeats 8+ times.
Replace the image with a **specimen plate**: the product code (`TS-01`) set large in `font-display`
on a `surface-subtle` panel with `grain`, the category as a kicker, and the colorway beneath. Keep
the card's current aspect ratio so the shop grid keeps its rhythm. Preserve the existing hover
state as a border/background shift now that there's no crossfade to drive it.

**PDP (`product-page-client.tsx`)** — delete `<ProductGallery>`. Replace the left column with a
tall specimen plate: code, name, colorway, and `product.materialNotes` as a spec list. Keep the
two-column layout — do not let the buy panel go full-width, it reads as a form otherwise.

**Line items (cart drawer, cart page, checkout review)** — replace each thumbnail with a small
square `surface-subtle` tile carrying the product code. Keep the existing tile dimensions so the
row heights don't shift.

**Editorial / panel sections** (`editorial-split`, `about`, `collections`, `shop` hero,
`size-guide-modal`, `newsletter`) — for each, choose deliberately:
- if the copy can carry the section alone, drop the panel and rebalance the grid to single-column
  with a tighter max-width so the text doesn't run to full bleed;
- if the section needs two-column tension, replace the image panel with a typographic panel —
  a pull quote, a spec list, or a large kicker-and-number block.

Do not apply the same treatment to all six. A page where every section resolves identically reads
as a template.

**Per-product OG image (`app/shop/[slug]/opengraph-image.tsx`)** — remove the `node:fs` raster
compositing entirely. Keep the route and make it purely typographic, matching the root
`opengraph-image.tsx`. The Product JSON-LD points at this route, so it must keep returning a valid
1200×630 PNG.

---

## Step 4 — clean the data and type layer

- `types/product.ts`: remove `ProductImage`, `ProductMedia`, `ProductMediaKind`, and `CartItem.image`.
- `data/products.ts`: remove `createImage`, `createProductMedia`, every `images:` block, and the
  `getProductPrimaryImage` / `getProductSecondaryImage` / `getProductGallery` exports.
- `providers/cart-provider.tsx`: stop populating `image` on cart items.
- Delete `components/ui/brand-image.tsx` and `components/product/product-gallery.tsx`.
- Remove any now-unused imports across the tree — the build will surface these.

---

## Step 5 — check what the removal broke elsewhere

- **Alt text** — the earlier SEO pass rewrote alts across `products.ts` and several components.
  Those are now dead. Remove them rather than leaving orphaned strings.
- **Product JSON-LD** (`app/shop/[slug]/page.tsx`) — its `image` field points at the OG route.
  Confirm it still resolves after Step 3.
- **Root metadata** (`app/layout.tsx`) — confirm no `openGraph.images` entry points at a deleted path.
- **`.gitignore` / `public/`** — if `public/` is now empty, that's fine; don't add a placeholder.

---

## Acceptance criteria

Verify each and report pass/fail with evidence, not assertion:

- [ ] `npm run lint` and `npm run build` both clean — paste the route table
- [ ] `grep -rn "/images/\|BrandImage\|next/image" src/` returns nothing
- [ ] `public/images/` does not exist
- [ ] `curl -I localhost:3000/opengraph-image` and `/shop/not-of-this-world-tee/opengraph-image`
      both return `200` with `content-type: image/png`
- [ ] Every page renders with no empty box, no collapsed grid cell, and no element whose height
      is reserved for content that isn't there — check `/`, `/shop`, a PDP, `/collections`,
      `/about`, `/cart`, `/checkout`, `/faq`, and the 404 at both 375px and 1440px wide
- [ ] The shop grid keeps its current column rhythm and card proportions
- [ ] `docs/removed-media-layer.md` exists and contains enough source to restore the media layer
- [ ] No new colors, fonts, or spacing scales were introduced

Finish with a summary: what you deleted, how you resolved each image slot and why you chose that
treatment for that section, and anything you think will look worse without photography that I
should look at myself.
