// src/lib/whatsapp.ts
import type { Product } from "@/data/products";

const RAW_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || "8865927722";

export function getWhatsAppNumber(): string {
  // Keep only digits
  return RAW_WHATSAPP.replace(/[^0-9]/g, "");
}

export function buildProductWhatsAppLink(product: Product): string {
  const number = getWhatsAppNumber();

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://artfromtheheart.netlify.app/";

  const url = `${origin}/product/${product.slug}`;

  const text = `Hi! I'd like to order "${product.name}".\n\nProduct link: ${url}\n\nPlease share price, availability and customization options.`;

  const encoded = encodeURIComponent(text);

  return `https://wa.me/${number}?text=${encoded}`;
}
