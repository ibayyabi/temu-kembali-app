import { User, Mail, Building, FileText, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { mockUser } from '@/data/mockData';

export function ProfileScreen() {
  const menuItems = [
    { icon: FileText, label: 'Riwayat Laporan', badge: null },
    { icon: Bell, label: 'Notifikasi', badge: mockUser.notificationCount },
    { icon: HelpCircle, label: 'Bantuan', badge: null },
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-4 pt-12 pb-8 rounded-b-3xl">
        <h1 className="text-xl font-bold mb-6">Profil</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{mockUser.name}</h2>
            <p className="text-primary-foreground/70 text-sm">{mockUser.nim}</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-2xl border border-border/50 shadow-card p-4 space-y-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface rounded-lg">
              <Mail size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground truncate">{mockUser.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface rounded-lg">
              <Building size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Fakultas</p>
              <p className="text-sm font-medium text-foreground">{mockUser.faculty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden animate-fade-in-up stagger-2">
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
        <button className="w-full flex items-center justify-center gap-2 py-4 text-destructive font-medium hover:bg-destructive/5 rounded-xl transition-colors">
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
