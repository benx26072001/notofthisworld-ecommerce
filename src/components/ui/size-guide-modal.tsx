"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { BrandImage } from "@/components/ui/brand-image";

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24 }}
            className="surface-panel relative w-full max-w-2xl rounded-[2rem] p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="surface-subtle absolute right-5 top-5 rounded-full p-2 text-white/70 hover:text-white"
              aria-label="Close size guide"
            >
              <X className="size-4" />
            </button>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
                <div className="surface-subtle relative overflow-hidden rounded-[1.5rem]">
                  <div className="relative aspect-[0.88]">
                    <BrandImage
                      src="/images/editorial/brand-story.svg"
                      fallbackSrc="/images/editorial/archive-signal.svg"
                      alt="Size guide editorial artwork"
                      fill
                      sizes="(min-width: 768px) 24vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-kicker">SIZE GUIDE</p>
                  <h3
                    id="size-guide-title"
                    className="font-display text-3xl uppercase tracking-[0.14em] text-white/92"
                  >
                    Fit Reference
                  </h3>
                  <p className="max-w-xl text-sm leading-7 text-white/58">
                    The line leans relaxed. Tees stay boxy, fleece adds weight,
                    and outerwear is cut to layer without feeling oversized by
                    accident.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["S", "Chest 22 in", "Length 27 in"],
                  ["M", "Chest 23.5 in", "Length 28 in"],
                  ["L", "Chest 25 in", "Length 29 in"],
                  ["XL", "Chest 26.5 in", "Length 30 in"],
                  ["XXL", "Chest 28 in", "Length 31 in"],
                  ["ONE SIZE", "Accessories", "Adjustable fit"],
                ].map(([size, chest, length]) => (
                  <div
                    key={size}
                    className="surface-subtle rounded-[1.25rem] p-4"
                  >
                    <p className="font-display text-xl uppercase tracking-[0.16em] text-white/92">
                      {size}
                    </p>
                    <p className="mt-3 text-sm text-white/68">{chest}</p>
                    <p className="mt-1 text-sm text-white/48">{length}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
