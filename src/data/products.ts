export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  shortDescription: string;
  description: string;
  careInstructions: string;
  customization: string;
  images: string[];
  dimensions: string;
  material: string;
  processingTime: string;
  stockStatus: 'in-stock' | 'made-to-order' | 'out-of-stock';
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  isFeatured: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    slug: 'aipan-clocks',
    name: 'Aipan Clocks',
    description: 'Hand-painted wooden wall clocks with traditional Aipan art',
    icon: 'clock',
    productCount: 8,
  },
  {
    id: '2',
    slug: 'pooja-thali-sets',
    name: 'Pooja Thali Sets',
    description: 'Sacred ritual plates adorned with intricate Aipan patterns',
    icon: 'circle',
    productCount: 6,
  },
  {
    id: '3',
    slug: 'diyas-tealights',
    name: 'Diyas & Tea-lights',
    description: 'Handcrafted oil lamps and decorative tea-light holders',
    icon: 'flame',
    productCount: 10,
  },
  {
    id: '4',
    slug: 'festive-hampers',
    name: 'Festive Gift Hampers',
    description: 'Curated gift sets perfect for celebrations and occasions',
    icon: 'gift',
    productCount: 4,
  },
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'mandala-wall-clock-large',
    name: 'Mandala Wall Clock - Large',
    price: 1899,
    originalPrice: 2299,
    category: 'aipan-clocks',
    tags: ['diwali', 'housewarming', 'home-decor'],
    shortDescription: 'Hand-painted wooden wall clock with white mandala on red',
    description: 'This exquisite wall clock features a stunning hand-painted mandala design in pure white on a deep red background. Each clock is meticulously crafted by skilled artisans from Uttarakhand, bringing the traditional Aipan art form into your modern home. The clock movement is silent quartz, ensuring peaceful operation.',
    careInstructions: 'Wipe gently with a soft dry cloth. Avoid direct sunlight and moisture. Do not use water or cleaning solutions on the painted surface.',
    customization: 'Available in custom sizes (8", 10", 12"). Can add personalized text or family name in the center. Color variations available on request.',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800',
    ],
    dimensions: '12 inches diameter',
    material: 'MDF wood, acrylic paint, UV-coated finish',
    processingTime: '5-7 days',
    stockStatus: 'made-to-order',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: '2',
    slug: 'sacred-pooja-thali-complete',
    name: 'Sacred Pooja Thali Set',
    price: 2499,
    category: 'pooja-thali-sets',
    tags: ['navratri', 'daily-pooja', 'wedding'],
    shortDescription: 'Complete pooja thali with matching diyas and accessories',
    description: 'A complete sacred pooja set featuring a beautifully hand-painted thali with traditional Aipan geometric patterns. The set includes matching diyas, kumkum holder, and bell. Perfect for daily worship or special occasions like Navratri and Diwali.',
    careInstructions: 'Clean with a dry cloth after each use. Store in a dry place. The paint is water-resistant but avoid soaking.',
    customization: 'Can personalize with family deity name or custom mandala design. Size options: 10" or 12" diameter.',
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800',
      'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800',
    ],
    dimensions: '12 inches diameter (thali)',
    material: 'Brass base, hand-painted enamel',
    processingTime: '7-10 days',
    stockStatus: 'made-to-order',
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 23,
  },
  {
    id: '3',
    slug: 'aipan-diya-set-6',
    name: 'Aipan Diya Set of 6',
    price: 899,
    originalPrice: 1099,
    category: 'diyas-tealights',
    tags: ['diwali', 'daily-pooja', 'home-decor'],
    shortDescription: 'Set of 6 hand-painted terracotta diyas with Aipan motifs',
    description: 'Illuminate your sacred space with these beautiful hand-painted terracotta diyas. Each diya features unique Aipan dot and leaf patterns in white and yellow on rich red base. Perfect for Diwali celebrations or everyday pooja.',
    careInstructions: 'Allow to cool before handling. Wipe clean after use. Store carefully to preserve painted designs.',
    customization: 'Bulk orders available for weddings and events. Custom color combinations possible.',
    images: [
      'https://images.unsplash.com/photo-1604422375771-c4d0e96a107e?w=800',
      'https://images.unsplash.com/photo-1605434644073-8ba0f9ab57f3?w=800',
    ],
    dimensions: '3 inches diameter each',
    material: 'Terracotta, natural pigments',
    processingTime: '3-5 days',
    stockStatus: 'in-stock',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '4',
    slug: 'diwali-premium-hamper',
    name: 'Diwali Premium Gift Hamper',
    price: 3999,
    category: 'festive-hampers',
    tags: ['diwali', 'corporate-gifts', 'wedding'],
    shortDescription: 'Luxurious gift box with clock, diyas, and sweets',
    description: 'The ultimate Diwali gifting solution! This premium hamper includes a medium Aipan wall clock, set of 4 designer diyas, decorative tea-light holders, and space for adding sweets or dry fruits. Packed in an elegant gift box with Aipan-inspired design.',
    careInstructions: 'Individual care instructions included for each item in the hamper.',
    customization: 'Corporate branding available. Custom message cards. Choice of hamper contents based on budget.',
    images: [
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800',
    ],
    dimensions: 'Gift box: 14" x 12" x 6"',
    material: 'Mixed - MDF, terracotta, brass',
    processingTime: '7-10 days',
    stockStatus: 'made-to-order',
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 12,
  },
  {
    id: '5',
    slug: 'om-wall-clock',
    name: 'Om Symbol Wall Clock',
    price: 1599,
    category: 'aipan-clocks',
    tags: ['daily-pooja', 'housewarming', 'home-decor'],
    shortDescription: 'Elegant clock with sacred Om symbol and Aipan border',
    description: 'A beautiful fusion of spirituality and art, this wall clock features the sacred Om symbol at its center, surrounded by traditional Aipan border patterns. The design represents peace, prosperity, and divine energy in your home.',
    careInstructions: 'Dust regularly with soft cloth. Avoid humid locations. Replace battery annually.',
    customization: 'Available with different mantras: Om Namah Shivaya, Gayatri Mantra, etc.',
    images: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800',
    ],
    dimensions: '10 inches diameter',
    material: 'MDF wood, acrylic paint',
    processingTime: '5-7 days',
    stockStatus: 'made-to-order',
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: '6',
    slug: 'navratri-special-thali',
    name: 'Navratri Special Thali',
    price: 1799,
    category: 'pooja-thali-sets',
    tags: ['navratri', 'daily-pooja'],
    shortDescription: 'Nine-color inspired thali for Navratri celebrations',
    description: 'Designed especially for Navratri devotees, this thali incorporates subtle hints of the nine auspicious colors within the traditional Aipan framework. A beautiful blend of tradition and festive spirit.',
    careInstructions: 'Handle with care. Clean with soft dry cloth only.',
    customization: 'Can be customized with specific deity images or family traditions.',
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800',
    ],
    dimensions: '10 inches diameter',
    material: 'Steel base, enamel paint',
    processingTime: '5-7 days',
    stockStatus: 'in-stock',
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: '7',
    slug: 'tealight-holder-set',
    name: 'Decorative Tea-light Holder Set',
    price: 699,
    category: 'diyas-tealights',
    tags: ['home-decor', 'diwali', 'housewarming'],
    shortDescription: 'Set of 4 ceramic tea-light holders with Aipan designs',
    description: 'Transform any corner into a cozy sacred space with these stunning ceramic tea-light holders. Each piece is hand-painted with Aipan motifs, creating beautiful patterns when lit. Perfect for home décor or gifting.',
    careInstructions: 'Allow candle wax to cool before cleaning. Wipe with damp cloth.',
    customization: 'Available in sets of 4, 6, or 8. Custom colors on request.',
    images: [
      'https://images.unsplash.com/photo-1602523069600-0b50e7605138?w=800',
    ],
    dimensions: '3 inches each',
    material: 'Ceramic, food-safe paint',
    processingTime: '3-5 days',
    stockStatus: 'in-stock',
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    rating: 4.4,
    reviewCount: 28,
  },
  {
    id: '8',
    slug: 'wedding-return-gift-set',
    name: 'Wedding Return Gift Set',
    price: 599,
    category: 'festive-hampers',
    tags: ['wedding', 'corporate-gifts'],
    shortDescription: 'Elegant mini hamper perfect for return gifts',
    description: 'An affordable yet elegant gift set perfect for wedding return gifts or corporate events. Includes a small decorative plate and two tea-light holders, all featuring coordinated Aipan designs. Packed in a beautiful gift pouch.',
    careInstructions: 'Individual care cards included.',
    customization: 'Minimum order: 25 sets. Custom thank you cards available. Bulk pricing on request.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    ],
    dimensions: 'Plate: 6", Tea-lights: 2" each',
    material: 'Ceramic, brass',
    processingTime: '10-14 days for bulk',
    stockStatus: 'made-to-order',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 156,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    review: 'Absolutely stunning craftsmanship! The wall clock I ordered exceeded my expectations. It\'s now the centerpiece of my living room.',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Rajesh Patel',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    review: 'Ordered 50 return gift sets for my daughter\'s wedding. The quality and attention to detail was remarkable. Highly recommended!',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Meera Nair',
    location: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    review: 'The pooja thali set is divine! Each piece is so thoughtfully crafted. My daily prayers feel more special now.',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Amit Verma',
    location: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    rating: 4,
    review: 'Great Diwali gifts for our corporate clients. Professional packaging and timely delivery. Will order again!',
    isFeatured: false,
  },
];

export const siteSettings = {
  siteName: 'ArtFromTheHeart',
  tagline: 'Handmade Aipan Art for Your Sacred Spaces',
  heroHeading: 'Handmade Aipan Art for Your Sacred Spaces',
  heroSubheading: 'Discover exquisite hand-painted clocks, pooja thalis, and diyas crafted with love from Uttarakhand',
  whatsappNumber: '8865927722',
  email: 'artfromtheheartktm.com',
  instagram: 'artfromtheheart.in',
  footerTagline: 'Handmade with ♥ in Uttarakhand',
  location: 'Khatima, Uttarakhand',
};
