import { Smartphone, Key, Wallet, CupSoda, Package } from 'lucide-react';
import { Category, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: Category | 'all';
  onSelect: (category: Category | 'all') => void;
}

const iconMap = {
  Smartphone,
  Key,
  Wallet,
  CupSoda,
  Package,
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 -mx-4 px-4">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          selected === 'all'
            ? "gradient-primary text-primary-foreground shadow-soft"
            : "bg-surface text-muted-foreground hover:bg-surface-hover hover:text-foreground border border-border/50"
        )}
      >
        Semua
      </button>
      
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon as keyof typeof iconMap];
        const isSelected = selected === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
              isSelected
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "bg-surface text-muted-foreground hover:bg-surface-hover hover:text-foreground border border-border/50"
            )}
          >
            {Icon && <Icon size={14} />}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
