"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { RecommendedCarousel } from "@/components/product/recommended-carousel";
import { useCart } from "@/components/providers/cart-provider";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { SizeGuideModal } from "@/components/ui/size-guide-modal";
import { SizeSelector } from "@/components/ui/size-selector";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { getProductGallery } from "@/data/products";
import { formatCurrency, getStockLabel } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductPageClientProps = {
  product: Product;
  relatedProducts: Product[];
};

const accordionSections = [
  { key: "details", label: "Product details" },
  { key: "fit", label: "Fit notes" },
  { key: "materials", label: "Material notes" },
  { key: "care", label: "Wash care" },
  { key: "shipping", label: "Shipping & returns" },
] as const;

export function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const soldOut = product.stockStatus === "sold-out";
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<(typeof accordionSections)[number]["key"]>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();
  const gallery = useMemo(() => getProductGallery(product), [product]);
  const addToCartRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({ product, quantity, size: selectedSize });
    }
  };

  const sectionContent = {
    details: [product.longDescription],
    fit: product.fitNotes,
    materials: product.materialNotes,
    care: product.careInstructions,
    shipping: product.shippingNotes,
  };

  return (
    <>
      <div className="container-shell space-y-11 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name },
          ]}
        />
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <ProductGallery images={gallery} title={product.name} />

          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="space-y-5">
              <p className="text-kicker">
                {product.collection} / {product.code}
              </p>
              <div className="space-y-3">
                <h1 className="font-display text-[2.9rem] uppercase tracking-[0.14em] text-white/94 md:text-[4.3rem]">
                  {product.name}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/58 md:text-base">
                  {product.shortDescription}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-white md:text-3xl">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice ? (
                    <span className="text-sm uppercase tracking-[0.24em] text-white/34 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  ) : null}
                </div>
                <span className="badge-shell">
                  {getStockLabel(product.stockStatus)}
                </span>
                {product.badgeText ? (
                  <span className="badge-shell">
                    {product.badgeText}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="surface-panel space-y-7 rounded-[2rem] p-6 md:p-7">
              <div className="flex flex-wrap gap-2">
                <span className="badge-shell">{product.category}</span>
                <span className="badge-shell">{product.colors.join(" / ")}</span>
                <span className="badge-shell">{product.collection}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/54">
                    Size
                  </p>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[0.68rem] uppercase tracking-[0.34em] text-white/50 hover:text-white/84"
                  >
                    Size guide
                  </button>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                  disabled={soldOut}
                />
              </div>

              <div className="space-y-4">
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/54">
                  Quantity
                </p>
                <div
                  ref={addToCartRef}
                  className="grid gap-3 sm:grid-cols-[auto_1fr]"
                >
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
                    onIncrease={() => setQuantity((current) => current + 1)}
                    disableDecrease={quantity <= 1}
                  />
                  <button
                    type="button"
                    disabled={soldOut || !selectedSize}
                    onClick={handleAddToCart}
                    className="button-primary inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
                  >
                    {soldOut ? "Sold Out" : "Add to cart"}
                  </button>
                </div>
                {soldOut ? (
                  <Link
                    href="/contact"
                    className="button-secondary inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
                  >
                    Ask about next release
                  </Link>
                ) : null}
              </div>

              <div className="rounded-[1.4rem] border border-white/8 bg-black/24 p-4 text-sm leading-7 text-white/56">
                {product.longDescription}
              </div>
            </div>

            <div className="space-y-3">
              {accordionSections.map((section) => (
                <div
                  key={section.key}
                  className={`overflow-hidden rounded-[1.5rem] border ${
                    activeSection === section.key
                      ? "border-white/14 bg-white/[0.045]"
                      : "border-white/8 bg-white/[0.025]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    aria-expanded={activeSection === section.key}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02] md:px-6"
                  >
                    <span className="font-display text-[1.02rem] uppercase tracking-[0.12em] text-white/90">
                      {section.label}
                    </span>
                    {activeSection === section.key ? (
                      <Minus className="size-4 text-white/48" />
                    ) : (
                      <Plus className="size-4 text-white/40" />
                    )}
                  </button>
                  {activeSection === section.key ? (
                    <div className="space-y-3 px-5 pb-5 md:px-6">
                      {sectionContent[section.key].map((line) => (
                        <p key={line} className="text-sm leading-7 text-white/60">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <RecommendedCarousel products={relatedProducts} />
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {!soldOut ? (
        <StickyMobileCta
          label="Add to Bag"
          meta={formatCurrency(product.price)}
          watchRef={addToCartRef}
          onClick={handleAddToCart}
        />
      ) : null}
    </>
  );
}
