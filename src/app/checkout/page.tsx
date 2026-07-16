import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { checkoutContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: checkoutContent.headingDescription,
};

export default function CheckoutPage() {
  return (
    <div className="container-shell space-y-8 pb-20">
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
