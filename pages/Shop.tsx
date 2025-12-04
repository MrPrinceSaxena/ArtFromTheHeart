import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import { useStorefrontData } from "@/hooks/useStorefrontData";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // ✅ Use shared data hook instead of static imports
  const { products: allProducts, categories } = useStorefrontData();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = categoryFilter
        ? product.category === categoryFilter
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, search, categoryFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shop – ArtFromTheHeart Aipan Creations</title>
        <meta
          name="description"
          content="Browse handmade Aipan art products – pooja decor, wall plates, mandala clocks, diya sets, pooja thalis and festive gifts."
        />
        <link rel="canonical" href="https://your-domain.com/shop" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">
              Shop Aipan Creations
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Hand-painted, customizable pieces crafted with love in Uttarakhand.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-background text-sm min-w-[200px]"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-background text-sm min-w-[180px] capitalize"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-10">
              No products found. Try a different search or category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- Product Card ----------------

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const image =
    product.images[0] ??
    "https://via.placeholder.com/600x600?text=ArtFromTheHeart";

  const waLink = buildProductWhatsAppLink(product);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card-aipan flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
    >
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1 text-[10px]">
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-green-500/90 text-white">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white">
              Bestseller
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {product.category.replace(/-/g, " ")}
          </p>
          <h2 className="font-medium text-sm line-clamp-2">{product.name}</h2>
        </div>

        {product.shortDescription && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold">₹{product.price}</span>
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className="text-[11px] text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[11px] px-2 py-0.5 rounded-full",
                product.stockStatus === "in-stock"
                  ? "bg-green-500/10 text-green-700"
                  : product.stockStatus === "made-to-order"
                  ? "bg-amber-500/10 text-amber-700"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {product.stockStatus.replace(/-/g, " ")}
            </span>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] underline text-green-700 hover:text-green-800"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
