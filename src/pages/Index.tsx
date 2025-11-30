import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { CraftStory } from '@/components/home/CraftStory';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTABand } from '@/components/home/CTABand';
import { InstagramGallery } from '@/components/home/InstagramGallery';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <CraftStory />
        <TestimonialsSection />
        <InstagramGallery />
        <CTABand />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
