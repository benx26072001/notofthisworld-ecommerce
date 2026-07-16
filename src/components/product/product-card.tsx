"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useCart } from "@/components/providers/cart-provider";
import { BrandImage } from "@/components/ui/brand-image";
import {
  getProductPrimaryImage,
  getProductSecondaryImage,
} from "@/data/products";
import { getStockLabel, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const quickAddSize = product.sizes[0] ?? "One Size";
  const soldOut = product.stockStatus === "sold-out";
  const primaryImage = getProductPrimaryImage(product);
  const secondaryImage = getProductSecondaryImage(product);

  return (
    <div className="group space-y-4">
      <Link href={`/shop/${product.slug}`} className="block space-y-4">
        <div className="surface-subtle relative aspect-[0.82] overflow-hidden rounded-[2rem]">
          {product.badgeText ? (
            <span className="badge-shell absolute left-4 top-4 z-10 bg-black/58 text-white/88">
              {product.badgeText}
            </span>
          ) : null}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.028 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandImage
              src={primaryImage.src}
              fallbackSrc={primaryImage.fallbackSrc}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 100vw"
              priority={priority}
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <BrandImage
              src={secondaryImage.src}
              fallbackSrc={secondaryImage.fallbackSrc}
              alt={secondaryImage.alt}
              fill
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/82 via-black/14 to-transparent" />
        </div>
        <div className="space-y-2">
          <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/40">
            {product.code}
          </p>
          <div className="flex items-end justify-between gap-4">
            <h3 className="max-w-[15rem] font-display text-[1.18rem] uppercase tracking-[0.08em] text-white/90">
              {product.name}
            </h3>
            <div className="shrink-0 text-right">
              {product.compareAtPrice ? (
                <p className="text-[0.64rem] uppercase tracking-[0.24em] text-white/34 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              ) : null}
              <p className="mt-1 text-sm font-semibold text-white/84">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        disabled={soldOut}
        onClick={() => {
          if (!soldOut) {
            addItem({ product, quantity: 1, size: quickAddSize });
          }
        }}
        className="button-secondary inline-flex w-full items-center justify-between rounded-full px-4 py-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.28em]"
      >
        <span>{soldOut ? "Sold Out" : "Quick Add"}</span>
        {!soldOut ? (
          <span className="text-[0.58rem] tracking-[0.3em] text-white/46">
            {quickAddSize}
          </span>
        ) : (
          <span className="text-[0.58rem] tracking-[0.3em] text-white/34">
            {getStockLabel(product.stockStatus)}
          </span>
        )}
      </button>
    </div>
  );
}
