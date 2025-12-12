import { Search, FileText, Clock, CheckCircle, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { LostReport, mockItems, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ActivityScreenProps {
  onViewMatch: (itemId: string) => void;
}

const statusConfig = {
  searching: {
    label: 'Mencari',
    icon: Search,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  matched: {
    label: 'Ditemukan',
    icon: Sparkles,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  completed: {
    label: 'Selesai',
    icon: CheckCircle,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  },
  expired: {
    label: 'Kedaluwarsa',
    icon: AlertCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ReportCard({ report, onViewMatch }: { report: LostReport; onViewMatch: (itemId: string) => void }) {
  const status = statusConfig[report.status];
  const StatusIcon = status.icon;
  const category = categories.find(c => c.id === report.category);
  const matchedItem = report.matchedItemId ? mockItems.find(i => i.id === report.matchedItemId) : null;

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-soft p-4 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{report.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {category?.label} • {report.location}
          </p>
        </div>
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
          <StatusIcon size={12} />
          <span>{status.label}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
        <Clock size={12} />
        <span>Dilaporkan {formatDate(report.createdAt)}</span>
      </div>
      
      {report.status === 'matched' && matchedItem && (
        <button
          onClick={() => onViewMatch(matchedItem.id)}
          className="mt-3 w-full flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-xl hover:bg-success/10 transition-colors"
        >
          <img 
            src={matchedItem.imageUrl} 
            alt={matchedItem.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-foreground">{matchedItem.name}</p>
            <p className="text-xs text-success">Cocok dengan laporan Anda</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      )}
      
      {report.status === 'searching' && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-primary/5 rounded-xl">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          <p className="text-xs text-muted-foreground">AI sedang mencari kecocokan...</p>
        </div>
      )}
    </div>
  );
}

export function ActivityScreen({ onViewMatch }: ActivityScreenProps) {
  const reports = useAppStore((state) => state.reports);

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-background px-4 pt-12 pb-4 border-b border-border/50">
        <h1 className="text-xl font-bold text-foreground">Aktivitas</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Riwayat laporan kehilangan Anda</p>
      </div>

      <div className="px-4 py-4">
        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div key={report.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <ReportCard report={report} onViewMatch={onViewMatch} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
              <FileText size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Belum Ada Laporan</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              Laporan kehilangan Anda akan muncul di sini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
