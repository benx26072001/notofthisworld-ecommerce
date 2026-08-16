import type { Metadata } from "next";

import { ShopPageClient } from "@/components/shop/shop-page-client";
import { products } from "@/data/products";
import { pageMeta } from "@/data/site";

export const metadata: Metadata = {
  title: pageMeta.shop.title,
  description: pageMeta.shop.description,
  alternates: { canonical: "/shop" },
};

type ShopPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { tag } = await searchParams;

  return <ShopPageClient products={products} defaultToNewest={tag === "new-drop"} />;
}
