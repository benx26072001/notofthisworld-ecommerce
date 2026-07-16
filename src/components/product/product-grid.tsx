import type { Product } from "@/types/product";

import { ProductCard } from "@/components/product/product-card";

type ProductGridProps = {
  products: Product[];
  priorityCount?: number;
};

export function ProductGrid({
  products,
  priorityCount = 0,
}: ProductGridProps) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-7 xl:gap-y-12">
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
