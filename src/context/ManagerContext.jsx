import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ManagerContext = createContext(null);

export const ManagerProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(null);
  const [approvals, setApprovals] = useState({ writeOffs: [], dispatchRequests: [], cashHandovers: [], storeOverrides: [], newStores: [] });
  const [fleet, setFleet] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([]);
  const [systemRules, setSystemRules] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [featureToggles, setFeatureToggles] = useState([]);
  const [auditTrail, setAuditTrail] = useState([]);
  const [currentSeller, setCurrentSeller] = useState(null);
  const [branches, setBranches] = useState([]);
  const [killSwitches, setKillSwitches] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllData = async () => {
    try {
      setError(null);
      const [m, a, f, i, o, s, sys, perm, feat, audit, sel, br, ks, vnd] = await Promise.all([
        apiService.getMetrics(),
        apiService.getApprovalQueue(),
        apiService.getFleetData(),
        apiService.getInventoryData(),
        apiService.getPurchaseOrders(),
        apiService.getStoreCreditData(),
        apiService.getSystemRules(),
        apiService.getUserPermissions(),
        apiService.getFeatureToggles(),
        apiService.getAuditTrail(),
        apiService.getCurrentSeller(),
        apiService.getBranches(),
        apiService.getKillSwitches(),
        apiService.getVendors()
      ]);
      setMetrics(m);
      setApprovals(a || { writeOffs: [], dispatchRequests: [], cashHandovers: [], storeOverrides: [], newStores: [] });
      setFleet(f || []);
      setInventory(i || []);
      setOrders(o || []);
      setStores(s || []);
      setSystemRules(sys);
      setUserPermissions(perm || []);
      setFeatureToggles(feat || []);
      setAuditTrail(audit || []);
      setCurrentSeller(sel);
      setBranches(br || []);
      setKillSwitches(ks || []);
      setVendors(vnd || []);
    } catch (err) {
      console.error('Failed to load ERP data:', err);
      setError(err.message || 'Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // --- WORKFLOW ACTION HANDLERS ---

  // 1. Seller Onboard Store
  const onboardStore = async (storeData) => {
    const res = await apiService.onboardStore(storeData);
    await loadAllData();
    return res;
  };

  // 2. Manager Approve Store Onboarding
  const approveStore = async (item) => {
    const res = await apiService.approveStoreOnboarding(item.id);
    await loadAllData();
    return res;
  };

  // 3. Seller Submit Cash Handover
  const submitCashHandover = async (cashData) => {
    const res = await apiService.submitCashHandover(cashData);
    await loadAllData();
    return res;
  };

  // 4. Manager Verify Cash Handover
  const verifyCash = async (item) => {
    const res = await apiService.verifyCashHandover(item.id);
    await loadAllData();
    return res;
  };

  // 5. Seller Complete POS Sale
  const completeSale = async (saleData) => {
    const res = await apiService.completeSale(saleData);
    await loadAllData();
    return res;
  };

  // 6. Manager Raise Draft PO
  const createPurchaseOrder = async (poData) => {
    const res = await apiService.createPurchaseOrder(poData);
    await loadAllData();
    return res;
  };

  // 7. Admin Approve PO
  const approvePurchaseOrder = async (poNumber) => {
    const res = await apiService.approvePurchaseOrder(poNumber);
    await loadAllData();
    return res;
  };

  // 8. Manager Override Credit Block
  const overrideCredit = async (item, reason) => {
    const res = await apiService.overrideStoreCredit(item.id || item.storeId, reason);
    await loadAllData();
    return res;
  };

  // 9. Manager Approve Write-off
  const approveWriteOff = async (item, notes) => {
    const res = await apiService.approveWriteOff(item.id, notes);
    await loadAllData();
    return res;
  };

  // 10. Manager Release Warehouse Dispatch
  const releaseDispatch = async (item, transporter, driver) => {
    const res = await apiService.releaseDispatchOrder(item.id, { transporter, driver });
    await loadAllData();
    return res;
  };

  // 11. Admin Update System Rules
  const updateSystemRules = async (newRules) => {
    const res = await apiService.updateSystemRules(newRules);
    await loadAllData();
    return res;
  };

  // 12. Admin Permission Toggles & Status
  const updateUserPermission = async (userId, field, value) => {
    const res = await apiService.updateUserPermission(userId, field, value);
    await loadAllData();
    return res;
  };

  const updateUserStatus = async (userId, status) => {
    const res = await apiService.updateUserStatus(userId, status);
    await loadAllData();
    return res;
  };

  // 13. Admin Feature Toggles
  const toggleFeature = async (id) => {
    const res = await apiService.toggleFeature(id);
    await loadAllData();
    return res;
  };

  // 14. Manager Create Product
  const createProduct = async (productData) => {
    const res = await apiService.createProduct(productData);
    await loadAllData();
    return res;
  };

  // 15. Manager Convert SKU
  const convertSku = async (conversionData) => {
    const res = await apiService.convertSku(conversionData);
    await loadAllData();
    return res;
  };

  // 16. Manager Vehicle Audit
  const submitVehicleAudit = async (auditData) => {
    const res = await apiService.submitVehicleAudit(auditData);
    await loadAllData();
    return res;
  };

  // 17. Manager Vehicle Loadout
  const issueVehicleLoadout = async (loadoutData) => {
    const res = await apiService.issueVehicleLoadout(loadoutData);
    await loadAllData();
    return res;
  };

  // 18. Super Admin Actions
  const createAdminUser = async (userData) => {
    const res = await apiService.createAdminUser(userData);
    await loadAllData();
    return res;
  };

  const updateUserRole = async (userId, newRole) => {
    const res = await apiService.updateUserRole(userId, newRole);
    await loadAllData();
    return res;
  };

  const addVendor = async (vendorData) => {
    const res = await apiService.addVendor(vendorData);
    await loadAllData();
    return res;
  };

  const toggleKillSwitch = async (switchId) => {
    const res = await apiService.toggleKillSwitch(switchId);
    await loadAllData();
    return res;
  };

  const updateBranchStatus = async (branchId, status) => {
    const res = await apiService.updateBranchStatus(branchId, status);
    await loadAllData();
    return res;
  };

  const updateBranchDetails = async (branchId, branchData) => {
    const res = await apiService.updateBranchDetails(branchId, branchData);
    await loadAllData();
    return res;
  };

  const value = {
    metrics,
    approvals,
    fleet,
    inventory,
    orders,
    stores,
    systemRules,
    userPermissions,
    featureToggles,
    auditTrail,
    currentSeller,
    branches,
    killSwitches,
    vendors,
    loading,
    error,
    refreshData: loadAllData,
    onboardStore,
    approveStore,
    submitCashHandover,
    verifyCash,
    completeSale,
    createPurchaseOrder,
    approvePurchaseOrder,
    overrideCredit,
    approveWriteOff,
    releaseDispatch,
    updateSystemRules,
    updateUserPermission,
    updateUserStatus,
    toggleFeature,
    createProduct,
    convertSku,
    submitVehicleAudit,
    issueVehicleLoadout,
    createAdminUser,
    updateUserRole,
    toggleKillSwitch,
    addVendor,
    updateBranchStatus,
    updateBranchDetails
  };

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManagerContext must be used within a ManagerProvider');
  }
  return context;
};
