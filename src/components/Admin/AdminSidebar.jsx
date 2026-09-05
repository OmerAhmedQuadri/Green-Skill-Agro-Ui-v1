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

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'admin-rules', label: 'System Rules & Ceilings', icon: Sliders },
    { id: 'admin-catalog', label: 'Product Templates & Catalog', icon: Tag },
    { id: 'admin-vendors', label: 'Vendor Directory & PO Approvals', icon: Building2, badge: '1 PO Draft' },
    { id: 'admin-permissions', label: 'User Roles & Permissions', icon: Shield },
    { id: 'admin-features', label: 'Return Rules & Feature Toggles', icon: ToggleLeft },
    { id: 'admin-audit', label: 'System Audit & Activity Trail', icon: FileSpreadsheet }
  ];

  return (
    <aside className="erp-sidebar admin-sidebar">
      <div className="sidebar-section-title">Admin Configuration</div>
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
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Admin Master Access</div>
            <div>Full system configuration enabled.</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
