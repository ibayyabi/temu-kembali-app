import { Package, CheckCircle, Archive } from 'lucide-react';
import { todayStats } from '@/data/mockData';

export function StatsCard() {
  const stats = [
    {
      icon: Package,
      label: 'Ditemukan Hari Ini',
      value: todayStats.itemsFound,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: CheckCircle,
      label: 'Diklaim Hari Ini',
      value: todayStats.itemsClaimed,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Archive,
      label: 'Total di Loker',
      value: todayStats.totalInLocker,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`
              bg-card rounded-2xl border border-border/50 p-3 shadow-soft
              animate-fade-in-up stagger-${index + 1}
            `}
            style={{ animationFillMode: 'backwards' }}
          >
            <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}>
              <Icon size={16} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
