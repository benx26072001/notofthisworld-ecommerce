import Link from "next/link";

import { BrandImage } from "@/components/ui/brand-image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { homeContent } from "@/data/site";

export function HeroSection() {
  return (
    <section className="container-shell pb-8 pt-2 md:pb-12">
      <div className="editorial-frame grain grid min-h-[74svh] gap-6 overflow-hidden rounded-[2rem] p-5 md:grid-cols-[0.82fr_1.18fr] md:gap-8 md:p-9 xl:min-h-[80vh] xl:p-10">
        <AnimatedReveal className="flex flex-col justify-center gap-8 md:pr-6">
          <div className="space-y-6">
            <p className="text-kicker">{homeContent.hero.eyebrow}</p>
            <div className="space-y-3">
              <h1 className="font-display text-[3.15rem] uppercase tracking-[0.16em] text-white/94 md:text-[4.9rem] xl:text-[5.9rem]">
                {homeContent.hero.title}
              </h1>
              <p className="max-w-xs text-[0.72rem] uppercase tracking-[0.34em] text-white/56 md:max-w-sm md:text-[0.76rem]">
                {homeContent.hero.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
            >
              {homeContent.hero.primaryCta}
            </Link>
            <Link
              href="/about"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/64 hover:text-white/92"
            >
              {homeContent.hero.secondaryCta}
            </Link>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.12} className="grid gap-4 lg:grid-cols-[1fr_12.5rem]">
          <div className="surface-panel relative overflow-hidden rounded-[1.75rem]">
            <div className="relative aspect-[0.9] md:aspect-[0.86]">
              <BrandImage
                src="/images/products/back/not-of-this-world-tee-back.png"
                fallbackSrc="/images/collections/collection-01-cover.svg"
                alt="Not Of This World Tee hero feature"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute left-4 top-4 md:left-6 md:top-6">
              <p className="badge-shell bg-black/45 text-white/84">Collection 01</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent p-5 md:p-6">
              <p className="max-w-md font-display text-[1.75rem] uppercase tracking-[0.12em] text-white/92 md:text-[2.3rem]">
                {homeContent.hero.calloutTitle}
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="surface-subtle relative overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[0.86] md:aspect-[0.72] lg:aspect-[1.32]">
                <BrandImage
                  src="/images/products/back/sacred-textiles-tee-back.png"
                  fallbackSrc="/images/products/front/crown-of-thorns-hoodie-front.svg"
                  alt="Sacred Textiles Tee feature view"
                  fill
                  sizes="(min-width: 1024px) 18vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] text-white/66">
                  TS-02
                </p>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
