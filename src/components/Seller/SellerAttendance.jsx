import React, { useState } from 'react';
import { Clock, Camera, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { CURRENT_SELLER } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export const SellerAttendance = ({ _onNavigate }) => {
  const { t } = useLanguage();
  const [odometer, setOdometer] = useState(CURRENT_SELLER.odometerCurrent);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckOut = (e) => {
    e.preventDefault();
    setCheckedOut(true);
  };

  return (
    <div className="seller-subpage-layout">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="dashboard-topbar">
          <div>
            <div className="topbar-title">
              <Clock size={18} />
              <span>{t('shiftAttendance')}</span>
            </div>
            <div className="topbar-subtitle">
              {t('attendanceSubtitle')}
            </div>
          </div>
        </div>

        <div className="data-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)' }}>{t('shiftDetailsToday')}</span>
            <span className="badge badge-success">
              <ShieldCheck size={12} />
              {CURRENT_SELLER.shiftStatus}
            </span>
          </div>

          <div className="seller-shift-details-grid" style={{ marginBottom: '16px', fontSize: '12.5px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
              <span className="form-label">{t('checkInTimeLabel')}</span>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-forest-dark)' }}>{CURRENT_SELLER.checkInTime}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('odometerStartLabel')}: {CURRENT_SELLER.odometerStart.toLocaleString()} km</div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
              <span className="form-label">{t('distanceToday')}</span>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#166534' }}>{CURRENT_SELLER.distanceTodayKm} km</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('activeHoursToday')}: 6h 45m</div>
            </div>
          </div>

          <form onSubmit={handleCheckOut} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <span className="form-label">{t('closingOdometerLabel')}</span>
              <input type="number" className="form-input" value={odometer} onChange={(e) => setOdometer(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">{t('identitySelfieLabel')}</span>
              <div className="photo-preview-box" style={{ padding: 0, backgroundColor: '#c4c4c4', maxHeight: '240px' }}>
                <img 
                  src="/avatar-placeholder.png" 
                  alt="Identity Selfie" 
                  style={{ width: '100%', height: '220px', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} />
                <span>{t('gpsVerifiedLabel')}: 24.7136° N, 46.6753° E (Riyadh)</span>
              </div>
            </div>

            <button type="submit" className="btn-secondary" style={{ height: '42px', justifyContent: 'center', borderColor: '#b8c7b4' }}>
              <Clock size={16} />
              <span>{t('recordClosingOdometerBtn')}</span>
            </button>
          </form>

          {checkedOut && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '4px', marginTop: '14px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} />
              <span>{t('shiftClosedSuccess')} ({odometer - CURRENT_SELLER.odometerStart} km)</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="side-panel-card" style={{ padding: '18px' }}>
          <div className="side-panel-title">
            <Camera size={16} />
            <span>{t('assignedVehicleInfo')}</span>
          </div>

          <div style={{ fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="breakdown-row">
              <span>{t('vehicleIdLabel')}</span>
              <span className="breakdown-val">Van #{CURRENT_SELLER.assignedVehicle.id}</span>
            </div>
            <div className="breakdown-row">
              <span>{t('registrationLabel')}</span>
              <span className="breakdown-val">{CURRENT_SELLER.assignedVehicle.registration}</span>
            </div>
            <div className="breakdown-row">
              <span>{t('modelLabel')}</span>
              <span className="breakdown-val">{CURRENT_SELLER.assignedVehicle.model}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
