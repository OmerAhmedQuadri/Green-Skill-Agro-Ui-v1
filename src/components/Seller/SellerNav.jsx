import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Store, 
  Banknote, 
  Clock 
} from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';

export const SellerNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Route & Shift', icon: Home },
    { id: 'new-sale', label: '+ POS Sale', icon: ShoppingCart, highlight: true },
    { id: 'van-stock', label: 'Van Stock', icon: Package, badge: '4' },
    { id: 'stores', label: 'My Stores', icon: Store, badge: `${CURRENT_SELLER.assignedStoresCount}` },
    { id: 'cash', label: 'Cash & Deposit', icon: Banknote, alert: CURRENT_SELLER.cashBreachWarning },
    { id: 'attendance', label: 'Shift Attendance', icon: Clock }
  ];

  return (
    <div 
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 16px',
        height: '46px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        flexShrink: 0
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        if (tab.highlight) {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: isActive ? 'var(--color-forest-dark)' : 'var(--color-agro-green)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                height: '32px'
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0 12px',
              fontSize: '12.5px',
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive ? 'var(--color-agro-green-light)' : 'transparent',
              color: isActive ? 'var(--color-forest-dark)' : 'var(--text-muted)',
              border: 'none',
              borderBottom: isActive ? '2px solid var(--color-agro-green)' : '2px solid transparent',
              borderRadius: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              height: '46px',
              transition: 'all 0.12s ease'
            }}
          >
            <Icon size={15} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span style={{
                backgroundColor: 'rgba(0,0,0,0.06)',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: '3px'
              }}>
                {tab.badge}
              </span>
            )}
            {tab.alert && (
              <span style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                fontSize: '9.5px',
                fontWeight: 700,
                padding: '1px 4px',
                borderRadius: '3px'
              }}>
                Alert
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
