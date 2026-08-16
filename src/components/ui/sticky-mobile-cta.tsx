"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";

type StickyMobileCtaBase = {
  label: string;
  meta?: string;
  watchRef: RefObject<HTMLElement | null>;
};

type StickyMobileCtaProps =
  | (StickyMobileCtaBase & { href: string; onClick?: undefined })
  | (StickyMobileCtaBase & { href?: undefined; onClick: () => void });

export function StickyMobileCta({
  label,
  meta,
  watchRef,
  href,
  onClick,
}: StickyMobileCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("has-sticky-cta");

    return () => {
      document.body.classList.remove("has-sticky-cta");
    };
  }, []);

  useEffect(() => {
    const target = watchRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [watchRef]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/75 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-2xl md:hidden"
        >
          <div className="flex items-center gap-4">
            {meta ? (
              <span className="shrink-0 text-sm font-semibold text-white/84">
                {meta}
              </span>
            ) : null}
            {href ? (
              <Link
                href={href}
                className="button-primary inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
              >
                {label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onClick}
                className="button-primary inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
              >
                {label}
              </button>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
