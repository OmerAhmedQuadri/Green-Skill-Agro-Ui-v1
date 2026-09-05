import React, { useState } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';

export const OverrideModal = ({ item, onClose, onConfirm }) => {
  const [overrideReason, setOverrideReason] = useState('');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Grant Manager Credit Block Override</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#991b1b', display: 'flex', gap: '8px' }}>
            <AlertTriangle size={16} className="shrink-0" />
            <div>
              <strong>Section 07 Rule:</strong> A store that is past due or over its credit limit is blocked from further sales. Every override requires an explicit recorded reason in the system audit log.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
            <div>
              <span className="form-label">Store Name</span>
              <div style={{ fontWeight: 600 }}>{item.storeName}</div>
            </div>
            <div>
              <span className="form-label">Credit Cycle</span>
              <div style={{ fontWeight: 600 }}>{item.creditCycle}</div>
            </div>
            <div>
              <span className="form-label">Credit Limit</span>
              <div style={{ fontWeight: 600 }}>SAR {item.creditLimit?.toLocaleString()}</div>
            </div>
            <div>
              <span className="form-label">Current Outstanding</span>
              <div style={{ fontWeight: 700, color: '#991b1b' }}>SAR {item.currentOutstanding?.toLocaleString()}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Required Written Manager Override Reason</span>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="State explicit operational justification for overriding credit limit (e.g. Confirmed post-dated cheque received / Admin special approval)..."
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-primary" 
            style={{ backgroundColor: '#92400e', borderColor: '#78350f' }}
            disabled={!overrideReason.trim()}
            onClick={() => onConfirm(item, overrideReason)}
          >
            <Lock size={14} />
            <span>Confirm & Record Override</span>
          </button>
        </div>
      </div>
    </div>
  );
};
