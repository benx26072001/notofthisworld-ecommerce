"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type BrandImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export function BrandImage({
  src,
  alt,
  fallbackSrc,
  onError,
  onLoad,
  fill,
  ...props
}: BrandImageProps) {
  const resolvedFallback = fallbackSrc ?? src;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const currentSrc = failedSrc === src ? resolvedFallback : src;

  const image = (
    <Image
      {...props}
      fill={fill}
      src={currentSrc}
      alt={alt}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        if (src !== resolvedFallback) {
          setFailedSrc(src);
        }

        onError?.(event);
      }}
    />
  );

  if (!fill) {
    return image;
  }

  // Fades the container, not the <Image>, so per-instance opacity classes
  // (e.g. product-card's hover crossfade) keep working untouched.
  return (
    <span
      className="absolute inset-0 block transition-opacity duration-700 ease-out"
      style={{ opacity: loaded ? 1 : 0 }}
    >
      {image}
    </span>
  );
}
