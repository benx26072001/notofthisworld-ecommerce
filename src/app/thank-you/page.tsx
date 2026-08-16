import type { Metadata } from "next";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ThankYouClient } from "@/app/thank-you/thank-you-client";
import { pageMeta, thankYouContent } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.thankYou.title,
  description: pageMeta.thankYou.description,
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

function ThankYouFallback() {
  return (
    <div className="editorial-frame grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1.05fr_0.95fr] md:p-12">
      <div className="space-y-6">
        <p className="text-kicker">{thankYouContent.headingLabel}</p>
        <div className="h-10 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-white/5" />
      </div>
      <div className="h-64 animate-pulse rounded-[1.7rem] border border-white/10 bg-white/[0.03]" />
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="container-shell space-y-8 pb-20">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Order Confirmed" }]}
      />
      <Suspense fallback={<ThankYouFallback />}>
        <ThankYouClient />
      </Suspense>
    </div>
  );
}
