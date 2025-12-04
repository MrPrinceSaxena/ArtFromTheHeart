import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import { useStorefrontData } from "@/hooks/useStorefrontData";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const { products } = useStorefrontData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product: Product | undefined = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <p className="text-3xl">😕</p>
          <h1 className="font-heading text-2xl font-bold">
            Product not found
          </h1>
          <p className="text-muted-foreground text-sm">
            This product may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="btn-primary inline-flex items-center justify-center gap-2 w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const mainImage =
    product.images[selectedImage] ??
    product.images[0] ??
    "https://via.placeholder.com/800x800?text=ArtFromTheHeart";

  const ogImage = product.images[0] ?? mainImage;

  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.slug}`
      : `https://your-domain.com/product/${product.slug}`;

  const waLink = buildProductWhatsAppLink(product);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{product.name} – ArtFromTheHeart</title>
        <meta
          name="description"
          content={
            product.shortDescription ||
            "Handmade Aipan art piece from ArtFromTheHeart."
          }
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content={`${product.name} – ArtFromTheHeart`}
        />
        <meta
          property="og:description"
          content={
            product.shortDescription ||
            "Handmade Aipan art piece from ArtFromTheHeart."
          }
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Back link */}
        <div className="mb-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border ${
                      index === selectedImage
                        ? "border-primary ring-1 ring-primary"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {product.category.replace(/-/g, " ")}
              </p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {product.isNew && (
                  <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-700">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-700">
                    Bestseller
                  </span>
                )}
                {product.isFeatured && (
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Price + stock */}
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">
                  ₹{product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
              </div>
              <span
                className={
                  product.stockStatus === "in-stock"
                    ? "text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-700"
                    : product.stockStatus === "made-to-order"
                    ? "text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-700"
                    : "text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                }
              >
                {product.stockStatus.replace(/-/g, " ")}
              </span>
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-sm text-muted-foreground">
                {product.shortDescription}
              </p>
            )}

            {/* Main description */}
            {product.description && (
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            )}

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-border pt-4">
              {product.material && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-[0.16em] text-[10px] mb-1">
                    Material
                  </p>
                  <p>{product.material}</p>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-[0.16em] text-[10px] mb-1">
                    Size
                  </p>
                  <p>{product.dimensions}</p>
                </div>
              )}
              {product.processingTime && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-[0.16em] text-[10px] mb-1">
                    Processing time
                  </p>
                  <p>{product.processingTime}</p>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <p className="text-muted-foreground uppercase tracking-[0.16em] text-[10px] mb-1">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-muted text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 flex-1"
              >
                <ShoppingBag className="w-4 h-4" />
                Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn-outline flex-1 text-sm"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
