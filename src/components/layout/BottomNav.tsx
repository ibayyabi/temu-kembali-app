import { Home, FileText, ClipboardList, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

interface BottomNavProps {
  activeTab: 'home' | 'report' | 'activity' | 'profile';
  onTabChange: (tab: 'home' | 'report' | 'activity' | 'profile') => void;
}

const navItems = [
  { id: 'home' as const, label: 'Beranda', icon: Home },
  { id: 'report' as const, label: 'Lapor', icon: FileText },
  { id: 'activity' as const, label: 'Aktivitas', icon: ClipboardList },
  { id: 'profile' as const, label: 'Akun', icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const reports = useAppStore((state) => state.reports);
  const activeReports = reports.filter(r => r.status === 'searching' || r.status === 'matched').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          const showBadge = item.id === 'activity' && activeReports > 0;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10"
              )}>
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-200"
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {activeReports}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium mt-0.5 transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
