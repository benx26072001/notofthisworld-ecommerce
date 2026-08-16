import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageClient } from "@/components/product/product-page-client";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { brand, siteUrl } from "@/data/site";
import type { Product, StockStatus } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.longDescription,
    },
  };
}

const AVAILABILITY: Record<StockStatus, string> = {
  "in-stock": "https://schema.org/InStock",
  "low-stock": "https://schema.org/InStock",
  "sold-out": "https://schema.org/OutOfStock",
};

function buildProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${siteUrl}/shop/${product.slug}/opengraph-image`,
    description: product.shortDescription,
    sku: product.code,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/shop/${product.slug}`,
      price: product.price,
      priceCurrency: brand.currency,
      availability: AVAILABILITY[product.stockStatus],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(product)),
        }}
      />
      <ProductPageClient
        key={product.slug}
        product={product}
        relatedProducts={getRelatedProducts(product.slug)}
      />
    </>
  );
}
