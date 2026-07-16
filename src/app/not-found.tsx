import Link from "next/link";

import { notFoundContent } from "@/data/site";

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[70vh] items-center py-16">
      <div className="editorial-frame grain grid w-full gap-8 rounded-[2rem] p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-6">
          <p className="text-kicker">{notFoundContent.label}</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.14em] text-balance text-white/92 md:text-6xl">
            {notFoundContent.title}
          </h1>
          <p className="max-w-xl text-sm leading-7 text-white/62 md:text-base">
            {notFoundContent.description}
          </p>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <Link
            href="/"
            className="button-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em]"
          >
            Back Home
          </Link>
          <Link
            href="/shop"
            className="button-secondary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em]"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
