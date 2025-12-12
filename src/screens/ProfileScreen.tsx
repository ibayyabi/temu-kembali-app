import { User, Mail, Building, GraduationCap, FileText, Bell, HelpCircle, LogOut, ChevronRight, CreditCard } from 'lucide-react';
import { mockUser } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';

export function ProfileScreen() {
  const notifications = useAppStore((state) => state.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { icon: FileText, label: 'Riwayat Pengambilan', badge: null },
    { icon: Bell, label: 'Notifikasi', badge: unreadCount > 0 ? unreadCount : null },
    { icon: HelpCircle, label: 'Bantuan', badge: null },
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-4 pt-12 pb-8 rounded-b-3xl">
        <h1 className="text-xl font-bold mb-6">Akun Saya</h1>
      </div>

      {/* Digital KTM Card */}
      <div className="px-4 -mt-6">
        <div className="bg-card rounded-2xl border border-border/50 shadow-elevated overflow-hidden animate-fade-in-up">
          {/* KTM Header */}
          <div className="gradient-primary p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] text-primary-foreground/70 uppercase tracking-wider">Institut Teknologi Bandung</p>
                  <p className="text-xs font-semibold text-primary-foreground">Kartu Tanda Mahasiswa</p>
                </div>
              </div>
              <CreditCard size={20} className="text-primary-foreground/50" />
            </div>
          </div>
          
          {/* KTM Body */}
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-24 bg-surface rounded-xl flex items-center justify-center border border-border/50">
                <User size={32} className="text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-sm font-bold text-foreground">{mockUser.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">NIM</p>
                  <p className="text-sm font-semibold text-foreground">{mockUser.nim}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Program Studi</p>
                  <p className="text-xs font-medium text-foreground">{mockUser.major}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* KTM Footer */}
          <div className="px-4 pb-4">
            <div className="bg-surface rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Building size={14} className="text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{mockUser.faculty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft p-4 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface rounded-lg">
              <Mail size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email Kampus</p>
              <p className="text-sm font-medium text-foreground truncate">{mockUser.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden animate-fade-in-up stagger-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-surface transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-border/30' : ''
                }`}
              >
                <div className="p-2 bg-surface rounded-lg">
                  <Icon size={18} className="text-primary" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground text-left">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button 
          onClick={() => {
            // Clear session if any
            sessionStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="w-full flex items-center justify-center gap-2 py-4 text-destructive font-medium hover:bg-destructive/5 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground">TemuKembali v1.0.0</p>
        <p className="text-[10px] text-muted-foreground/70 mt-0.5">© 2024 ITB Lost & Found</p>
      </div>
    </div>
  );
}
