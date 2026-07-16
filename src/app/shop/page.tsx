import type { Metadata } from "next";

import { ShopPageClient } from "@/components/shop/shop-page-client";
import { products } from "@/data/products";
import { collectionsContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: collectionsContent.headingDescription,
};

export default function ShopPage() {
  return <ShopPageClient products={products} />;
}
