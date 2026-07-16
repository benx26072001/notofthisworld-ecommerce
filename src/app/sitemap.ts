import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { brand } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/cart",
    "/checkout",
    "/order-confirmation",
  ].map((route) => ({
    url: `${brand.domain}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${brand.domain}/shop/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...productRoutes];
}
