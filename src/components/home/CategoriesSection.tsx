import { CategoryCard } from "@/components/products/CategoryCard";
import { useStorefrontData } from "@/hooks/useStorefrontData";

export function CategoriesSection() {
  const { categories } = useStorefrontData();

  return (
    <section className="py-16 md:py-24 section-pattern">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Shop by Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of handcrafted Aipan art pieces
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
