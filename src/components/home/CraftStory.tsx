import { Paintbrush, Heart, Package, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Concept & Customization',
    description: 'Share your vision and we design a unique piece just for you',
  },
  {
    icon: Paintbrush,
    title: 'Hand Drawing & Painting',
    description: 'Each motif is carefully hand-painted using traditional techniques',
  },
  {
    icon: Heart,
    title: 'Sealing & Finishing',
    description: 'UV-coated finish for durability and lasting beauty',
  },
  {
    icon: Package,
    title: 'Packed With Love',
    description: 'Securely packaged and shipped to your doorstep',
  },
];

export function CraftStory() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect fill="url(#dots)" width="100" height="100" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary-foreground/20 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            The Art of Aipan
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            How We Craft Your Piece
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Aipan is a traditional folk art from Kumaon, Uttarakhand. Using rice paste and natural 
            colors, artisans create sacred geometric patterns that have been passed down for generations.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-primary-foreground/20" />
              )}
              
              {/* Step Number */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-foreground" />
              </div>
              
              <h3 className="font-heading text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-primary-foreground/80 max-w-3xl mx-auto">
            Each piece takes 5-7 days to complete, as our artisans dedicate their full attention 
            to every brushstroke. We believe that good art cannot be rushed.
          </p>
        </div>
      </div>
    </section>
  );
}
