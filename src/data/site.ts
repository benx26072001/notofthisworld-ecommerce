export const brand = {
  name: "NOT OF THIS WORLD",
  shortName: "NTW",
  collection: "Collection 01",
  domain: "https://notofthisworld.studio",
  launchNotice: "Collection 01 now live",
  supportEmail: "support@notofthisworld.studio",
  supportWindow: "Mon-Fri / 10AM-6PM",
  responsePromise: "Every message gets a reply within 1 business day.",
  currency: "USD",
  footerNote:
    "Dark washed garments shaped with conviction, restraint, and weight.",
  metadataDescription:
    "Christian luxury streetwear rendered through washed surfaces, strong typography, and a spare editorial mood.",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
};

// Falls back to the brand's canonical domain when NEXT_PUBLIC_SITE_URL isn't
// set, so metadata/sitemap/robots URLs reflect wherever the site is actually
// deployed (e.g. a Vercel preview or staging URL) instead of a hardcoded domain.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? brand.domain;

export const homeContent = {
  hero: {
    eyebrow: "NEW DROP / COLLECTION 01",
    title: "NOT OF THIS WORLD",
    subtitle: "Washed black. Clear signal.",
    primaryCta: "Shop Collection",
    secondaryCta: "Brand Story",
    meta: [
      "8 pieces in release",
      "Washed black palette",
      "Message-led graphics",
    ],
    calloutTitle: "FAITH IN FORM",
    calloutCopy:
      "The first drop is built around weight, spacing, and quiet conviction rather than noise.",
  },
  drop: {
    label: "NEW DROP",
    title: "Drop 01",
    description: "Washed black essentials.",
  },
  collectionStory: {
    label: "COLLECTION STORY",
    title: "Form. Weight. Message.",
    description: "Collection 01 only.",
    notes: [
      "Washed black only.",
      "Typography under restraint.",
      "Built for repeat wear.",
    ],
    cta: "View Collection",
  },
  featured: {
    label: "SELECTED PIECES",
    title: "The strongest read in the room comes from the product.",
    description: "A tighter edit of the drop.",
  },
  newsletter: {
    label: "NEWSLETTER",
    title: "Enter the archive.",
    description: "Release notes only.",
    successTitle: "Inside the archive.",
    successCopy: "Release notes only.",
  },
};

export const aboutContent = {
  headingLabel: "ABOUT",
  headingTitle: "Wearable conviction, kept under control.",
  headingDescription:
    "A Christian streetwear label built around washed surfaces, deliberate typography, and a darker editorial restraint.",
  manifesto: [
    "The garments are designed to carry conviction without costume.",
    "Every piece begins with line, weight, and what the fabric can hold before anything graphic is added.",
    "The message matters. So does the discipline around it.",
  ],
  pillars: [
    {
      title: "Mission",
      copy:
        "To make garments that feel spiritually grounded, visually clean, and substantial in the hand.",
    },
    {
      title: "Language",
      copy:
        "Washed black, sparse type, and space used as force instead of filler.",
    },
    {
      title: "Position",
      copy:
        "Streetwear with a faith point of view, delivered through an editorial lens.",
    },
  ],
};

export const collectionsContent = {
  headingLabel: "COLLECTIONS",
  headingTitle: "Archive 01",
  headingDescription:
    "A disciplined first drop built around washed black garments, measured graphics, and heavier silhouettes.",
  body:
    "Collection 01 stays narrow by design. Tees, fleece, accessories, and outerwear all sit inside the same tonal range so the message stays sharp and the line stays coherent.",
  notes: [
    "Dark wash across every category.",
    "Graphic treatment kept controlled.",
    "Product-led rhythm from page to page.",
  ],
  cta: "Shop the collection",
};

export const contactContent = {
  headingLabel: "CONTACT",
  headingTitle: "Studio support",
  headingDescription:
    "Questions on orders, sizing, or future releases can come straight through the studio.",
  supportTitle: "Support",
  supportCopy: "For order care, sizing help, and release questions.",
  faqCta: "Read FAQ",
  successTitle: "Message received.",
  successCopy:
    "The studio inbox has your note. Replies land through the support address shown here.",
};

export const faqContent = {
  headingLabel: "FAQ",
  headingTitle: "Order and garment notes",
  headingDescription:
    "Shipping, returns, care, tracking, and stock questions kept concise.",
};

export const cartContent = {
  headingLabel: "CART",
  headingTitle: "Review the selection",
  headingDescription:
    "Adjust quantities, remove pieces, or move directly into checkout.",
  emptyTitle: "The cart is still clear.",
  emptyCopy:
    "Choose a piece from Collection 01 to begin the order flow.",
  emptyCta: "Enter Collection",
};

export const checkoutContent = {
  headingLabel: "CHECKOUT",
  headingTitle: "Secure final review",
  headingDescription:
    "Customer details, delivery, and order review held in one clean final step.",
  emptyTitle: "Your checkout is empty.",
  emptyCopy:
    "Add at least one piece to the cart before continuing.",
  paymentTitle: "Secure checkout",
  paymentCopy:
    "Your card is charged securely once the order is placed. All transactions are encrypted end-to-end.",
};

