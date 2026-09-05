import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

export const WriteOffModal = ({ item, onClose, onConfirm }) => {
  const [managerNotes, setManagerNotes] = useState('');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Approve Stock Write-off Request #{item.id}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#92400e', display: 'flex', gap: '8px' }}>
            <AlertTriangle size={16} className="shrink-0" />
            <div>
              <strong>Phase 1 Scope Rule:</strong> Approving this write-off permanently removes stock from the holding location ledger and posts to the write-off journal.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
            <div>
              <span className="form-label">SKU / Item</span>
              <div style={{ fontWeight: 600 }}>{item.productName}</div>
              <div className="code-cell" style={{ display: 'inline-block', marginTop: '2px' }}>{item.sku}</div>
            </div>
            <div>
              <span className="form-label">LOT / Batch Number</span>
              <div style={{ fontWeight: 600 }}>{item.lotNumber}</div>
            </div>
            <div>
              <span className="form-label">Quantity & Loss Value</span>
              <div style={{ fontWeight: 700, color: '#991b1b' }}>{item.quantity} (SAR {item.totalValue.toLocaleString()})</div>
            </div>
            <div>
              <span className="form-label">Holding Location</span>
              <div style={{ fontWeight: 600 }}>{item.holdingLocation}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Reason Submitted</span>
            <div style={{ padding: '8px', background: '#f8faf8', border: '1px solid #dce3da', borderRadius: '4px', fontSize: '12px' }}>
              {item.reason}
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Photographic Proof Evidence</span>
            <div className="photo-preview-box">
              <img src={item.photoEvidence} alt="Evidence" />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Manager Approval Audit Comment (Optional)</span>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Enter authorization notes for audit log..."
              value={managerNotes}
              onChange={(e) => setManagerNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onConfirm(item, managerNotes)}>
            <CheckCircle size={14} />
            <span>Confirm & Execute Write-off</span>
          </button>
        </div>
      </div>
    </div>
  );
};
