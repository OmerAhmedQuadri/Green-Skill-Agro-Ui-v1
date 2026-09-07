import React from 'react';
import { 
  ShoppingCart, 
  Banknote, 
  Store, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Package,
  ChevronRight
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const SellerHome = ({ onNavigate }) => {
  const { currentSeller, stores } = useManagerContext();
  const { language, t } = useLanguage();

  const seller = currentSeller || {
    dailySalesAchieved: 32400,
    dailySalesTarget: 40000,
    cashInHand: 14500,
    cashLimit: 12000,
    cashBreachWarning: true,
    assignedVehicle: { id: 'VH-01', stockValue: 84200 },
    route: 'Riyadh North & Central'
  };

  const storeList = stores && stores.length > 0 ? stores : [];

  const formatSAR = (val) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(val || 0);
  };

  const targetPercentage = Math.round(((seller.dailySalesAchieved || 0) / (seller.dailySalesTarget || 1)) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* 1. PRIMARY TASK ACTION BAR (Responsive grid: 2 cols on mobile, 4 cols on desktop) */}
      <div className="seller-action-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        <button 
          className="btn-primary" 
          style={{ height: '52px', fontSize: '13px', justifyContent: 'center', backgroundColor: '#1b4332' }}
          onClick={() => onNavigate('new-sale')}
        >
          <ShoppingCart size={18} />
          <span>{t('newSaleBtn')}</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('cash')}
        >
          <Banknote size={18} className="text-emerald-700" />
          <span>{t('settleCashBtn')}</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('stores')}
        >
          <Store size={18} className="text-blue-700" />
          <span>{t('onboardNewStore')}</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('attendance')}
        >
          <Clock size={18} className="text-amber-700" />
          <span>{t('checkInOutBtn')}</span>
        </button>
      </div>

      {/* 2. SHIFT & TARGET SUMMARY CARDS (1 col on mobile, 3 cols on desktop) */}
      <div className="seller-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {/* Daily Target Card */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">{language === 'ar' ? 'هدف مبيعات اليوم' : "Today's Sales Target"}</span>
            <div className="metric-icon-box">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(seller.dailySalesAchieved)}</div>
          <div style={{ width: '100%', backgroundColor: '#edf2ea', borderRadius: '4px', height: '8px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: `${targetPercentage}%`, backgroundColor: 'var(--color-agro-green)', height: '100%' }}></div>
          </div>
          <div className="breakdown-row">
            <span>{language === 'ar' ? 'الهدف:' : 'Target:'} {formatSAR(seller.dailySalesTarget)}</span>
            <span style={{ fontWeight: 700, color: 'var(--color-forest-dark)' }}>{targetPercentage}% {language === 'ar' ? 'محقق' : 'Achieved'}</span>
          </div>
        </div>

        {/* Cash in Hand & Ceiling Watch */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">{t('cashInHand')}</span>
            <div className="metric-icon-box">
              <Banknote size={16} />
            </div>
          </div>
          <div className="metric-value" style={{ color: seller.cashBreachWarning ? '#991b1b' : 'var(--color-forest-dark)' }}>
            {formatSAR(seller.cashInHand)}
          </div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>{t('cashLimitCeiling')}:</span>
              <span className="breakdown-val">{formatSAR(seller.cashLimit)}</span>
            </div>
            <div className="breakdown-row">
              <span>{t('status')}:</span>
              {seller.cashBreachWarning ? (
                <span className="breakdown-val alert">{language === 'ar' ? 'تجاوز الحد (يلزم ايداع)' : 'Limit Exceeded (Deposit Needed)'}</span>
              ) : (
                <span className="breakdown-val" style={{ color: '#166534' }}>{language === 'ar' ? 'ضمن السقف' : 'Within Ceiling'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Van Stock Valuation */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">{language === 'ar' ? 'قيمة مخزون الشاحنة' : 'Vehicle Inventory Value'}</span>
            <div className="metric-icon-box">
              <Package size={16} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(seller.assignedVehicle?.stockValue)}</div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>{t('assignedVehicle')}:</span>
              <span className="breakdown-val">Van #{seller.assignedVehicle?.id}</span>
            </div>
            <div className="breakdown-row">
              <span>{t('expiry')}:</span>
              <span className="breakdown-val alert">{language === 'ar' ? 'تنبيه تصريف صنف 1' : '1 SKU Clearance Warning'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S STORE ROUTE SCHEDULE */}
      <div className="data-panel">
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <MapPin size={16} />
            <span>{language === 'ar' ? `جدول المسار اليومي (${seller.route})` : `Today's Route Schedule (${seller.route})`}</span>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('stores')}>
            <span>{t('viewAllStores')}</span>
            <ChevronRight size={14} style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>{language === 'ar' ? 'المتجر والمالك' : 'Store & Owner'}</th>
                <th>{language === 'ar' ? 'المنطقة' : 'Area'}</th>
                <th>{t('creditCycle')}</th>
                <th>{language === 'ar' ? 'المستحقات' : 'Dues'}</th>
                <th>{t('status')}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {storeList.map((store) => (
                <tr key={store.storeId}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{store.storeName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{store.ownerName}</div>
                  </td>
                  <td>{store.city}</td>
                  <td>{store.creditCycle}</td>
                  <td>
                    <strong style={{ color: store.blocked ? '#991b1b' : 'var(--text-main)' }}>
                      SAR {store.outstandingBalance?.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    {store.blocked ? (
                      <span className="badge badge-danger">{t('blocked')}</span>
                    ) : (
                      <span className="badge badge-success">{t('active')}</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn-sm-primary" 
                      onClick={() => onNavigate('new-sale')}
                    >
                      <ShoppingCart size={12} />
                      <span>{language === 'ar' ? 'بدء البيع' : 'Start Sale'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