export const thankYouContent = {
  headingLabel: "ORDER CONFIRMED",
  headingTitle: "Your order is placed.",
  headingDescription:
    "Confirmation and tracking details follow through the email attached to the order.",
  primaryCta: "Continue shopping",
  secondaryCta: "Contact support",
  statusLabel: "Payment authorized / fulfillment pending",
  nextStepsLabel: "WHAT HAPPENS NEXT",
  nextSteps: [
    {
      title: "Confirmation email",
      copy: "A confirmation lands in your inbox with the full order summary.",
    },
    {
      title: "Studio packing",
      copy: "The studio packs your order within 2 to 4 business days.",
    },
    {
      title: "Tracking issued",
      copy: "Tracking is sent as soon as the carrier scans the parcel.",
    },
  ],
  linksLabel: "KEEP GOING",
  links: [
    { label: "Continue shopping", href: "/shop" },
    { label: "Read FAQ", href: "/faq" },
    { label: "Contact support", href: "/contact" },
    { label: "Collections", href: "/collections" },
  ],
};

export const notFoundContent = {
  label: "404 / ARCHIVE MISSING",
  title: "The signal you reached is not here.",
  description:
    "The page may have moved deeper into the archive, or it never belonged to this release.",
  primaryCta: "Shop Collection",
  secondaryCta: "Back Home",
  recoveryLabel: "FIND YOUR WAY",
  recoveryLinks: [
    { label: "FAQ", href: "/faq" },
    { label: "Cart", href: "/cart" },
  ],
  productRecoveryLabel: "STILL IN THE DROP",
  productRecoveryTitle: "New from Collection 01",
  supportLabel: "STILL STUCK?",
  quickAnswersLabel: "QUICK ANSWERS",
  quickAnswersTitle: "Common questions",
  quickAnswersCta: "Read the full FAQ",
};

export const loadingContent = {
  label: "ENTERING COLLECTION 01",
  title: "Not Of This World",
};

// Single source of truth for per-route <title> and meta description content.
// Titles stay under 40 characters so the "%s | NOT OF THIS WORLD" template
// (20 characters) keeps the full rendered title under Google's ~60 char cutoff.
export const pageMeta = {
  home: {
    title: "Christian Streetwear, Washed Black",
    description:
      "Shop NOT OF THIS WORLD Collection 01: washed black tees, fleece, and outerwear built on faith, restraint, and weight.",
  },
  shop: {
    title: "Shop Collection 01",
    description:
      "Browse the full Collection 01 drop: tees, long sleeves, hoodies, fleece, outerwear, and accessories in washed black.",
  },
  collections: {
    title: "Archive 01 Collection",
    description:
      "Explore Archive 01, the disciplined first drop built around washed black garments and measured graphics.",
  },
  about: {
    title: "Brand Story & Mission",
    description:
      "The mission, language, and position behind NOT OF THIS WORLD: faith-driven streetwear with an editorial eye.",
  },
  contact: {
    title: "Contact Studio Support",
    description:
      "Reach studio support for order care, sizing help, and release questions. Replies within 1 business day.",
  },
  faq: {
    title: "FAQ: Shipping, Returns & Sizing",
    description:
      "Answers on shipping times, returns, sizing, care instructions, tracking, and restocks for Collection 01.",
  },
  cart: {
    title: "Your Cart",
    description: "Review your selected pieces, adjust quantities, and move into checkout.",
  },
  checkout: {
    title: "Secure Checkout",
    description:
      "Enter customer, delivery, and payment details to complete your Collection 01 order securely.",
  },
  thankYou: {
    title: "Order Confirmed",
    description:
      "Your Not Of This World order is confirmed. Track what happens next, from studio packing to carrier scan.",
  },
} as const;

export const navigation = [
  { label: "New", href: "/shop?tag=new-drop" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const faqItems = [
  {
    question: "When do orders ship?",
    answer:
      "Most orders leave the studio within 2 to 4 business days. Launch periods can move slightly slower while the first wave clears.",
  },
  {
    question: "Do you accept returns?",
    answer:
      "Unworn pieces may be returned within 14 days of delivery. Final release items and marked archive stock are excluded unless they arrive damaged.",
  },
  {
    question: "How should I choose my size?",
    answer:
      "Each product page includes fit notes and a size guide. Tees stay boxy, fleece carries more depth, and outerwear is cut to layer.",
  },
  {
    question: "How should the garments be cared for?",
    answer:
      "Wash cold, inside out, and dry low or air dry when possible. The washed finish and distressed depth are intentional and should be treated with care.",
  },
  {
    question: "How do I track an order?",
    answer:
      "Tracking is issued as soon as the parcel is scanned by the carrier. If a shipment feels delayed, contact support with the order reference.",
  },
  {
    question: "Will sold out pieces return?",
    answer:
      "Some core items may come back, but most archive-marked runs stay controlled. Newsletter subscribers hear first when anything returns.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. International duties and local charges are the responsibility of the customer unless otherwise noted during checkout.",
  },
];
