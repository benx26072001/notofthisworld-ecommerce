"use client";

import { useEffect, useState } from "react";

import { BrandImage } from "@/components/ui/brand-image";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      setSelectedImage((current) => {
        const currentIndex = images.findIndex(
          (image) => image.src === current.src && image.kind === current.kind,
        );
        const delta = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (currentIndex + delta + images.length) % images.length;
        return images[nextIndex];
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images]);

  return (
    <div
      className="grid gap-4 lg:grid-cols-[1fr_6.5rem] lg:items-start"
      aria-label={`${title} gallery`}
    >
      <div className="space-y-4">
        <div className="surface-panel relative aspect-[0.86] overflow-hidden rounded-[2rem] md:aspect-[0.84]">
          <BrandImage
            src={selectedImage.src}
            fallbackSrc={selectedImage.fallbackSrc}
            alt={selectedImage.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            priority
          />
          <div className="absolute left-4 top-4 md:left-5 md:top-5">
            <span className="badge-shell bg-black/48 text-white/84">
              {selectedImage.kind}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 lg:hidden">
          {images.map((image) => {
            const active = image.src === selectedImage.src && image.kind === selectedImage.kind;

            return (
              <button
                key={`${image.kind}-${image.src}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-[0.82] overflow-hidden rounded-[1.15rem] border transition-colors ${
                  active
                    ? "border-white/26 bg-white/[0.08]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]"
                }`}
              >
                <BrandImage
                  src={image.src}
                  fallbackSrc={image.fallbackSrc}
                  alt={image.alt}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="hidden gap-3 lg:grid">
        {images.map((image) => {
          const active = image.src === selectedImage.src && image.kind === selectedImage.kind;

          return (
            <button
              key={`${image.kind}-${image.src}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-[1.02] overflow-hidden rounded-[1.15rem] border transition-colors ${
                active
                  ? "border-white/26 bg-white/[0.08]"
                  : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]"
              }`}
            >
              <BrandImage
                src={image.src}
                fallbackSrc={image.fallbackSrc}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 16vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2.5">
                <p className="text-[0.55rem] uppercase tracking-[0.3em] text-white/68">
                  {image.kind}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
