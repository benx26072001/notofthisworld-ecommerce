import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getProductBySlug } from "@/data/products";
import { brand } from "@/data/site";
import { formatCurrency } from "@/lib/utils";

export const alt = "NOT OF THIS WORLD product preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadRasterImage(src: string) {
  if (!src.endsWith(".jpg")) {
    return null;
  }

  try {
    const filePath = join(process.cwd(), "public", src);
    const data = await readFile(filePath);
    return `data:image/jpeg;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050505",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#f5f0e8",
          }}
        >
          {brand.name}
        </div>
      ),
      { ...size },
    );
  }

  const imageSrc = await loadRasterImage(product.images.front.src);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050505",
        }}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 64,
            backgroundImage:
              "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.94) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.62)",
            }}
          >
            {product.category} / {product.code}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#f5f0e8",
              marginTop: 14,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "rgba(245,240,232,0.88)",
              marginTop: 16,
            }}
          >
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
