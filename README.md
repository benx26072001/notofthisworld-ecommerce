# NOT OF THIS WORLD Storefront

A dark editorial ecommerce storefront for a Christian luxury streetwear label. The project is built as a product-led Next.js storefront with a structured local catalog, reusable UI, polished cart and checkout flows, and a real asset directory layout ready for front, back, detail, editorial, and collection imagery.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Local TypeScript product data
- Context-based cart state

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For production verification:

```bash
npm run build
npm run start
```

## Main project areas

- `src/app`
  Routes, metadata, loading state, sitemap, robots, and page composition.
- `src/components`
  Shared storefront UI, layout, cart, checkout, product, shop, and section components.
- `src/data/products.ts`
  The full product catalog and related product/image relationships.
- `src/data/site.ts`
  Core brand text, page copy, navigation, FAQ, support info, and checkout messaging.
- `src/lib/checkout.ts`
  Current mock checkout session creator and the clean handoff point for Stripe.
- `public/images`
  Collection art, editorial assets, and product image folders.
- `scripts/generate-assets.mjs`
  Regenerates the fallback SVG asset set used while real photography is not yet added.

## Where to edit products

Edit `src/data/products.ts`.

Each product supports:

- `id`
- `slug`
- `name`
- `code`
- `price`
- `compareAtPrice`
- `category`
- `collection`
- `colors`
- `sizes`
- `stockStatus`
- `featured`
- `newDrop`
- `badgeText`
- `shortDescription`
- `longDescription`
- `fitNotes`
- `materialNotes`
- `careInstructions`
- `shippingNotes`
- `images`
- `relatedProducts`

## Where to edit brand copy

Edit `src/data/site.ts`.

This file controls:

- global brand metadata
- homepage copy
- about page copy
- collections page copy
- contact page copy
- FAQ intro and questions
- cart and checkout headings
- order confirmation text
- loading and 404 copy
- navigation labels

## Where to add real images

Drop your real assets into these folders:

- `public/images/products/front`
- `public/images/products/back`
- `public/images/products/details`
- `public/images/editorial`
- `public/images/collections`

Current product data points at the final folder structure already, so you can either:

1. Replace the existing SVG fallback files with real files using the same names.
2. Keep the fallback files and update the `src` values in `src/data/products.ts` to your real `.jpg`, `.png`, `.webp`, or `.avif` assets.

The image model supports:

- front image
- back image
- detail images
- optional editorial feature image

`fallbackSrc` is included on each image object so you can change the primary `src` later while keeping a premium fallback in place.

## Where to change branding

- Brand name, domain, support email, launch notice, and footer messaging:
  `src/data/site.ts`
- Icon asset:
  `src/app/icon.svg`
- Global styling, spacing mood, texture, and surface system:
  `src/app/globals.css`

## Checkout and Stripe

The current checkout flow is intentionally isolated so Stripe can be added cleanly later.

Files involved:

- UI: `src/components/checkout/checkout-page-client.tsx`
- Session logic: `src/lib/checkout.ts`
- Confirmation page: `src/app/order-confirmation/page.tsx`

Add these environment variables when you connect Stripe:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Recommended upgrade path:

1. Replace `createMockCheckoutSession` in `src/lib/checkout.ts` with a real Stripe session creator.
2. Move order creation/persistence into a server action or API route.
3. Store completed orders in your database before redirecting to confirmation.
4. Pass real order data into `src/app/order-confirmation/page.tsx`.

## Deploy

This project is ready for standard Next.js deployment.

Typical flow:

```bash
npm run build
```

Deploy to Vercel or any platform that supports Next.js App Router.

Before going live:

1. Add your real product and editorial images.
2. Replace generic social profile URLs in `src/data/site.ts`.
3. Connect Stripe.
4. Connect the contact/newsletter forms to your preferred backend or provider.

## Regenerate the fallback asset set

If you want to rebuild the included placeholder/fallback art:

```bash
node scripts/generate-assets.mjs
```

## Current placeholders still in the project

The site structure is final, but these assets are still intentionally placeholder fallbacks until you replace them:

- product front/back/detail SVGs in `public/images/products/*`
- editorial SVGs in `public/images/editorial`
- collection SVGs in `public/images/collections`
- generic social profile URLs in `src/data/site.ts`

These placeholders are now organized so swapping them out is straightforward instead of requiring another refactor.
