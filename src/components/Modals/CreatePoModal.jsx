import React, { useState } from 'react';
import { X, FileText, Send, CheckCircle } from 'lucide-react';

export const CreatePoModal = ({ onClose, onConfirm }) => {
  const [vendor, setVendor] = useState('Emirates Seed Corp (VND-EMIRATES-01)');
  const [itemsSummary, setItemsSummary] = useState('500x Tomato F1 1KG Cans, 200x Cucumber Alpha 500g');
  const [totalValue, setTotalValue] = useState(145000);
  const [leadTimeDays, setLeadTimeDays] = useState(35);
  const [expectedArrival, setExpectedArrival] = useState('2026-10-10');

  const handleSubmit = (e) => {
    e.preventDefault();
    const poNumber = `PO-2026-${Math.floor(100 + Math.random() * 900)}`;
    onConfirm({
      poNumber,
      vendorName: vendor.split(' (')[0],
      vendorCode: vendor.split('(')[1]?.replace(')', '') || 'VND-01',
      itemsSummary,
      totalValue: Number(totalValue),
      stateIndex: 1,
      stateName: '1. Draft',
      dateRaised: new Date().toISOString().split('T')[0],
      expectedArrival,
      leadTimeDays: Number(leadTimeDays),
      adminApprovalStatus: 'Draft (Submitted for Admin Approval)',
      reorderSource: 'Manager Draft Entry'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Workflow C & O: Raise Purchase Order (Draft)</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#92400e' }}>
            <strong>System Rule:</strong> Managers can draft purchase orders based on reorder recommendations. Approval always rests with an Admin before placing the order with vendors (30-40 day lead time).
          </div>

          <div className="form-group">
            <span className="form-label">Select Vendor</span>
            <select className="form-select" value={vendor} onChange={(e) => setVendor(e.target.value)}>
              <option value="Emirates Seed Corp (VND-EMIRATES-01)">Emirates Seed Corp (UAE Import - 35d lead time)</option>
              <option value="Royal Dutch Seeds (VND-ROYAL-DUTCH)">Royal Dutch Seeds BV (Netherlands Import - 40d lead time)</option>
              <option value="Al-Riyadh Agri Nets Co. (VND-RIYADH-NETS)">Al-Riyadh Agri Nets Co. (KSA Local - 15d lead time)</option>
              <option value="Jordan Agri Chemicals (VND-JORDAN-AGRI)">Jordan Agri Chemicals (Jordan Import - 30d lead time)</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">Order Items Summary</span>
            <input type="text" className="form-input" value={itemsSummary} onChange={(e) => setItemsSummary(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <span className="form-label">Total Value (SAR)</span>
              <input type="number" className="form-input" value={totalValue} onChange={(e) => setTotalValue(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Import Lead Time (Days)</span>
              <input type="number" className="form-input" value={leadTimeDays} onChange={(e) => setLeadTimeDays(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Expected Arrival Date</span>
              <input type="date" className="form-input" value={expectedArrival} onChange={(e) => setExpectedArrival(e.target.value)} />
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <FileText size={14} />
              <span>Save Draft & Submit to Admin for Approval</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
