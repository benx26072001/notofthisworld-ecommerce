"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { brand, thankYouContent } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const DELIVERY_LABEL: Record<string, string> = {
  STD: "Standard delivery",
  EXP: "Express delivery",
};

export function ThankYouClient() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? "NTW-000001";
  const delivery = searchParams.get("delivery");
  const deliveryLabel = delivery ? (DELIVERY_LABEL[delivery] ?? delivery) : null;

  useEffect(() => {
    const dedupeKey = `ntw-ga-purchase-${order}`;

    if (window.sessionStorage.getItem(dedupeKey)) {
      return;
    }

    window.sessionStorage.setItem(dedupeKey, "1");
    trackEvent("purchase", {
      transaction_id: order,
      currency: brand.currency,
    });
  }, [order]);

  return (
    <div className="editorial-frame grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1.05fr_0.95fr] md:p-12">
      <div className="space-y-8">
        <div className="space-y-6">
          <p className="text-kicker">{thankYouContent.headingLabel}</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.14em] text-white/92 md:text-6xl">
            {thankYouContent.headingTitle}
          </h1>
          <p className="max-w-xl text-sm leading-7 text-white/58 md:text-base">
            {thankYouContent.headingDescription}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-kicker">{thankYouContent.nextStepsLabel}</p>
          <ol className="space-y-4">
            {thankYouContent.nextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/14 font-display text-sm text-white/80">
                  {index + 1}
                </span>
                <div>
                  <p className="font-display text-sm uppercase tracking-[0.1em] text-white/88">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/56">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
          <p className="text-sm leading-7 text-white/62">
            {brand.responsePromise}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/44">
            {brand.supportWindow}
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/46">
            Order ID
          </p>
          <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-white/90">
            {order}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/46">
            Status
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/84">
            {thankYouContent.statusLabel}
          </p>
        </div>
        {deliveryLabel ? (
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/46">
              Delivery
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/84">
              {deliveryLabel}
            </p>
          </div>
        ) : null}
        <div className="flex flex-col gap-3 pt-4">
          {thankYouContent.links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? "button-primary inline-flex justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
                  : "button-secondary inline-flex justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
