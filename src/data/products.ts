import type { Product, ProductImage } from "@/types/product";

const collections = {
  collection01: "Collection 01",
} as const;

const standardShipping = [
  "Ships in 2 to 4 business days from the studio.",
  "Unworn pieces can be returned within 14 days of delivery.",
  "Launch-week volume may extend dispatch slightly.",
];

const outerwearShipping = [
  "Outerwear ships in 3 to 5 business days due to packed weight.",
  "Unworn units may be returned within 14 days of delivery.",
  "International duties remain the responsibility of the customer.",
];

function createImage(
  src: string,
  alt: string,
  kind: ProductImage["kind"],
  fallbackSrc = src,
): ProductImage {
  return {
    src,
    alt,
    fallbackSrc,
    kind,
  };
}

type ProductMediaAlts = {
  front: string;
  back: string;
  detail: string;
  editorial: string;
};

function createProductMedia(slug: string, alts: ProductMediaAlts) {
  const frontSrc = `/images/products/front/${slug}-front.jpg`;

  return {
    front: createImage(
      frontSrc,
      alts.front,
      "front",
      "/images/editorial/archive-signal.jpg",
    ),
    back: createImage(
      `/images/products/back/${slug}-back.jpg`,
      alts.back,
      "back",
      frontSrc,
    ),
    details: [
      createImage(
        `/images/products/details/${slug}-detail.jpg`,
        alts.detail,
        "detail",
        frontSrc,
      ),
    ],
    editorial: createImage(
      `/images/editorial/${slug}-editorial.jpg`,
      alts.editorial,
      "editorial",
      frontSrc,
    ),
  };
}

