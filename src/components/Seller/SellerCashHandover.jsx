import React, { useState } from 'react';
import { Banknote, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';

export const SellerCashHandover = () => {
  const { currentSeller, submitCashHandover, approvals } = useManagerContext();
  const [routeType, setRouteType] = useState('Bank Deposit');
  const [amount, setAmount] = useState(14500);
  const [refNumber, setRefNumber] = useState('ALRAJ-998412');
  const [proofImage] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
  const [submitted, setSubmitted] = useState(false);

  const seller = currentSeller || { cashInHand: 14500, cashLimit: 12000, cashBreachWarning: true };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitCashHandover({
      type: routeType,
      amount,
      refNumber,
      proofImage,
      sellerName: seller.name,
      route: seller.route
    });
    setSubmitted(true);
  };

  const pendingList = approvals?.cashHandovers || [];

  return (
    <div className="seller-subpage-layout">
      {/* LEFT COLUMN: Cash Status & Deposit Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="dashboard-topbar">
          <div>
            <div className="topbar-title">
              <Banknote size={18} />
              <span>Workflow M: Cash Settlement & Handover</span>
            </div>
            <div className="topbar-subtitle">
              Cash collected in the field accumulates as cash in hand and requires manager approval to clear.
            </div>
          </div>
        </div>

        {seller.cashBreachWarning && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', fontSize: '12.5px', display: 'flex', gap: '10px' }}>
            <AlertTriangle size={18} className="shrink-0" />
            <div>
              <strong>Cash Ceiling Limit Breached!</strong>
              <div style={{ marginTop: '2px' }}>
                Your current cash in hand (SAR {seller.cashInHand?.toLocaleString()}) exceeds the ceiling limit of SAR {seller.cashLimit?.toLocaleString()}. Please submit a bank deposit or handover to clear the warning flag.
              </div>
            </div>
          </div>
        )}

        <div className="data-panel" style={{ padding: '20px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', marginBottom: '14px' }}>
            Submit Cash Clearance Request
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <span className="form-label">Settlement Route</span>
              <select className="form-select" value={routeType} onChange={(e) => setRouteType(e.target.value)}>
                <option value="Bank Deposit">Bank Deposit (Al Rajhi / SNB Transaction Slip)</option>
                <option value="Manager Direct Handover">Manager Direct Handover (Physical Envelope)</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">Amount Declared (SAR)</span>
              <input type="number" className="form-input" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">Bank Reference / Deposit Note</span>
              <input type="text" className="form-input" value={refNumber} onChange={(e) => setRefNumber(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">Photographic Proof of Deposit Slip / Handover</span>
              <div className="photo-preview-box">
                <img src={proofImage} alt="Deposit Proof" />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ height: '42px', justifyContent: 'center', marginTop: '6px' }}>
              <CheckCircle size={16} />
              <span>Submit for Manager Review & Verification</span>
            </button>
          </form>

          {submitted && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '4px', marginTop: '14px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} />
              <span>Handover request submitted! Cash balance will reduce upon Manager Sami Al-Mansoor's approval.</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Recent Handovers History */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="side-panel-card" style={{ padding: '18px' }}>
          <div className="side-panel-title">
            <ShieldCheck size={16} />
            <span>Recent Settlement Records ({pendingList.length} Pending)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingList.map((item) => (
              <div key={item.id} style={{ padding: '10px', backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-color-light)', borderRadius: '4px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{item.type}</span>
                  <span className="badge badge-warning">{item.status}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-forest-dark)', marginTop: '4px' }}>
                  SAR {item.declaredAmount?.toLocaleString()}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Ref: #{item.bankName} &bull; {item.dateSubmitted}</div>
              </div>
            ))}
            {pendingList.length === 0 && (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                No active pending settlements.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
