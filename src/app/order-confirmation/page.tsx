"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { orderConfirmationContent } from "@/data/site";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? "NTW-000001";

  return (
    <section className="container-shell flex min-h-[70vh] items-center pb-20">
      <div className="editorial-frame grid w-full gap-8 rounded-[2rem] p-8 md:grid-cols-[1.05fr_0.95fr] md:p-12">
        <div className="space-y-6">
          <p className="text-kicker">{orderConfirmationContent.headingLabel}</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.14em] text-white/92 md:text-6xl">
            {orderConfirmationContent.headingTitle}
          </h1>
          <p className="max-w-xl text-sm leading-7 text-white/58 md:text-base">
            {orderConfirmationContent.headingDescription}
          </p>
        </div>
        <div className="space-y-4 rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/46">Order ID</p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-white/90">
              {order}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/46">Status</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/84">
              Payment authorized / fulfillment pending
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/shop"
              className="button-primary inline-flex justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
            >
              {orderConfirmationContent.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-flex justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
            >
              {orderConfirmationContent.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
