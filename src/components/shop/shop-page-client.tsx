"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { Search } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BrandImage } from "@/components/ui/brand-image";
import { ProductGrid } from "@/components/product/product-grid";
import { FilterPanel } from "@/components/shop/filter-panel";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

type ShopPageClientProps = {
  products: Product[];
  defaultToNewest?: boolean;
};

export function ShopPageClient({ products, defaultToNewest = false }: ShopPageClientProps) {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);
  const effectiveSort = sort === "featured" && defaultToNewest ? "newest" : sort;

  const filteredProducts = useMemo(() => {
    let nextProducts = [...products];

    if (category !== "All") {
      nextProducts = nextProducts.filter((product) => product.category === category);
    }

    if (size !== "All") {
      nextProducts = nextProducts.filter((product) => product.sizes.includes(size));
    }

    if (deferredSearch.trim()) {
      const query = deferredSearch.toLowerCase();
      nextProducts = nextProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.code.toLowerCase().includes(query),
      );
    }

    switch (effectiveSort) {
      case "newest":
        nextProducts.sort((a, b) => Number(b.newDrop) - Number(a.newDrop));
        break;
      case "price-asc":
        nextProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        nextProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        nextProducts.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            Number(b.newDrop) - Number(a.newDrop),
        );
    }

    return nextProducts;
  }, [category, deferredSearch, effectiveSort, products, size]);

  return (
    <div className="container-shell space-y-7 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <AnimatedReveal className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div className="space-y-4 lg:pb-2">
          <SectionHeading label="SHOP" title="Collection 01" />
        </div>
        <div className="surface-panel relative overflow-hidden rounded-[1.9rem]">
          <div className="relative aspect-[1.6] md:aspect-[1.8]">
            <BrandImage
              src="/images/collections/collection-01-cover.jpg"
              fallbackSrc="/images/editorial/archive-signal.jpg"
              alt="Collection 01 cover artwork featuring the Crown of Thorns Hoodie against a dark storm sky"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedReveal>

      <div className="grid gap-8 lg:grid-cols-[15.5rem_1fr] lg:items-start xl:grid-cols-[16.5rem_1fr]">
        <FilterPanel
          category={category}
          search={search}
          selectedSize={size}
          sort={effectiveSort}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
          onSizeChange={setSize}
          onSortChange={setSort}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen((current) => !current)}
        />
        <div className="space-y-7">
          <div className="flex items-center gap-4">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/50">
              {filteredProducts.length} pieces
            </p>
            <div className="divider-line flex-1" />
          </div>
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} priorityCount={2} />
          ) : (
            <div className="editorial-frame rounded-[1.8rem] p-8 text-center">
              <div className="surface-subtle mx-auto flex size-12 items-center justify-center rounded-full">
                <Search className="size-4 text-white/50" />
              </div>
              <p className="mt-5 font-display text-3xl uppercase tracking-[0.14em] text-white/90">
                No pieces match.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/56">
                Try broadening the search, adjusting the size, or returning to all
                categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSize("All");
                  setSearch("");
                }}
                className="button-secondary mt-6 inline-flex rounded-full px-5 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
