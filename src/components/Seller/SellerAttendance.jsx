import React, { useState } from 'react';
import { Clock, Camera, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';

export const SellerAttendance = () => {
  const [odometer, setOdometer] = useState(CURRENT_SELLER.odometerCurrent);
  const [selfiePhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckOut = (e) => {
    e.preventDefault();
    setCheckedOut(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="dashboard-topbar">
          <div>
            <div className="topbar-title">
              <Clock size={18} />
              <span>Workflow G: Shift Attendance & Vehicle Odometer</span>
            </div>
            <div className="topbar-subtitle">
              Check-in and check-out capture selfie, auto-detected GPS location, and odometer reading.
            </div>
          </div>
        </div>

        <div className="data-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)' }}>Shift Details (Today)</span>
            <span className="badge badge-success">
              <ShieldCheck size={12} />
              {CURRENT_SELLER.shiftStatus}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '12.5px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
              <span className="form-label">Check-in Time</span>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-forest-dark)' }}>{CURRENT_SELLER.checkInTime}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Odometer Start: {CURRENT_SELLER.odometerStart.toLocaleString()} km</div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
              <span className="form-label">Distance Today</span>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#166534' }}>{CURRENT_SELLER.distanceTodayKm} km</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Hours: 6h 45m</div>
            </div>
          </div>

          <form onSubmit={handleCheckOut} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <span className="form-label">Closing Odometer Reading (km)</span>
              <input type="number" className="form-input" value={odometer} onChange={(e) => setOdometer(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">Identity Selfie Capture</span>
              <div className="photo-preview-box">
                <img src={selfiePhoto} alt="Selfie" />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} />
                <span>GPS Verified: 24.7136° N, 46.6753° E (Riyadh)</span>
              </div>
            </div>

            <button type="submit" className="btn-secondary" style={{ height: '42px', justifyContent: 'center', borderColor: '#b8c7b4' }}>
              <Clock size={16} />
              <span>Record Closing Odometer & End Shift</span>
            </button>
          </form>

          {checkedOut && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '4px', marginTop: '14px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} />
              <span>Shift closed successfully! Calculated distance ({odometer - CURRENT_SELLER.odometerStart} km) logged.</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="side-panel-card" style={{ padding: '18px' }}>
          <div className="side-panel-title">
            <Camera size={16} />
            <span>Assigned Vehicle Info</span>
          </div>

          <div style={{ fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="breakdown-row">
              <span>Vehicle ID:</span>
              <span className="breakdown-val">Van #{CURRENT_SELLER.assignedVehicle.id}</span>
            </div>
            <div className="breakdown-row">
              <span>Registration:</span>
              <span className="breakdown-val">{CURRENT_SELLER.assignedVehicle.registration}</span>
            </div>
            <div className="breakdown-row">
              <span>Model:</span>
              <span className="breakdown-val">{CURRENT_SELLER.assignedVehicle.model}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
