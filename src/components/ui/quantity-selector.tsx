"use client";

type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/4 p-1">
      <button
        type="button"
        onClick={onDecrease}
        className="h-10 w-10 rounded-full text-base text-white/70 hover:bg-white/8 hover:text-white"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span
        aria-live="polite"
        className="min-w-10 text-center text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/88"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="h-10 w-10 rounded-full text-base text-white/70 hover:bg-white/8 hover:text-white"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
