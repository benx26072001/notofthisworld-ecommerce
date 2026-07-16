"use client";

import { cn } from "@/lib/utils";

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  disabled?: boolean;
};

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  disabled = false,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          disabled={disabled}
          aria-pressed={selectedSize === size}
          onClick={() => onSelect(size)}
          className={cn(
            "min-w-14 rounded-full border px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.3em]",
            selectedSize === size
              ? "border-white/34 bg-white/92 text-black"
              : "border-white/10 bg-white/4 text-white/68 hover:border-white/22 hover:bg-white/8 hover:text-white",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
