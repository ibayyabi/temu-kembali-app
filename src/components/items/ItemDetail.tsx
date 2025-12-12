import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Package, Timer, CheckCircle, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LostItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ItemDetailProps {
  item: LostItem;
  onClose: () => void;
  isMatchedItem?: boolean;
}

export function ItemDetail({ item, onClose, isMatchedItem = false }: ItemDetailProps) {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimCode, setClaimCode] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [copied, setCopied] = useState(false);
  
  // Countdown timer
  useEffect(() => {
    if (!claimCode || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [claimCode, timeRemaining]);

  const handleClaim = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setClaimCode(pin);
  };

  const handleCopyCode = () => {
    if (claimCode) {
      navigator.clipboard.writeText(claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // QR Code Screen
  if (claimCode) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="gradient-primary text-primary-foreground px-4 pt-12 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Kode Pengambilan</h1>
                <p className="text-primary-foreground/70 text-sm mt-0.5">Scan di Kiosk TemuKembali</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-primary-foreground/10 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Timer Warning */}
            <div className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-xl mb-6",
              timeRemaining > 300 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
            )}>
              <Timer size={18} />
              <span className="text-sm font-semibold">Valid selama {formatTime(timeRemaining)}</span>
            </div>

            {/* QR Code */}
            <div className="bg-card rounded-3xl border border-border/50 shadow-elevated p-6 text-center animate-scale-in">
              <div className="inline-block p-4 bg-background rounded-2xl border border-border/50">
                <QRCodeSVG
                  value={`TEMUKEMBALI:${claimCode}:${item.lockerNumber}`}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-2">atau masukkan kode</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-mono font-bold tracking-[0.2em] text-primary">
                    {claimCode}
                  </span>
                  <button 
                    onClick={handleCopyCode}
                    className="p-2 bg-surface rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    {copied ? (
                      <Check size={18} className="text-success" />
                    ) : (
                      <Copy size={18} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Locker Info */}
            <div className="mt-6 p-4 bg-card rounded-2xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nomor Loker</p>
                  <p className="text-2xl font-bold text-foreground">{item.lockerNumber}</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-foreground">Cara Pengambilan</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold shrink-0">1</span>
                  <span>Kunjungi Kiosk TemuKembali di lokasi kampus</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold shrink-0">2</span>
                  <span>Scan QR Code atau masukkan kode di layar Kiosk</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold shrink-0">3</span>
                  <span>Loker {item.lockerNumber} akan terbuka otomatis</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold shrink-0">4</span>
                  <span>Ambil barang Anda dan tutup kembali loker</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="p-4 bg-background border-t border-border/50 safe-bottom">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full"
              onClick={onClose}
            >
              <CheckCircle size={18} />
              Selesai
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="relative h-full overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-72 bg-surface">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-soft"
          >
            <X size={20} />
          </button>
          
          {isMatchedItem && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-success/90 text-success-foreground rounded-full text-xs font-semibold backdrop-blur-sm">
              ✨ Cocok dengan laporan Anda
            </div>
          )}
          
          <div className="absolute bottom-4 right-4">
            <span className={`
              inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm
              ${item.status === 'available' 
                ? 'bg-success/90 text-success-foreground' 
                : 'bg-muted/90 text-muted-foreground'}
            `}>
              {item.status === 'available' ? 'Tersedia di Loker' : 'Sudah Diambil'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 -mt-4 relative">
          <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-surface rounded-lg">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ditemukan di</p>
                <p className="text-sm font-medium text-foreground">{item.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-surface rounded-lg">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tanggal</p>
                <p className="text-sm font-medium text-foreground">{formatDate(item.dateFound)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-surface rounded-lg">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Waktu</p>
                <p className="text-sm font-medium text-foreground">{item.timeFound} WIB</p>
              </div>
            </div>
            
            {item.lockerNumber && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 bg-surface rounded-lg">
                  <Package size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Loker</p>
                  <p className="text-sm font-medium text-foreground">{item.lockerNumber}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-2">Deskripsi</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Claim Button */}
          {item.status === 'available' && (
            <div className="mt-8 pb-8">
              <Button 
                variant="claim" 
                size="xl" 
                className="w-full"
                onClick={() => setShowClaimModal(true)}
              >
                Saya Ingin Mengambil Barang Ini
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-60 flex items-end justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-background rounded-t-3xl p-6 animate-slide-up">
            <h2 className="text-xl font-bold text-center">Konfirmasi Pengambilan</h2>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Pastikan barang ini benar milik Anda. Kode hanya dapat digunakan sekali dan valid selama 1 jam.
            </p>
            
            <div className="mt-4 p-3 bg-warning/10 rounded-xl">
              <p className="text-xs text-warning text-center font-medium">
                ⚠️ Pengambilan barang yang bukan milik Anda dapat dikenakan sanksi
              </p>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowClaimModal(false)}
              >
                Batal
              </Button>
              <Button 
                variant="claim" 
                className="flex-1"
                onClick={handleClaim}
              >
                Generate Kode
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
