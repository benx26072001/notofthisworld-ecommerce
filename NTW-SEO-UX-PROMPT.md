# Task: 404 upgrade + SEO/UX hardening pass — Not Of This World storefront

You are working in the Next.js 16 App Router storefront at the repo root (`notofthisworld-ecommerce`).
Stack: Next 16.2.3, React 19.2, Tailwind CSS v4 (CSS-first, no `tailwind.config`), framer-motion 12, lucide-react, TypeScript.

**Before writing any code**, obey `AGENTS.md`: this Next version has breaking changes vs. your training data.
Read the relevant guides in `node_modules/next/dist/docs/` for every API you touch — especially:
metadata & `generateMetadata`, `not-found.tsx`, `opengraph-image`, `robots`/`sitemap`, `useSearchParams` +
Suspense requirements, and `@next/third-parties`. If a doc contradicts anything below, follow the doc and
tell me what changed.

---

## Ground rules

1. **Do not restyle the site.** Reuse the existing design language exactly:
   - Layout: `.container-shell`
   - Surfaces: `.editorial-frame`, `.surface-panel`, `.surface-subtle`, `.grain`, `.field-shell`
   - Type: `font-display` (Sora) for headings, `.text-kicker` for eyebrows, `.badge-shell` for pills
   - Buttons: `.button-primary`, `.button-secondary`
   - Colors come from CSS vars in `src/app/globals.css` — never hardcode new hexes
   - Animation: wrap reveals in `<AnimatedReveal>` from `src/components/ui/animated-reveal.tsx`
   - Images: always `<BrandImage>` from `src/components/ui/brand-image.tsx` (it already enforces a required `alt` and does fallback + fade-in)
2. **All copy lives in `src/data/site.ts`.** Do not hardcode user-facing strings in components. Extend the
   existing exported objects (`brand`, `notFoundContent`, `orderConfirmationContent`, `faqItems`, …) or add new ones.
3. TypeScript strict — no `any`, no `@ts-ignore`.
4. Run `npm run lint` and `npm run build` at the end. Both must pass clean. Fix what you break.
5. Work in phases below, in order. After each phase, give me a one-line summary of files touched.

---

## Phase 1 — Rebuild the 404 page

File: `src/app/not-found.tsx` (already exists, currently a plain 2-column frame — replace it).

Requirements:

- **Animated 404 mark.** Oversized `font-display` "404" as the visual anchor. Animate it in with
  framer-motion (fade + slight rise, and a subtle grain/scanline treatment consistent with `body::before`
  and `.grain`). Respect `prefers-reduced-motion` — no motion when the user opts out.
- **CTA above the fold.** The primary CTA (`Shop Collection` → `/shop`) and secondary (`Back Home` → `/`)
  must be visible without scrolling at 375×667 (iPhone SE) and on desktop. Keep the section under
  `min-h-[70vh]` so the header stays visible.
- **Internal links block.** A grid of recovery links so a lost visitor and a crawler both find their way out:
  Shop, Collections, New Drop (`/shop?tag=new-drop`), About, Contact, FAQ, Cart.
  Source these from `navigation` in `src/data/site.ts` plus the extras — do not duplicate the array.
- **Product recovery row.** Three pieces from `newDropProducts` (`src/data/products.ts`) rendered with the
  existing `<ProductGrid>`. Keeps the 404 commercially useful and adds internal links to indexable PDPs.
- **Response-time promise + support.** Small block: support email (`brand.supportEmail`), support window
  (`brand.supportWindow`), and a new explicit promise — add `responsePromise` to `brand` in
  `src/data/site.ts`, e.g. `"Every message gets a reply within 1 business day."`
- **5-item FAQ.** Render `<FAQAccordion>` with the first 5 entries of `faqItems`, under a "Quick answers"
  heading, plus a link to `/faq` for the rest.
- **Sticky mobile CTA** (see Phase 4) must render on this page.

Note on metadata: `not-found.tsx` does **not** support a `metadata` export in the App Router. Confirm this
against `node_modules/next/dist/docs/` before working around it. If confirmed, leave the title inherited
from the root layout and do not fake it with a client-side `document.title`.

---

