import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { FEATURE_TOGGLES_DATA } from '../../data/mockData';

export const AdminFeatureToggles = ({ onShowToast }) => {
  const [toggles, setToggles] = useState([...FEATURE_TOGGLES_DATA]);
  const [returnPolicy, setReturnPolicy] = useState({
    maxReturnDays: 14,
    restockingFeePct: 5,
    requirePhotoEvidence: true,
    autoRestockGoodBatches: true
  });

  const handleToggle = (id) => {
    setToggles(prev => prev.map(t => {
      if (t.id === id) {
        const updated = !t.enabled;
        if (onShowToast) {
          onShowToast(`Feature "${t.featureName}" set to ${updated ? 'ENABLED' : 'DISABLED'}.`);
        }
        return { ...t, enabled: updated };
      }
      return t;
    }));
  };

  const handleSaveReturnPolicy = (e) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(`Return Policy Rules updated! Max Return Window: ${returnPolicy.maxReturnDays} Days, Restocking Fee: ${returnPolicy.restockingFeePct}%.`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* SECTION 1: System Feature Toggles */}
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <ToggleLeft size={16} />
            <span>System Feature Toggles & Operational Policies</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Enable or disable platform features and automated governance locks across Green Skill Agro.
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {toggles.map((t) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: t.enabled ? '#ffffff' : '#fcfdfd' }}>
              <div style={{ flex: 1, paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)' }}>{t.featureName}</span>
                  <span className="badge badge-info" style={{ fontSize: '10px' }}>{t.category}</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {t.description}
                </div>
              </div>

              <button 
                className={t.enabled ? 'btn-primary' : 'btn-secondary'}
                style={{ minWidth: '110px', justifyContent: 'center', height: '36px' }}
                onClick={() => handleToggle(t.id)}
              >
                {t.enabled ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                <span>{t.enabled ? 'Active' : 'Disabled'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Return Policy Rules */}
      <div className="data-panel" style={{ padding: '16px', minHeight: 'auto' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RotateCcw size={16} />
          <span>Product Return Policy & Restocking Rules</span>
        </div>

        <form onSubmit={handleSaveReturnPolicy} className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Max Allowable Return Window (Days)</label>
            <input 
              type="number" 
              className="form-input"
              value={returnPolicy.maxReturnDays}
              onChange={(e) => setReturnPolicy({ ...returnPolicy, maxReturnDays: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Restocking Fee (%)</label>
            <input 
              type="number" 
              className="form-input"
              value={returnPolicy.restockingFeePct}
              onChange={(e) => setReturnPolicy({ ...returnPolicy, restockingFeePct: Number(e.target.value) })}
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" style={{ height: '38px', justifyContent: 'center' }}>
              <span>Update Return Policy Rules</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
