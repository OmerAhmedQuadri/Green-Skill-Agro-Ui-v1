import React from 'react';
import { 
  X, 
  Sliders, 
  Tag, 
  Building2, 
  Shield, 
  ToggleLeft, 
  FileSpreadsheet, 
  LogOut,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  User
} from 'lucide-react';
import { SYSTEM_INFO } from '../../data/mockData';
import { Logo } from '../Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDrawer = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab
}) => {
  const { t, isRtl } = useLanguage();
  const { currentUser, logout } = useAuth();

  if (!isOpen) return null;

  const navItems = [
    { id: 'admin-rules', label: t('systemRulesCeilings'), icon: Sliders },
    { id: 'admin-catalog', label: t('productTemplatesCatalog'), icon: Tag },
    { id: 'admin-vendors', label: t('vendorDirectoryPO'), icon: Building2, badge: '1 PO Draft' },
    { id: 'admin-permissions', label: t('userRolesPermissions'), icon: Shield },
    { id: 'admin-features', label: t('returnRulesFeatures'), icon: ToggleLeft },
    { id: 'admin-audit', label: t('systemAuditTrail'), icon: FileSpreadsheet },
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

        {/* Admin Profile */}
        <div style={{ padding: '12px 18px', backgroundColor: '#f8faf7', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)' }}>{currentUser?.name || t('adminRole')}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{SYSTEM_INFO.appName}</div>
          </div>
          <span className="badge badge-success" style={{ fontSize: '10px' }}>
            <ShieldCheck size={11} />
            System Owner
          </span>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', padding: '6px 18px' }}>
            {t('adminConfiguration')}
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
                    backgroundColor: 'rgba(0,0,0,0.06)', 
                    color: 'var(--text-main)',
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
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color)', backgroundColor: '#fafcf9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
