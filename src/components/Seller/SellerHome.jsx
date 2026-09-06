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

export const SellerHome = ({ onNavigate }) => {
  const { currentSeller, stores } = useManagerContext();

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
    return new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(val || 0);
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
          <div className="metric-value">{formatSAR(seller.dailySalesAchieved)}</div>
          <div style={{ width: '100%', backgroundColor: '#edf2ea', borderRadius: '4px', height: '8px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: `${targetPercentage}%`, backgroundColor: 'var(--color-agro-green)', height: '100%' }}></div>
          </div>
          <div className="breakdown-row">
            <span>Target: {formatSAR(seller.dailySalesTarget)}</span>
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
          <div className="metric-value" style={{ color: seller.cashBreachWarning ? '#991b1b' : 'var(--color-forest-dark)' }}>
            {formatSAR(seller.cashInHand)}
          </div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>Cash Limit:</span>
              <span className="breakdown-val">{formatSAR(seller.cashLimit)}</span>
            </div>
            <div className="breakdown-row">
              <span>Status:</span>
              {seller.cashBreachWarning ? (
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
          <div className="metric-value">{formatSAR(seller.assignedVehicle?.stockValue)}</div>
          <div className="metric-sub-breakdown">
            <div className="breakdown-row">
              <span>Assigned Van:</span>
              <span className="breakdown-val">Van #{seller.assignedVehicle?.id}</span>
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
            <span>Today's Route Schedule ({seller.route})</span>
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
