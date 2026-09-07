import React from 'react';
import { 
  Crown, 
  Users, 
  ShieldAlert, 
  GitMerge, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

import { Logo } from '../Logo';
import { useLanguage } from '../../context/LanguageContext';

export const SuperAdminSidebar = ({ activeTab, setActiveTab }) => {
  const { language, t } = useLanguage();

  const navItems = [
    { id: 'superadmin-overview', label: t('enterpriseOversight'), icon: Crown },
    { id: 'superadmin-governance', label: t('userAdminGovernance'), icon: Users, badge: language === 'ar' ? '4 أدوار' : '4 Roles' },
    { id: 'superadmin-permissions', label: t('masterHierarchyMatrix'), icon: GitMerge },
    { id: 'superadmin-branches', label: t('centralWarehouseWH01'), icon: Building2 },
    { id: 'superadmin-security', label: t('securityKillSwitches'), icon: ShieldAlert }
  ];

  return (
    <aside className="erp-sidebar admin-sidebar" style={{ borderRight: '1px solid var(--border-color)' }}>
      <div style={{ padding: '0 16px 14px 16px' }}>
        <Logo height={30} />
      </div>
      <div className="sidebar-section-title" style={{ color: '#1b4332', fontWeight: 800 }}>
        {t('superAdminGovernance')}
      </div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={16} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <ShieldCheck size={18} style={{ color: '#1b4332' }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{language === 'ar' ? 'مستوى السلطة التنفيذية' : 'Platform Executive Level'}</div>
            <div>{language === 'ar' ? 'أعلى مستوى صلاحية مفعّل' : 'Highest authority access active.'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
