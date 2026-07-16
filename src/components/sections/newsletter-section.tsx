"use client";

import { useState, useTransition } from "react";

import { homeContent } from "@/data/site";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (submitted) {
    return (
      <section className="container-shell pt-0 pb-12 md:pt-2 md:pb-16">
        <div className="surface-subtle rounded-[1.75rem] px-6 py-7 md:px-8 md:py-8">
          <p className="text-kicker">{homeContent.newsletter.label}</p>
          <h2 className="mt-4 font-display text-[1.9rem] uppercase tracking-[0.14em] text-white/92 md:text-[2.4rem]">
            {homeContent.newsletter.successTitle}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell pt-2 pb-16 md:pt-4 md:pb-20">
      <div className="surface-subtle rounded-[1.75rem] px-6 py-7 md:px-8 md:py-8">
        <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-8">
          <div className="space-y-3">
            <p className="text-kicker">{homeContent.newsletter.label}</p>
            <h2 className="font-display text-4xl uppercase tracking-[0.14em] text-white/92 md:text-5xl">
              {homeContent.newsletter.title}
            </h2>
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              startTransition(() => setSubmitted(true));
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                className="field-shell h-12 flex-1 rounded-full px-5 text-sm text-white outline-none placeholder:text-white/34"
                required
              />
              <button
                type="submit"
                className="button-primary rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
              >
                {isPending ? "Sending" : "Join"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
