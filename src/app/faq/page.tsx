import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqContent, faqItems, pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.faq.title,
  description: pageMeta.faq.description,
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <AnimatedReveal>
        <SectionHeading
          label={faqContent.headingLabel}
          title={faqContent.headingTitle}
          description={faqContent.headingDescription}
        />
      </AnimatedReveal>
      <AnimatedReveal delay={0.1}>
        <FAQAccordion items={faqItems} />
      </AnimatedReveal>
    </div>
  );
}
