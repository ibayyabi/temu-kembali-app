import { create } from 'zustand';
import { LostReport, Notification, mockItems } from '@/data/mockData';

interface AppState {
  reports: LostReport[];
  notifications: Notification[];
  addReport: (report: LostReport) => void;
  updateReportStatus: (reportId: string, status: LostReport['status'], matchedItemId?: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  getMatchedItem: (itemId: string) => typeof mockItems[0] | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  reports: [],
  notifications: [],
  
  addReport: (report) => set((state) => ({
    reports: [report, ...state.reports]
  })),
  
  updateReportStatus: (reportId, status, matchedItemId) => set((state) => ({
    reports: state.reports.map((r) => 
      r.id === reportId 
        ? { ...r, status, matchedItemId } 
        : r
    )
  })),
  
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    )
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  getMatchedItem: (itemId) => mockItems.find((item) => item.id === itemId),
}));
