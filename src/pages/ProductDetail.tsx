import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MessageCircle, Plus, Minus, ChevronRight, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ProductCard } from '@/components/products/ProductCard';
import { products, siteSettings } from '@/data/products';
import { useEnquiryCart } from '@/hooks/useEnquiryCart';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useEnquiryCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const stockBadge = {
    'in-stock': { label: 'Ready to Ship', class: 'bg-green-500/10 text-green-700' },
    'made-to-order': { label: 'Made to Order', class: 'bg-accent/20 text-aipan-gold' },
    'out-of-stock': { label: 'Out of Stock', class: 'bg-muted text-muted-foreground' },
  }[product.stockStatus];

  const handleAddToEnquiry = () => {
    addItem(product, quantity, customText);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (₹${product.price}).\n\nQuantity: ${quantity}${customText ? `\nCustom text: ${customText}` : ''}\n\nPlease share availability and delivery details.`
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-primary/50'
                      )}
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

            {/* Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={cn('text-sm font-medium px-3 py-1 rounded-full', stockBadge.class)}>
                  {stockBadge.label}
                </span>
                {product.isBestseller && (
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent text-foreground">
                    New
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.shortDescription}</p>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Material</p>
                  <p className="font-medium">{product.material}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing Time</p>
                  <p className="font-medium">{product.processingTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customization</p>
                  <p className="font-medium">Available</p>
                </div>
              </div>

              {/* Custom Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Custom Text / Name (Optional)
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g., Sharma Family, Om Namah Shivaya"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted rounded-l-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted rounded-r-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToEnquiry}
                  disabled={product.stockStatus === 'out-of-stock'}
                  className={cn(
                    'flex-1 btn-outline flex items-center justify-center gap-2',
                    added && 'bg-green-500 text-white border-green-500'
                  )}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Enquiry
                    </>
                  ) : (
                    'Add to Enquiry Cart'
                  )}
                </button>
                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex border-b border-border overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'customization', label: 'Customization' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-4 font-medium transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="py-6">
              {activeTab === 'description' && (
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'care' && (
                <p className="text-muted-foreground leading-relaxed">{product.careInstructions}</p>
              )}
              {activeTab === 'customization' && (
                <p className="text-muted-foreground leading-relaxed">{product.customization}</p>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
