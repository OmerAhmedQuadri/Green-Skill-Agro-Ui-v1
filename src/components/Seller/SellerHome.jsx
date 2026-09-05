import React from 'react';
import { 
  ShoppingCart, 
  Banknote, 
  Store, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Package,
  ChevronRight
} from 'lucide-react';
import { CURRENT_SELLER, STORE_CREDIT_DATA } from '../../data/mockData';

export const SellerHome = ({ onNavigate }) => {
  const formatSAR = (val) => {
    return new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(val);
  };

  const targetPercentage = Math.round((CURRENT_SELLER.dailySalesAchieved / CURRENT_SELLER.dailySalesTarget) * 100);

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
          <span>+ New Sale (POS)</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('cash')}
        >
          <Banknote size={18} className="text-emerald-700" />
          <span>Settle Cash</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('stores')}
        >
          <Store size={18} className="text-blue-700" />
          <span>+ New Store</span>
        </button>

        <button 
          className="btn-secondary" 
          style={{ height: '52px', fontSize: '12.5px', justifyContent: 'center', borderColor: '#b8c7b4' }}
          onClick={() => onNavigate('attendance')}
        >
          <Clock size={18} className="text-amber-700" />
          <span>Shift / Odometer</span>
        </button>
      </div>

      {/* 2. SHIFT & TARGET SUMMARY CARDS (1 col on mobile, 3 cols on desktop) */}
      <div className="seller-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {/* Daily Target Card */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Today's Sales Target</span>
            <div className="metric-icon-box">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(CURRENT_SELLER.dailySalesAchieved)}</div>
          <div style={{ width: '100%', backgroundColor: '#edf2ea', borderRadius: '4px', height: '8px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: `${targetPercentage}%`, backgroundColor: 'var(--color-agro-green)', height: '100%' }}></div>
          </div>
          <div className="breakdown-row">
            <span>Target: {formatSAR(CURRENT_SELLER.dailySalesTarget)}</span>
            <span style={{ fontWeight: 700, color: 'var(--color-forest-dark)' }}>{targetPercentage}% Achieved</span>
          </div>
        </div>

        {/* Cash in Hand & Ceiling Watch */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Field Cash in Hand</span>
            <div className="metric-icon-box">
              <Banknote size={16} />
            </div>
          </div>
          <div className="metric-value" style={{ color: CURRENT_SELLER.cashBreachWarning ? '#991b1b' : 'var(--color-forest-dark)' }}>
            {formatSAR(CURRENT_SELLER.cashInHand)}
          </div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>Cash Limit:</span>
              <span className="breakdown-val">{formatSAR(CURRENT_SELLER.cashLimit)}</span>
            </div>
            <div className="breakdown-row">
              <span>Status:</span>
              {CURRENT_SELLER.cashBreachWarning ? (
                <span className="breakdown-val alert">Limit Exceeded (Deposit Needed)</span>
              ) : (
                <span className="breakdown-val" style={{ color: '#166534' }}>Within Ceiling</span>
              )}
            </div>
          </div>
        </div>

        {/* Van Stock Valuation */}
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Vehicle Inventory Value</span>
            <div className="metric-icon-box">
              <Package size={16} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(CURRENT_SELLER.assignedVehicle.stockValue)}</div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>Assigned Van:</span>
              <span className="breakdown-val">Van #{CURRENT_SELLER.assignedVehicle.id}</span>
            </div>
            <div className="breakdown-row">
              <span>Expiry Priority:</span>
              <span className="breakdown-val alert">1 SKU Clearance Warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S STORE ROUTE SCHEDULE */}
      <div className="data-panel">
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <MapPin size={16} />
            <span>Today's Route Schedule ({CURRENT_SELLER.route})</span>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('stores')}>
            <span>All Stores</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Store & Owner</th>
                <th>Area</th>
                <th>Credit Terms</th>
                <th>Dues</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {STORE_CREDIT_DATA.map((store) => (
                <tr key={store.storeId}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{store.storeName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{store.ownerName}</div>
                  </td>
                  <td>{store.city}</td>
                  <td>{store.creditCycle}</td>
                  <td>
                    <strong style={{ color: store.blocked ? '#991b1b' : 'var(--text-main)' }}>
                      SAR {store.outstandingBalance.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    {store.blocked ? (
                      <span className="badge badge-danger">BLOCKED</span>
                    ) : (
                      <span className="badge badge-success">Active</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn-sm-primary" 
                      onClick={() => onNavigate('new-sale')}
                    >
                      <ShoppingCart size={12} />
                      <span>Start Sale</span>
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
