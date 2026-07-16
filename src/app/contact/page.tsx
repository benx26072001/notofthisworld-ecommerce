import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand, contactContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contactContent.headingDescription,
};

export default function ContactPage() {
  return (
    <div className="container-shell space-y-10 pb-20">
      <AnimatedReveal>
        <SectionHeading
          label={contactContent.headingLabel}
          title={contactContent.headingTitle}
          description={contactContent.headingDescription}
        />
      </AnimatedReveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <AnimatedReveal className="editorial-frame rounded-[2rem] p-6 md:p-8">
          <ContactForm />
        </AnimatedReveal>
        <AnimatedReveal delay={0.12} className="editorial-frame rounded-[2rem] p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-kicker">{contactContent.supportTitle}</p>
              <p className="mt-3 text-sm leading-7 text-white/58">
                {contactContent.supportCopy}
              </p>
              <a
                href={`mailto:${brand.supportEmail}`}
                className="mt-4 block font-display text-2xl uppercase tracking-[0.12em] text-white/90"
              >
                {brand.supportEmail}
              </a>
            </div>
            <div>
              <p className="text-kicker">SOCIAL</p>
              <div className="mt-3 space-y-2">
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
            <div>
              <p className="text-kicker">HELP</p>
              <Link
                href="/faq"
                className="mt-3 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/84"
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
