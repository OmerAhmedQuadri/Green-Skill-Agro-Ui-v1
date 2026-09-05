import React from 'react';
import { Search, Building2, ChevronDown, ArrowRightLeft } from 'lucide-react';
import { SYSTEM_INFO } from '../data/mockData';

export const Header = ({ onSearch, searchQuery, onSwitchRole }) => {
  return (
    <header className="erp-header">
      <div className="header-brand">
        <div className="brand-icon">GA</div>
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
            placeholder="Search SKU, PO, Store, Vehicle..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button 
          className="btn-secondary"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
          onClick={onSwitchRole}
        >
          <ArrowRightLeft size={13} />
          <span>Switch to Field Seller View</span>
        </button>

        <div className="user-profile-badge">
          <div className="avatar-initials">SA</div>
          <div className="user-info">
            <span className="user-name">{SYSTEM_INFO.currentUser.name}</span>
            <span className="user-role">{SYSTEM_INFO.currentUser.role}</span>
          </div>
          <ChevronDown size={14} className="text-white/60" />
        </div>
      </div>
    </header>
  );
};
