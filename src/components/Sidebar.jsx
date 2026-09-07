import React from 'react';
import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  Send,
  Store,
  Banknote,
  Users,
  TrendingUp,
  AlertTriangle,
  User
} from 'lucide-react';
import { METRICS } from '../data/mockData';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { language, t } = useLanguage();

  const navItems = [
    { id: 'overview', label: t('executiveDashboard'), icon: LayoutDashboard },
    { id: 'fleet', label: t('vehicleFleetSellers'), icon: Truck, badge: METRICS.cashCeilingBreaches > 0 ? (language === 'ar' ? `${METRICS.cashCeilingBreaches} تنبيه` : `${METRICS.cashCeilingBreaches} Alert`) : null },
    { id: 'inventory', label: t('warehouseStock'), icon: Package, badge: language === 'ar' ? `${METRICS.expiryRiskCount} صلاحية` : `${METRICS.expiryRiskCount} Expiry` },
    { id: 'orders', label: t('purchaseOrdersPO'), icon: FileText, badge: language === 'ar' ? '1 مسودة' : '1 Draft' },
    { id: 'dispatch', label: t('warehouseDispatches'), icon: Send, badge: language === 'ar' ? `${METRICS.activeDispatchesPending} معلق` : `${METRICS.activeDispatchesPending} Pending` },
    { id: 'stores', label: t('storesCreditLedger'), icon: Store, badge: language === 'ar' ? `${METRICS.overdueStoresCount} محظور` : `${METRICS.overdueStoresCount} Blocked` },
    { id: 'cash', label: t('cashHandovers'), icon: Banknote, badge: language === 'ar' ? '2 مراجعة' : '2 Review' },
    { id: 'attendance', label: t('attendanceRoutes'), icon: Users },
    { id: 'analytics', label: t('reorderForecasting'), icon: TrendingUp },
    { id: 'profile', label: t('myProfile'), icon: User }
  ];

  return (
    <aside className="erp-sidebar">
      <div style={{ padding: '0 16px 14px 16px' }}>
        <Logo height={30} />
      </div>
      <div className="sidebar-section-title">{t('operationalControl')}</div>
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
          <AlertTriangle size={14} className="text-amber-600" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{language === 'ar' ? 'المستودع المركزي' : 'Central Warehouse'}</div>
            <div>{language === 'ar' ? 'جميع المدراء يصلون لبيانات WH-01' : 'All managers access WH-01 global data.'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
