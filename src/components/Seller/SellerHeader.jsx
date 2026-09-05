import React from 'react';
import { Menu, ArrowLeft, AlertTriangle, ArrowRightLeft, ShoppingCart } from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';

export const SellerHeader = ({ onOpenDrawer, onSwitchRole, onNavigate, activeTab = 'home' }) => {
  const pageTitles = {
    'new-sale': 'POS Sale',
    'van-stock': 'Van Stock',
    'stores': 'Store Portfolio',
    'cash': 'Cash Settlement',
    'attendance': 'Shift & Odometer'
  };

  const isSubPage = activeTab !== 'home';

  return (
    <header className="erp-header" style={{ backgroundColor: '#1b4332', height: '56px', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
      {/* Left: Drawer Toggle + Back Button / Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <button 
          onClick={onOpenDrawer}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '4px'
          }}
          title="Open Field Menu"
        >
          <Menu size={22} />
        </button>

        {isSubPage ? (
          /* SUB-PAGE HEADER: Prominent Back to Dashboard Button */
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <button
              onClick={() => onNavigate('home')}
              className="seller-header-back-btn"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              title="Return to Seller Dashboard"
            >
              <ArrowLeft size={14} />
              <span>Dashboard</span>
            </button>

            <div 
              className="seller-header-page-title" 
              style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                color: '#ffffff', 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: '6px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {pageTitles[activeTab] || 'Sub Page'}
            </div>
          </div>
        ) : (
          /* DASHBOARD HEADER: Main Brand Title */
          <div className="header-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div className="brand-icon" style={{ backgroundColor: '#5d7c4a', width: '26px', height: '26px', fontSize: '10px', flexShrink: 0 }}>GSA</div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Green Skill Agro Field
              </span>
              <span className="desktop-only-inline" style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.7)', whiteSpace: 'nowrap' }}>
                Van #{CURRENT_SELLER.assignedVehicle.id}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Quick Actions & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {CURRENT_SELLER.cashBreachWarning && (
          <div 
            className="mobile-hide-cash"
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap'
            }}
            title="Cash Limit Exceeded"
          >
            <AlertTriangle size={12} />
            <span>SAR {CURRENT_SELLER.cashInHand.toLocaleString()}</span>
          </div>
        )}

        {activeTab !== 'new-sale' && (
          <button 
            className="btn-primary"
            style={{ backgroundColor: '#5d7c4a', padding: '5px 8px', fontSize: '11.5px', height: '30px' }}
            onClick={() => onNavigate('new-sale')}
          >
            <ShoppingCart size={13} />
            <span className="desktop-only-inline">+ POS Sale</span>
            <span className="mobile-only-inline">+ POS</span>
          </button>
        )}

        <button 
          className="btn-secondary" 
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '5px 8px', fontSize: '11.5px', height: '30px' }}
          onClick={onSwitchRole}
          title="Switch to Manager View"
        >
          <ArrowRightLeft size={12} />
          <span className="desktop-only-inline">Manager</span>
        </button>
      </div>
    </header>
  );
};

