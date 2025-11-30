import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden section-pattern">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Mandala Pattern - Right Side */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <defs>
            <pattern id="mandala" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#mandala)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Handcrafted in Uttarakhand
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Handmade{' '}
              <span className="text-gradient">Aipan Art</span>{' '}
              for Your Sacred Spaces
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Discover exquisite hand-painted wall clocks, pooja thalis, and diyas 
              crafted with love, preserving the ancient art tradition of Kumaon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/shop?category=aipan-clocks"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Explore Aipan Clocks
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                View All Products
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                500+ Happy Customers
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                100% Handmade
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Pan India Delivery
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up delay-200">
            <div className="relative z-10 aspect-square max-w-lg mx-auto">
              {/* Main Product Image */}
              <div className="absolute inset-4 md:inset-8 bg-primary rounded-full overflow-hidden shadow-hover animate-float">
                <img
                  src="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800"
                  alt="Handmade Aipan Wall Clock"
                  className="w-full h-full object-cover"
                />
                {/* Mandala Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
              
              {/* Decorative Ring */}
              <div className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
              
              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 bg-card p-3 rounded-xl shadow-card animate-float" style={{ animationDelay: '0.5s' }}>
                <p className="text-xs font-medium">⭐ 4.9 Rating</p>
              </div>
              <div className="absolute -right-4 bottom-1/4 bg-accent text-foreground p-3 rounded-xl shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-xs font-bold">Made to Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
