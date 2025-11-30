import { Link } from 'react-router-dom';
import { Clock, Circle, Flame, Gift, LucideIcon } from 'lucide-react';
import { Category } from '@/data/products';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  circle: Circle,
  flame: Flame,
  gift: Gift,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Circle;

  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        'group block p-6 md:p-8 rounded-2xl bg-card border-2 border-transparent',
        'hover:border-primary/20 hover:shadow-hover transition-all duration-300',
        'text-center',
        className
      )}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-heading text-lg md:text-xl font-semibold mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {category.description}
      </p>
      <span className="text-sm font-medium text-primary">
        {category.productCount} Products →
      </span>
    </Link>
  );
}
