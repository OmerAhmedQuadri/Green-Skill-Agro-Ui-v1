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
  AlertTriangle
} from 'lucide-react';
import { METRICS } from '../data/mockData';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Vehicle Fleet & Sellers', icon: Truck, badge: METRICS.cashCeilingBreaches > 0 ? `${METRICS.cashCeilingBreaches} Alert` : null },
    { id: 'inventory', label: 'Warehouse & Stock', icon: Package, badge: `${METRICS.expiryRiskCount} Expiry` },
    { id: 'orders', label: 'Purchase Orders (PO)', icon: FileText, badge: '1 Draft' },
    { id: 'dispatch', label: 'Warehouse Dispatches', icon: Send, badge: `${METRICS.activeDispatchesPending} Pending` },
    { id: 'stores', label: 'Stores & Credit Ledger', icon: Store, badge: `${METRICS.overdueStoresCount} Blocked` },
    { id: 'cash', label: 'Cash & Handovers', icon: Banknote, badge: '2 Review' },
    { id: 'attendance', label: 'Attendance & Routes', icon: Users },
    { id: 'analytics', label: 'Reorder Forecasting', icon: TrendingUp }
  ];

  return (
    <aside className="erp-sidebar">
      <div className="sidebar-section-title">Operational Control</div>
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
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Phase 1 Single-Warehouse</div>
            <div>All managers access WH-01 global data.</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
