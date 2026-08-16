import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { siteUrl } from "@/data/site";

// Fixed at module load (build/server start) so every entry in a given build
// reports the same timestamp instead of drifting across the map() calls
// below, which would make the sitemap look like everything changes on
// every crawl.
const buildTimestamp = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteConfig: Array<{
    route: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { route: "", priority: 1, changeFrequency: "daily" },
    { route: "/shop", priority: 0.9, changeFrequency: "daily" },
    { route: "/collections", priority: 0.6, changeFrequency: "weekly" },
    { route: "/about", priority: 0.6, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { route: "/faq", priority: 0.6, changeFrequency: "weekly" },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticRouteConfig.map(
    ({ route, priority, changeFrequency }) => ({
      url: `${siteUrl}${route}`,
      lastModified: buildTimestamp,
      changeFrequency,
      priority,
    }),
  );

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: buildTimestamp,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
