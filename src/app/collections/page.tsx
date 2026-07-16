import type { Metadata } from "next";
import Link from "next/link";

import { BrandImage } from "@/components/ui/brand-image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { collectionsContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Collections",
  description: collectionsContent.headingDescription,
};

export default function CollectionsPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
      <AnimatedReveal>
        <SectionHeading
          label={collectionsContent.headingLabel}
          title={collectionsContent.headingTitle}
          description={collectionsContent.headingDescription}
        />
      </AnimatedReveal>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <AnimatedReveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="relative aspect-[0.82]">
            <BrandImage
              src="/images/collections/collection-01-grid.svg"
              fallbackSrc="/images/editorial/archive-signal.svg"
              alt="Collection 01 grid artwork"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </AnimatedReveal>
        <AnimatedReveal delay={0.12} className="editorial-frame rounded-[2rem] p-8 md:p-10">
          <div className="space-y-5">
            <p className="text-kicker">COLLECTION 01</p>
            <p className="text-sm leading-8 text-white/60 md:text-base">
              {collectionsContent.body}
            </p>
            <div className="grid gap-3">
              {collectionsContent.notes.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm uppercase tracking-[0.24em] text-white/74"
                >
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/shop"
              className="button-primary inline-flex rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
            >
              {collectionsContent.cta}
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </div>
  );
}
