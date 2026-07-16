export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getStockLabel(stockStatus: "in-stock" | "low-stock" | "sold-out") {
  switch (stockStatus) {
    case "low-stock":
      return "Low stock";
    case "sold-out":
      return "Sold out";
    default:
      return "Ready to ship";
  }
}
