import React, { useState } from 'react';
import { X, RefreshCw, AlertTriangle } from 'lucide-react';

export const SkuConversionModal = ({ onClose, onConfirm }) => {
  const [sourceSku, setSourceSku] = useState('OKRA-PK-5KG (Okra 5 kg Bag)');
  const [targetSku, setTargetSku] = useState('OKRA-PK-1KG (Okra 1 kg Pouch)');
  const [sourceQty, setSourceQty] = useState(20); // 20 bags = 100 kg
  const [targetQty, setTargetQty] = useState(98);  // 98 pouches = 98 kg
  const [lossQty, setLossQty] = useState(2);       // 2 kg loss during repackaging
  const [reason, setReason] = useState('Repackaging 5kg bags into 1kg pouches for field van demand. 2kg spillage recorded.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      sourceSku,
      targetSku,
      sourceQty: Number(sourceQty),
      targetQty: Number(targetQty),
      lossQty: Number(lossQty),
      reason
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Workflow D: Convert SKU & Repackage Stock</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1e40af' }}>
            <strong>System Rule:</strong> Converts stock from one pack size/packaging to another (e.g. 5kg bags to 1kg pouches). LOT #, MFD, and Expiry carry across unchanged. Loss quantity automatically posts to the write-off ledger.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <span className="form-label">Source SKU (Bulk Pack)</span>
              <select className="form-select" value={sourceSku} onChange={(e) => setSourceSku(e.target.value)}>
                <option value="OKRA-PK-5KG (Okra 5 kg Bag)">OKRA-PK-5KG (Okra 5 kg Bag)</option>
                <option value="TOM-HYB-5KG (Tomato 5 kg Can)">TOM-HYB-5KG (Tomato 5 kg Can)</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">Target SKU (Retail Pack)</span>
              <select className="form-select" value={targetSku} onChange={(e) => setTargetSku(e.target.value)}>
                <option value="OKRA-PK-1KG (Okra 1 kg Pouch)">OKRA-PK-1KG (Okra 1 kg Pouch)</option>
                <option value="TOM-HYB-1KG (Tomato 1 kg Can)">TOM-HYB-1KG (Tomato 1 kg Can)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <span className="form-label">Source Units Converted</span>
              <input type="number" className="form-input" value={sourceQty} onChange={(e) => setSourceQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Target Units Produced</span>
              <input type="number" className="form-input" value={targetQty} onChange={(e) => setTargetQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Repackaging Loss (kg/units)</span>
              <input type="number" className="form-input" value={lossQty} onChange={(e) => setLossQty(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Conversion Reason (Written Record Required)</span>
            <textarea className="form-textarea" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} required />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <RefreshCw size={14} />
              <span>Execute Conversion & Update Ledger</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
