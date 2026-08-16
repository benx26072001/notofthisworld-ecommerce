import type { Metadata } from "next";

import { EditorialSplit } from "@/components/sections/editorial-split";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { newDropProducts } from "@/data/products";
import { brand, homeContent, pageMeta } from "@/data/site";

// The root layout's title.template does not apply here: per the Next.js
// metadata docs, a template defined in layout.js has no effect on a title
// defined in page.js of the *same* route segment, which is exactly the
// relationship between the root layout and this home page. So the full
// "<title> | <brand>" string is built explicitly instead of relying on the
// template.
export const metadata: Metadata = {
  title: { absolute: `${pageMeta.home.title} | ${brand.name}` },
  description: pageMeta.home.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const homeDropProducts = newDropProducts.filter((product) =>
    [
      "not-of-this-world-tee",
      "sacred-textiles-tee",
      "crown-of-thorns-hoodie",
    ].includes(product.slug),
  );

  return (
    <>
      <HeroSection />
      <section className="container-shell pt-2 pb-12 md:pt-3 md:pb-16">
        <AnimatedReveal className="space-y-6 md:space-y-8">
          <SectionHeading label={homeContent.drop.label} title={homeContent.drop.title} />
          <ProductGrid products={homeDropProducts} priorityCount={2} />
        </AnimatedReveal>
      </section>
      <EditorialSplit />
      <NewsletterSection />
    </>
  );
}
