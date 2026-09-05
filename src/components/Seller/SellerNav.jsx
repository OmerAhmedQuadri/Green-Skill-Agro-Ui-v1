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
    { id: 'home', label: 'Home', icon: Home },
    { id: 'new-sale', label: '+ POS Sale', icon: ShoppingCart, highlight: true },
    { id: 'van-stock', label: 'Van Stock', icon: Package, badge: '4' },
    { id: 'stores', label: 'My Stores', icon: Store, badge: `${CURRENT_SELLER.assignedStoresCount}` },
    { id: 'cash', label: 'Cash', icon: Banknote, alert: CURRENT_SELLER.cashBreachWarning },
    { id: 'attendance', label: 'Shift', icon: Clock }
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation Bar */}
      <div 
        className="desktop-seller-nav"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: tab.highlight ? (isActive ? 'var(--color-forest-dark)' : 'var(--color-agro-green)') : (isActive ? 'var(--color-agro-green-light)' : 'transparent'),
                color: tab.highlight ? '#ffffff' : (isActive ? 'var(--color-forest-dark)' : 'var(--text-muted)'),
                border: 'none',
                borderBottom: isActive && !tab.highlight ? '3px solid var(--color-agro-green)' : '3px solid transparent',
                borderRadius: tab.highlight ? '4px' : '0',
                margin: tab.highlight ? '4px 4px' : '0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.12s ease'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '4px'
                }}>
                  {tab.badge}
                </span>
              )}
              {tab.alert && (
                <span style={{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: '4px'
                }}>
                  Alert
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" style={{ display: 'none' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                color: tab.highlight ? (isActive ? 'var(--color-forest-dark)' : 'var(--color-agro-green)') : (isActive ? 'var(--color-forest-dark)' : 'var(--text-muted)')
              }}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
