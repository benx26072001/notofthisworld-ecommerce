import { ImageResponse } from "next/og";

import { brand } from "@/data/site";

export const alt = `${brand.name} / ${brand.collection} cover`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(217,207,191,0.14), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.6)",
          }}
        >
          {brand.collection}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#f5f0e8",
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.4)",
          }}
        >
          Washed Black. Clear Signal.
        </div>
      </div>
    ),
    { ...size },
  );
}
