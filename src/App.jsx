import React, { useState } from 'react';
import { useManagerContext } from './context/ManagerContext';

// Common Components
import { Header } from './components/Header';

// Manager Components
import { Sidebar } from './components/Sidebar';
import { ManagerDrawer } from './components/ManagerDrawer';
import { MetricsOverview } from './components/MetricsOverview';
import { ApprovalQueue } from './components/ApprovalQueue';
import { MainDataTable } from './components/MainDataTable';

// Manager Modals
import { WriteOffModal } from './components/Modals/WriteOffModal';
import { DispatchModal } from './components/Modals/DispatchModal';
import { OverrideModal } from './components/Modals/OverrideModal';
import { PhotoViewerModal } from './components/Modals/PhotoViewerModal';

import { ProductSetupModal } from './components/Modals/ProductSetupModal';
import { CreatePoModal } from './components/Modals/CreatePoModal';
import { SkuConversionModal } from './components/Modals/SkuConversionModal';
import { VehicleAuditModal } from './components/Modals/VehicleAuditModal';
import { VehicleLoadoutModal } from './components/Modals/VehicleLoadoutModal';

// Seller Components
import { SellerHeader } from './components/Seller/SellerHeader';
import { SellerDrawer } from './components/Seller/SellerDrawer';
import { SellerHome } from './components/Seller/SellerHome';
import { SellerNewSale } from './components/Seller/SellerNewSale';
import { SellerVehicleStock } from './components/Seller/SellerVehicleStock';
import { SellerStorePortfolio } from './components/Seller/SellerStorePortfolio';
import { SellerCashHandover } from './components/Seller/SellerCashHandover';
import { SellerAttendance } from './components/Seller/SellerAttendance';

// Admin Components
import { AdminSidebar } from './components/Admin/AdminSidebar';
import { AdminDrawer } from './components/Admin/AdminDrawer';
import { AdminSystemRules } from './components/Admin/AdminSystemRules';
import { AdminCatalogTemplates } from './components/Admin/AdminCatalogTemplates';
import { AdminVendorManager } from './components/Admin/AdminVendorManager';
import { AdminPermissionsManager } from './components/Admin/AdminPermissionsManager';
import { AdminFeatureToggles } from './components/Admin/AdminFeatureToggles';
import { AdminAuditTrail } from './components/Admin/AdminAuditTrail';

import { 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Send, 
  Lock, 
  PackagePlus,
  FilePlus,
  RepeatIcon,
  ClipboardCheck,
  Truck,
  ArrowRightLeft,
  Sliders
} from 'lucide-react';

