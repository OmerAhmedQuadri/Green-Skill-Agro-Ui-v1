import React, { useState } from 'react';
import { X, Camera, MapPin, Store, CheckCircle } from 'lucide-react';

export const NewStoreModal = ({ onClose, onConfirm }) => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [crNumber, setCrNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [proposedCycle, setProposedCycle] = useState('Weekly Cycle');
  const [proposedLimit, setProposedLimit] = useState(25000);
  const [storefrontPhoto] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName) return;
    onConfirm({
      id: `STR-NEW-${Math.floor(100 + Math.random() * 900)}`,
      storeName,
      ownerName,
      contactPhone: phone,
      city,
      crNumber: crNumber || 'Optional',
      vatNumber: vatNumber || 'Optional',
      proposedCycle,
      proposedLimit: Number(proposedLimit),
      storefrontPhoto,
      coordinates: '24.7136° N, 46.6753° E (GPS Captured)'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">Workflow H: Onboard New Store</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#f0f4ee', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1b4332' }}>
            <strong>System Rule:</strong> Storefront photo and auto-detected GPS coordinates are captured. CR/VAT numbers are optional. New stores require Manager approval before first sale.
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">Store Name</span>
              <input type="text" className="form-input" placeholder="e.g. Al-Waha Agricultural Store" value={storeName} onChange={(e) => setStoreName(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">Owner / Contact Person</span>
              <input type="text" className="form-input" placeholder="Owner Full Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">Phone Number</span>
              <input type="text" className="form-input" placeholder="+966 50 XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">City / Region</span>
              <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Riyadh">Riyadh</option>
                <option value="Al-Qassim">Al-Qassim</option>
                <option value="Al-Kharj">Al-Kharj</option>
                <option value="Jeddah">Jeddah</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">CR Number (Optional)</span>
              <input type="text" className="form-input" placeholder="1010XXXXXX" value={crNumber} onChange={(e) => setCrNumber(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">VAT Number (Optional)</span>
              <input type="text" className="form-input" placeholder="300XXXXXXXXX" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">Proposed Credit Cycle</span>
              <select className="form-select" value={proposedCycle} onChange={(e) => setProposedCycle(e.target.value)}>
                <option value="Weekly Cycle">Weekly Cycle</option>
                <option value="Monthly Cycle (30-Day)">Monthly Cycle (30-Day)</option>
                <option value="Bill to Bill">Bill to Bill (Pay-on-Delivery)</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">Proposed Credit Limit (SAR)</span>
              <input type="number" className="form-input" value={proposedLimit} onChange={(e) => setProposedLimit(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">Storefront Photographic Evidence</span>
            <div className="photo-preview-box">
              <img src={storefrontPhoto} alt="Storefront" />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} />
              <span>GPS Captured: 24.7136° N, 46.6753° E</span>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Store size={14} />
              <span>Submit Store for Manager Approval</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
