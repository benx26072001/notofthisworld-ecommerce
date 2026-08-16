"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { getProductPrimaryImage } from "@/data/products";
import { brand } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import type { CartItem, Product } from "@/types/product";

type AddItemInput = {
  product: Product;
  quantity: number;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (input: AddItemInput) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  hydrated: boolean;
};

const STORAGE_KEY = "ntw-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Unable to hydrate cart", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsCartOpen(false);
    }
  });

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = ({ product, quantity, size }: AddItemInput) => {
      setItems((currentItems) => {
        const existing = currentItems.find(
          (item) => item.slug === product.slug && item.size === size,
        );

        if (existing) {
          return currentItems.map((item) =>
            item.slug === product.slug && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [
          ...currentItems,
          {
            slug: product.slug,
            code: product.code,
            name: product.name,
            price: product.price,
            size,
            quantity,
            image: getProductPrimaryImage(product),
            stockStatus: product.stockStatus,
          },
        ];
      });

      setIsCartOpen(true);

      trackEvent("add_to_cart", {
        currency: brand.currency,
        value: product.price * quantity,
        items: [
          {
            item_id: product.code,
            item_name: product.name,
            item_variant: size,
            price: product.price,
            quantity,
          },
        ],
      });
    };

    const updateQuantity = (slug: string, size: string, quantity: number) => {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.slug === slug && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        ),
      );
    };

    const removeItem = (slug: string, size: string) => {
      setItems((currentItems) =>
        currentItems.filter((item) => !(item.slug === slug && item.size === size)),
      );
    };

    const clearCart = () => setItems([]);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      isCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      cartCount,
      subtotal,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toggleCart: () => setIsCartOpen((current) => !current),
      hydrated,
    };
  }, [hydrated, isCartOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
