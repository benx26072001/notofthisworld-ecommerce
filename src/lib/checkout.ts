import type { CartItem } from "@/types/product";

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CheckoutAddress = {
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CheckoutDelivery = "standard" | "express";

export type CheckoutSubmission = {
  items: CartItem[];
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  delivery: CheckoutDelivery;
};

export type CheckoutSessionResult = {
  orderId: string;
  redirectUrl: string;
};

export function createMockCheckoutSession({
  delivery,
}: CheckoutSubmission): CheckoutSessionResult {
  // Swap this function for a server action or API route that creates a Stripe
  // Checkout Session and persists the order in your database.
  const orderId = `NTW-${Date.now().toString().slice(-6)}`;
  const deliveryCode = delivery === "express" ? "EXP" : "STD";

  return {
    orderId,
    redirectUrl: `/order-confirmation?order=${orderId}&delivery=${deliveryCode}`,
  };
}
