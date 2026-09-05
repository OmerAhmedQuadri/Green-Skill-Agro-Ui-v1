import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ManagerContext = createContext(null);

export const ManagerProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(null);
  const [approvals, setApprovals] = useState(null);
  const [fleet, setFleet] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [m, a, f, i, o, s] = await Promise.all([
        apiService.getMetrics(),
        apiService.getApprovalQueue(),
        apiService.getFleetData(),
        apiService.getInventoryData(),
        apiService.getPurchaseOrders(),
        apiService.getStoreCreditData()
      ]);
      setMetrics(m);
      setApprovals(a);
      setFleet(f);
      setInventory(i);
      setOrders(o);
      setStores(s);
    } catch (err) {
      console.error('Failed to load manager ERP data:', err);
      setError(err.message || 'Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Operational Action Handlers
  const approveWriteOff = async (item, notes) => {
    await apiService.approveWriteOff(item.id, notes);
    // Optimistic UI state update
    if (approvals?.writeOffs) {
      setApprovals(prev => ({
        ...prev,
        writeOffs: prev.writeOffs.filter(w => w.id !== item.id)
      }));
    }
  };

  const releaseDispatch = async (item, transporter, driver) => {
    await apiService.releaseDispatchOrder(item.id, { transporter, driver });
    if (approvals?.dispatchRequests) {
      setApprovals(prev => ({
        ...prev,
        dispatchRequests: prev.dispatchRequests.filter(d => d.id !== item.id)
      }));
    }
  };

  const overrideCredit = async (item, reason) => {
    await apiService.overrideStoreCredit(item.id || item.storeId, reason);
    if (approvals?.storeOverrides) {
      setApprovals(prev => ({
        ...prev,
        storeOverrides: prev.storeOverrides.filter(o => o.id !== item.id)
      }));
    }
  };

  const verifyCash = async (item) => {
    await apiService.verifyCashHandover(item.id);
    if (approvals?.cashHandovers) {
      setApprovals(prev => ({
        ...prev,
        cashHandovers: prev.cashHandovers.filter(c => c.id !== item.id)
      }));
    }
  };

  const approveStore = async (item) => {
    await apiService.approveStoreOnboarding(item.id);
    if (approvals?.newStores) {
      setApprovals(prev => ({
        ...prev,
        newStores: prev.newStores.filter(s => s.id !== item.id)
      }));
    }
  };

  const createProduct = async (productData) => {
    const res = await apiService.createProduct(productData);
    setInventory(prev => [
      {
        sku: productData.sku,
        productName: productData.productName,
        category: productData.category,
        subCategory: productData.subCategory,
        productType: productData.productType,
        packSize: productData.packSize,
        vendorCode: productData.vendorCode,
        warehouseQty: 100,
        fleetQty: 0,
        unitPrice: productData.unitPrice,
        totalValue: productData.unitPrice * 100,
        lotNumber: `LOT-${new Date().getFullYear()}-NEW`,
        mfd: new Date().toISOString().split('T')[0],
        expiryDate: '2027-12-31',
        expiryStatus: 'Good',
        expiryFlag: 'Healthy',
        dispatchPriority: 'Standard'
      },
      ...prev
    ]);
    return res;
  };

  const createPurchaseOrder = async (poData) => {
    const res = await apiService.createPurchaseOrder(poData);
    setOrders(prev => [poData, ...prev]);
    return res;
  };

  const convertSku = async (conversionData) => {
    return apiService.convertSku(conversionData);
  };

  const submitVehicleAudit = async (auditData) => {
    return apiService.submitVehicleAudit(auditData);
  };

  const issueVehicleLoadout = async (loadoutData) => {
    return apiService.issueVehicleLoadout(loadoutData);
  };

  const value = {
    metrics,
    approvals,
    fleet,
    inventory,
    orders,
    stores,
    loading,
    error,
    refreshData: loadAllData,
    approveWriteOff,
    releaseDispatch,
    overrideCredit,
    verifyCash,
    approveStore,
    createProduct,
    createPurchaseOrder,
    convertSku,
    submitVehicleAudit,
    issueVehicleLoadout
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
