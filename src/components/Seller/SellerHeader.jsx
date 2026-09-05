import React from 'react';
import { Truck, ShieldCheck, UserCheck, Banknote, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';

export const SellerHeader = ({ onSwitchRole }) => {
  return (
    <header className="erp-header" style={{ backgroundColor: '#1b4332', height: '60px' }}>
      <div className="header-brand">
        <div className="brand-icon" style={{ backgroundColor: '#5d7c4a' }}>GA</div>
        <div>
          <span className="brand-title">Green Agro Field Sales</span>
          <span className="brand-subtitle">Van #{CURRENT_SELLER.assignedVehicle.id} ({CURRENT_SELLER.assignedVehicle.registration})</span>
        </div>
      </div>

      <div className="header-center-info">
        <div className="warehouse-tag" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <UserCheck size={14} className="text-green-400" />
          <span>{CURRENT_SELLER.name}</span>
          <span className="live-dot" title="Shift Active"></span>
        </div>

        {CURRENT_SELLER.cashBreachWarning && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '3px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <AlertTriangle size={12} />
            <span>Cash in Hand: SAR {CURRENT_SELLER.cashInHand.toLocaleString()} (Limit Exceeded)</span>
          </div>
        )}
      </div>

      <div className="header-right">
        <button 
          className="btn-secondary" 
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
          onClick={onSwitchRole}
        >
          <ArrowRightLeft size={13} />
          <span>Switch Role: Manager Desktop</span>
        </button>
      </div>
    </header>
  );
};
