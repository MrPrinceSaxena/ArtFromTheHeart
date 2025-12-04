import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { useStorefrontData } from "@/hooks/useStorefrontData";

export function FeaturedProducts() {
  const { products } = useStorefrontData();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Featured Creations
            </h2>
            <p className="text-muted-foreground">
              Our most loved handcrafted pieces, chosen by customers
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}

          {featuredProducts.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-6">
              No featured products yet. Mark some items as featured in the admin
              panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
