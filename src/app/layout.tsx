import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Manrope, Sora } from "next/font/google";

import "@/app/globals.css";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/layout/page-transition";
import { CartProvider } from "@/components/providers/cart-provider";
import { brand, siteUrl } from "@/data/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.metadataDescription,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  sameAs: brand.socialLinks.map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} bg-background text-foreground antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
