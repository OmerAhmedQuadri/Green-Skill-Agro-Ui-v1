import React from 'react';
import { Menu, ArrowLeft, AlertTriangle, LogOut, ShoppingCart, Globe } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { Logo } from '../Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const SellerHeader = ({ onOpenDrawer, onNavigate, activeTab = 'home' }) => {
  const { currentSeller } = useManagerContext();
  const { language, toggleLanguage, t } = useLanguage();
  const { logout } = useAuth();
  const seller = currentSeller || { assignedVehicle: { id: 'VH-01' }, cashInHand: 14500, cashBreachWarning: true };

  const pageTitles = {
    'new-sale': t('posSale'),
    'van-stock': t('vanStock'),
    'stores': t('storePortfolio'),
    'cash': t('cashSettlement'),
    'attendance': t('shiftOdometer')
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
              <span>{t('dashboard')}</span>
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
            <Logo height={24} />
          </div>
        )}
      </div>

      {/* Right: Quick Actions & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {seller.cashBreachWarning && (
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
            <span>SAR {seller.cashInHand?.toLocaleString()}</span>
          </div>
        )}

        {activeTab !== 'new-sale' && (
          <button 
            className="btn-primary"
            style={{ backgroundColor: '#5d7c4a', padding: '5px 8px', fontSize: '11.5px', height: '30px' }}
            onClick={() => onNavigate('new-sale')}
          >
            <ShoppingCart size={13} />
            <span className="desktop-only-inline">{t('newSaleBtn')}</span>
            <span className="mobile-only-inline">{t('newSaleBtn')}</span>
          </button>
        )}

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '5px 8px',
            height: '30px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap'
          }}
          title={language === 'en' ? 'Switch to Saudi Arabic (RTL)' : 'التغيير إلى الإنجليزية'}
        >
          <Globe size={12} style={{ color: '#4ade80' }} />
          <span>{t('langName')}</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fff', padding: '5px 8px', fontSize: '11.5px', height: '30px' }}
          onClick={logout}
          title={t('logout')}
        >
          <LogOut size={12} />
          <span className="desktop-only-inline">{t('logout')}</span>
        </button>
      </div>
    </header>
  );
};
