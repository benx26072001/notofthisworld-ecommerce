import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageClient } from "@/components/product/product-page-client";
import {
  getProductBySlug,
  getProductPrimaryImage,
  getRelatedProducts,
  products,
} from "@/data/products";

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
    openGraph: {
      title: product.name,
      description: product.longDescription,
      images: [
        {
          url: getProductPrimaryImage(product).src,
          width: 1200,
          height: 1500,
          alt: getProductPrimaryImage(product).alt,
        },
      ],
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
    <ProductPageClient
      key={product.slug}
      product={product}
      relatedProducts={getRelatedProducts(product.slug)}
    />
  );
}
