"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

type RecommendedCarouselProps = {
  products: Product[];
};

export function RecommendedCarousel({ products }: RecommendedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const offset = direction === "left" ? -340 : 340;
    containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-kicker">RELATED</p>
          <h2 className="font-display text-[1.9rem] uppercase tracking-[0.14em] text-white/92">
            More from the line
          </h2>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="surface-subtle inline-flex h-10 w-10 items-center justify-center rounded-full text-white/76 hover:text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="surface-subtle inline-flex h-10 w-10 items-center justify-center rounded-full text-white/76 hover:text-white"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="min-w-[17rem] max-w-[17rem] flex-none md:min-w-[18.5rem] md:max-w-[18.5rem]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
