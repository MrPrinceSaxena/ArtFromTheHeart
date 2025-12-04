import { Heart, Award, Users, Truck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

const milestones = [
  { year: '2019', title: 'The Beginning', description: 'Started as a passion project, painting Aipan art for friends and family' },
  { year: '2020', title: 'First 100 Orders', description: 'Word spread and we reached our first 100 happy customers' },
  { year: '2022', title: 'Team Expansion', description: 'Welcomed local artisans to meet growing demand while keeping quality' },
  { year: '2024', title: '500+ Deliveries', description: 'Shipped handmade happiness to homes across India' },
];

const stats = [
  { icon: Users, value: '500+', label: 'Happy Customers' },
  { icon: Award, value: '100%', label: 'Handmade' },
  { icon: Heart, value: '5+', label: 'Years of Love' },
  { icon: Truck, value: 'Pan India', label: 'Delivery' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 section-pattern">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ArtFromTheHeart was born from a deep love for the traditional Aipan art of 
                Kumaon, Uttarakhand. What started as a personal passion to preserve this 
                beautiful folk art has grown into a mission to bring handcrafted sacred 
                art into homes across India.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-primary-foreground">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Aipan */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">
                  The Art of Aipan
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Aipan is a traditional folk art from the Kumaon region of Uttarakhand. 
                    Originally created using rice paste on red ochre-washed walls and floors, 
                    this art form has been passed down through generations of women.
                  </p>
                  <p>
                    The geometric patterns, mandalas, and motifs in Aipan are deeply symbolic, 
                    representing various deities, auspicious symbols, and elements of nature. 
                    Each design carries meaning and is created for specific occasions and rituals.
                  </p>
                  <p>
                    At ArtFromTheHeart, we adapt these sacred patterns onto modern surfaces 
                    like wooden clocks, metal thalis, and ceramic diyas—making it possible 
                    for you to have this beautiful art in your everyday life.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800"
                  alt="Traditional Aipan art"
                  className="rounded-2xl shadow-card"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-foreground p-4 rounded-xl shadow-lg">
                  <p className="font-heading font-semibold">100% Hand-Painted</p>
                  <p className="text-sm">Every piece is unique</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Artist */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 text-center md:text-left">
                <span className="text-primary font-medium">Meet the Artist</span>
                <h2 className="font-heading text-3xl font-bold mt-2 mb-6">
                  Crafted with Love
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Every piece from ArtFromTheHeart is created by skilled artisans who have 
                    learned this craft from their mothers and grandmothers. Our lead artist 
                    has been practicing Aipan for over 15 years.
                  </p>
                  <p>
                    We believe in fair trade and ensuring our artisans are compensated well 
                    for their skills. When you purchase from us, you're directly supporting 
                    traditional craftspeople and helping keep this ancient art alive.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400"
                    alt="Artist at work"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">
              Our Journey
            </h2>
            <div className="max-w-2xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-primary/20 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-heading text-lg font-semibold mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
