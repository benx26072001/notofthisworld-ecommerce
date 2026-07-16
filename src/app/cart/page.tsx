import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cartContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Cart",
  description: cartContent.headingDescription,
};

export default function CartPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
      <AnimatedReveal>
        <SectionHeading
          label={cartContent.headingLabel}
          title={cartContent.headingTitle}
          description={cartContent.headingDescription}
        />
      </AnimatedReveal>
      <CartPageClient />
    </div>
  );
}
