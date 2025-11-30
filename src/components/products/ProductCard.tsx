import { Link } from 'react-router-dom';
import { MessageCircle, Eye, Star } from 'lucide-react';
import { Product, siteSettings } from '@/data/products';
import { useEnquiryCart } from '@/hooks/useEnquiryCart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useEnquiryCart();

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (₹${product.price}). Can you share more details?`
  );

  const stockBadge = {
    'in-stock': { label: 'Ready to Ship', class: 'bg-green-500/10 text-green-700' },
    'made-to-order': { label: 'Made to Order', class: 'bg-accent/20 text-aipan-gold' },
    'out-of-stock': { label: 'Out of Stock', class: 'bg-muted text-muted-foreground' },
  }[product.stockStatus];

  return (
    <div className={cn('card-aipan group', className)}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestseller && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-accent text-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.slug}`}
            className="w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <a
            href={`https://wa.me/${siteSettings.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Stock Status */}
        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', stockBadge.class)}>
          {stockBadge.label}
        </span>

        {/* Title */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-heading text-lg font-semibold mt-2 mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            + Add to Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
