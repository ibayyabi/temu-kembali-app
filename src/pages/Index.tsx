import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReportScreen } from '@/screens/ReportScreen';
import { ActivityScreen } from '@/screens/ActivityScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { ItemDetail } from '@/components/items/ItemDetail';
import { useAppStore } from '@/store/appStore';
import { mockItems, LostItem } from '@/data/mockData';

type Tab = 'home' | 'report' | 'activity' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [isMatchedView, setIsMatchedView] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [pendingNotification, setPendingNotification] = useState<{
    itemId: string;
    reportId: string;
  } | null>(null);

  const notifications = useAppStore((state) => state.notifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);

  // Show notification banner when new notifications arrive
  useEffect(() => {
    const unreadNotification = notifications.find(n => !n.read && n.type === 'match');
    if (unreadNotification && unreadNotification.itemId) {
      setPendingNotification({
        itemId: unreadNotification.itemId,
        reportId: unreadNotification.reportId || '',
      });
      setShowNotification(true);
    }
  }, [notifications]);

  const handleMatchFound = (itemId: string, reportId: string) => {
    // Notification will be handled by the useEffect above
  };

  const handleNotificationClick = () => {
    if (pendingNotification) {
      const item = mockItems.find(i => i.id === pendingNotification.itemId);
      if (item) {
        setSelectedItem(item);
        setIsMatchedView(true);
      }
      // Mark as read
      const notification = notifications.find(n => n.itemId === pendingNotification.itemId);
      if (notification) {
        markNotificationRead(notification.id);
      }
    }
    setShowNotification(false);
    setPendingNotification(null);
  };

  const handleViewMatch = (itemId: string) => {
    const item = mockItems.find(i => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setIsMatchedView(true);
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen 
            onReportClick={() => setActiveTab('report')}
            onActivityClick={() => setActiveTab('activity')}
          />
        );
      case 'report':
        return <ReportScreen onMatchFound={handleMatchFound} />;
      case 'activity':
        return <ActivityScreen onViewMatch={handleViewMatch} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="mobile-container">
      {/* Notification Banner */}
      {showNotification && pendingNotification && (
        <NotificationBanner
          title="Kabar Baik! 🎉"
          message="AI menemukan barang yang cocok dengan laporan Anda."
          onClose={() => {
            setShowNotification(false);
            const notification = notifications.find(n => n.itemId === pendingNotification.itemId);
            if (notification) markNotificationRead(notification.id);
          }}
          onClick={handleNotificationClick}
        />
      )}

      {renderScreen()}
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setIsMatchedView(false);
          }}
          isMatchedItem={isMatchedView}
        />
      )}
    </div>
  );
};

export default Index;
