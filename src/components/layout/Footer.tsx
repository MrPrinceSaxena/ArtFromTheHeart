import { Link } from 'react-router-dom';
import { Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { siteSettings } from '@/data/products';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-foreground fill-current" />
              </div>
              <span className="font-heading text-xl font-bold">
                ArtFromTheHeart
              </span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Preserving the ancient Aipan art tradition of Uttarakhand through 
              handcrafted home décor and sacred items.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://instagram.com/${siteSettings.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent hover:text-foreground rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent hover:text-foreground rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent hover:text-foreground rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: 'Shop All' },
                { href: '/shop?category=aipan-clocks', label: 'Aipan Clocks' },
                { href: '/shop?category=pooja-thali-sets', label: 'Pooja Thalis' },
                { href: '/custom-orders', label: 'Custom Orders' },
                { href: '/about', label: 'Our Story' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-3">
              {[
                { href: '/contact', label: 'Contact Us' },
                { href: '/faq', label: 'FAQs' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns & Refunds' },
                { href: '/care', label: 'Care Instructions' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium">WhatsApp / Call</p>
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-primary-foreground/80">
                    {siteSettings.location}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/80 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ArtFromTheHeart. All rights reserved.
            </p>
            <p className="text-primary-foreground/80 text-sm flex items-center gap-1">
              {siteSettings.footerTagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
