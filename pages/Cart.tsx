import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { useEnquiryCart } from '@/hooks/useEnquiryCart';
import { siteSettings } from '@/data/products';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getWhatsAppMessage } = useEnquiryCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            Enquiry Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Add some beautiful Aipan art pieces to your cart
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="card-aipan p-4 md:p-6 flex gap-4"
                  >
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-heading font-semibold hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.shortDescription}
                      </p>
                      {item.customText && (
                        <p className="text-sm text-primary mb-2">
                          Custom: {item.customText}
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        ₹{item.product.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-muted rounded-l-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-muted rounded-r-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear all items
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="card-aipan p-6 sticky top-24">
                  <h2 className="font-heading text-xl font-bold mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total</span>
                      <span className="text-primary">₹{total}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Final price may vary based on customization
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${siteSettings.whatsappNumber}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send Enquiry via WhatsApp
                    </a>
                    <Link
                      to="/shop"
                      className="w-full btn-outline flex items-center justify-center gap-2"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    This is an enquiry cart. Final order will be confirmed via WhatsApp.
                  </p>
                </div>
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
