import { MapPin, Clock } from 'lucide-react';
import { LostItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  item: LostItem;
  onClick: () => void;
  variant?: 'default' | 'compact';
}

export function ItemCard({ item, onClick, variant = 'default' }: ItemCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden",
        "transition-all duration-200 hover:shadow-elevated hover:scale-[1.02] hover:border-primary/20",
        "text-left group"
      )}
    >
      <div className={cn(
        "aspect-square overflow-hidden bg-surface",
        isCompact ? "h-28" : "h-36"
      )}>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className={cn("p-3", isCompact && "p-2.5")}>
        <h3 className={cn(
          "font-semibold text-foreground line-clamp-1",
          isCompact ? "text-sm" : "text-base"
        )}>
          {item.name}
        </h3>
        
        <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
          <MapPin size={12} className="shrink-0" />
          <span className="text-xs line-clamp-1">{item.location}</span>
        </div>
        
        {!isCompact && (
          <div className="flex items-center gap-1 mt-1 text-muted-foreground">
            <Clock size={12} className="shrink-0" />
            <span className="text-xs">{item.timeFound}</span>
          </div>
        )}
        
        <div className="mt-2">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
            item.status === 'available' 
              ? "bg-success/10 text-success" 
              : "bg-muted text-muted-foreground"
          )}>
            {item.status === 'available' ? 'Tersedia di Loker' : 'Sudah Diambil'}
          </span>
        </div>
      </div>
    </button>
  );
}
