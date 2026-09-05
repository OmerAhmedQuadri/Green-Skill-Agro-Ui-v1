import React, { useState } from 'react';
import { X, ClipboardCheck, AlertTriangle } from 'lucide-react';

export const VehicleAuditModal = ({ onClose, onConfirm }) => {
  const [vehicleId, setVehicleId] = useState('VH-02 (Isuzu D-Max - Seller: Khalid Mansoor)');
  const [sku, setSku] = useState('TOM-HYB-1KG');
  const [systemQty, setSystemQty] = useState(120);
  const [actualQty, setActualQty] = useState(118); // 2 cans missing
  const [varianceReason, setVarianceReason] = useState('2 Cans missing from van shelf. Shortfall routed to write-off ledger for review.');

  const variance = actualQty - systemQty;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      vehicleId,
      sku,
      systemQty,
      actualQty,
      variance,
      varianceReason
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Workflow N: Physical Audit of Vehicle Stock</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#92400e' }}>
            <strong>Phase 1 Scope Rule:</strong> Managers perform physical audits on vehicles monthly or as required. Declared vs physical vs system positions produce variance reports. Unresolved shortfalls route to write-off for approval.
          </div>

          <div className="form-group">
            <span className="form-label">Select Vehicle & Seller</span>
            <select className="form-select" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="VH-02 (Isuzu D-Max - Seller: Khalid Mansoor)">VH-02 (Isuzu D-Max - Seller: Khalid Mansoor) [FLAGGED OVERDUE]</option>
              <option value="VH-01 (Toyota Hilux - Seller: Omar Farooq)">VH-01 (Toyota Hilux - Seller: Omar Farooq)</option>
              <option value="VH-04 (Ford Ranger - Seller: Faisal Ahmed)">VH-04 (Ford Ranger - Seller: Faisal Ahmed)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <span className="form-label">System Qty (Bags/Cans)</span>
              <input type="number" className="form-input" value={systemQty} disabled />
            </div>

            <div className="form-group">
              <span className="form-label">Actual Physical Count</span>
              <input type="number" className="form-input" value={actualQty} onChange={(e) => setActualQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Calculated Variance</span>
              <input type="text" className="form-input" value={`${variance} Units`} disabled style={{ color: variance < 0 ? '#991b1b' : '#166534', fontWeight: 700 }} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Variance Explanation / Comment (Required for differences)</span>
            <textarea className="form-textarea" rows={2} value={varianceReason} onChange={(e) => setVarianceReason(e.target.value)} required />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <ClipboardCheck size={14} />
              <span>Save Physical Audit & Generate Variance Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