## Phase 2 — Thank-you page (and a real bug to fix)

Current state: `src/app/order-confirmation/page.tsx` is a **client component** calling `useSearchParams()`
with **no `<Suspense>` boundary**. Verify this against the Next docs — in this version that is a build/prerender
error or forces the whole route dynamic. It also means the route can carry no `metadata` at all.

Do this:

1. Create the canonical post-purchase route at **`src/app/thank-you/`**:
   - `page.tsx` — a **server** component that exports `metadata` (unique title + description, and
     `robots: { index: false, follow: true }` — order pages must never be indexed) and renders the client
     child inside `<Suspense fallback={…}>`.
   - `thank-you-client.tsx` — the `"use client"` piece that reads `order` and `delivery` from `useSearchParams()`.
2. Content upgrade over the current confirmation page (keep the existing `.editorial-frame` treatment):
   - Order ID + status (as today)
   - **What happens next** — a numbered 3-step list (confirmation email → studio packs in 2–4 business days →
     tracking issued on carrier scan). Pull the copy from `site.ts`.
   - **Response-time promise** — reuse `brand.responsePromise` and `brand.supportWindow`.
   - **Internal links** — Continue shopping (`/shop`), Read FAQ (`/faq`), Contact support (`/contact`),
     Collections (`/collections`).
   - **Breadcrumbs** (Phase 3).
3. Update `src/lib/checkout.ts` → `createMockCheckoutSession` `redirectUrl` to `/thank-you?order=…&delivery=…`.
4. Add a permanent redirect `/order-confirmation` → `/thank-you` in `next.config.ts` (`async redirects()`),
   preserving query params. Then delete `src/app/order-confirmation/` **only after** `grep -rn "order-confirmation" src/`
   comes back clean apart from the redirect.
5. Remove `/order-confirmation` from `src/app/sitemap.ts` (see Phase 5).

---

## Phase 3 — Breadcrumbs

New file: `src/components/layout/breadcrumbs.tsx`

- Props: `items: { label: string; href?: string }[]`. Last item is the current page — rendered as
  `aria-current="page"`, not a link.
- Markup: `<nav aria-label="Breadcrumb">` → `<ol>` → `<li>`, chevron separators via `lucide-react`
  (`ChevronRight`), styled with `.text-kicker`-scale type (`text-[0.62rem] uppercase tracking-[0.28em]`)
  and `text-white/50` with `hover:text-white/85` on links.
- Emit **BreadcrumbList JSON-LD** from the same component via
  `<script type="application/ld+json" dangerouslySetInnerHTML={…} />`, building absolute URLs from
  `siteUrl` in `src/data/site.ts`. One source of truth — the visible trail and the structured data must
  never drift.

Place breadcrumbs at the top of the content area (below the fixed header, above the `SectionHeading`) on:
`/shop`, `/shop/[slug]` (Home → Shop → {product.name}), `/collections`, `/about`, `/contact`, `/faq`,
`/cart`, `/checkout`, `/thank-you`, and the 404. **Not** on `/`.

---

## Phase 4 — Sticky mobile CTA

New file: `src/components/ui/sticky-mobile-cta.tsx` (`"use client"`).

- Fixed to the bottom of the viewport, `md:hidden` only, `z-40` (must sit under the cart drawer and mobile
  menu — check their z-indexes in `cart-drawer.tsx` and `mobile-menu.tsx` and stay below them).
- Backdrop blur + top hairline border to match the header treatment in `src/components/layout/header.tsx`.
- Props-driven: `label`, and either `href` or `onClick`, plus optional secondary meta text (e.g. price).
- Slides in only after the page's primary in-flow CTA scrolls out of view — use an `IntersectionObserver`
  on a ref passed in, or a simple scroll threshold. Do not have it fight the in-flow button.
- Add bottom padding to the page content when it's mounted so it never covers the last element or the footer.
- Wire it up on: `/shop/[slug]` (label "Add to Bag", triggers the existing add-to-cart handler in
  `product-page-client.tsx`), `/cart` ("Checkout"), and the 404 ("Shop Collection").

---

## Phase 5 — robots.txt + sitemap

