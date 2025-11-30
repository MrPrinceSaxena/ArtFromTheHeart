import { Instagram } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',
  'https://images.unsplash.com/photo-1604422375771-c4d0e96a107e?w=400',
  'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400',
  'https://images.unsplash.com/photo-1605434644073-8ba0f9ab57f3?w=400',
  'https://images.unsplash.com/photo-1602523069600-0b50e7605138?w=400',
  'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400',
];

export function InstagramGallery() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-center gap-3">
          <Instagram className="w-6 h-6 text-primary" />
          <h3 className="font-heading text-xl font-semibold">
            Follow us <span className="text-primary">@artfromtheheartktm</span>
          </h3>
        </div>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide">
        {galleryImages.map((image, index) => (
          <a
            key={index}
            href="https://instagram.com/artfromtheheartktm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-48 md:w-64 aspect-square rounded-xl overflow-hidden group"
          >
            <img
              src={image}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
