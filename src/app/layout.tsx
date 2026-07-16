import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "@/app/globals.css";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/layout/page-transition";
import { CartProvider } from "@/components/providers/cart-provider";
import { brand } from "@/data/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: `${brand.name} | Premium Streetwear`,
    template: `%s | ${brand.name}`,
  },
  description: brand.metadataDescription,
  applicationName: brand.name,
  keywords: [
    "fashion ecommerce",
    "streetwear",
    "premium apparel",
    "dark fashion",
    "christian streetwear",
  ],
  openGraph: {
    title: brand.name,
    description: brand.metadataDescription,
    type: "website",
    images: [
      {
        url: "/images/collections/collection-01-cover.svg",
        width: 1600,
        height: 1200,
        alt: `${brand.collection} cover artwork`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.metadataDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} bg-background text-foreground antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <CartDrawer />
            <main className="flex-1 pt-24 md:pt-28">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
