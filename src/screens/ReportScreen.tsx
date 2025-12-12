import { useState } from 'react';
import { Camera, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, locations } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function ReportScreen() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'category' | 'location' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.location) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: '', category: '', location: '', description: '' });
      }, 3000);
    }
  };

  const isFormValid = formData.name && formData.category && formData.location;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Laporan Tersimpan!</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Kami akan mengirim notifikasi jika barang Anda ditemukan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Lapor Kehilangan</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">
          Isi detail barang yang hilang
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Barang <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Tumbler Hitam"
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
            <div className="absolute z-10 w-full mt-2 bg-card border border-border/50 rounded-xl shadow-elevated overflow-hidden animate-scale-in">
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
            <div className="absolute z-10 w-full mt-2 bg-card border border-border/50 rounded-xl shadow-elevated max-h-48 overflow-y-auto animate-scale-in">
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Deskripsi
          </label>
          <textarea
            placeholder="Jelaskan ciri-ciri barang Anda..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Foto (Opsional)
          </label>
          <button
            type="button"
            className="w-full h-28 border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/30 hover:bg-surface transition-all"
          >
            <Camera size={24} />
            <span className="text-xs">Tap untuk upload foto</span>
          </button>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="xl"
            className="w-full"
            disabled={!isFormValid}
          >
            Kirim Laporan
          </Button>
        </div>
      </form>
    </div>
  );
}
