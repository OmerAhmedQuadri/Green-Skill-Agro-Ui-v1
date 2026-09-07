import React, { useState } from 'react';
import { useManagerContext } from './context/ManagerContext';
import { useLanguage } from './context/LanguageContext';

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
import { PoDetailsModal } from './components/Modals/PoDetailsModal';
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

// Super Admin Components
import { SuperAdminSidebar } from './components/SuperAdmin/SuperAdminSidebar';
import { SuperAdminDrawer } from './components/SuperAdmin/SuperAdminDrawer';
import { SuperAdminOverview } from './components/SuperAdmin/SuperAdminOverview';
import { SuperAdminUserGovernance } from './components/SuperAdmin/SuperAdminUserGovernance';
import { SuperAdminPermissionsMatrix } from './components/SuperAdmin/SuperAdminPermissionsMatrix';
import { SuperAdminBranchManager } from './components/SuperAdmin/SuperAdminBranchManager';
import { SuperAdminSecurityAudit } from './components/SuperAdmin/SuperAdminSecurityAudit';
import { CreateAdminModal } from './components/SuperAdmin/Modals/CreateAdminModal';

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
  Crown,
  UserPlus
} from 'lucide-react';

export function App() {
  const { 
    loading,
    approveWriteOff, 
    releaseDispatch, 
    overrideCredit, 
    verifyCash, 
    approveStore, 
    createProduct, 
    createPurchaseOrder, 
    approvePurchaseOrder,
    convertSku, 
    submitVehicleAudit, 
    issueVehicleLoadout,
    completeSale
  } = useManagerContext();

  const { language, t } = useLanguage();

  // Role State: 'superadmin' | 'admin' | 'manager' | 'seller'
  const [currentRole, setCurrentRole] = useState('superadmin');

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview'); // Manager tabs
  const [sellerTab, setSellerTab] = useState('home'); // Seller tabs
  const [adminTab, setAdminTab] = useState('admin-rules'); // Admin tabs
  const [superAdminTab, setSuperAdminTab] = useState('superadmin-overview'); // Super Admin tabs

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modal states
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState(false);

  // Modal states
  const [photoModal, setPhotoModal] = useState({ open: false, url: '', title: '' });
  const [writeOffModal, setWriteOffModal] = useState({ open: false, item: null });
  const [dispatchModal, setDispatchModal] = useState({ open: false, item: null });
  const [overrideModal, setOverrideModal] = useState({ open: false, item: null });

  // Workflow Modal states
  const [productSetupModal, setProductSetupModal] = useState(false);
  const [createPoModal, setCreatePoModal] = useState(false);
  const [poDetailsModal, setPoDetailsModal] = useState({ open: false, item: null });
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
    showToast(language === 'ar' ? `تمت الموافقة على إسقاط المخزون ${item.id} (${item.quantity}). تم تحديث السجل.` : `Approved Stock Write-off ${item.id} (${item.quantity}). Write-off ledger updated.`);
  };

  const handleProcessDispatch = async (item, transporter, driver) => {
    setDispatchModal({ open: false, item: null });
    await releaseDispatch(item, transporter, driver);
    showToast(language === 'ar' ? `تم إصدار أمر التوزيع ${item.id} عبر ${transporter} (السائق: ${driver}).` : `Dispatch ${item.id} released via ${transporter} (Driver: ${driver}). Order status set to In-Transit.`);
  };

  const handleConfirmOverride = async (item, reason) => {
    setOverrideModal({ open: false, item: null });
    await overrideCredit(item, reason);
    showToast(language === 'ar' ? `تم منح تجاوز حظر الائتمان لـ ${item.storeName}. تم تسجيل السجل.` : `Manager credit block override granted for ${item.storeName}. Audit log recorded.`);
  };

  const handleVerifyCash = async (item) => {
    await verifyCash(item);
    showToast(language === 'ar' ? `تم تأكيد واختتام تسليم النقدية ${item.id} (${item.declaredAmount?.toLocaleString()} ريال).` : `Cash Handover ${item.id} (${item.declaredAmount.toLocaleString()} SAR) verified & released.`);
  };

  const handleApproveStore = async (item) => {
    await approveStore(item);
    showToast(language === 'ar' ? `تمت الموافقة على متجر ${item.storeName} للمبيعات الميدانية.` : `Store ${item.storeName} approved for field sales under ${item.proposedCycle}.`);
  };

  // Workflow Handlers
  const handleCreateProduct = async (data) => {
    setProductSetupModal(false);
    await createProduct(data);
    showToast(language === 'ar' ? `تم إنشاء المنتج "${data.productName}" -> الرمز ${data.sku}.` : `Created Product "${data.productName}" -> SKU ${data.sku} generated.`);
  };

  const handleCreatePo = async (data) => {
    setCreatePoModal(false);
    await createPurchaseOrder(data);
    showToast(language === 'ar' ? `تم حفظ أمر الشراء ${data.poNumber} كمسودة وإرساله للأدمن.` : `Purchase Order ${data.poNumber} saved as Draft and sent to Admin for approval.`);
  };

  const handleSkuConversion = async (data) => {
    setSkuConversionModal(false);
    await convertSku(data);
    showToast(language === 'ar' ? `تم تحويل الأصناف وتعبئتها بنجاح.` : `Converted ${data.sourceQty} units of ${data.sourceSku} to ${data.targetQty} units of ${data.targetSku}. ${data.lossQty} kg loss logged.`);
  };

  const handleVehicleAudit = async (data) => {
    setVehicleAuditModal(false);
    await submitVehicleAudit(data);
    showToast(language === 'ar' ? `تم حفظ الجرد الفعلي للشاحنة ${data.vehicleId}.` : `Saved Physical Audit for ${data.vehicleId}. Variance: ${data.variance} units logged.`);
  };

  const handleVehicleLoadout = async (data) => {
    setVehicleLoadoutModal(false);
    await issueVehicleLoadout(data);
    showToast(language === 'ar' ? `تم صرف ${data.quantity} وحدة من ${data.sku} للشاحنة ${data.vehicle}.` : `Issued ${data.quantity} units of ${data.sku} to ${data.vehicle}. Awaiting seller confirmation.`);
  };

  const handleCompleteSale = async (saleData) => {
    await completeSale(saleData);
    showToast(language === 'ar' ? `تمت عملية البيع بنجاح! تم إصدار سند التسليم لـ ${saleData.storeName} (${saleData.totalAmount?.toLocaleString()} ريال).` : `Sale Completed! Delivery document issued for ${saleData.storeName} (SAR ${saleData.totalAmount.toLocaleString()}).`);
    setSellerTab('home');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1b4332',
        color: '#ffffff'
      }}>
        <div className="brand-icon" style={{ backgroundColor: '#5d7c4a', fontSize: '18px', padding: '12px 20px', borderRadius: '6px', fontWeight: 800, marginBottom: '16px' }}>
          GSA
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>Green Skill Agro ERP</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>{language === 'ar' ? 'جاري تحميل بيانات المنشأة وعناصر الأمان...' : 'Loading Enterprise Data & Security Controls...'}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notification Banner - Centered Top */}
      {toastMessage && (
        <div className="toast-banner" style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'calc(100vw - 32px)',
          width: 'max-content',
          backgroundColor: '#1b4332',
          color: '#ffffff',
          padding: '10px 16px',
          borderRadius: '6px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          fontSize: '12.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 10000,
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          <CheckCircle2 size={16} style={{ color: '#4ade80', flexShrink: 0 }} />
          <span style={{ wordBreak: 'break-word' }}>{toastMessage}</span>
        </div>
      )}

      {/* RENDER BASED ON CURRENT ACTIVE ROLE */}
      {currentRole === 'superadmin' ? (
        /* SUPER ADMIN EXECUTIVE GOVERNANCE CONSOLE */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Header 
            onSearch={setSearchQuery} 
            searchQuery={searchQuery} 
            currentRole={currentRole}
            onSwitchRole={setCurrentRole} 
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          <SuperAdminDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={superAdminTab}
            setActiveTab={setSuperAdminTab}
            onSwitchRole={setCurrentRole}
          />

          <div className="app-main-layout">
            <SuperAdminSidebar activeTab={superAdminTab} setActiveTab={setSuperAdminTab} />

            <main className="erp-content">
              <div className="dashboard-topbar">
                <div>
                  <div className="topbar-title">
                    <span>{language === 'ar' ? 'منصة تحكم المشرف العام للحوكمة' : 'Super Admin Platform Governance Console'}</span>
                    <span className="badge badge-success" style={{ backgroundColor: '#1b4332', color: '#fff' }}>
                      <Crown size={12} />
                      {language === 'ar' ? 'السلطة التنفيذية العليا' : 'Supreme Executive Authority'}
                    </span>
                  </div>
                  <div className="topbar-subtitle">
                    {language === 'ar' ? 'الرقابة العامة للمنشأة • إدارة المستخدمين والأدمن • مصفوفة التسلسل وأزرار الطوارئ' : 'Phase 1 Enterprise Oversight • Platform Users & Admin Governance • Master Hierarchy & Security Kill-Switches'}
                  </div>
                </div>

                <div className="topbar-actions">
                  <button className="btn-secondary" onClick={() => setCurrentRole('admin')}>
                    <ArrowRightLeft size={14} />
                    <span>{t('adminRole')}</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setCurrentRole('manager')}>
                    <ArrowRightLeft size={14} />
                    <span>{t('managerRole')}</span>
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ backgroundColor: '#1b4332', borderColor: '#1b4332' }}
                    onClick={() => setCreateAdminModalOpen(true)}
                  >
                    <UserPlus size={14} />
                    <span>{t('provisionAdmin')}</span>
                  </button>
                </div>
              </div>

              {superAdminTab === 'superadmin-overview' && (
                <SuperAdminOverview 
                  onOpenCreateAdmin={() => setCreateAdminModalOpen(true)} 
                  onNavigateTab={setSuperAdminTab} 
                />
              )}
              {superAdminTab === 'superadmin-governance' && (
                <SuperAdminUserGovernance 
                  onOpenCreateAdmin={() => setCreateAdminModalOpen(true)} 
                  onShowToast={showToast} 
                />
              )}
              {superAdminTab === 'superadmin-permissions' && <SuperAdminPermissionsMatrix />}
              {superAdminTab === 'superadmin-branches' && <SuperAdminBranchManager onShowToast={showToast} />}
              {superAdminTab === 'superadmin-security' && <SuperAdminSecurityAudit onShowToast={showToast} />}
            </main>
          </div>
        </div>
      ) : currentRole === 'seller' ? (
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
                    <span>{language === 'ar' ? 'منصة إدارة وتكوين النظام' : 'Admin System Governance Console'}</span>
                    <span className="badge badge-success">
                      <ShieldCheck size={12} />
                      {language === 'ar' ? 'التهيئة العامة' : 'Master Configuration'}
                    </span>
                  </div>
                  <div className="topbar-subtitle">
                    {language === 'ar' ? 'سقوف النظام، دليل الموردين، قوالب الفئات، ومنح الصلاحيات' : 'Company System Ceilings, Vendor Master Directory, Category Templates & Permission Set Grants'}
                  </div>
                </div>

                <div className="topbar-actions">
                  <button className="btn-secondary" onClick={() => setCurrentRole('manager')}>
                    <ArrowRightLeft size={14} />
                    <span>{t('managerRole')}</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setCurrentRole('seller')}>
                    <ArrowRightLeft size={14} />
                    <span>{t('sellerRole')}</span>
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
                    <span>{language === 'ar' ? 'مركز التحكم التشغيلي للمدير' : 'Manager Operational Control Center'}</span>
                    <span className="badge badge-success">
                      <ShieldCheck size={12} />
                      {language === 'ar' ? 'متصل بالكامل' : 'Active System'}
                    </span>
                  </div>
                  <div className="topbar-subtitle">
                    {t('warehouseName')} &bull; {language === 'ar' ? 'عمليات الجملة والتوزيع بالمملكة العربية السعودية' : 'Kingdom of Saudi Arabia Wholesale Operations'}
                  </div>
                </div>

                <div className="topbar-actions">
                  <button 
                    className="btn-secondary" 
                    style={{ backgroundColor: '#1b4332', color: '#fff', borderColor: '#1b4332' }}
                    onClick={() => setCurrentRole('seller')}
                  >
                    <ArrowRightLeft size={14} />
                    <span>{t('switchToSeller')}</span>
                  </button>

                  <button className="btn-secondary" onClick={() => setProductSetupModal(true)}>
                    <PackagePlus size={14} />
                    <span>+ {t('setupProductSku')}</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setCreatePoModal(true)}>
                    <FilePlus size={14} />
                    <span>+ {t('draftPurchaseOrder')}</span>
                  </button>
                  <button className="btn-primary" onClick={() => showToast(language === 'ar' ? 'تصدير التقرير التشغيلي (PDF/Excel)...' : 'Exporting Manager Operational Report (PDF/Excel)...')}>
                    <Download size={14} />
                    <span>{language === 'ar' ? 'تصدير التقرير' : 'Export Report'}</span>
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
                      onViewPoDetails={(po) => setPoDetailsModal({ open: true, item: po })}
                    />
                  </div>

                  <div className="side-column">
                    <div className="side-panel-card">
                      <div className="side-panel-title">
                        <AlertTriangle size={15} className="text-amber-700" />
                        <span>{language === 'ar' ? 'مراقبة التنبيهات التشغيلية' : 'Operational Alerts Watch'}</span>
                      </div>

                      <div className="side-alert-item alert-danger">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>{language === 'ar' ? 'تجاوز حد النقدية (حالتان)' : '2 Cash Ceiling Breaches'}</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>{language === 'ar' ? 'المندوبان عمر وفيصل تجاووزا حد النقدية المسموح به.' : 'Sellers Omar & Faisal exceeded cash limits.'}</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-warning">
                        <Clock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>{language === 'ar' ? 'جرد شاحنة متأخر (حالة واحدة)' : '1 Overdue Vehicle Audit'}</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>{language === 'ar' ? 'الشاحنة #VH-02 (خالد) تجاوزت فترة الجرد 35 يوماً.' : 'Van #VH-02 (Khalid) past 35-day audit window.'}</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-warning">
                        <Clock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>{language === 'ar' ? 'تنبهيات قُرب الصلاحية (FEFO)' : '3 Expiry FEFO Clearance Flags'}</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>{language === 'ar' ? 'صنف بامية باربهاني كرانتي ينتهي خلال 25 يوماً.' : 'Okra Parbhani Kranti expires in 25 days.'}</div>
                        </div>
                      </div>

                      <div className="side-alert-item alert-info">
                        <Lock size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>{language === 'ar' ? 'حظر ائتمان المتاجر (4 متاجر)' : '4 Stores Credit Blocked'}</strong>
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>{language === 'ar' ? 'مبالغ متأخرة تجاوزت دورة الائتمان.' : 'Overdue balances past credit cycle.'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="side-panel-card">
                      <div className="side-panel-title">
                        <Send size={15} />
                        <span>{language === 'ar' ? 'إجراءات سير العمل للمدير' : 'Manager Workflows'}</span>
                      </div>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setVehicleLoadoutModal(true)}>
                        <Truck size={14} />
                        <span>{t('issueVehicleLoadout')}</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setVehicleAuditModal(true)}>
                        <ClipboardCheck size={14} />
                        <span>{t('auditVehicleStock')}</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setSkuConversionModal(true)}>
                        <RepeatIcon size={14} />
                        <span>{t('convertSkuRepackage')}</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setCreatePoModal(true)}>
                        <FilePlus size={14} />
                        <span>{t('draftPurchaseOrder')}</span>
                      </button>

                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setProductSetupModal(true)}>
                        <PackagePlus size={14} />
                        <span>{t('setupProductSku')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <MainDataTable
                  activeTab={activeTab}
                  searchQuery={searchQuery}
                  onOverrideCredit={(item) => setOverrideModal({ open: true, item })}
                  onViewPoDetails={(po) => setPoDetailsModal({ open: true, item: po })}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Workflow Modals */}
      {createAdminModalOpen && (
        <CreateAdminModal
          onClose={() => setCreateAdminModalOpen(false)}
          onShowToast={showToast}
        />
      )}

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

      {poDetailsModal.open && (
        <PoDetailsModal
          po={poDetailsModal.item}
          onClose={() => setPoDetailsModal({ open: false, item: null })}
          onApprovePo={async (poNumber) => {
            await approvePurchaseOrder(poNumber);
            showToast(`Purchase Order ${poNumber} approved & issued.`);
          }}
        />
      )}
    </div>
  );
}

export default App;
