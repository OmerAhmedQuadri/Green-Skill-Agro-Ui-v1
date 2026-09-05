import React, { useState } from 'react';
import { X, Send, Upload, CheckCircle } from 'lucide-react';

export const DispatchModal = ({ item, onClose, onConfirm }) => {
  const [transporter, setTransporter] = useState('Al-Majdouie Logistics');
  const [driverName, setDriverName] = useState('Mohammed Al-Subaie');
  const [slipFile, setSlipFile] = useState('Transport_Slip_DP2026.pdf');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Process Warehouse Dispatch #{item.id}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#1e40af' }}>
            <strong>System Rule:</strong> When vehicle stock is insufficient, goods are shipped directly from Warehouse WH-01 to the store. The sale remains attributed to seller <strong>{item.sellerName}</strong>.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
            <div>
              <span className="form-label">Target Store</span>
              <div style={{ fontWeight: 600 }}>{item.storeName}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.location}</div>
            </div>
            <div>
              <span className="form-label">Order Value</span>
              <div style={{ fontWeight: 700, color: 'var(--color-forest-dark)' }}>SAR {item.orderValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Assigned Transport Carrier</span>
            <select
              className="form-select"
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
            >
              <option value="Al-Majdouie Logistics">Al-Majdouie Logistics (Hired Freight)</option>
              <option value="Saudi Post Logistics">Saudi Post Logistics (SPL Express)</option>
              <option value="Green Skill Agro Internal Fleet (WH-01)">Green Skill Agro Internal Warehouse Truck</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Driver / Agent Name</span>
            <input
              type="text"
              className="form-input"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <span className="form-label">Proof of Release / Transport Slip Upload</span>
            <div style={{ border: '1px dashed #b8c7b4', padding: '12px', borderRadius: '4px', textAlign: 'center', backgroundColor: '#f8faf8' }}>
              <Upload size={18} className="mx-auto text-gray-500 mb-1" style={{ margin: '0 auto 4px auto', color: 'var(--color-forest-dark)' }} />
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-forest-dark)' }}>{slipFile}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Proof slip generated & loaded into dispatched position</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onConfirm(item, transporter, driverName)}>
            <Send size={14} />
            <span>Release Order & Mark In-Transit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
