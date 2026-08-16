# Task: wire the real photography into the NTW storefront

All 37 real product photos are now in `public/images/`, as clean progressive JPEGs with correct
names. The code still points at the old `.svg` / `.png` / `.jfif` placeholder paths, so **every
image on the site is currently broken**. Repoint everything and rewrite the alt text.

Obey `AGENTS.md` first: read the relevant guides in `node_modules/next/dist/docs/` before touching
`opengraph-image` or anything else Next-specific. Do not restyle anything — this is a data and
path change, not a design change.

---

## Step 1 — repoint every path to `.jpg`

Find them all first:

```
grep -rn "\.svg\|\.png\|\.jfif" src/ --include=*.tsx --include=*.ts
```

Known locations:

| File | Change |
|---|---|
| `data/products.ts` | `createProductMedia` builds `.svg` paths — switch all four to `.jpg` |
| `data/products.ts` | inline overrides for TS-01 / TS-02 use `.png` — switch to `.jpg` |
| `data/products.ts` | `not-of-this-world-tee-detail-1.png` → `not-of-this-world-tee-detail.jpg` |
| `data/products.ts` | fallback `editorial/archive-signal.svg` → `.jpg` |
| `sections/hero-section.tsx` | two `.png` product paths + `collection-01-cover.svg` fallback |
| `sections/editorial-split.tsx` | `collection-01-editorial.jfif` → `.jpg`; `collection-01-grid.svg` → `.jpg` |
| `shop/shop-page-client.tsx` | `collection-01-cover.svg`, `archive-signal.svg` |
| `app/about/page.tsx` | `brand-story.svg`, `archive-signal.svg` |
| `app/collections/page.tsx` | `collection-01-grid.svg`, `archive-signal.svg` |
| `ui/size-guide-modal.tsx` | `brand-story.svg`, `archive-signal.svg` |
| `app/shop/[slug]/opengraph-image.tsx` | the `node:fs` compositing reads `.png` — switch to `.jpg` |

**Leave `src/app/icon.svg` and `src/app/favicon.ico` alone** — those are the browser icon.

Keep `archive-signal.jpg` as the global fallback. It happens to be a graphic that reads
"IMAGE NOT AVAILABLE", which is exactly right for that role.

---

## Step 2 — replace every alt string

These describe what is actually in each photo. Use them verbatim. Set them where the image is
defined (in `products.ts` via `createImage`, or inline in the component).

### TS-01 · Not Of This World Tee · Washed Black
- **front** — Not Of This World Tee in washed black, front view, printed with a halftone crown-of-thorns portrait of Christ and the words "For I am not of this world"
- **back** — Not Of This World Tee in washed black, back view, with a large distressed "NOT OF THIS WORLD" type graphic
- **detail** — Close-up of the Not Of This World Tee chest print, showing cracked halftone texture on washed black jersey
- **editorial** — Two Not Of This World tees laid flat on pale concrete in warm daylight, styled with books and a glass

### TS-02 · Sacred Textiles Tee · Charcoal Wash
- **front** — Sacred Textiles Tee in charcoal wash, front view, with a large white dove above the words "Not of this world"
- **back** — Sacred Textiles Tee in charcoal wash, back view, plain with no graphic
- **detail** — Close-up of the Sacred Textiles Tee dove graphic and serif lettering on folded charcoal jersey
- **editorial** — Sacred Textiles Tee laid flat on a concrete table with linen and a potted olive branch in window light

### LS-01 · Faith Archive Long Sleeve · Washed Charcoal
- **front** — Faith Archive Long Sleeve in washed charcoal, front view, with a small script Faith Archive logo at the chest
- **back** — Faith Archive Long Sleeve in washed charcoal, back view, with an engraved angel-and-cross illustration
- **detail** — Close-up of the ribbed collar and script Faith Archive chest logo on washed charcoal cotton
- **editorial** — Faith Archive Long Sleeve laid on travertine beside a print of its back graphic, in soft daylight

