"use client";

import Link from "next/link";

import { useCart } from "@/components/providers/cart-provider";
import { BrandImage } from "@/components/ui/brand-image";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { cartContent } from "@/data/site";
import { formatCurrency } from "@/lib/utils";

export function CartPageClient() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="editorial-frame rounded-[2rem] p-8 text-center md:p-12">
        <p className="font-display text-4xl uppercase tracking-[0.14em] text-white/92">
          {cartContent.emptyTitle}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/58">
          {cartContent.emptyCopy}
        </p>
        <Link
          href="/shop"
          className="button-primary mt-8 inline-flex rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
        >
          {cartContent.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.slug}-${item.size}`}
            className="surface-subtle rounded-[1.7rem] p-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="relative aspect-[0.8] w-full overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.03] md:w-44">
                <BrandImage
                  src={item.image.src}
                  fallbackSrc={item.image.fallbackSrc}
                  alt={item.image.alt}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-white/48">
                      {item.code}
                    </p>
                    <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-white/90">
                      {item.name}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/48">
                      Size {item.size}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white/84">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <QuantitySelector
                    quantity={item.quantity}
                    onDecrease={() =>
                      item.quantity === 1
                        ? removeItem(item.slug, item.size)
                        : updateQuantity(item.slug, item.size, item.quantity - 1)
                    }
                    onIncrease={() =>
                      updateQuantity(item.slug, item.size, item.quantity + 1)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug, item.size)}
                    className="text-xs uppercase tracking-[0.26em] text-white/48 hover:text-white/80"
                  >
                    Remove item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="surface-panel h-fit rounded-[2rem] p-6 md:p-8">
        <p className="text-kicker">ORDER SUMMARY</p>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/56">
            <span>Subtotal</span>
            <span className="text-white/88">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/56">
            <span>Shipping</span>
            <span className="text-white/88">Chosen in checkout</span>
          </div>
          <div className="h-px bg-white/8" />
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/70">
            <span>Total</span>
            <span className="text-lg font-semibold text-white">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="button-primary mt-8 inline-flex w-full justify-center rounded-full px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
        >
          Continue to checkout
        </Link>
      </aside>
    </div>
  );
}