`src/app/robots.ts` currently allows everything. Change to:

- Allow `/`
- **Disallow** `/cart`, `/checkout`, `/thank-you`, `/order-confirmation`, and `/shop?*` filter/sort query
  permutations if the shop page uses query params for filtering (check `shop-page-client.tsx` — if filters
  are client state only, skip this).
- Keep the `sitemap` pointer.

`src/app/sitemap.ts`: remove `/cart`, `/checkout`, `/order-confirmation`. Add `changeFrequency` and
`priority` (home 1.0, `/shop` 0.9, PDPs 0.8, editorial pages 0.6). Replace `lastModified: new Date()`
on every entry — a sitemap that claims everything changed on every build is noise; use a stable build
timestamp constant.

---

## Phase 6 — Unique titles, descriptions, canonicals

Audit every route. Current state: `/shop`, `/collections`, `/about`, `/contact`, `/faq`, `/cart`,
`/checkout` and `/shop/[slug]` already export `metadata`. Gaps to close:

- **`src/app/page.tsx`** (home) has no `metadata` export — it falls back to the layout default
  `NOT OF THIS WORLD | Premium Streetwear`. Give it its own explicit title + description written for the
  homepage query intent, and `alternates: { canonical: "/" }`.
- **`/thank-you`** — new, per Phase 2.
- Add `alternates: { canonical: "<path>" }` to **every** route's metadata. `metadataBase` is already set
  in `src/app/layout.tsx`, so relative canonicals resolve correctly.
- Rewrite every title and description so each is genuinely unique and under 60 / 155 characters. Titles
  inherit the `%s | NOT OF THIS WORLD` template — count the suffix when checking length. Descriptions
  should describe *that page*, not the brand generally. Right now `/shop` and `/collections` both reuse
  `collectionsContent.headingDescription` — that duplicate must go.
- Add `robots: { index: false }` to `/cart`, `/checkout`, `/thank-you`.
- Store all of this in `src/data/site.ts` (e.g. a `pageMeta` map) so titles/descriptions are auditable in
  one place rather than scattered across 10 files.

---

## Phase 7 — Social share images

Current problem: the OG image in `src/app/layout.tsx` is `/images/collections/collection-01-cover.svg`.
**SVG is not supported as an OG image by Facebook, X, LinkedIn, iMessage, or WhatsApp** — every share
currently renders with no image. Product pages have the same bug via `getProductPrimaryImage()`, which
returns `.svg` for most products.

Fix with generated PNGs:

1. `src/app/opengraph-image.tsx` — `ImageResponse` from `next/og`, `size = { width: 1200, height: 630 }`,
   `contentType = "image/png"`. Design it to match the site: near-black background (`#050505`), the
   `NOT OF THIS WORLD` wordmark in large uppercase with wide tracking, `Collection 01` as a kicker, warm
   off-white `#f5f0e8` type. Note that `ImageResponse` supports a limited CSS subset — check the docs.
2. `src/app/twitter-image.tsx` — re-export the same image, or set `twitter.images` to the OG route.
3. `src/app/shop/[slug]/opengraph-image.tsx` — per-product OG image with the product name, category, and
   price rendered over the same background. If you can reliably load the product's raster image
   (several products have `.png` under `public/images/products/front/`), composite it; otherwise fall back
   to the typographic treatment. Do not fetch SVGs into `ImageResponse`.
4. Remove the hardcoded SVG `images` array from the root `metadata` once file-based OG images are in place —
   they are picked up automatically and the explicit entry would override them.
5. Every OG/Twitter image needs a descriptive `alt`.

---

## Phase 8 — Alt text audit

`<BrandImage>` already makes `alt` a required prop, so nothing is missing — but the existing values are
generic and do the user no good with a screen reader. Rewrite them to describe what is actually shown:

- `src/components/sections/hero-section.tsx`: `"Not Of This World Tee hero feature"` →
  something like `"Washed black Not Of This World tee, back graphic, on a plain studio background"`.
  Same for `"Sacred Textiles Tee feature view"`.
