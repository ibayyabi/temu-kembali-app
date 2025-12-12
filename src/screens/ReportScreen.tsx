import { useState, useEffect } from 'react';
import { Camera, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Loader2, Calendar as CalendarIcon, Upload, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, locations, mockItems, LostReport } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface ReportScreenProps {
  onMatchFound: (itemId: string, reportId: string) => void;
}

type Step = 1 | 2 | 3;

export function ReportScreen({ onMatchFound }: ReportScreenProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    date: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'category' | 'location' | null>(null);
  
  const { addReport, updateReportStatus, addNotification } = useAppStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReport: LostReport = {
      id: `r-${Date.now()}`,
      name: formData.name,
      category: formData.category as any,
      location: formData.location,
      date: formData.date,
      description: formData.description,
      status: 'searching',
      createdAt: new Date().toISOString(),
    };
    
    addReport(newReport);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // AI Matching Simulation - wait 5-8 seconds then show match
    const matchDelay = 5000 + Math.random() * 3000;
    
    setTimeout(() => {
      // Find a matching item (for demo, match based on location or random)
      const matchedItem = mockItems.find(item => 
        item.location === formData.location && item.status === 'available'
      ) || mockItems.find(item => item.status === 'available');
      
      if (matchedItem) {
        updateReportStatus(newReport.id, 'matched', matchedItem.id);
        addNotification({
          id: `n-${Date.now()}`,
          type: 'match',
          title: 'Kabar Baik! 🎉',
          message: `AI menemukan 1 barang yang cocok dengan laporan "${formData.name}" Anda.`,
          itemId: matchedItem.id,
          reportId: newReport.id,
          createdAt: new Date().toISOString(),
          read: false,
        });
        onMatchFound(matchedItem.id, newReport.id);
      }
    }, matchDelay);
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', location: '', date: '', description: '' });
    setStep(1);
    setShowSuccess(false);
  };

  const isStep1Valid = formData.name && formData.category;
  const isStep2Valid = formData.location && formData.date;
  
  // Loading Screen
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 gradient-primary rounded-full flex items-center justify-center">
              <Loader2 size={32} className="text-primary-foreground animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground">Mengirim Laporan...</h2>
          <p className="text-sm text-muted-foreground mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Laporan Terkirim!</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            AI kami sedang mencari kecocokan dengan barang yang ditemukan.
          </p>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles size={18} className="animate-pulse-soft" />
              <span className="text-sm font-medium">Memproses dengan AI...</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Anda akan mendapat notifikasi jika barang ditemukan
            </p>
          </div>
          
          <Button 
            variant="default" 
            className="mt-6"
            onClick={resetForm}
          >
            Buat Laporan Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button 
              onClick={() => setStep((step - 1) as Step)}
              className="p-2 bg-primary-foreground/10 rounded-xl"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold">Lapor Kehilangan</h1>
            <p className="text-primary-foreground/70 text-sm mt-0.5">
              Langkah {step} dari 3
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={cn(
                "flex-1 h-1 rounded-full transition-all duration-300",
                s <= step ? "bg-primary-foreground" : "bg-primary-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="px-4 py-6">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-foreground">Informasi Barang</h2>
            
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nama Barang <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Tumbler Biru"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 px-4 bg-card border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">
                Kategori <span className="text-destructive">*</span>
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                className={cn(
                  "w-full h-12 px-4 bg-card border border-border/50 rounded-xl text-sm text-left flex items-center justify-between transition-all",
                  formData.category ? "text-foreground" : "text-muted-foreground",
                  openDropdown === 'category' && "ring-2 ring-primary/20 border-primary"
                )}
              >
                <span>{formData.category ? categories.find(c => c.id === formData.category)?.label : 'Pilih kategori'}</span>
                <ChevronDown size={18} className={cn("transition-transform", openDropdown === 'category' && "rotate-180")} />
              </button>
              
              {openDropdown === 'category' && (
                <div className="absolute z-20 w-full mt-2 bg-card border border-border/50 rounded-xl shadow-elevated overflow-hidden animate-scale-in">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, category: cat.id });
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-sm text-left hover:bg-surface transition-colors border-b border-border/30 last:border-0"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                size="lg"
                className="w-full"
              >
                Lanjutkan
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-foreground">Lokasi & Waktu</h2>
            
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">
                Lokasi Hilang <span className="text-destructive">*</span>
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
                className={cn(
                  "w-full h-12 px-4 bg-card border border-border/50 rounded-xl text-sm text-left flex items-center justify-between transition-all",
                  formData.location ? "text-foreground" : "text-muted-foreground",
                  openDropdown === 'location' && "ring-2 ring-primary/20 border-primary"
                )}
              >
                <span>{formData.location || 'Pilih lokasi'}</span>
                <ChevronDown size={18} className={cn("transition-transform", openDropdown === 'location' && "rotate-180")} />
              </button>
              
              {openDropdown === 'location' && (
                <div className="absolute z-20 w-full mt-2 bg-card border border-border/50 rounded-xl shadow-elevated max-h-48 overflow-y-auto animate-scale-in">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, location: loc });
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-sm text-left hover:bg-surface transition-colors border-b border-border/30 last:border-0"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tanggal Hilang <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full h-12 px-4 bg-card border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                size="lg"
                className="w-full"
              >
                Lanjutkan
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-foreground">Detail Tambahan</h2>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Deskripsi
              </label>
              <textarea
                placeholder="Jelaskan ciri-ciri barang Anda secara detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Foto Barang
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-28 border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/30 hover:bg-surface transition-all"
                >
                  <Upload size={24} />
                  <span className="text-xs">Upload Foto</span>
                </button>
                <button
                  type="button"
                  className="h-28 border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/30 hover:bg-surface transition-all"
                >
                  <Camera size={24} />
                  <span className="text-xs">Ambil Foto</span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-4 bg-card rounded-2xl border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Ringkasan Laporan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Barang</span>
                  <span className="font-medium text-foreground">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kategori</span>
                  <span className="font-medium text-foreground">{categories.find(c => c.id === formData.category)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lokasi</span>
                  <span className="font-medium text-foreground">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal</span>
                  <span className="font-medium text-foreground">{formData.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                variant="claim"
                size="xl"
                className="w-full"
              >
                <Sparkles size={18} />
                Kirim Laporan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
