"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

import { brand, navigation } from "@/data/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] bg-black/72 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto flex h-full w-[84%] max-w-sm flex-col border-l border-white/8 bg-[#080808]/96 px-5 py-6 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-kicker">MENU</span>
              <button
                type="button"
                onClick={onClose}
                className="surface-subtle rounded-full p-2 text-white/70"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-14 flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="border-b border-white/8 py-4 font-display text-[1.65rem] uppercase tracking-[0.16em] text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto space-y-2 pt-8 text-xs uppercase tracking-[0.24em] text-white/42">
              <p>{brand.launchNotice}</p>
              <p className="max-w-[16rem] leading-6 text-white/36">{brand.footerNote}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
