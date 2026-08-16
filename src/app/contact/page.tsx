import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand, contactContent, pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.contact.title,
  description: pageMeta.contact.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-shell space-y-8 pb-20">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <AnimatedReveal>
        <SectionHeading
          label={contactContent.headingLabel}
          title={contactContent.headingTitle}
          description={contactContent.headingDescription}
        />
      </AnimatedReveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <AnimatedReveal className="editorial-frame rounded-[2rem] p-6 md:p-7">
          <ContactForm />
        </AnimatedReveal>
        <AnimatedReveal delay={0.12} className="editorial-frame rounded-[2rem] p-6 md:p-7">
          <div className="space-y-5">
            <div>
              <p className="text-kicker">{contactContent.supportTitle}</p>
              <p className="mt-2 text-sm leading-7 text-white/58">
                {contactContent.supportCopy}
              </p>
              <a
                href={`mailto:${brand.supportEmail}`}
                className="mt-3 block font-display text-xl uppercase tracking-[0.12em] text-white/90"
              >
                {brand.supportEmail}
              </a>
            </div>
            <div className="border-t border-white/8 pt-5">
              <p className="text-kicker">SOCIAL</p>
              <div className="mt-2 space-y-1.5">
                {brand.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm uppercase tracking-[0.24em] text-white/68 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-white/8 pt-5">
              <p className="text-kicker">HELP</p>
              <Link
                href="/faq"
                className="button-secondary mt-3 inline-flex rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em]"
              >
                {contactContent.faqCta}
              </Link>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </div>
  );
}