export const products: Product[] = [
  {
    id: "ntw-ts-01",
    slug: "not-of-this-world-tee",
    name: "Not Of This World Tee",
    code: "TS-01",
    price: 58,
    category: "Tees",
    collection: collections.collection01,
    colors: ["Washed Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockStatus: "in-stock",
    featured: true,
    newDrop: true,
    badgeText: "New Drop",
    shortDescription:
      "Boxy washed jersey with a direct chest line and a softened late-night finish.",
    longDescription:
      "The cleanest read in the first drop. Built to sit quiet from distance and land with weight up close, TS-01 keeps the message sharp and the body stripped back.",
    fitNotes: [
      "Relaxed through the body with a slight crop.",
      "Dropped shoulder for an easier line across the chest.",
      "Take your usual size for the intended shape.",
    ],
    materialNotes: [
      "Midweight washed cotton jersey.",
      "Dry hand with softened surface after garment treatment.",
      "Low-sheen print application to keep the finish restrained.",
    ],
    careInstructions: [
      "Wash cold, inside out.",
      "Air dry or tumble low.",
      "Do not iron directly over the graphic.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("not-of-this-world-tee", {
      front:
        'Not Of This World Tee in washed black, front view, printed with a halftone crown-of-thorns portrait of Christ and the words "For I am not of this world"',
      back: 'Not Of This World Tee in washed black, back view, with a large distressed "NOT OF THIS WORLD" type graphic',
      detail:
        "Close-up of the Not Of This World Tee chest print, showing cracked halftone texture on washed black jersey",
      editorial:
        "Two Not Of This World tees laid flat on pale concrete in warm daylight, styled with books and a glass",
    }),
    relatedProducts: [
      "sacred-textiles-tee",
      "faith-archive-long-sleeve",
      "crown-of-thorns-hoodie",
      "washed-cross-crewneck",
    ],
  },
  {
    id: "ntw-ts-02",
    slug: "sacred-textiles-tee",
    name: "Sacred Textiles Tee",
    code: "TS-02",
    price: 62,
    category: "Tees",
    collection: collections.collection01,
    colors: ["Charcoal Wash"],
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low-stock",
    featured: true,
    newDrop: true,
    badgeText: "Low Stock",
    shortDescription:
      "Dense cotton tee with a faded charcoal cast and a broader front read.",
    longDescription:
      "TS-02 pushes the graphic further without losing control. The body stays heavy, the wash stays muted, and the typography carries the tension instead of noise.",
    fitNotes: [
      "Relaxed shoulder with a longer straight hem.",
      "Designed to fall slightly looser than TS-01.",
      "Choose your normal size for the intended box shape.",
    ],
    materialNotes: [
      "Dense cotton jersey with pigment wash treatment.",
      "Vintage crack detail across select print zones.",
      "Stable rib neck with clean interior taping.",
    ],
    careInstructions: [
      "Machine wash cold with similar tones.",
      "Dry flat or tumble low.",
      "Avoid harsh detergents to preserve the fade.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("sacred-textiles-tee", {
      front:
        'Sacred Textiles Tee in charcoal wash, front view, with a large white dove above the words "Not of this world"',
      back: "Sacred Textiles Tee in charcoal wash, back view, plain with no graphic",
      detail:
        "Close-up of the Sacred Textiles Tee dove graphic and serif lettering on folded charcoal jersey",
      editorial:
        "Sacred Textiles Tee laid flat on a concrete table with linen and a potted olive branch in window light",
    }),
    relatedProducts: [
      "not-of-this-world-tee",
      "faith-archive-long-sleeve",
      "crown-of-thorns-hoodie",
      "archive-cap",
    ],
  },
  {
    id: "ntw-ls-01",
    slug: "faith-archive-long-sleeve",
    name: "Faith Archive Long Sleeve",
    code: "LS-01",
    price: 74,
    category: "Long Sleeves",
    collection: collections.collection01,
    colors: ["Washed Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockStatus: "in-stock",
    featured: false,
    newDrop: true,
    badgeText: "New Drop",
    shortDescription:
      "Relaxed long sleeve with fuller sleeves and a faded archive read.",
    longDescription:
      "LS-01 is built as the bridge between tee and fleece. The sleeves hold more presence, the graphic stays measured, and the surface carries the same washed depth as the rest of the drop.",
    fitNotes: [
      "Relaxed through shoulder and sleeve.",
      "True to size with deliberate volume.",
      "Works clean over a base tee or under outerwear.",
    ],
    materialNotes: [
      "8 oz washed cotton jersey.",
      "Softer hand with controlled recovery in the cuff.",
      "Slight tonal variation across seams and body.",
    ],
    careInstructions: [
      "Cold wash with like colors.",
      "Dry low or hang dry.",
      "Do not bleach.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("faith-archive-long-sleeve", {
      front:
        "Faith Archive Long Sleeve in washed charcoal, front view, with a small script Faith Archive logo at the chest",
      back: "Faith Archive Long Sleeve in washed charcoal, back view, with an engraved angel-and-cross illustration",
      detail:
        "Close-up of the ribbed collar and script Faith Archive chest logo on washed charcoal cotton",
      editorial:
        "Faith Archive Long Sleeve laid on travertine beside a print of its back graphic, in soft daylight",
    }),
    relatedProducts: [
      "not-of-this-world-tee",
      "crown-of-thorns-hoodie",
      "washed-cross-crewneck",
      "heavy-washed-jacket",
    ],
  },
  {
    id: "ntw-hd-01",
    slug: "crown-of-thorns-hoodie",
    name: "Crown of Thorns Hoodie",
    code: "HD-01",
    price: 128,
    compareAtPrice: 142,
    category: "Hoodies",
    collection: collections.collection01,
    colors: ["Night Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "in-stock",
    featured: true,
    newDrop: true,
    badgeText: "Featured",
    shortDescription:
      "Heavy brushed fleece with a dense hood, washed depth, and a quiet front strike.",
    longDescription:
      "The anchor fleece in the first release. HD-01 is cut to feel substantial without excess, with a matte surface, a grounded silhouette, and a message that stays deliberate.",
    fitNotes: [
      "Boxy body with a heavy sleeve stack.",
      "Double-layer hood adds visible structure.",
      "Take your normal size for the intended volume.",
    ],
    materialNotes: [
      "480 GSM cotton-rich fleece.",
      "Enzyme washed for a broken surface and softer hand.",
      "Matte print finish and firm rib trim.",
    ],
    careInstructions: [
      "Wash cold and inside out.",
      "Dry flat or tumble low.",
      "Avoid softeners on brushed fleece.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("crown-of-thorns-hoodie", {
      front:
        "Crown of Thorns Hoodie in night charcoal, front view, with a crown of thorns printed across the chest and kangaroo pocket",
      back: "Crown of Thorns Hoodie in night charcoal, back view, with a large crown of thorns graphic",
      detail:
        "Close-up of the crown of thorns print and cross-R emblem on folded night charcoal fleece",
      editorial:
        "Crown of Thorns Hoodie folded on a concrete plinth beside a cap, lit by warm window light",
    }),
    relatedProducts: [
      "faith-archive-long-sleeve",
      "heavy-washed-jacket",
      "washed-cross-crewneck",
      "sacred-textiles-tee",
    ],
  },
  {
    id: "ntw-cr-01",
    slug: "washed-cross-crewneck",
    name: "Washed Cross Crewneck",
    code: "CR-01",
    price: 112,
    category: "Fleece",
    collection: collections.collection01,
    colors: ["Faded Coal"],
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low-stock",
    featured: false,
    newDrop: false,
    badgeText: "Archive",
    shortDescription:
      "Refined crew fleece with soft contrast fade and a centered chest treatment.",
    longDescription:
      "CR-01 sits between a standard sweatshirt and a collection piece. The fade is controlled, the graphic stays centered, and the overall read feels closer to archive fleece than everyday basics.",
    fitNotes: [
      "Relaxed through shoulder with a steady hem.",
      "Sits clean over tees without extra bulk.",
      "Take your usual size for the intended fit.",
    ],
    materialNotes: [
      "Cotton-blend fleece with brushed interior.",
      "Washed surface variation through seams and body.",
      "Tonal cover-stitching and structured rib trim.",
    ],
    careInstructions: [
      "Cold gentle cycle.",
      "Air dry recommended.",
      "Warm iron inside out if required.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("washed-cross-crewneck", {
      front:
        "Washed Cross Crewneck in faded coal, front view, with a large hand-painted cross and figure across the chest",
      back: "Washed Cross Crewneck in faded coal, back view, plain with a small cross-R emblem at the neck",
      detail:
        "Close-up of the painted cross graphic and ribbed cuff on faded coal fleece",
      editorial:
        "Washed Cross Crewneck folded on a concrete ledge under palm-leaf shadow in warm daylight",
    }),
    relatedProducts: [
      "crown-of-thorns-hoodie",
      "faith-archive-long-sleeve",
      "heavy-washed-jacket",
      "not-of-this-world-tee",
    ],
  },
  {
    id: "ntw-cp-01",
    slug: "archive-cap",
    name: "Archive Cap",
    code: "CP-01",
    price: 48,
    category: "Headwear",
    collection: collections.collection01,
    colors: ["Washed Black"],
    sizes: ["One Size"],
    stockStatus: "in-stock",
    featured: false,
    newDrop: true,
    badgeText: "New Drop",
    shortDescription:
      "Washed twill cap with a low profile, matte hardware, and restrained front mark.",
    longDescription:
      "CP-01 keeps the same tone as the garments: faded, controlled, and built for daily wear. The brim stays low, the branding stays compact, and the wash does the rest.",
    fitNotes: [
      "Low six-panel profile.",
      "Adjustable back closure.",
      "Designed to sit close to the head.",
    ],
    materialNotes: [
      "100% cotton twill.",
      "Garment washed for edge variation.",
      "Tonal embroidery with matte clasp hardware.",
    ],
    careInstructions: [
      "Spot clean only.",
      "Do not machine wash.",
      "Air dry away from direct heat.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("archive-cap", {
      front:
        "Archive Cap in washed black, front view, with an embroidered cross-R emblem on the crown",
      back: "Archive Cap in washed black, back view, showing the adjustable metal buckle strap",
      detail:
        "Close-up of the embroidered cross-R emblem and washed twill texture on the cap front",
      editorial:
        "Two Archive Caps on a concrete surface in warm daylight, one front-facing and one showing the strap",
    }),
    relatedProducts: [
      "utility-tote",
      "sacred-textiles-tee",
      "not-of-this-world-tee",
      "crown-of-thorns-hoodie",
    ],
  },
  {
    id: "ntw-bg-01",
    slug: "utility-tote",
    name: "Utility Tote",
    code: "BG-01",
    price: 42,
    category: "Accessories",
    collection: collections.collection01,
    colors: ["Coal"],
    sizes: ["One Size"],
    stockStatus: "in-stock",
    featured: false,
    newDrop: false,
    badgeText: "Archive",
    shortDescription:
      "Heavy canvas tote with tonal front type and an everyday carry shape.",
    longDescription:
      "BG-01 is built to sit inside the line, not outside it. The canvas carries enough weight to feel considered, while the front mark stays quiet and fully in step with the apparel.",
    fitNotes: [
      "One size.",
      "Fits daily carry, notebook, and light outer layer.",
      "Handle drop works over shoulder or in hand.",
    ],
    materialNotes: [
      "Heavy cotton canvas body.",
      "Interior open pocket.",
      "Tonal matte front print.",
    ],
    careInstructions: [
      "Spot clean when possible.",
      "Cold wash only if necessary.",
      "Shape while damp and air dry.",
    ],
    shippingNotes: standardShipping,
    images: createProductMedia("utility-tote", {
      front:
        'Utility Tote in coal canvas, front view, with a blurred "Let There Be Light" print and a printed spec panel',
      back: "Utility Tote in coal canvas, back view, with side pockets and a small printed spec panel",
      detail:
        "Close-up of the woven label and stitched seam on coal canvas, the Let There Be Light print behind",
      editorial:
        "Utility Tote standing on a concrete counter in a sunlit room with a potted plant behind",
    }),
    relatedProducts: [
      "archive-cap",
      "not-of-this-world-tee",
      "sacred-textiles-tee",
      "washed-cross-crewneck",
    ],
  },
  {
    id: "ntw-jk-01",
    slug: "heavy-washed-jacket",
    name: "Heavy Washed Jacket",
    code: "JK-01",
    price: 218,
    category: "Outerwear",
    collection: collections.collection01,
    colors: ["Deep Wash"],
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "sold-out",
    featured: true,
    newDrop: false,
    badgeText: "Sold Out",
    shortDescription:
      "Structured washed outer layer with a dark shell, matte hardware, and limited run status.",
    longDescription:
      "JK-01 was built as the weight piece for the first release. The shell carries a deeper wash, the line stays clean over fleece, and the limited run closed quickly.",
    fitNotes: [
      "Relaxed straight body with room through the shoulder.",
      "Designed to layer over hoodies and long sleeves.",
      "Sold out from the first production run.",
    ],
    materialNotes: [
      "Heavy washed cotton twill shell.",
      "Smooth tonal lining.",
      "Matte black zip and snap hardware.",
    ],
    careInstructions: [
      "Dry clean preferred.",
      "Cold spot clean for minor marks.",
      "Store on a broad hanger.",
    ],
    shippingNotes: outerwearShipping,
    images: createProductMedia("heavy-washed-jacket", {
      front:
        "Heavy Washed Jacket in deep wash denim, front view, with chest flap pockets and a cross-R emblem",
      back: "Heavy Washed Jacket in deep wash denim, back view, with a large Madonna portrait print",
      detail:
        "Close-up of the Madonna portrait print on deep wash denim, showing faded screen texture",
      editorial:
        "Heavy Washed Jacket laid across concrete with linen, back graphic facing up in warm daylight",
    }),
    relatedProducts: [
      "crown-of-thorns-hoodie",
      "faith-archive-long-sleeve",
      "washed-cross-crewneck",
      "not-of-this-world-tee",
    ],
  },
];

export const featuredProducts = products.filter((product) => product.featured);
export const newDropProducts = products.filter((product) => product.newDrop);

export const categories = [
  "All",
  "Tees",
  "Long Sleeves",
  "Hoodies",
  "Fleece",
  "Outerwear",
  "Headwear",
  "Accessories",
] as const;

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductPrimaryImage(product: Product) {
  return product.images.front;
}

export function getProductSecondaryImage(product: Product) {
  return product.images.back;
}

export function getProductGallery(product: Product) {
  const ordered = [
    product.images.front,
    product.images.back,
    ...product.images.details,
    product.images.editorial,
  ].filter(Boolean) as ProductImage[];

  return ordered.filter(
    (image, index, collection) =>
      collection.findIndex(
        (candidate) =>
          candidate.src === image.src &&
          candidate.fallbackSrc === image.fallbackSrc &&
          candidate.kind === image.kind,
      ) === index,
  );
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);

  if (!product) {
    return [];
  }

  const explicit = product.relatedProducts
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter(Boolean) as Product[];

  if (explicit.length > 0) {
    return explicit;
  }

  return products.filter((entry) => entry.slug !== slug).slice(0, 4);
}
