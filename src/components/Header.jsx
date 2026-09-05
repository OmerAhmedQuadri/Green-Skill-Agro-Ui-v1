import React from 'react';
import { Search, Building2, ChevronDown, ArrowRightLeft, Menu } from 'lucide-react';
import { SYSTEM_INFO } from '../data/mockData';

export const Header = ({ onSearch, searchQuery, currentRole = 'manager', onSwitchRole, onOpenDrawer }) => {
  return (
    <header className="erp-header">
      <div className="header-brand">
        <button
          className="drawer-toggle-btn"
          style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', marginRight: '4px' }}
          onClick={onOpenDrawer}
          title="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div className="brand-icon">GSA</div>
        <div>
          <span className="brand-title">{SYSTEM_INFO.appName}</span>
          <span className="brand-subtitle">{SYSTEM_INFO.subTitle}</span>
        </div>
      </div>

      <div className="header-center-info">
        <div className="warehouse-tag">
          <Building2 size={14} className="text-white/70" />
          <span>{SYSTEM_INFO.warehouse}</span>
          <span className="live-dot" title="Live Server Connection"></span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={14} className="search-icon-pos" />
          <input
            type="text"
            placeholder="Search SKU, PO, Store, Vendor..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Multi-role Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowRightLeft size={13} style={{ color: 'rgba(255,255,255,0.7)' }} />
          <select
            className="form-select role-switcher-select"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              borderColor: 'rgba(255,255,255,0.3)', 
              color: '#ffffff', 
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px'
            }}
            value={currentRole}
            onChange={(e) => onSwitchRole(e.target.value)}
          >
            <option value="admin" style={{ color: '#000' }}>Role: Admin System Desk</option>
            <option value="manager" style={{ color: '#000' }}>Role: Manager Control</option>
            <option value="seller" style={{ color: '#000' }}>Role: Field Seller Mobile</option>
          </select>
        </div>

        <div className="user-profile-badge">
          <div className="avatar-initials">
            {currentRole === 'admin' ? 'AD' : (currentRole === 'manager' ? 'SA' : 'OF')}
          </div>
          <div className="user-info">
            <span className="user-name">
              {currentRole === 'admin' ? 'Admin System Owner' : (currentRole === 'manager' ? SYSTEM_INFO.currentUser.name : 'Omar Farooq')}
            </span>
            <span className="user-role">
              {currentRole === 'admin' ? 'System Configuration' : (currentRole === 'manager' ? SYSTEM_INFO.currentUser.role : 'Field Representative')}
            </span>
          </div>
          <ChevronDown size={14} className="text-white/60" />
        </div>
      </div>
    </header>
  );
};
