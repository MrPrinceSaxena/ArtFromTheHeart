import { MessageCircle } from 'lucide-react';
import { siteSettings } from '@/data/products';

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi! I'm interested in your Aipan art products.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
}
