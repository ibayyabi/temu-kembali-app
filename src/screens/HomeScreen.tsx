import { Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/items/StatsCard';
import { ItemCard } from '@/components/items/ItemCard';
import { Button } from '@/components/ui/button';
import { mockItems, LostItem } from '@/data/mockData';

interface HomeScreenProps {
  onItemClick: (item: LostItem) => void;
  onReportClick: () => void;
}

export function HomeScreen({ onItemClick, onReportClick }: HomeScreenProps) {
  const recentItems = mockItems.slice(0, 6);

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Header />
      
      <div className="px-4 -mt-2">
        <StatsCard />
        
        {/* Quick Report CTA */}
        <div className="mt-4 bg-card rounded-2xl border border-border/50 p-4 shadow-card animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Kehilangan Barang?</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Buat laporan agar kami bisa bantu cari
              </p>
            </div>
            <Button variant="soft" size="sm" onClick={onReportClick}>
              <Plus size={16} />
              Lapor
            </Button>
          </div>
        </div>
        
        {/* Recent Items */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Baru Ditemukan</h2>
            <button className="text-sm text-primary font-medium">Lihat Semua</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {recentItems.map((item, index) => (
              <div 
                key={item.id}
                className={`animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
                style={{ animationFillMode: 'backwards' }}
              >
                <ItemCard
                  item={item}
                  onClick={() => onItemClick(item)}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAB */}
      <Button
        variant="fab"
        size="fab"
        className="fixed bottom-24 right-4 z-40"
        onClick={onReportClick}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
}
