import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';

export function CTABand() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-accent to-aipan-gold relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect fill="url(#cta-pattern)" width="100" height="100" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex w-16 h-16 bg-foreground/10 rounded-full items-center justify-center">
              <Gift className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-1">
                Planning a Festive Gift or Return Gifts?
              </h3>
              <p className="text-foreground/80">
                Get special bulk order pricing for weddings, housewarmings & corporate events
              </p>
            </div>
          </div>
          
          <Link
            to="/custom-orders"
            className="btn-primary bg-foreground text-accent hover:bg-foreground/90 inline-flex items-center gap-2 whitespace-nowrap"
          >
            Request Custom Bulk Order
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
