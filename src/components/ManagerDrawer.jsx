import React from 'react';
import { 
  X, 
  LayoutDashboard, 
  Package, 
  Truck, 
  FileText, 
  Send, 
  Store, 
  Banknote, 
  Users, 
  TrendingUp, 
  LogOut,
  ShieldCheck,
  PackagePlus,
  FilePlus,
  ChevronRight,
  ChevronLeft,
  User
} from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { METRICS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const ManagerDrawer = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onOpenProductSetup,
  onOpenCreatePo
}) => {
  const { t, isRtl } = useLanguage();
  const { currentUser, logout } = useAuth();

  if (!isOpen) return null;

  const navItems = [
    { id: 'overview', label: t('executiveDashboard'), icon: LayoutDashboard },
    { id: 'fleet', label: t('vehicleFleetSellers'), icon: Truck, badge: METRICS.cashCeilingBreaches > 0 ? `${METRICS.cashCeilingBreaches} ${t('alert')}` : null, alert: true },
    { id: 'inventory', label: t('warehouseStock'), icon: Package, badge: `${METRICS.expiryRiskCount} ${t('expiry')}` },
    { id: 'orders', label: t('purchaseOrdersPO'), icon: FileText, badge: `1 ${t('draft')}` },
    { id: 'dispatch', label: t('warehouseDispatches'), icon: Send, badge: `${METRICS.activeDispatchesPending} ${t('pending')}` },
    { id: 'stores', label: t('storesCreditLedger'), icon: Store, badge: `${METRICS.overdueStoresCount} ${t('blocked')}`, alert: true },
    { id: 'cash', label: t('cashHandovers'), icon: Banknote, badge: `2 ${t('review')}` },
    { id: 'attendance', label: t('attendanceRoutes'), icon: Users },
    { id: 'analytics', label: t('reorderForecasting'), icon: TrendingUp },
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
        zIndex: 250,
        display: 'flex',
        justifyContent: isRtl ? 'flex-end' : 'flex-start'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '290px',
          maxWidth: '85vw',
          backgroundColor: '#ffffff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isRtl ? '-4px 0 20px rgba(0,0,0,0.25)' : '4px 0 20px rgba(0,0,0,0.25)',
          zIndex: 251
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

        {/* Manager User Info */}
        <div style={{ padding: '12px 18px', backgroundColor: '#f8faf7', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)' }}>{currentUser?.name || 'Manager'}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('managerRole')} &bull; WH-01</div>
          </div>
          <span className="badge badge-success" style={{ fontSize: '10px' }}>
            <ShieldCheck size={11} />
            Admin
          </span>
        </div>

        {/* Quick Action Shortcuts */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color-light)', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
          <button 
            className="btn-sm-primary" 
            style={{ width: '100%', padding: '8px 12px', fontSize: '11.5px', justifyContent: 'flex-start', boxSizing: 'border-box', whiteSpace: 'normal', overflow: 'hidden', textAlign: isRtl ? 'right' : 'left' }}
            onClick={() => { onClose(); onOpenProductSetup(); }}
          >
            <PackagePlus size={14} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>+ {t('setupProductSku')}</span>
          </button>
          <button 
            className="btn-sm-secondary" 
            style={{ width: '100%', padding: '8px 12px', fontSize: '11.5px', justifyContent: 'flex-start', boxSizing: 'border-box', whiteSpace: 'normal', overflow: 'hidden', textAlign: isRtl ? 'right' : 'left' }}
            onClick={() => { onClose(); onOpenCreatePo(); }}
          >
            <FilePlus size={14} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>+ {t('draftPurchaseOrder')}</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', padding: '6px 18px' }}>
            {t('operationalControl')}
          </div>

          {navItems.map((item) => {
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
                  padding: '11px 18px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-forest-dark)' : 'var(--text-main)',
                  backgroundColor: isActive ? 'var(--color-agro-green-light)' : 'transparent',
                  borderLeft: !isRtl && isActive ? '4px solid var(--color-agro-green)' : '4px solid transparent',
                  borderRight: isRtl && isActive ? '4px solid var(--color-agro-green)' : '4px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <Icon size={17} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ 
                    backgroundColor: item.alert ? '#fee2e2' : 'rgba(0,0,0,0.06)', 
                    color: item.alert ? '#991b1b' : 'var(--text-main)',
                    fontSize: '10.5px', 
                    fontWeight: 700, 
                    padding: '2px 6px', 
                    borderRadius: '4px' 
                  }}>
                    {item.badge}
                  </span>
                )}
                <ChevronIcon size={14} style={{ opacity: 0.4 }} />
              </div>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color)', backgroundColor: '#fafcf9' }}>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px', backgroundColor: '#dc2626', color: '#ffffff', borderColor: '#dc2626' }}
            onClick={() => {
              onClose();
              logout();
            }}
          >
            <LogOut size={14} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
