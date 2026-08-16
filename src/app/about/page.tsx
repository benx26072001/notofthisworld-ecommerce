import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BrandImage } from "@/components/ui/brand-image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent, pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.about.title,
  description: pageMeta.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-shell space-y-8 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <AnimatedReveal>
        <SectionHeading
          label={aboutContent.headingLabel}
          title={aboutContent.headingTitle}
          description={aboutContent.headingDescription}
        />
      </AnimatedReveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <AnimatedReveal className="editorial-frame rounded-[2rem] p-7 md:p-9">
          <div className="space-y-4">
            <p className="text-kicker">MANIFESTO</p>
            {aboutContent.manifesto.map((line) => (
              <p key={line} className="text-sm leading-7 text-white/62 md:text-base">
                {line}
              </p>
            ))}
          </div>
        </AnimatedReveal>
        <AnimatedReveal delay={0.12} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="relative aspect-[1.02] lg:aspect-[0.94]">
            <BrandImage
              src="/images/editorial/brand-story.jpg"
              fallbackSrc="/images/editorial/archive-signal.jpg"
              alt="Brand story artwork pairing the Heavy Washed Jacket with a Madonna portrait in low light"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </AnimatedReveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {aboutContent.pillars.map((item) => (
          <AnimatedReveal
            key={item.title}
            className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-kicker">{item.title}</p>
            <p className="mt-4 text-sm leading-7 text-white/60">{item.copy}</p>
          </AnimatedReveal>
        ))}
      </div>
    </div>
  );
}
