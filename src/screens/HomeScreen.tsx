import { FileText, ArrowRight, Package, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface HomeScreenProps {
  onReportClick: () => void;
  onActivityClick: () => void;
}

export function HomeScreen({ onReportClick, onActivityClick }: HomeScreenProps) {
  const reports = useAppStore((state) => state.reports);
  const activeReports = reports.filter(r => r.status === 'searching' || r.status === 'matched').length;
  const matchedReports = reports.filter(r => r.status === 'matched').length;

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Header />
      
      <div className="px-4 -mt-2 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
          <div className="bg-card rounded-2xl border border-border/50 p-4 shadow-soft">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
              <FileText size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{activeReports}</p>
            <p className="text-xs text-muted-foreground">Laporan Aktif</p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border/50 p-4 shadow-soft">
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center mb-2">
              <CheckCircle size={20} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{matchedReports}</p>
            <p className="text-xs text-muted-foreground">Barang Ditemukan</p>
          </div>
        </div>

        {/* Main CTA Card */}
        <div 
          className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden animate-fade-in-up stagger-2 cursor-pointer hover:shadow-elevated transition-shadow"
          onClick={onReportClick}
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mb-3">
                  <Package size={24} className="text-primary-foreground" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Barang Hilang?</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Lapor sekarang dan biarkan AI kami membantu mencari kecocokan
                </p>
              </div>
            </div>
            
            <Button variant="default" size="lg" className="w-full mt-4">
              Lapor Sekarang
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Active Reports Preview */}
        {matchedReports > 0 && (
          <div 
            className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-fade-in-up stagger-3 cursor-pointer hover:bg-success/10 transition-colors"
            onClick={onActivityClick}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Kabar Baik!</p>
                  <p className="text-xs text-muted-foreground">{matchedReports} barang cocok dengan laporan Anda</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-success" />
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-6 animate-fade-in-up stagger-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Cara Kerja</h3>
          <div className="space-y-3">
            {[
              { step: 1, title: 'Lapor Kehilangan', desc: 'Isi form dengan detail barang yang hilang' },
              { step: 2, title: 'AI Mencari Kecocokan', desc: 'Sistem kami otomatis mencari di database' },
              { step: 3, title: 'Ambil di Loker', desc: 'Gunakan QR Code untuk buka loker' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
