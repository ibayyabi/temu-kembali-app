import { Bell } from 'lucide-react';
import { mockUser } from '@/data/mockData';

export function Header() {
  return (
    <header className="gradient-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-3xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-primary-foreground/80 text-sm font-medium">Selamat datang di</p>
          <h1 className="text-2xl font-bold tracking-tight mt-0.5">TemuKembali</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Lost & Found • ITB
          </p>
        </div>
        
        <button className="relative p-2 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/20 transition-colors">
          <Bell size={22} />
          {mockUser.notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-soft">
              {mockUser.notificationCount}
            </span>
          )}
        </button>
      </div>
      
      <div className="mt-4 bg-primary-foreground/10 rounded-xl p-3">
        <p className="text-sm">
          <span className="text-primary-foreground/70">Halo, </span>
          <span className="font-semibold">{mockUser.name}!</span>
        </p>
        <p className="text-xs text-primary-foreground/60 mt-0.5">{mockUser.nim}</p>
      </div>
    </header>
  );
}
