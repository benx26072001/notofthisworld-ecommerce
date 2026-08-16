import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { siteUrl } from "@/data/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-white/50">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <ChevronRight
                  className="size-3 text-white/30"
                  aria-hidden="true"
                />
              ) : null}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-white/85" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-white/85">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
