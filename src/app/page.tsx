import { EditorialSplit } from "@/components/sections/editorial-split";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { newDropProducts } from "@/data/products";
import { homeContent } from "@/data/site";

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
      <section className="container-shell pt-5 pb-14 md:pt-7 md:pb-20">
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
