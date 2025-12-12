import { X, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  title: string;
  message: string;
  onClose: () => void;
  onClick: () => void;
}

export function NotificationBanner({ title, message, onClose, onClick }: NotificationBannerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] p-4 animate-slide-down">
      <div className="max-w-md mx-auto">
        <div 
          className={cn(
            "bg-card border border-success/30 rounded-2xl shadow-elevated p-4",
            "cursor-pointer hover:border-success/50 transition-all"
          )}
          onClick={onClick}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0 animate-pulse-soft">
              <Sparkles size={20} className="text-primary-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm">{title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{message}</p>
              
              <div className="flex items-center gap-1 mt-2 text-primary text-xs font-medium">
                <span>Lihat Detail</span>
                <ArrowRight size={12} />
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 hover:bg-muted rounded-lg transition-colors shrink-0"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
