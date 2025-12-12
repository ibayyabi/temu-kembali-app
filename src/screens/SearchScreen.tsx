import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CategoryFilter } from '@/components/items/CategoryFilter';
import { ItemCard } from '@/components/items/ItemCard';
import { mockItems, LostItem, Category } from '@/data/mockData';

interface SearchScreenProps {
  onItemClick: (item: LostItem) => void;
}

export function SearchScreen({ onItemClick }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-background px-4 pt-12 pb-4 border-b border-border/50">
        <h1 className="text-xl font-bold text-foreground mb-4">Cari Barang</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari barang hilangmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-12 bg-surface border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 rounded-lg text-primary">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-background px-4 py-3 border-b border-border/50">
        <CategoryFilter 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
      </div>
      
      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-sm text-muted-foreground mb-3">
          {filteredItems.length} barang ditemukan
        </p>
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className={`animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
                style={{ animationFillMode: 'backwards' }}
              >
                <ItemCard
                  item={item}
                  onClick={() => onItemClick(item)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Tidak ada barang yang cocok</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Coba kata kunci lain</p>
          </div>
        )}
      </div>
    </div>
  );
}