### HD-01 · Crown of Thorns Hoodie · Night Charcoal
- **front** — Crown of Thorns Hoodie in night charcoal, front view, with a crown of thorns printed across the chest and kangaroo pocket
- **back** — Crown of Thorns Hoodie in night charcoal, back view, with a large crown of thorns graphic
- **detail** — Close-up of the crown of thorns print and cross-R emblem on folded night charcoal fleece
- **editorial** — Crown of Thorns Hoodie folded on a concrete plinth beside a cap, lit by warm window light

### CR-01 · Washed Cross Crewneck · Faded Coal
- **front** — Washed Cross Crewneck in faded coal, front view, with a large hand-painted cross and figure across the chest
- **back** — Washed Cross Crewneck in faded coal, back view, plain with a small cross-R emblem at the neck
- **detail** — Close-up of the painted cross graphic and ribbed cuff on faded coal fleece
- **editorial** — Washed Cross Crewneck folded on a concrete ledge under palm-leaf shadow in warm daylight

### CP-01 · Archive Cap · Washed Black
- **front** — Archive Cap in washed black, front view, with an embroidered cross-R emblem on the crown
- **back** — Archive Cap in washed black, back view, showing the adjustable metal buckle strap
- **detail** — Close-up of the embroidered cross-R emblem and washed twill texture on the cap front
- **editorial** — Two Archive Caps on a concrete surface in warm daylight, one front-facing and one showing the strap

### BG-01 · Utility Tote · Coal
- **front** — Utility Tote in coal canvas, front view, with a blurred "Let There Be Light" print and a printed spec panel
- **back** — Utility Tote in coal canvas, back view, with side pockets and a small printed spec panel
- **detail** — Close-up of the woven label and stitched seam on coal canvas, the Let There Be Light print behind
- **editorial** — Utility Tote standing on a concrete counter in a sunlit room with a potted plant behind

### JK-01 · Heavy Washed Jacket · Deep Wash
- **front** — Heavy Washed Jacket in deep wash denim, front view, with chest flap pockets and a cross-R emblem
- **back** — Heavy Washed Jacket in deep wash denim, back view, with a large Madonna portrait print
- **detail** — Close-up of the Madonna portrait print on deep wash denim, showing faded screen texture
- **editorial** — Heavy Washed Jacket laid across concrete with linen, back graphic facing up in warm daylight

### Site-level
- `collections/collection-01-cover.jpg` — Collection 01 cover artwork featuring the Crown of Thorns Hoodie against a dark storm sky
- `collections/collection-01-grid.jpg` — Collection 01 layout artwork featuring the Heavy Washed Jacket with garment specifications
- `editorial/brand-story.jpg` — Brand story artwork pairing the Heavy Washed Jacket with a Madonna portrait in low light
- `editorial/collection-01-editorial.jpg` — Collection 01 editorial pairing the Heavy Washed Jacket and Crown of Thorns Hoodie
- `editorial/archive-signal.jpg` — Placeholder graphic reading "Image not available"

---

## Step 3 — clean up

Delete these — they are leftovers from the file normalization and the pre-upload backup:

- `public/images/_to_delete/` (3 superseded originals)
- `_original-photos/` at the project root (11 pre-upload backups)

Then confirm nothing references them.

---

## Step 4 — verify

Run the build and check the real thing, not just the types:

- [ ] `npm run lint` and `npm run build` both clean
- [ ] `grep -rn "\.svg\|\.png\|\.jfif" src/ --include=*.tsx --include=*.ts` returns only `icon.svg`
- [ ] Start the server and confirm **every one of the 37 files returns 200**, e.g.
      `for f in $(cd public/images && find . -name '*.jpg'); do curl -s -o /dev/null -w "%{http_code} $f\n" "localhost:3000/images/${f#./}"; done | grep -v ^200`
      should print nothing
- [ ] `BrandImage`'s `onError` fallback never fires on a normal page load — check the browser
      console on `/`, `/shop`, and a product page for 404s on `/images/...`
- [ ] `/shop/not-of-this-world-tee/opengraph-image` returns `200` with `content-type: image/png`
      and actually composites the product photo (open it and look — do not just check the header)
- [ ] The shop grid shows 8 distinct garments, no duplicates, no broken frames
- [ ] Product page gallery cycles front → back → detail → editorial for at least 3 products

Finish with a summary of files touched and anything that still looks wrong to you.
