import React, { useState } from 'react';
import { X, Truck, Package, CheckCircle } from 'lucide-react';

export const VehicleLoadoutModal = ({ onClose, onConfirm }) => {
  const [vehicle, setVehicle] = useState('VH-03 (Hyundai Mighty - Tariq Al-Rashid)');
  const [sku, setSku] = useState('OKRA-PK-5KG');
  const [quantity, setQuantity] = useState(30);
  const [lotNumber, setLotNumber] = useState('OKR-2025-09A (First Expiry Priority)');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      vehicle,
      sku,
      quantity: Number(quantity),
      lotNumber
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Workflow F: Assign Vehicle & Issue Stock to Seller</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#f0f4ee', border: '1px solid #c6dec3', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1b4332' }}>
            <strong>Phase 1 Scope Rule:</strong> Batches are proposed First-Expiry-First-Out (FEFO). Issuing stock requires vehicle stock value ceiling validation. The seller must confirm receipt on their device to complete the transfer.
          </div>

          <div className="form-group">
            <span className="form-label">Vehicle Assignment & Seller</span>
            <select className="form-select" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              <option value="VH-03 (Hyundai Mighty - Tariq Al-Rashid)">VH-03 (Hyundai Mighty - Seller: Tariq Al-Rashid)</option>
              <option value="VH-01 (Toyota Hilux - Omar Farooq)">VH-01 (Toyota Hilux - Seller: Omar Farooq)</option>
              <option value="VH-04 (Ford Ranger - Faisal Ahmed)">VH-04 (Ford Ranger - Seller: Faisal Ahmed)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <span className="form-label">SKU to Issue</span>
              <select className="form-select" value={sku} onChange={(e) => setSku(e.target.value)}>
                <option value="OKRA-PK-5KG">OKRA-PK-5KG (Okra Seed Parbhani Kranti 5KG)</option>
                <option value="TOM-HYB-1KG">TOM-HYB-1KG (Hybrid Tomato Red Crown F1 1KG)</option>
                <option value="CUC-ALP-500G">CUC-ALP-500G (Cucumber Alpha F1 500g)</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">Proposed Batch (FEFO First)</span>
              <select className="form-select" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)}>
                <option value="OKR-2025-09A (First Expiry Priority)">LOT: OKR-2025-09A (Exp: 2026-09-30) [FEFO Priority]</option>
                <option value="OKR-2026-01B (Standard)">LOT: OKR-2026-01B (Exp: 2027-04-15)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Quantity to Issue</span>
            <input type="number" className="form-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Truck size={14} />
              <span>Issue Stock & Notify Seller for Handover Receipt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