export function App() {
  const { 
    approveWriteOff, 
    releaseDispatch, 
    overrideCredit, 
    verifyCash, 
    approveStore, 
    createProduct, 
    createPurchaseOrder, 
    convertSku, 
    submitVehicleAudit, 
    issueVehicleLoadout,
    completeSale
  } = useManagerContext();

  // Role State: 'admin' | 'manager' | 'seller'
  const [currentRole, setCurrentRole] = useState('admin');

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview'); // Manager tabs
  const [sellerTab, setSellerTab] = useState('home'); // Seller tabs
  const [adminTab, setAdminTab] = useState('admin-rules'); // Admin tabs

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modal states
  const [photoModal, setPhotoModal] = useState({ open: false, url: '', title: '' });
  const [writeOffModal, setWriteOffModal] = useState({ open: false, item: null });
  const [dispatchModal, setDispatchModal] = useState({ open: false, item: null });
  const [overrideModal, setOverrideModal] = useState({ open: false, item: null });

  // Workflow Modal states
  const [productSetupModal, setProductSetupModal] = useState(false);
  const [createPoModal, setCreatePoModal] = useState(false);
  const [skuConversionModal, setSkuConversionModal] = useState(false);
  const [vehicleAuditModal, setVehicleAuditModal] = useState(false);
  const [vehicleLoadoutModal, setVehicleLoadoutModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Approval Actions
  const handleApproveWriteOff = async (item, notes) => {
    setWriteOffModal({ open: false, item: null });
    await approveWriteOff(item, notes);
    showToast(`Approved Stock Write-off ${item.id} (${item.quantity}). Write-off ledger updated.`);
  };

  const handleProcessDispatch = async (item, transporter, driver) => {
    setDispatchModal({ open: false, item: null });
    await releaseDispatch(item, transporter, driver);
    showToast(`Dispatch ${item.id} released via ${transporter} (Driver: ${driver}). Order status set to In-Transit.`);
  };

  const handleConfirmOverride = async (item, reason) => {
    setOverrideModal({ open: false, item: null });
    await overrideCredit(item, reason);
    showToast(`Manager credit block override granted for ${item.storeName}. Audit log recorded.`);
  };

  const handleVerifyCash = async (item) => {
    await verifyCash(item);
    showToast(`Cash Handover ${item.id} (${item.declaredAmount.toLocaleString()} SAR) verified & released.`);
  };

  const handleApproveStore = async (item) => {
    await approveStore(item);
    showToast(`Store ${item.storeName} approved for field sales under ${item.proposedCycle}.`);
  };

  // Workflow Handlers
  const handleCreateProduct = async (data) => {
    setProductSetupModal(false);
    await createProduct(data);
    showToast(`Workflow A: Created Product "${data.productName}" -> SKU ${data.sku} generated.`);
  };

  const handleCreatePo = async (data) => {
    setCreatePoModal(false);
    await createPurchaseOrder(data);
    showToast(`Workflow C/O: Purchase Order ${data.poNumber} saved as Draft and sent to Admin for approval.`);
  };

  const handleSkuConversion = async (data) => {
    setSkuConversionModal(false);
    await convertSku(data);
    showToast(`Workflow D: Converted ${data.sourceQty} units of ${data.sourceSku} to ${data.targetQty} units of ${data.targetSku}. ${data.lossQty} kg loss logged.`);
  };

  const handleVehicleAudit = async (data) => {
    setVehicleAuditModal(false);
    await submitVehicleAudit(data);
    showToast(`Workflow N: Saved Physical Audit for ${data.vehicleId}. Variance: ${data.variance} units logged.`);
  };

  const handleVehicleLoadout = async (data) => {
    setVehicleLoadoutModal(false);
    await issueVehicleLoadout(data);
    showToast(`Workflow F: Issued ${data.quantity} units of ${data.sku} to ${data.vehicle}. Awaiting seller confirmation.`);
  };

  const handleCompleteSale = async (saleData) => {
    await completeSale(saleData);
    showToast(`Sale Completed! Delivery document issued for ${saleData.storeName} (SAR ${saleData.totalAmount.toLocaleString()}).`);
    setSellerTab('home');
  };

  return (
    <div className="app-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-banner" style={{
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

      {/* RENDER BASED ON CURRENT ACTIVE ROLE */}
      {currentRole === 'seller' ? (
        /* SELLER FIELD EXPERIENCE WITH DRAWER MENU */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <SellerHeader 
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onSwitchRole={() => setCurrentRole('manager')}
            onNavigate={setSellerTab}
            activeTab={sellerTab}
          />
          
          <SellerDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={sellerTab}
            setActiveTab={setSellerTab}
            onSwitchRole={() => setCurrentRole('manager')}
          />
          
          <main className="erp-content" style={{ paddingBottom: '32px' }}>
            {sellerTab === 'home' && <SellerHome onNavigate={setSellerTab} />}
            {sellerTab === 'new-sale' && <SellerNewSale onCompleteSale={handleCompleteSale} onNavigate={setSellerTab} />}
            {sellerTab === 'van-stock' && <SellerVehicleStock onNavigate={setSellerTab} />}
            {sellerTab === 'stores' && <SellerStorePortfolio onNavigate={setSellerTab} />}
            {sellerTab === 'cash' && <SellerCashHandover onNavigate={setSellerTab} />}
            {sellerTab === 'attendance' && <SellerAttendance onNavigate={setSellerTab} />}
          </main>
        </div>
      ) : currentRole === 'admin' ? (
        /* ADMIN DESKTOP & MOBILE SYSTEM CONTROL DESK */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Header 
            onSearch={setSearchQuery} 
            searchQuery={searchQuery} 
            currentRole={currentRole}
            onSwitchRole={setCurrentRole} 
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          <AdminDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            onSwitchRole={setCurrentRole}
          />

          <div className="app-main-layout">
            <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} />

            <main className="erp-content">
              <div className="dashboard-topbar">
                <div>
                  <div className="topbar-title">
                    <span>Admin System Governance Console</span>
                    <span className="badge badge-success">
                      <ShieldCheck size={12} />
                      Master Configuration
                    </span>
                  </div>
                  <div className="topbar-subtitle">
                    Company System Ceilings, Vendor Master Directory, Category Templates & Permission Set Grants
                  </div>
                </div>

                <div className="topbar-actions">
                  <button className="btn-secondary" onClick={() => setCurrentRole('manager')}>
                    <ArrowRightLeft size={14} />
                    <span>Manager View</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setCurrentRole('seller')}>
                    <ArrowRightLeft size={14} />
                    <span>Seller View</span>
                  </button>
                </div>
              </div>

              {adminTab === 'admin-rules' && <AdminSystemRules onShowToast={showToast} />}
              {adminTab === 'admin-catalog' && <AdminCatalogTemplates onShowToast={showToast} />}
              {adminTab === 'admin-vendors' && <AdminVendorManager onShowToast={showToast} />}
              {adminTab === 'admin-permissions' && <AdminPermissionsManager onShowToast={showToast} />}
              {adminTab === 'admin-features' && <AdminFeatureToggles onShowToast={showToast} />}
              {adminTab === 'admin-audit' && <AdminAuditTrail />}
            </main>
          </div>
        </div>
      ) : (
        /* MANAGER DESKTOP & MOBILE EXPERIENCE */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Header 
            onSearch={setSearchQuery} 
            searchQuery={searchQuery} 
            currentRole={currentRole}
            onSwitchRole={setCurrentRole} 
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          <ManagerDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSwitchRole={() => setCurrentRole('seller')}
            onOpenProductSetup={() => setProductSetupModal(true)}
            onOpenCreatePo={() => setCreatePoModal(true)}
          />

          <div className="app-main-layout">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="erp-content">
              <div className="dashboard-topbar">
                <div>
                  <div className="topbar-title">
                    <span>Manager Operational Control Center</span>
                    <span className="badge badge-success">
                      <ShieldCheck size={12} />
                      Active System
                    </span>
                  </div>
                  <div className="topbar-subtitle">
                    Riyadh Central Distribution Center (WH-01) &bull; Kingdom of Saudi Arabia Wholesale Operations
                  </div>
                </div>

                <div className="topbar-actions">
                  <button 
                    className="btn-secondary" 
                    style={{ backgroundColor: '#1b4332', color: '#fff', borderColor: '#1b4332' }}
                    onClick={() => setCurrentRole('seller')}
                  >
                    <ArrowRightLeft size={14} />
                    <span>Switch to Field Seller View</span>
                  </button>

                  <button className="btn-secondary" onClick={() => setProductSetupModal(true)}>
                    <PackagePlus size={14} />
                    <span>+ Setup Product / SKU</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setCreatePoModal(true)}>
                    <FilePlus size={14} />
                    <span>+ Raise Draft PO</span>
                  </button>
                  <button className="btn-primary" onClick={() => showToast('Exporting Manager Operational Report (PDF/Excel)...')}>
                    <Download size={14} />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              <MetricsOverview />

              {activeTab === 'overview' ? (
                <div className="dashboard-split-layout">
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

                  <div className="side-column">
                    <div className="side-panel-card">
                      <div className="side-panel-title">
                        <AlertTriangle size={15} className="text-amber-700" />
                        <span>Operational Alerts Watch</span>
                      </div>

                      <div className="side-alert-item alert-danger">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>2 Cash Ceiling Breaches</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>Sellers Omar & Faisal exceeded cash limits.</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-warning">
                        <Clock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>1 Overdue Vehicle Audit</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>Van #VH-02 (Khalid) past 35-day audit window.</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-warning">
                        <Clock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>3 Expiry FEFO Clearance Flags</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>Okra Parbhani Kranti expires in 25 days.</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-info">
                        <Lock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>4 Stores Credit Blocked</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>Overdue balances past credit cycle.</div>
                        </div>
                      </div>
                    </div>

                    <div className="side-panel-card">
                      <div className="side-panel-title">
                        <Send size={15} />
                        <span>Manager Workflows</span>
                      </div>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setVehicleLoadoutModal(true)}>
                        <Truck size={14} />
                        <span>Workflow F: Issue Vehicle Loadout</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setVehicleAuditModal(true)}>
                        <ClipboardCheck size={14} />
                        <span>Workflow N: Audit Vehicle Stock</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setSkuConversionModal(true)}>
                        <RepeatIcon size={14} />
                        <span>Workflow D: Convert SKU / Repackage</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setCreatePoModal(true)}>
                        <FilePlus size={14} />
                        <span>Workflow C/O: Draft Purchase Order</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setProductSetupModal(true)}>
                        <PackagePlus size={14} />
                        <span>Workflow A: Setup Product / SKU</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <MainDataTable
                  activeTab={activeTab}
                  searchQuery={searchQuery}
                  onOverrideCredit={(item) => setOverrideModal({ open: true, item })}
                  onViewPoDetails={(po) => showToast(`Viewing details for Purchase Order ${po.poNumber} (${po.vendorName})`)}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Workflow Modals */}
      {productSetupModal && (
        <ProductSetupModal
          onClose={() => setProductSetupModal(false)}
          onConfirm={handleCreateProduct}
        />
      )}

      {createPoModal && (
        <CreatePoModal
          onClose={() => setCreatePoModal(false)}
          onConfirm={handleCreatePo}
        />
      )}

      {skuConversionModal && (
        <SkuConversionModal
          onClose={() => setSkuConversionModal(false)}
          onConfirm={handleSkuConversion}
        />
      )}

      {vehicleAuditModal && (
        <VehicleAuditModal
          onClose={() => setVehicleAuditModal(false)}
          onConfirm={handleVehicleAudit}
        />
      )}

      {vehicleLoadoutModal && (
        <VehicleLoadoutModal
          onClose={() => setVehicleLoadoutModal(false)}
          onConfirm={handleVehicleLoadout}
        />
      )}

      {/* Action Approval Modals */}
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
