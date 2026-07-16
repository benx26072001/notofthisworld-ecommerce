export type ProductCategory =
  | "Tees"
  | "Long Sleeves"
  | "Hoodies"
  | "Fleece"
  | "Headwear"
  | "Accessories"
  | "Outerwear";

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export type ProductMediaKind =
  | "front"
  | "back"
  | "detail"
  | "editorial"
  | "collection";

export type ProductImage = {
  src: string;
  alt: string;
  fallbackSrc: string;
  kind: ProductMediaKind;
};

export type ProductMedia = {
  front: ProductImage;
  back: ProductImage;
  details: ProductImage[];
  editorial?: ProductImage;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  code: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collection: string;
  colors: string[];
  sizes: string[];
  stockStatus: StockStatus;
  featured: boolean;
  newDrop: boolean;
  badgeText?: string;
  shortDescription: string;
  longDescription: string;
  fitNotes: string[];
  materialNotes: string[];
  careInstructions: string[];
  shippingNotes: string[];
  images: ProductMedia;
  relatedProducts: string[];
};

export type CartItem = {
  slug: string;
  code: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: ProductImage;
  stockStatus: StockStatus;
};
