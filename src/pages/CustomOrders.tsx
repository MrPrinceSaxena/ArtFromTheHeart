import { useState } from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { siteSettings } from '@/data/products';
import { toast } from 'sonner';

const productTypes = [
  'Aipan Clocks',
  'Pooja Thali Sets',
  'Diyas & Tea-lights',
  'Gift Hampers',
  'Home Decor Plates',
  'Custom Design',
];

const budgetRanges = [
  '₹500 - ₹1,000 per piece',
  '₹1,000 - ₹2,000 per piece',
  '₹2,000 - ₹5,000 per piece',
  'Above ₹5,000 per piece',
];

const features = [
  {
    title: 'Bulk Orders',
    description: 'Special pricing for orders of 25+ pieces',
    icon: '📦',
  },
  {
    title: 'Corporate Gifting',
    description: 'Add your company branding or custom message',
    icon: '🏢',
  },
  {
    title: 'Wedding Favors',
    description: 'Unique return gifts for your special day',
    icon: '💒',
  },
  {
    title: 'Custom Designs',
    description: 'Share your idea, we bring it to life',
    icon: '🎨',
  },
];

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    productType: '',
    quantity: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Request submitted! We will contact you within 24 hours.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in placing a custom bulk order.\n\nProduct: ${formData.productType || 'Not specified'}\nQuantity: ${formData.quantity || 'Not specified'}\nBudget: ${formData.budget || 'Not specified'}\n\nPlease get in touch.`
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Custom & Bulk Orders
            </h1>
            <p className="text-lg text-muted-foreground">
              Planning a special event or corporate gifting? We create customized 
              Aipan art pieces tailored to your needs.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-aipan p-4 md:p-6 text-center"
              >
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="font-heading font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-aipan p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold mb-6">
                  Request a Quote
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your interest. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          city: '',
                          productType: '',
                          quantity: '',
                          budget: '',
                          message: '',
                        });
                      }}
                      className="btn-outline"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Product Type *</label>
                        <select
                          name="productType"
                          required
                          value={formData.productType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select type</option>
                          {productTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Quantity *</label>
                        <input
                          type="number"
                          name="quantity"
                          required
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="e.g., 50"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message / Requirements
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements, occasion, customization needs..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-primary disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                      <a
                        href={`https://wa.me/${siteSettings.whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-outline flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-aipan p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  How It Works
                </h3>
                <ol className="space-y-4">
                  {[
                    'Submit your requirements through the form',
                    'We contact you to discuss design and quantity',
                    'Receive a customized quote within 24 hours',
                    'Approve design mockups before production',
                    'Receive your handcrafted pieces on time',
                  ].map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card-aipan p-6 bg-primary text-primary-foreground">
                <h3 className="font-heading text-lg font-semibold mb-2">
                  Minimum Order Quantity
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  For bulk pricing benefits, we recommend a minimum order of 25 pieces. 
                  Smaller quantities are welcome at regular pricing.
                </p>
                <p className="text-sm text-accent font-medium">
                  🎁 10% off on orders above 50 pieces
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
