import React from 'react';
import { 
  X, 
  Home, 
  ShoppingCart, 
  Package, 
  Store, 
  Banknote, 
  Clock, 
  ArrowRightLeft,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  User
} from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';
import { Logo } from '../Logo';
import { useLanguage } from '../../context/LanguageContext';

export const SellerDrawer = ({ isOpen, onClose, activeTab, setActiveTab, onSwitchRole }) => {
  const { t, isRtl } = useLanguage();

  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: t('routeShiftOverview'), icon: Home },
    { id: 'new-sale', label: t('recordNewSalePos'), icon: ShoppingCart, highlight: true },
    { id: 'van-stock', label: t('vehicleInventoryFefo'), icon: Package, badge: '4 SKUs' },
    { id: 'stores', label: t('myStorePortfolioNav'), icon: Store, badge: `${CURRENT_SELLER.assignedStoresCount}` },
    { id: 'cash', label: t('cashBankDepositsNav'), icon: Banknote, alert: CURRENT_SELLER.cashBreachWarning },
    { id: 'attendance', label: t('shiftAttendanceNav'), icon: Clock },
    { id: 'profile', label: t('myProfile'), icon: User }
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 26, 20, 0.65)',
        zIndex: 200,
        display: 'flex',
        justifyContent: isRtl ? 'flex-end' : 'flex-start'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '280px',
          maxWidth: '85vw',
          backgroundColor: '#ffffff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isRtl ? '-4px 0 20px rgba(0,0,0,0.2)' : '4px 0 20px rgba(0,0,0,0.2)',
          zIndex: 201
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ backgroundColor: '#1b4332', color: '#ffffff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo height={28} />
          <button style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Active Seller Badge */}
        <div style={{ padding: '14px 20px', backgroundColor: '#f8faf7', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-forest-dark)' }}>
            <UserCheck size={16} className="text-green-700" />
            <span>{CURRENT_SELLER.name}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {CURRENT_SELLER.route} &bull; {CURRENT_SELLER.shiftStatus}
          </div>

          {CURRENT_SELLER.cashBreachWarning && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <AlertTriangle size={12} />
              <span>{t('cashLimitCeiling')}: SAR {CURRENT_SELLER.cashInHand.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Menu Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px 0', flex: 1, overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: item.highlight ? '#ffffff' : (isActive ? 'var(--color-forest-dark)' : 'var(--text-main)'),
                  backgroundColor: item.highlight ? 'var(--color-agro-green)' : (isActive ? 'var(--color-agro-green-light)' : 'transparent'),
                  borderLeft: !isRtl && isActive && !item.highlight ? '4px solid var(--color-agro-green)' : '4px solid transparent',
                  borderRight: isRtl && isActive && !item.highlight ? '4px solid var(--color-agro-green)' : '4px solid transparent',
                  cursor: 'pointer',
                  margin: item.highlight ? '4px 16px 8px 16px' : '0',
                  borderRadius: item.highlight ? '4px' : '0'
                }}
              >
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.06)', fontSize: '10.5px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                    {item.badge}
                  </span>
                )}
                {item.alert && (
                  <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                    {t('alert')}
                  </span>
                )}
                <ChevronIcon size={14} style={{ opacity: 0.4 }} />
              </div>
            );
          })}
        </nav>

        {/* Switch to Manager Role Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', backgroundColor: '#fafcf9' }}>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px' }}
            onClick={() => {
              onClose();
              onSwitchRole();
            }}
          >
            <ArrowRightLeft size={14} />
            <span>{t('switchRole')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
