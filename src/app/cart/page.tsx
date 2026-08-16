import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cartContent, pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.cart.title,
  description: pageMeta.cart.description,
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
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
