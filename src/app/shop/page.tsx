import type { Metadata } from "next";

import { ShopPageClient } from "@/components/shop/shop-page-client";
import { products } from "@/data/products";
import { collectionsContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: collectionsContent.headingDescription,
};

type ShopPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { tag } = await searchParams;

  return <ShopPageClient products={products} defaultToNewest={tag === "new-drop"} />;
}
