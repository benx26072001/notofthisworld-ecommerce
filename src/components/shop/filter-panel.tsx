"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { categories, sortOptions } from "@/data/products";
import { cn } from "@/lib/utils";

type FilterPanelProps = {
  category: string;
  search: string;
  selectedSize: string;
  sort: string;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
};

const sizes = ["All", "S", "M", "L", "XL", "XXL", "One Size"];

const tagButtonClass = (active: boolean) =>
  cn(
    "rounded-full border px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.28em]",
    active
      ? "border-white/28 bg-white text-black"
      : "border-white/10 bg-white/[0.025] text-white/68 hover:border-white/20 hover:bg-white/[0.07]",
  );

export function FilterPanel({
  category,
  search,
  selectedSize,
  sort,
  onCategoryChange,
  onSearchChange,
  onSizeChange,
  onSortChange,
  mobileOpen,
  onMobileToggle,
}: FilterPanelProps) {
  const hasActiveFilters = category !== "All" || selectedSize !== "All" || search.trim() !== "";

  const resetFilters = () => {
    onCategoryChange("All");
    onSizeChange("All");
    onSearchChange("");
  };

  const content = (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="product-search"
          className="text-[0.64rem] uppercase tracking-[0.32em] text-white/52"
        >
          Search
        </label>
        <div className="field-shell flex items-center gap-3 rounded-[1rem] px-4">
          <Search className="size-4 shrink-0 text-white/38" />
          <input
            id="product-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search code or title"
            className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="shrink-0 text-white/40 hover:text-white/80"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="text-[0.64rem] uppercase tracking-[0.32em] text-white/52">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onCategoryChange(item)}
              aria-pressed={category === item}
              className={tagButtonClass(category === item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="text-[0.64rem] uppercase tracking-[0.32em] text-white/52">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSizeChange(item)}
              aria-pressed={selectedSize === item}
              className={tagButtonClass(selectedSize === item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="product-sort"
          className="text-[0.64rem] uppercase tracking-[0.32em] text-white/52"
        >
          Sort
        </label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="field-shell h-11 w-full rounded-[1rem] px-4 text-sm text-white outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={onMobileToggle}
        className="button-secondary inline-flex items-center gap-2 rounded-full px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] lg:hidden"
      >
        <SlidersHorizontal className="size-4" />
        Filters
      </button>
      <aside className="surface-subtle hidden rounded-[1.6rem] p-4 lg:block">
        <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
          <p className="text-kicker">FILTERS</p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[0.6rem] uppercase tracking-[0.28em] text-white/50 hover:text-white/85"
            >
              Reset
            </button>
          ) : null}
        </div>
        {content}
      </aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-[85] bg-black/72 backdrop-blur-sm lg:hidden">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="ml-auto h-full w-[84%] max-w-sm overflow-y-auto border-l border-white/8 bg-[#080808]/96 px-5 py-6 backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-kicker">FILTERS</p>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[0.6rem] uppercase tracking-[0.28em] text-white/50 hover:text-white/85"
                  >
                    Reset
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onMobileToggle}
                className="surface-subtle rounded-full p-2 text-white/70"
                aria-label="Close filters"
              >
                <X className="size-4" />
              </button>
            </div>
            {content}
          </div>
        </div>
      ) : null}
    </>
  );
}
