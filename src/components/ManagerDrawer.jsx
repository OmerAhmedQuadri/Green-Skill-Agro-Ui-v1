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
  ArrowRightLeft,
  ShieldCheck,
  PackagePlus,
  FilePlus,
  ChevronRight
} from 'lucide-react';
import { METRICS, SYSTEM_INFO } from '../data/mockData';

export const ManagerDrawer = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onSwitchRole,
  onOpenProductSetup,
  onOpenCreatePo
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Vehicle Fleet & Sellers', icon: Truck, badge: METRICS.cashCeilingBreaches > 0 ? `${METRICS.cashCeilingBreaches} Alert` : null, alert: true },
    { id: 'inventory', label: 'Warehouse & Stock', icon: Package, badge: `${METRICS.expiryRiskCount} Expiry` },
    { id: 'orders', label: 'Purchase Orders (PO)', icon: FileText, badge: '1 Draft' },
    { id: 'dispatch', label: 'Warehouse Dispatches', icon: Send, badge: `${METRICS.activeDispatchesPending} Pending` },
    { id: 'stores', label: 'Stores & Credit Ledger', icon: Store, badge: `${METRICS.overdueStoresCount} Blocked`, alert: true },
    { id: 'cash', label: 'Cash & Handovers', icon: Banknote, badge: '2 Review' },
    { id: 'attendance', label: 'Attendance & Routes', icon: Users },
    { id: 'analytics', label: 'Reorder Forecasting', icon: TrendingUp }
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 26, 20, 0.65)',
        zIndex: 250,
        display: 'flex'
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
          boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
          zIndex: 251
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ backgroundColor: '#1b4332', color: '#ffffff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-icon" style={{ backgroundColor: '#5d7c4a', fontSize: '11px' }}>GSA</div>
            <div>
              <div style={{ fontSize: '14.5px', fontWeight: 700 }}>Green Skill Agro</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Manager Control Desk</div>
            </div>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Manager User Info */}
        <div style={{ padding: '12px 18px', backgroundColor: '#f8faf7', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)' }}>{SYSTEM_INFO.currentUser.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{SYSTEM_INFO.currentUser.role} &bull; {SYSTEM_INFO.warehouse}</div>
          </div>
          <span className="badge badge-success" style={{ fontSize: '10px' }}>
            <ShieldCheck size={11} />
            Admin
          </span>
        </div>

        {/* Quick Action Shortcuts */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color-light)', display: 'flex', gap: '8px' }}>
          <button 
            className="btn-sm-primary" 
            style={{ flex: 1, padding: '7px 8px', fontSize: '11px', justifyContent: 'center' }}
            onClick={() => { onClose(); onOpenProductSetup(); }}
          >
            <PackagePlus size={13} />
            <span>+ Product</span>
          </button>
          <button 
            className="btn-sm-secondary" 
            style={{ flex: 1, padding: '7px 8px', fontSize: '11px', justifyContent: 'center' }}
            onClick={() => { onClose(); onOpenCreatePo(); }}
          >
            <FilePlus size={13} />
            <span>+ Draft PO</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', padding: '6px 18px' }}>
            Operational Control
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
                  borderLeft: isActive ? '4px solid var(--color-agro-green)' : '4px solid transparent',
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
                <ChevronRight size={14} style={{ opacity: 0.4 }} />
              </div>
            );
          })}
        </nav>

        {/* Role Switcher Footer */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color)', backgroundColor: '#fafcf9' }}>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '12px', backgroundColor: '#1b4332', color: '#ffffff', borderColor: '#1b4332' }}
            onClick={() => {
              onClose();
              onSwitchRole();
            }}
          >
            <ArrowRightLeft size={14} />
            <span>Switch to Field Seller View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
