import React, { useState } from 'react';
import { Sliders, Save, CheckCircle, ShieldAlert, Lock, Clock, DollarSign, Percent } from 'lucide-react';
import { SYSTEM_CONFIG_RULES } from '../../data/mockData';

export const AdminSystemRules = ({ onShowToast }) => {
  const [config, setConfig] = useState({ ...SYSTEM_CONFIG_RULES });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, val) => {
    setConfig(prev => ({ ...prev, [field]: Number(val) }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    if (onShowToast) {
      onShowToast(`System Rules & Ceilings Updated! New parameters saved to master governance ledger.`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ padding: '18px', minHeight: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} />
              <span>System-Wide Rules & Governance Ceilings</span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Configure company-wide operational limits, cash ceilings, discount guardrails, and audit windows for Green Skill Agro.
            </div>
          </div>

          <button className="btn-primary" onClick={handleSave} style={{ gap: '6px' }}>
            <Save size={14} />
            <span>Save System Parameters</span>
          </button>
        </div>

        {saved && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <CheckCircle size={16} />
            <span>Configuration parameters successfully updated and active system-wide!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Card 1: Seller Discount Ceiling */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Percent size={15} />
              <span>Max Seller Discount Ceiling</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Maximum discount percentage a field seller can apply without Manager approval override.
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Permitted Seller Ceiling (%)</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.maxSellerDiscountPct}
                onChange={(e) => handleChange('maxSellerDiscountPct', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px 8px', borderRadius: '4px' }}>
              System Rule: Disciplinary alert triggered if seller exceeds this ceiling.
            </div>
          </div>

          {/* Card 2: Daily Cash Ceiling */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={15} />
              <span>Seller Daily Cash Ceiling (SAR)</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Maximum un-deposited cash balance a seller can hold before system blocks POS sales.
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Max Cash Limit (SAR)</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.maxSellerCashCeiling}
                onChange={(e) => handleChange('maxSellerCashCeiling', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '6px 8px', borderRadius: '4px' }}>
              System Rule: Automatic POS lock active when cash exceeds ceiling.
            </div>
          </div>

          {/* Card 3: Store Credit Grace Period */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={15} />
              <span>Store Credit Grace Period (Days)</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Days permitted past credit cycle due date before store account is automatically credit-blocked.
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Grace Period (Days)</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.storeCreditGraceDays}
                onChange={(e) => handleChange('storeCreditGraceDays', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 8px', borderRadius: '4px' }}>
              System Rule: Stores past grace period require Manager credit override.
            </div>
          </div>

          {/* Card 4: FEFO Expiry Warning Window */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} />
              <span>FEFO Expiry Clearance Window (Days)</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Threshold window to flag stock batches for mandatory FEFO clearance priority.
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Expiry Clearance Window (Days)</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.expiryWarningWindowDays}
                onChange={(e) => handleChange('expiryWarningWindowDays', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px 8px', borderRadius: '4px' }}>
              System Rule: Batches expiring within this window are prioritized for dispatch.
            </div>
          </div>
        </form>

        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Governance Record: Last updated by <strong>{config.lastUpdatedBy}</strong> on {config.lastUpdatedAt}</div>
          <span className="badge badge-success">
            <ShieldAlert size={12} />
            Master Governance Active
          </span>
        </div>
      </div>
    </div>
  );
};
