"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { checkoutContent } from "@/data/site";
import {
  createMockCheckoutSession,
  type CheckoutAddress,
  type CheckoutCustomer,
  type CheckoutDelivery,
} from "@/lib/checkout";
import { cn, formatCurrency } from "@/lib/utils";

export function CheckoutPageClient() {
  const router = useRouter();
  const { clearCart, items, subtotal } = useCart();
  const [isPending, startTransition] = useTransition();
  const [delivery, setDelivery] = useState<CheckoutDelivery>("standard");
  const deliveryOptions: Array<[CheckoutDelivery, string, string]> = [
    ["standard", "Standard delivery", "3-5 business days / $8"],
    ["express", "Express delivery", "1-2 business days / $18"],
  ];

  if (items.length === 0) {
    return (
      <div className="editorial-frame rounded-[2rem] p-8 text-center md:p-12">
        <p className="font-display text-4xl uppercase tracking-[0.14em] text-white/92">
          {checkoutContent.emptyTitle}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/58">
          {checkoutContent.emptyCopy}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const customer: CheckoutCustomer = {
            firstName: String(formData.get("firstName") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
          };
          const address: CheckoutAddress = {
            address: String(formData.get("address") ?? ""),
            apartment: String(formData.get("apartment") ?? ""),
            city: String(formData.get("city") ?? ""),
            postalCode: String(formData.get("postalCode") ?? ""),
            country: String(formData.get("country") ?? ""),
          };
          const session = createMockCheckoutSession({
            items,
            customer,
            address,
            delivery,
          });

          startTransition(() => {
            clearCart();
            router.push(session.redirectUrl);
          });
        }}
      >
        <div className="surface-panel rounded-[2rem] p-6 md:p-7">
          <p className="text-kicker">CUSTOMER</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["firstName", "First name"],
              ["lastName", "Last name"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([name, label]) => (
              <label key={name} className="space-y-2 text-sm text-white/58">
                <span>{label}</span>
                <input
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  required
                  className="field-shell h-12 w-full rounded-[1rem] px-4 text-white outline-none"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[2rem] p-6 md:p-7">
          <p className="text-kicker">SHIPPING</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["address", "Address", true],
              ["apartment", "Apartment / Suite", true],
              ["city", "City", false],
              ["postalCode", "Postal code", false],
              ["country", "Country", true],
            ].map(([name, label, fullWidth]) => (
                <label
                  key={name as string}
                  className={`space-y-2 text-sm text-white/58 ${
                    fullWidth ? "md:col-span-2" : ""
                  }`}
                >
                  <span>{label}</span>
                  <input
                    name={name as string}
                    required={label !== "Apartment / Suite"}
                    className="field-shell h-12 w-full rounded-[1rem] px-4 text-white outline-none"
                  />
                </label>
              ),
            )}
          </div>
          <div className="mt-6 grid gap-3">
            {deliveryOptions.map(([value, label, hint]) => (
              <label
                key={value}
                className={cn(
                  "flex items-center justify-between rounded-[1.2rem] border px-4 py-4 transition-colors",
                  delivery === value
                    ? "border-white/26 bg-white/[0.07]"
                    : "border-white/8 bg-white/[0.028] hover:border-white/16 hover:bg-white/[0.045]",
                )}
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/80">
                    {label}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/46">
                    {hint}
                  </p>
                </div>
                <input
                  type="radio"
                  name="delivery"
                  value={value}
                  checked={delivery === value}
                  onChange={() => setDelivery(value)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[2rem] p-6 md:p-7">
          <p className="text-kicker">PAYMENT</p>
          <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
            <p className="font-display text-2xl uppercase tracking-[0.12em] text-white/90">
              {checkoutContent.paymentTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              {checkoutContent.paymentCopy}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="button-primary inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.3em]"
        >
          {isPending ? "Processing" : "Place secure order"}
        </button>
      </form>

      <aside className="surface-panel h-fit rounded-[2rem] p-6 md:p-7">
        <div className="flex items-center justify-between">
          <p className="text-kicker">ORDER SUMMARY</p>
          <Link
            href="/cart"
            className="text-[0.64rem] uppercase tracking-[0.28em] text-white/50 hover:text-white/85"
          >
            Edit cart
          </Link>
        </div>
        <p className="mt-1 text-[0.64rem] uppercase tracking-[0.28em] text-white/44">
          {items.length} item{items.length === 1 ? "" : "s"}
        </p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.slug}-${item.size}`}
              className="surface-subtle flex items-center justify-between gap-4 rounded-[1.25rem] px-4 py-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/46">
                  {item.code} / {item.size}
                </p>
                <p className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-white/88">
                  {item.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/46">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-white/84">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
          <div className="h-px bg-white/8" />
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/60">
            <span>Subtotal</span>
            <span className="text-white/88">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/60">
            <span>Estimated shipping</span>
            <span className="text-white/88">{delivery === "express" ? "$18" : "$8"}</span>
          </div>
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/76">
            <span>Total</span>
            <span className="text-lg font-semibold text-white">
              {formatCurrency(subtotal + (delivery === "express" ? 18 : 8))}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