- `src/app/about/page.tsx`: `"Brand story editorial artwork"` → describe the actual artwork.
- `src/app/collections/page.tsx`: `"Collection 01 grid artwork"` → same.
- `src/data/products.ts`: alts are produced both inline via `createImage(...)` and in bulk via the
  `createProductMedia(...)` helper near the top of the file. Fix the helper first so the generated alts
  improve everywhere at once, then sweep the inline overrides. Each alt should name the garment, the
  colorway, and the view (front / back / detail) — never the product name alone, and never the same
  string on two different images of the same product.
- Purely decorative images, if any, get `alt=""` — not a description.
- While you're here: confirm the icon-only buttons in `header.tsx` and `mobile-menu.tsx` all have
  `aria-label` (the cart and menu buttons do — check the rest).

---

## Phase 9 — Google Analytics

1. `npm install @next/third-parties` (check the docs for the correct package/version pairing with Next 16.2.3).
2. In `src/app/layout.tsx`, render `<GoogleAnalytics gaId={gaId} />` from `@next/third-parties/google`,
   **conditionally** — only when `process.env.NEXT_PUBLIC_GA_ID` is set, so dev and preview builds don't
   pollute the property.
3. Add `.env.example` with `NEXT_PUBLIC_SITE_URL=` and `NEXT_PUBLIC_GA_ID=` and a one-line comment each.
   Confirm `.env*` is covered by `.gitignore` (it references `.env*` already — verify).
4. Add a tiny typed helper `src/lib/analytics.ts` exporting `trackEvent(name, params)` that calls
   `sendGAEvent` from `@next/third-parties/google` and no-ops when GA is not configured.
5. Fire exactly four events, nothing more: `add_to_cart` (product-page-client + product-card),
   `begin_checkout` (checkout-page-client submit), `purchase` (thank-you page mount, guarded so a refresh
   doesn't double-count), and `page_not_found` (404 mount, with `document.referrer` and the bad path —
   this is how you'll actually find your broken links).

---

## Phase 10 — Structured data (do this last)

- **FAQPage JSON-LD** on `/faq`, generated from `faqItems` in `src/data/site.ts`.
- **Product JSON-LD** on `/shop/[slug]`: name, image (absolute URL), description, sku (use `product.code`),
  brand, and `offers` with `price`, `priceCurrency`, and availability mapped from `product.stockStatus`
  (`in-stock`/`low-stock` → `InStock`, `sold-out` → `OutOfStock`). Note there is **no currency field** on the
  `Product` type — prices are bare numbers rendered with `$`. Add a single `currency: "USD"` constant to
  `brand` in `src/data/site.ts` and read it from there; do not hardcode it inside the JSON-LD.
- **Organization JSON-LD** in the root layout: name, url, logo, `sameAs` from `brand.socialLinks`.
- All JSON-LD must be emitted server-side, use absolute URLs built from `siteUrl`, and must not contradict
  what's visible on the page.

---

## Acceptance criteria

Before you tell me you're done, verify each of these and report pass/fail:

- [ ] `npm run lint` clean, `npm run build` clean — paste the build's route table in your summary
- [ ] Every route in the build output has a unique `<title>` and a unique meta description
- [ ] Every indexable route has a self-referencing canonical
- [ ] `/cart`, `/checkout`, `/thank-you` are `noindex` **and** disallowed in robots
- [ ] `/order-confirmation` 301s to `/thank-you` with query params intact
- [ ] `curl localhost:3000/robots.txt` and `/sitemap.xml` both return the expected content
- [ ] OG images resolve as PNG at `/opengraph-image` and `/shop/<slug>/opengraph-image`
- [ ] 404 renders both CTAs above the fold at 375×667 with no scroll
- [ ] Sticky mobile CTA never overlaps the footer, the cart drawer, or the mobile menu
- [ ] No `alt` in the codebase is empty on a meaningful image or generic ("image", "artwork", "photo")
- [ ] Breadcrumb JSON-LD validates and matches the visible trail on every page that has one
- [ ] GA is absent from the DOM when `NEXT_PUBLIC_GA_ID` is unset
- [ ] `prefers-reduced-motion: reduce` kills the 404 animation

Then give me a single summary: what you changed, what you deliberately did not change and why, and
anything in the Next 16 docs that contradicted this brief.
