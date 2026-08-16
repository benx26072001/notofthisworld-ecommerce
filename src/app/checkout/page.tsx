import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { checkoutContent, pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.checkout.title,
  description: pageMeta.checkout.description,
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-shell space-y-8 pb-20">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <AnimatedReveal>
        <SectionHeading
          label={checkoutContent.headingLabel}
          title={checkoutContent.headingTitle}
          description={checkoutContent.headingDescription}
        />
      </AnimatedReveal>
      <CheckoutPageClient />
    </div>
  );
}
