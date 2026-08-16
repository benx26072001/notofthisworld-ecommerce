import Link from "next/link";

import { BrandImage } from "@/components/ui/brand-image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeContent } from "@/data/site";

export function EditorialSplit() {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <AnimatedReveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="relative aspect-[0.86]">
            <BrandImage
              src="/images/editorial/collection-01-editorial.jpg"
              fallbackSrc="/images/collections/collection-01-grid.jpg"
              alt="Collection 01 editorial pairing the Heavy Washed Jacket and Crown of Thorns Hoodie"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </AnimatedReveal>
        <AnimatedReveal delay={0.12} className="editorial-frame rounded-[2rem] p-8 md:p-10">
          <SectionHeading label={homeContent.collectionStory.label} title={homeContent.collectionStory.title} />
          <div className="mt-8 grid gap-3">
            {homeContent.collectionStory.notes.map((line) => (
              <div
                key={line}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-[0.68rem] uppercase tracking-[0.28em] text-white/74"
              >
                {line}
              </div>
            ))}
          </div>
          <Link
            href="/collections"
            className="mt-8 inline-flex rounded-full border border-white/12 bg-white/[0.05] px-5 py-4 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-white/84"
          >
            {homeContent.collectionStory.cta}
          </Link>
        </AnimatedReveal>
      </div>
    </section>
  );
}
