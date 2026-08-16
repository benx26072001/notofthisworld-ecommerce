import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { NotFoundCtaRow } from "@/components/sections/not-found-cta-row";
import { NotFoundMark } from "@/components/sections/not-found-mark";
import { NotFoundTracker } from "@/components/sections/not-found-tracker";
import { ProductGrid } from "@/components/product/product-grid";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { newDropProducts } from "@/data/products";
import { brand, faqItems, navigation, notFoundContent } from "@/data/site";

const recoveryLinks = [...navigation, ...notFoundContent.recoveryLinks];
const recoveryProducts = newDropProducts.slice(0, 3);
const quickFaqItems = faqItems.slice(0, 5);

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <div className="container-shell pt-3 md:pt-5">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Not Found" }]}
        />
      </div>
      <section className="container-shell flex min-h-[70vh] items-center py-4 md:py-10">
        <div className="editorial-frame grain grid w-full items-center gap-6 rounded-[2rem] p-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:p-12">
          <div className="space-y-4 md:space-y-6">
            <NotFoundMark />
            <p className="text-kicker">{notFoundContent.label}</p>
            <h1 className="font-display text-2xl uppercase tracking-[0.12em] text-balance text-white/92 md:text-5xl">
              {notFoundContent.title}
            </h1>
            <p className="max-w-xl text-xs leading-6 text-white/62 md:text-base md:leading-7">
              {notFoundContent.description}
            </p>
          </div>
          <NotFoundCtaRow />
        </div>
      </section>

      <section className="container-shell space-y-16 pb-20">
        <AnimatedReveal className="space-y-5">
          <p className="text-kicker">{notFoundContent.recoveryLabel}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {recoveryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="surface-subtle rounded-[1.25rem] px-4 py-4 text-center text-[0.66rem] uppercase tracking-[0.24em] text-white/68 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="space-y-6">
          <p className="text-kicker">{notFoundContent.productRecoveryLabel}</p>
          <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-white/90 md:text-3xl">
            {notFoundContent.productRecoveryTitle}
          </h2>
          <ProductGrid products={recoveryProducts} />
        </AnimatedReveal>

        <AnimatedReveal className="editorial-frame rounded-[2rem] p-7 md:p-9">
          <p className="text-kicker">{notFoundContent.supportLabel}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
            {brand.responsePromise}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${brand.supportEmail}`}
              className="font-display text-lg uppercase tracking-[0.1em] text-white/90 hover:text-white"
            >
              {brand.supportEmail}
            </a>
            <span className="text-white/30">/</span>
            <span className="text-sm uppercase tracking-[0.22em] text-white/56">
              {brand.supportWindow}
            </span>
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-kicker">{notFoundContent.quickAnswersLabel}</p>
              <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-white/90 md:text-3xl">
                {notFoundContent.quickAnswersTitle}
              </h2>
            </div>
            <Link
              href="/faq"
              className="text-[0.68rem] uppercase tracking-[0.3em] text-white/56 hover:text-white/88"
            >
              {notFoundContent.quickAnswersCta}
            </Link>
          </div>
          <FAQAccordion items={quickFaqItems} />
        </AnimatedReveal>
      </section>
    </>
  );
}
