import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MetricsOverview } from './components/MetricsOverview';
import { ApprovalQueue } from './components/ApprovalQueue';
import { MainDataTable } from './components/MainDataTable';

import { WriteOffModal } from './components/Modals/WriteOffModal';
import { DispatchModal } from './components/Modals/DispatchModal';
import { OverrideModal } from './components/Modals/OverrideModal';
import { PhotoViewerModal } from './components/Modals/PhotoViewerModal';

import { 
  CheckCircle2, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Send, 
  Lock, 
  Plus, 
  FileSpreadsheet,
  Users
} from 'lucide-react';
import { METRICS } from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modal states
  const [photoModal, setPhotoModal] = useState({ open: false, url: '', title: '' });
  const [writeOffModal, setWriteOffModal] = useState({ open: false, item: null });
  const [dispatchModal, setDispatchModal] = useState({ open: false, item: null });
  const [overrideModal, setOverrideModal] = useState({ open: false, item: null });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Actions
  const handleApproveWriteOff = (item, notes) => {
    setWriteOffModal({ open: false, item: null });
    showToast(`Approved Stock Write-off ${item.id} (${item.quantity}). Write-off ledger updated.`);
  };

  const handleProcessDispatch = (item, transporter, driver) => {
    setDispatchModal({ open: false, item: null });
    showToast(`Dispatch ${item.id} released via ${transporter} (Driver: ${driver}). Order status set to In-Transit.`);
  };

  const handleConfirmOverride = (item, reason) => {
    setOverrideModal({ open: false, item: null });
    showToast(`Manager credit block override granted for ${item.storeName}. Audit log recorded.`);
  };

  const handleVerifyCash = (item) => {
    showToast(`Cash Handover ${item.id} (${item.declaredAmount.toLocaleString()} SAR) verified & released.`);
  };

  const handleApproveStore = (item) => {
    showToast(`Store ${item.storeName} approved for field sales under ${item.proposedCycle}.`);
  };

  return (
    <div className="app-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '64px',
          right: '24px',
          backgroundColor: '#1b4332',
          color: '#ffffff',
          padding: '10px 16px',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '12.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 999
        }}>
          <CheckCircle2 size={16} style={{ color: '#4ade80' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Enterprise Header */}
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* App Main Layout */}
      <div className="app-main-layout">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Central Content Area */}
        <main className="erp-content">
          {/* Top Banner Header */}
          <div className="dashboard-topbar">
            <div>
              <div className="topbar-title">
                <span>Manager Operational Control Center</span>
                <span className="badge badge-success">
                  <ShieldCheck size={12} />
                  Phase 1 Scope
                </span>
              </div>
              <div className="topbar-subtitle">
                Riyadh Central Distribution Center (WH-01) &bull; Kingdom of Saudi Arabia Wholesale Operations
              </div>
            </div>

            <div className="topbar-actions">
              <button className="btn-secondary" onClick={() => showToast('Data synced live from Central Server.')}>
                <RefreshCw size={14} />
                <span>Sync Live Data</span>
              </button>
              <button className="btn-primary" onClick={() => showToast('Exporting Manager Operational Report (PDF/Excel)...')}>
                <Download size={14} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <MetricsOverview />

          {/* BALANCED 2-COLUMN DASHBOARD SPLIT */}
          {activeTab === 'overview' ? (
            <div className="dashboard-split-layout">
              {/* LEFT PRIMARY COLUMN: Approval Queue & Live Table */}
              <div className="main-column">
                <ApprovalQueue
                  onViewPhoto={(url, title) => setPhotoModal({ open: true, url, title })}
                  onApproveWriteOff={(item) => setWriteOffModal({ open: true, item })}
                  onHandleDispatch={(item) => setDispatchModal({ open: true, item })}
                  onVerifyCash={handleVerifyCash}
                  onOverrideCredit={(item) => setOverrideModal({ open: true, item })}
                  onApproveStore={handleApproveStore}
                />

                <MainDataTable
                  activeTab="overview"
                  searchQuery={searchQuery}
                  onOverrideCredit={(item) => setOverrideModal({ open: true, item })}
                  onViewPoDetails={(po) => showToast(`Viewing details for PO ${po.poNumber}`)}
                />
              </div>

              {/* RIGHT SIDEBAR COLUMN: Operational Alerts & Quick Actions */}
              <div className="side-column">
                {/* 1. Live Operational Alerts Panel */}
                <div className="side-panel-card">
                  <div className="side-panel-title">
                    <AlertTriangle size={15} className="text-amber-700" />
                    <span>Operational Alerts Watch</span>
                  </div>

                  <div className="side-alert-item alert-danger">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>2 Cash Ceiling Breaches</strong>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Sellers Omar & Faisal exceeded cash limits (SAR 14,500 & SAR 18,900).</div>
                    </div>
                  </div>

                  <div className="side-alert-item alert-warning">
                    <Clock size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>1 Overdue Vehicle Audit</strong>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Van #VH-02 (Khalid) past 35-day audit window. Physical count required.</div>
                    </div>
                  </div>

                  <div className="side-alert-item alert-warning">
                    <Clock size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>3 Expiry FEFO Clearance Flags</strong>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Okra Parbhani Kranti 5KG batch expires in 25 days. FEFO priority active.</div>
                    </div>
                  </div>

                  <div className="side-alert-item alert-info">
                    <Lock size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>4 Stores Credit Blocked</strong>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Overdue balances past credit cycle window. Manager override required for sales.</div>
                    </div>
                  </div>
                </div>

                {/* 2. Manager Quick Actions */}
                <div className="side-panel-card">
                  <div className="side-panel-title">
                    <Send size={15} />
                    <span>Manager Quick Actions</span>
                  </div>

                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => showToast('Opening Dispatch Order Creator...')}>
                    <Plus size={14} />
                    <span>Raise Warehouse Dispatch</span>
                  </button>

                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setActiveTab('inventory')}>
                    <Clock size={14} />
                    <span>Review Expiry FEFO List</span>
                  </button>

                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setActiveTab('attendance')}>
                    <Users size={14} />
                    <span>Audit Field Attendance Selfies</span>
                  </button>

                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => showToast('Generating Reorder Forecast Report...')}>
                    <FileSpreadsheet size={14} />
                    <span>Run Demand Forecast</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* FOCUSED MODULE VIEW */
            <MainDataTable
              activeTab={activeTab}
              searchQuery={searchQuery}
              onOverrideCredit={(item) => setOverrideModal({ open: true, item })}
              onViewPoDetails={(po) => showToast(`Viewing details for Purchase Order ${po.poNumber} (${po.vendorName})`)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {photoModal.open && (
        <PhotoViewerModal
          photoUrl={photoModal.url}
          title={photoModal.title}
          onClose={() => setPhotoModal({ open: false, url: '', title: '' })}
        />
      )}

      {writeOffModal.open && (
        <WriteOffModal
          item={writeOffModal.item}
          onClose={() => setWriteOffModal({ open: false, item: null })}
          onConfirm={handleApproveWriteOff}
        />
      )}

      {dispatchModal.open && (
        <DispatchModal
          item={dispatchModal.item}
          onClose={() => setDispatchModal({ open: false, item: null })}
          onConfirm={handleProcessDispatch}
        />
      )}

      {overrideModal.open && (
        <OverrideModal
          item={overrideModal.item}
          onClose={() => setOverrideModal({ open: false, item: null })}
          onConfirm={handleConfirmOverride}
        />
      )}
    </div>
  );
}

export default App;
