"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { BrandImage } from "@/components/ui/brand-image";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    subtotal,
    updateQuantity,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/68 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-xl flex-col border-l border-white/8 bg-[#080808]/96 px-4 py-5 backdrop-blur-2xl md:px-5 md:py-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              <div>
                <p className="text-kicker">CART</p>
                <p className="mt-2 font-display text-[1.7rem] uppercase tracking-[0.14em] text-white/92">
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="surface-subtle rounded-full p-2 text-white/70 hover:text-white"
                aria-label="Close cart drawer"
              >
                <X className="size-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
                <p className="font-display text-[2rem] uppercase tracking-[0.14em] text-white/88">
                  The cart is still clear.
                </p>
                <p className="max-w-sm text-sm leading-7 text-white/52">
                  Add a piece from Collection 01 to move into checkout.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                >
                  Enter shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto py-5">
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.size}`}
                      className="surface-subtle rounded-[1.4rem] p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative aspect-[0.8] w-24 overflow-hidden rounded-[1.15rem] border border-white/8 bg-white/[0.02]">
                          <BrandImage
                            src={item.image.src}
                            fallbackSrc={item.image.fallbackSrc}
                            alt={item.image.alt}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[0.64rem] uppercase tracking-[0.28em] text-white/44">
                                {item.code}
                              </p>
                              <p className="mt-1 font-display text-[1.05rem] uppercase tracking-[0.08em] text-white/90">
                                {item.name}
                              </p>
                              <p className="mt-2 text-[0.64rem] uppercase tracking-[0.28em] text-white/42">
                                Size {item.size}
                              </p>
                            </div>
                            <p className="pt-0.5 text-sm font-semibold text-white/84">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <QuantitySelector
                              quantity={item.quantity}
                              onDecrease={() =>
                                item.quantity === 1
                                  ? removeItem(item.slug, item.size)
                                  : updateQuantity(
                                      item.slug,
                                      item.size,
                                      item.quantity - 1,
                                    )
                              }
                              onIncrease={() =>
                                updateQuantity(item.slug, item.size, item.quantity + 1)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => removeItem(item.slug, item.size)}
                              className="text-[0.64rem] uppercase tracking-[0.28em] text-white/46 hover:text-white/78"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-5 border-t border-white/8 pt-5">
                  <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.32em] text-white/56">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white/90">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                    >
                      View cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="button-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                    >
                      Checkout
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
