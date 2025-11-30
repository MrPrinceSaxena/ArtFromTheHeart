import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ProductCard } from '@/components/products/ProductCard';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₹1,000', value: '0-1000' },
  { label: '₹1,000 - ₹2,000', value: '1000-2000' },
  { label: 'Above ₹2,000', value: '2000-999999' },
];

const occasions = ['diwali', 'navratri', 'housewarming', 'wedding', 'daily-pooja', 'corporate-gifts'];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';
  const activePriceRange = searchParams.get('price') || 'all';
  const activeOccasions = searchParams.get('occasions')?.split(',').filter(Boolean) || [];
  const sortBy = searchParams.get('sort') || 'newest';

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const toggleOccasion = (occasion: string) => {
    let newOccasions = [...activeOccasions];
    if (newOccasions.includes(occasion)) {
      newOccasions = newOccasions.filter((o) => o !== occasion);
    } else {
      newOccasions.push(occasion);
    }
    updateFilters('occasions', newOccasions.join(','));
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query))
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price filter
    if (activePriceRange !== 'all') {
      const [min, max] = activePriceRange.split('-').map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Occasions filter
    if (activeOccasions.length > 0) {
      result = result.filter((p) =>
        activeOccasions.some((o) => p.tags.includes(o))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [searchQuery, activeCategory, activePriceRange, activeOccasions, sortBy]);

  const hasActiveFilters = activeCategory !== 'all' || activePriceRange !== 'all' || activeOccasions.length > 0 || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Shop Aipan Art
            </h1>
            <p className="text-muted-foreground">
              Explore our collection of handcrafted traditional art pieces
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-outline flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => updateFilters('sort', e.target.value)}
                className="appearance-none w-full md:w-48 px-4 py-3 pr-10 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={cn(
                'fixed inset-0 z-50 bg-card md:relative md:inset-auto md:z-auto',
                'w-full md:w-64 flex-shrink-0 p-6 md:p-0',
                'transition-transform duration-300 md:transition-none',
                showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              )}
            >
              {/* Mobile Close Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden absolute top-4 right-4"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-heading font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilters('category', 'all')}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg transition-colors',
                        activeCategory === 'all'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted'
                      )}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => updateFilters('category', cat.slug)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg transition-colors',
                          activeCategory === cat.slug
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-muted'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-heading font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => updateFilters('price', range.value)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg transition-colors',
                          activePriceRange === range.value
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-muted'
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasions */}
                <div>
                  <h3 className="font-heading font-semibold mb-4">Occasions</h3>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() => toggleOccasion(occasion)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm border transition-colors capitalize',
                          activeOccasions.includes(occasion)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {occasion.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full text-primary font-medium hover:underline"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No products found matching your criteria
                  </p>
                  <button onClick={clearFilters} className="btn-primary">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
