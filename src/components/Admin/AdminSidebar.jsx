import React from 'react';
import { 
  Sliders, 
  Tag, 
  Building2, 
  Shield, 
  ToggleLeft, 
  FileSpreadsheet,
  ShieldCheck
} from 'lucide-react';

import { Logo } from '../Logo';
import { useLanguage } from '../../context/LanguageContext';

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { language, t } = useLanguage();

  const navItems = [
    { id: 'admin-rules', label: t('systemRulesCeilings'), icon: Sliders },
    { id: 'admin-catalog', label: t('productTemplatesCatalog'), icon: Tag },
    { id: 'admin-vendors', label: t('vendorDirectoryPO'), icon: Building2, badge: language === 'ar' ? '1 مسودة' : '1 PO Draft' },
    { id: 'admin-permissions', label: t('userRolesPermissions'), icon: Shield },
    { id: 'admin-features', label: t('returnRulesFeatures'), icon: ToggleLeft },
    { id: 'admin-audit', label: t('systemAuditTrail'), icon: FileSpreadsheet }
  ];

  return (
    <aside className="erp-sidebar admin-sidebar">
      <div style={{ padding: '0 16px 14px 16px' }}>
        <Logo height={30} />
      </div>
      <div className="sidebar-section-title">{t('adminConfiguration')}</div>
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
          <ShieldCheck size={16} className="text-emerald-700" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{language === 'ar' ? 'صلاحيات الأدمن الكاملة' : 'Admin Master Access'}</div>
            <div>{language === 'ar' ? 'تهيئة وإدارية النظام مفعلة' : 'Full system configuration enabled.'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
