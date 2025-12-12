import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { HomeScreen } from '@/screens/HomeScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { ReportScreen } from '@/screens/ReportScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { ItemDetail } from '@/components/items/ItemDetail';
import { LostItem } from '@/data/mockData';

type Tab = 'home' | 'search' | 'report' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);

  const handleItemClick = (item: LostItem) => {
    setSelectedItem(item);
  };

  const handleReportClick = () => {
    setActiveTab('report');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen 
            onItemClick={handleItemClick} 
            onReportClick={handleReportClick}
          />
        );
      case 'search':
        return <SearchScreen onItemClick={handleItemClick} />;
      case 'report':
        return <ReportScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="mobile-container">
      {renderScreen()}
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Index;
