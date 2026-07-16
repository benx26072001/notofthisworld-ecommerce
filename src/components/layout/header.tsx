"use client";

import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { useCart } from "@/components/providers/cart-provider";
import { brand, navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-black/28 backdrop-blur-2xl">
        <div className="container-shell flex min-h-[4.75rem] items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="font-display text-[0.76rem] uppercase tracking-[0.5em] text-white/92 hover:text-white"
          >
            {brand.shortName}
          </Link>
          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[0.68rem] uppercase tracking-[0.34em] text-white/58 hover:text-white/92",
                    active && "text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="surface-subtle relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white/74 hover:text-white"
              aria-label="Open cart"
            >
              <ShoppingBag className="size-[0.95rem]" />
              {cartCount > 0 ? (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[0.58rem] font-bold text-black"
                >
                  {cartCount}
                </motion.span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="surface-subtle inline-flex h-10 w-10 items-center justify-center rounded-full text-white/74 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-[1.05rem]" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
