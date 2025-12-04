// src/hooks/useStorefrontData.ts
import { useEffect, useState } from "react";
import {
  products as seedProducts,
  categories as seedCategories,
  testimonials as seedTestimonials,
  type Product,
  type Category,
  type Testimonial,
} from "@/data/products";

type StorefrontData = {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  isLoaded: boolean;
};

export function useStorefrontData(): StorefrontData {
  const [data, setData] = useState<StorefrontData>({
    products: seedProducts,
    categories: seedCategories,
    testimonials: seedTestimonials,
    isLoaded: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const productsRaw = localStorage.getItem("adminProducts");
      const categoriesRaw = localStorage.getItem("adminCategories");
      const testimonialsRaw = localStorage.getItem("adminTestimonials");

      setData((prev) => ({
        products: productsRaw ? JSON.parse(productsRaw) : prev.products,
        categories: categoriesRaw ? JSON.parse(categoriesRaw) : prev.categories,
        testimonials: testimonialsRaw
          ? JSON.parse(testimonialsRaw)
          : prev.testimonials,
        isLoaded: true,
      }));
    } catch (err) {
      console.error("Failed to read storefront data from localStorage:", err);
      setData((prev) => ({ ...prev, isLoaded: true }));
    }
  }, []);

  return data;
}

export type { Product, Category, Testimonial };
