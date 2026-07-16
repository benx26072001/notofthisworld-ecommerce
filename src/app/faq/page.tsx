import type { Metadata } from "next";

import { FAQAccordion } from "@/components/ui/faq-accordion";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqContent, faqItems } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqContent.headingDescription,
};

export default function FAQPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
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
