"use client";

import Link from "next/link";
import { useRef } from "react";

import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { notFoundContent } from "@/data/site";

export function NotFoundCtaRow() {
  const ctaRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ctaRef} className="flex flex-col gap-3 sm:flex-row md:flex-col">
        <Link
          href="/shop"
          className="button-primary inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
        >
          {notFoundContent.primaryCta}
        </Link>
        <Link
          href="/"
          className="button-secondary inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
        >
          {notFoundContent.secondaryCta}
        </Link>
      </div>
      <StickyMobileCta
        label={notFoundContent.primaryCta}
        href="/shop"
        watchRef={ctaRef}
      />
    </>
  );
}
