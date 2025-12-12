import { X, MapPin, Calendar, Clock, Package, QrCode } from 'lucide-react';
import { LostItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ItemDetailProps {
  item: LostItem;
  onClose: () => void;
}

export function ItemDetail({ item, onClose }: ItemDetailProps) {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimCode, setClaimCode] = useState<string | null>(null);
  
  const handleClaim = () => {
    // Generate a random 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setClaimCode(pin);
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
                Saya Pemilik Barang Ini
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-60 flex items-end justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-background rounded-t-3xl p-6 animate-slide-up">
            {!claimCode ? (
              <>
                <h2 className="text-xl font-bold text-center">Generate Kode Pengambilan?</h2>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Pastikan barang ini benar milik Anda. Kode hanya dapat digunakan sekali.
                </p>
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
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <QrCode size={32} className="text-success" />
                </div>
                <h2 className="text-xl font-bold">Kode Pengambilan</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Gunakan kode ini di Kiosk TemuKembali
                </p>
                
                <div className="mt-6 p-6 bg-surface rounded-2xl border-2 border-dashed border-primary/30">
                  <p className="text-4xl font-mono font-bold tracking-[0.3em] text-primary">
                    {claimCode}
                  </p>
                </div>
                
                <div className="mt-4 p-3 bg-warning/10 rounded-xl">
                  <p className="text-xs text-warning font-medium">
                    Loker: {item.lockerNumber}
                  </p>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Pindai atau masukkan kode ini di Kiosk TemuKembali untuk membuka loker.
                </p>
                
                <Button 
                  variant="default" 
                  className="w-full mt-6"
                  onClick={() => {
                    setShowClaimModal(false);
                    onClose();
                  }}
                >
                  Selesai
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
