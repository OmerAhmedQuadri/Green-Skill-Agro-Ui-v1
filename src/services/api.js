/**
 * Green Skill Agro ERP - Backend Integration Layer & Service Interface
 * 
 * BACKEND ENGINEER NOTE:
 * All API interactions, workflow queries, and state mutations are routed through this service file.
 * Set `VITE_USE_MOCK=false` in your `.env` file to plug in real REST API endpoints.
 */

import { 
  METRICS, 
  APPROVAL_ITEMS, 
  FLEET_DATA, 
  INVENTORY_STOCK, 
  PURCHASE_ORDERS, 
  STORE_CREDIT_DATA,
  SYSTEM_CONFIG_RULES,
  VENDORS_MASTER_DATA,
  USER_PERMISSIONS_DATA,
  FEATURE_TOGGLES_DATA,
  ADMIN_AUDIT_TRAIL,
  CURRENT_SELLER,
  BRANCHES_MASTER_DATA,
  SYSTEM_KILL_SWITCHES
} from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// In-Memory Mock Database for USE_MOCK mode
let dbMetrics = { ...METRICS };
let dbApprovals = JSON.parse(JSON.stringify(APPROVAL_ITEMS));
let dbFleet = JSON.parse(JSON.stringify(FLEET_DATA));
let dbInventory = JSON.parse(JSON.stringify(INVENTORY_STOCK));
let dbPurchaseOrders = JSON.parse(JSON.stringify(PURCHASE_ORDERS));
let dbStores = JSON.parse(JSON.stringify(STORE_CREDIT_DATA));
let dbSystemRules = { ...SYSTEM_CONFIG_RULES };
let dbVendors = JSON.parse(JSON.stringify(VENDORS_MASTER_DATA));
let dbUserPermissions = JSON.parse(JSON.stringify(USER_PERMISSIONS_DATA));
let dbFeatureToggles = JSON.parse(JSON.stringify(FEATURE_TOGGLES_DATA));
let dbAuditTrail = JSON.parse(JSON.stringify(ADMIN_AUDIT_TRAIL));
let dbCurrentSeller = { ...CURRENT_SELLER };
let dbBranches = JSON.parse(JSON.stringify(BRANCHES_MASTER_DATA));
let dbKillSwitches = JSON.parse(JSON.stringify(SYSTEM_KILL_SWITCHES));

// Helper for real HTTP requests (FETCH / REST API)
async function request(endpoint, options = {}) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return null;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

function logAudit(user, role, action, details, riskLevel = 'Low Risk') {
  const newLog = {
    id: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user,
    role,
    action,
    details,
    riskLevel
  };
  dbAuditTrail = [newLog, ...dbAuditTrail];
}

export const apiService = {
  // --- READ DATA ENDPOINTS ---
  async getMetrics() {
    if (USE_MOCK) return dbMetrics;
    return request('/dashboard/metrics');
  },

  async getApprovalQueue() {
    if (USE_MOCK) return dbApprovals;
    return request('/approvals/queue');
  },

  async getFleetData() {
    if (USE_MOCK) return dbFleet;
    return request('/fleet');
  },

  async getInventoryData() {
    if (USE_MOCK) return dbInventory;
    return request('/inventory');
  },

  async getPurchaseOrders() {
    if (USE_MOCK) return dbPurchaseOrders;
    return request('/purchase-orders');
  },

  async getStoreCreditData() {
    if (USE_MOCK) return dbStores;
    return request('/stores/credit-ledger');
  },

  async getSystemRules() {
    if (USE_MOCK) return dbSystemRules;
    return request('/admin/system-rules');
  },

  async getUserPermissions() {
    if (USE_MOCK) return dbUserPermissions;
    return request('/admin/permissions');
  },

  async getFeatureToggles() {
    if (USE_MOCK) return dbFeatureToggles;
    return request('/admin/feature-toggles');
  },

  async getAuditTrail() {
    if (USE_MOCK) return dbAuditTrail;
    return request('/admin/audit-trail');
  },

  async getCurrentSeller() {
    if (USE_MOCK) return dbCurrentSeller;
    return request('/seller/profile');
  },

  // --- WORKFLOW MUTATION ENDPOINTS ---

  // Workflow H: Onboard New Store (Seller -> Manager Approval)
  async onboardStore(storeData) {
    if (USE_MOCK) {
      const newApprovalItem = {
        id: storeData.id || `STR-NEW-${Math.floor(100 + Math.random() * 900)}`,
        storeName: storeData.storeName,
        ownerName: storeData.ownerName,
        contactPhone: storeData.contactPhone,
        city: storeData.city,
        sellerName: storeData.sellerName || dbCurrentSeller.name,
        crNumber: storeData.crNumber || 'Optional',
        vatNumber: storeData.vatNumber || 'Optional',
        proposedCycle: storeData.proposedCycle,
        proposedLimit: storeData.proposedLimit,
        storefrontPhoto: storeData.storefrontPhoto,
        coordinates: storeData.coordinates || '24.7136° N, 46.6753° E',
        duplicateCheck: 'Passed (No nearby store matching)',
        status: 'Pending Approval'
      };
      dbApprovals.newStores = [newApprovalItem, ...dbApprovals.newStores];
      logAudit(dbCurrentSeller.name, 'Seller', 'ONBOARD_STORE_REQUEST', `Submitted new store onboarding request for ${storeData.storeName}`);
      return { success: true, item: newApprovalItem };
    }
    return request('/stores/onboard', {
      method: 'POST',
      body: JSON.stringify(storeData)
    });
  },

  // Workflow H (Approve): Approve Store Onboarding (Manager Action)
  async approveStoreOnboarding(storeId) {
    if (USE_MOCK) {
      const storeItem = dbApprovals.newStores.find(s => s.id === storeId);
      dbApprovals.newStores = dbApprovals.newStores.filter(s => s.id !== storeId);

      if (storeItem) {
        const activeStore = {
          storeId: storeItem.id,
          storeName: storeItem.storeName,
          ownerName: storeItem.ownerName,
          city: storeItem.city,
          assignedSeller: storeItem.sellerName || dbCurrentSeller.name,
          creditCycle: storeItem.proposedCycle,
          creditLimit: storeItem.proposedLimit,
          outstandingBalance: 0,
          daysOverdue: 0,
          status: 'Active (Approved)',
          blocked: false
        };
        dbStores = [activeStore, ...dbStores];
        dbCurrentSeller.assignedStoresCount += 1;
        logAudit('Sami Al-Mansoor', 'Manager', 'APPROVE_STORE_ONBOARDING', `Approved store ${storeItem.storeName} for field sales`);
      }
      return { success: true, storeId };
    }
    return request(`/stores/${storeId}/approve`, { method: 'POST' });
  },

  // Workflow M: Cash Settlement Request (Seller -> Manager Approval)
  async submitCashHandover(cashData) {
    if (USE_MOCK) {
      const newHandover = {
        id: `CS-2026-${Math.floor(100 + Math.random() * 900)}`,
        sellerName: cashData.sellerName || dbCurrentSeller.name,
        route: cashData.route || dbCurrentSeller.route,
        type: cashData.type || 'Bank Deposit',
        declaredAmount: Number(cashData.amount),
        bankName: cashData.refNumber || 'Bank Deposit Slip',
        dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16),
        proofImage: cashData.proofImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        status: 'Pending Verification',
        ceilingBreachFlag: Number(cashData.amount) >= dbSystemRules.maxSellerCashCeiling
      };
      dbApprovals.cashHandovers = [newHandover, ...dbApprovals.cashHandovers];
      logAudit(dbCurrentSeller.name, 'Seller', 'SUBMIT_CASH_HANDOVER', `Submitted cash settlement request of SAR ${cashData.amount}`);
      return { success: true, item: newHandover };
    }
    return request('/cash-handovers', {
      method: 'POST',
      body: JSON.stringify(cashData)
    });
  },

  // Workflow M (Verify): Verify Cash Handover (Manager Action)
  async verifyCashHandover(cashId) {
    if (USE_MOCK) {
      const handover = dbApprovals.cashHandovers.find(c => c.id === cashId);
      dbApprovals.cashHandovers = dbApprovals.cashHandovers.filter(c => c.id !== cashId);

      if (handover) {
        dbCurrentSeller.cashInHand = Math.max(0, dbCurrentSeller.cashInHand - handover.declaredAmount);
        dbCurrentSeller.cashBreachWarning = dbCurrentSeller.cashInHand > dbSystemRules.maxSellerCashCeiling;

        dbFleet = dbFleet.map(f => {
          if (f.assignedSeller === handover.sellerName || f.vehicleId === dbCurrentSeller.assignedVehicle.id) {
            const newCash = Math.max(0, f.cashInHand - handover.declaredAmount);
            return {
              ...f,
              cashInHand: newCash,
              cashBreach: newCash > dbSystemRules.maxSellerCashCeiling
            };
          }
          return f;
        });

        logAudit('Sami Al-Mansoor', 'Manager', 'VERIFY_CASH_HANDOVER', `Verified cash handover ${cashId} of SAR ${handover.declaredAmount}`);
      }
      return { success: true, cashId };
    }
    return request(`/cash-handovers/${cashId}/verify`, { method: 'POST' });
  },

  // Workflow B: Complete POS Sale (Seller Action)
  async completeSale(saleData) {
    if (USE_MOCK) {
      const totalAmt = saleData.totalAmount || 0;

      dbCurrentSeller.dailySalesAchieved += totalAmt;

      if (saleData.paymentMode === 'Immediate Cash') {
        dbCurrentSeller.cashInHand += totalAmt;
        dbCurrentSeller.cashBreachWarning = dbCurrentSeller.cashInHand > dbSystemRules.maxSellerCashCeiling;

        dbFleet = dbFleet.map(f => {
          if (f.assignedSeller === dbCurrentSeller.name || (dbCurrentSeller.assignedVehicle && f.vehicleId === dbCurrentSeller.assignedVehicle.id)) {
            const newCash = f.cashInHand + totalAmt;
            return {
              ...f,
              cashInHand: newCash,
              cashBreach: newCash > dbSystemRules.maxSellerCashCeiling
            };
          }
          return f;
        });
      }

      if (saleData.paymentMode !== 'Immediate Cash' && saleData.storeId) {
        dbStores = dbStores.map(s => {
          if (s.storeId === saleData.storeId || s.storeName === saleData.storeName) {
            const newBal = s.outstandingBalance + totalAmt;
            return {
              ...s,
              outstandingBalance: newBal,
              blocked: newBal > s.creditLimit
            };
          }
          return s;
        });
      }

      if (saleData.items && Array.isArray(saleData.items)) {
        saleData.items.forEach(cartItem => {
          dbInventory = dbInventory.map(inv => {
            if (inv.sku === cartItem.sku) {
              const newFleetQty = Math.max(0, inv.fleetQty - cartItem.qty);
              return { ...inv, fleetQty: newFleetQty };
            }
            return inv;
          });
        });
      }

      logAudit(dbCurrentSeller.name, 'Seller', 'COMPLETE_POS_SALE', `Completed POS sale for ${saleData.storeName} totaling SAR ${totalAmt}`);
      return { success: true, saleData };
    }
    return request('/sales/complete', {
      method: 'POST',
      body: JSON.stringify(saleData)
    });
  },

  // Workflow C/O: Draft Purchase Order (Manager -> Admin Approval)
  async createPurchaseOrder(poData) {
    if (USE_MOCK) {
      const newPo = {
        poNumber: poData.poNumber || `PO-2026-0${dbPurchaseOrders.length + 20}`,
        vendorName: poData.vendorName || 'Selected Vendor',
        vendorCode: poData.vendorCode || 'VND-001',
        itemsSummary: poData.itemsSummary || `${poData.quantity}x ${poData.sku}`,
        totalValue: Number(poData.totalValue) || 50000,
        stateIndex: 1,
        stateName: '1. Draft (Pending Admin Approval)',
        dateRaised: new Date().toISOString().split('T')[0],
        expectedArrival: '2026-10-10',
        leadTimeDays: 25,
        adminApprovalStatus: 'Awaiting Admin Review',
        reorderSource: 'Manager Draft PO'
      };
      dbPurchaseOrders = [newPo, ...dbPurchaseOrders];
      logAudit('Sami Al-Mansoor', 'Manager', 'CREATE_DRAFT_PO', `Drafted Purchase Order ${newPo.poNumber} for vendor ${newPo.vendorName}`);
      return { success: true, data: newPo };
    }
    return request('/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(poData),
    });
  },

  // Approve Draft Purchase Order (Admin Action)
  async approvePurchaseOrder(poNumber) {
    if (USE_MOCK) {
      dbPurchaseOrders = dbPurchaseOrders.map(po => {
        if (po.poNumber === poNumber) {
          return {
            ...po,
            stateIndex: 3,
            stateName: '3. Approved & Issued',
            adminApprovalStatus: 'Approved by Admin'
          };
        }
        return po;
      });
      logAudit('Admin System Owner', 'Admin', 'APPROVE_PURCHASE_ORDER', `Granted final Admin approval for Purchase Order ${poNumber}`);
      return { success: true, poNumber };
    }
    return request(`/purchase-orders/${poNumber}/approve`, { method: 'POST' });
  },

  // Section 07 Rule: Override Store Credit Block (Manager Action)
  async overrideStoreCredit(storeId, reason) {
    if (USE_MOCK) {
      dbApprovals.storeOverrides = dbApprovals.storeOverrides.filter(o => o.id !== storeId && o.storeId !== storeId);
      dbStores = dbStores.map(s => {
        if (s.storeId === storeId || s.storeName === storeId) {
          return { ...s, blocked: false, status: 'Active (Manager Credit Override)' };
        }
        return s;
      });
      logAudit('Sami Al-Mansoor', 'Manager', 'OVERRIDE_STORE_CREDIT', `Granted credit block override for store ${storeId}. Reason: ${reason}`, 'High Risk');
      return { success: true, storeId };
    }
    return request(`/stores/${storeId}/override-credit-block`, {
      method: 'POST',
      body: JSON.stringify({ manager_reason: reason }),
    });
  },

  // Workflow E: Stock Write-Off Approval (Manager Action)
  async approveWriteOff(writeOffId, notes = '') {
    if (USE_MOCK) {
      const item = dbApprovals.writeOffs.find(w => w.id === writeOffId);
      dbApprovals.writeOffs = dbApprovals.writeOffs.filter(w => w.id !== writeOffId);

      if (item) {
        dbInventory = dbInventory.map(inv => {
          if (inv.sku === item.sku) {
            const qtyNum = parseInt(item.quantity) || 10;
            return {
              ...inv,
              warehouseQty: Math.max(0, inv.warehouseQty - qtyNum)
            };
          }
          return inv;
        });
        logAudit('Sami Al-Mansoor', 'Manager', 'APPROVE_WRITE_OFF', `Approved stock write-off ${writeOffId} (${item.quantity} of ${item.productName})`);
      }
      return { success: true, writeOffId };
    }
    return request(`/approvals/write-offs/${writeOffId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ manager_notes: notes }),
    });
  },

  // Workflows J & K: Warehouse Dispatch Order Release (Manager Action)
  async releaseDispatchOrder(dispatchId, payload) {
    if (USE_MOCK) {
      const item = dbApprovals.dispatchRequests.find(d => d.id === dispatchId);
      dbApprovals.dispatchRequests = dbApprovals.dispatchRequests.filter(d => d.id !== dispatchId);

      if (item) {
        dbInventory = dbInventory.map(inv => {
          if (inv.sku === item.sku) {
            const qtyNum = parseInt(item.requestedQty) || 20;
            return {
              ...inv,
              warehouseQty: Math.max(0, inv.warehouseQty - qtyNum)
            };
          }
          return inv;
        });
        logAudit('Sami Al-Mansoor', 'Manager', 'RELEASE_DISPATCH_ORDER', `Released warehouse dispatch ${dispatchId} via transporter ${payload.transporter}`);
      }
      return { success: true, dispatchId };
    }
    return request(`/dispatches/${dispatchId}/release`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Admin Config Rules: Update System Rules & Governance Ceilings (Admin Action)
  async updateSystemRules(newRules) {
    if (USE_MOCK) {
      dbSystemRules = { ...dbSystemRules, ...newRules, lastUpdatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) };
      
      const newCashCeiling = dbSystemRules.maxSellerCashCeiling;
      if (newCashCeiling) {
        dbCurrentSeller.cashLimit = newCashCeiling;
        dbCurrentSeller.cashBreachWarning = dbCurrentSeller.cashInHand > newCashCeiling;

        dbFleet = dbFleet.map(f => ({
          ...f,
          cashBreach: f.cashInHand > newCashCeiling
        }));
      }
      logAudit('Admin System Owner', 'Admin', 'UPDATE_SYSTEM_RULES', `Updated master system rules and operational ceilings`);
      return { success: true, rules: dbSystemRules };
    }
    return request('/admin/system-rules', {
      method: 'POST',
      body: JSON.stringify(newRules)
    });
  },

  // Master Vendor Directory Endpoints
  async getVendors() {
    if (USE_MOCK) return dbVendors;
    return request('/admin/vendors');
  },

  async addVendor(vendorData) {
    if (USE_MOCK) {
      const vendorObj = {
        vendorCode: vendorData.vendorCode || `VND-${vendorData.vendorName.substring(0, 5).toUpperCase()}`,
        vendorName: vendorData.vendorName,
        taxNumber: vendorData.taxNumber,
        category: vendorData.category || 'Seeds & Hybrids',
        paymentTerms: vendorData.paymentTerms || '30 Days Net',
        contactPerson: vendorData.contactPerson || 'Procurement Desk',
        phone: vendorData.phone || '+966 50 000 0000',
        email: vendorData.email || 'vendor@agri.com.sa',
        status: 'Active Authorized Vendor',
        activePOsCount: 0
      };
      dbVendors = [vendorObj, ...dbVendors];
      logAudit('Admin System Owner', 'Admin', 'ADD_VENDOR', `Registered new master vendor ${vendorObj.vendorName}`);
      return { success: true, data: vendorObj };
    }
    return request('/admin/vendors', {
      method: 'POST',
      body: JSON.stringify(vendorData)
    });
  },

  // Admin Permission Sets: Update User Permission (Admin Action)
  async updateUserPermission(userId, field, value) {
    if (USE_MOCK) {
      dbUserPermissions = dbUserPermissions.map(u => {
        if (u.userId === userId || u.id === userId) {
          return { ...u, [field]: value };
        }
        return u;
      });
      logAudit('Admin System Owner', 'Admin', 'UPDATE_USER_PERMISSION', `Updated permission ${field} for user ${userId} to ${value}`);
      return { success: true, userId, field, value };
    }
    return request(`/admin/permissions/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ field, value })
    });
  },

  async updateUserStatus(userId, status) {
    if (USE_MOCK) {
      dbUserPermissions = dbUserPermissions.map(u => {
        if (u.userId === userId || u.id === userId) {
          return { ...u, status };
        }
        return u;
      });
      logAudit('Admin System Owner', 'Admin', 'UPDATE_USER_STATUS', `Updated account status for ${userId} to ${status}`);
      return { success: true, userId, status };
    }
    return request(`/admin/users/${userId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  },

  // Admin Feature Toggles (Admin Action)
  async toggleFeature(id) {
    if (USE_MOCK) {
      dbFeatureToggles = dbFeatureToggles.map(t => {
        if (t.id === id) {
          return { ...t, enabled: !t.enabled };
        }
        return t;
      });
      logAudit('Admin System Owner', 'Admin', 'TOGGLE_FEATURE', `Toggled feature flag ${id}`);
      return { success: true, id };
    }
    return request(`/admin/features/${id}/toggle`, { method: 'POST' });
  },

  // Workflow A: Create Product
  async createProduct(productData) {
    if (USE_MOCK) {
      const newInv = {
        sku: productData.sku,
        productName: productData.productName,
        category: productData.category,
        subCategory: productData.subCategory,
        productType: productData.productType,
        packSize: productData.packSize,
        vendorCode: productData.vendorCode,
        warehouseQty: 100,
        fleetQty: 0,
        unitPrice: Number(productData.unitPrice),
        totalValue: Number(productData.unitPrice) * 100,
        lotNumber: `LOT-${new Date().getFullYear()}-NEW`,
        mfd: new Date().toISOString().split('T')[0],
        expiryDate: '2027-12-31',
        expiryStatus: 'Good',
        expiryFlag: 'Healthy',
        dispatchPriority: 'Standard'
      };
      dbInventory = [newInv, ...dbInventory];
      logAudit('Sami Al-Mansoor', 'Manager', 'CREATE_PRODUCT', `Created new product ${productData.productName} (SKU: ${productData.sku})`);
      return { success: true, data: newInv };
    }
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Workflow D: SKU Conversion & Repackaging
  async convertSku(conversionData) {
    if (USE_MOCK) {
      const sourceQtyNum = Number(conversionData.sourceQty) || 50;
      const targetQtyNum = Number(conversionData.targetQty) || 48;

      dbInventory = dbInventory.map(inv => {
        if (inv.sku === conversionData.sourceSku) {
          return { ...inv, warehouseQty: Math.max(0, inv.warehouseQty - sourceQtyNum) };
        }
        if (inv.sku === conversionData.targetSku) {
          return { ...inv, warehouseQty: inv.warehouseQty + targetQtyNum };
        }
        return inv;
      });
      logAudit('Sami Al-Mansoor', 'Manager', 'CONVERT_SKU', `Executed SKU conversion from ${conversionData.sourceSku} to ${conversionData.targetSku}`);
      return { success: true, data: conversionData };
    }
    return request('/inventory/convert-sku', {
      method: 'POST',
      body: JSON.stringify(conversionData),
    });
  },

  // Workflow N: Submit Vehicle Physical Audit
  async submitVehicleAudit(auditData) {
    if (USE_MOCK) {
      dbFleet = dbFleet.map(f => {
        if (f.vehicleId.includes(auditData.vehicleId) || auditData.vehicleId.includes(f.vehicleId)) {
          return {
            ...f,
            auditDueFlag: false,
            lastAuditDate: new Date().toISOString().split('T')[0],
            auditVariance: `${auditData.variance} Units Variance`
          };
        }
        return f;
      });
      logAudit('Sami Al-Mansoor', 'Manager', 'SUBMIT_VEHICLE_AUDIT', `Submitted vehicle stock audit for ${auditData.vehicleId}`);
      return { success: true, data: auditData };
    }
    return request('/fleet/audits', {
      method: 'POST',
      body: JSON.stringify(auditData),
    });
  },

  // Workflow F: Issue Vehicle Stock Loadout
  async issueVehicleLoadout(loadoutData) {
    if (USE_MOCK) {
      const qtyNum = Number(loadoutData.quantity) || 10;
      dbInventory = dbInventory.map(inv => {
        if (inv.sku === loadoutData.sku) {
          return {
            ...inv,
            warehouseQty: Math.max(0, inv.warehouseQty - qtyNum),
            fleetQty: inv.fleetQty + qtyNum
          };
        }
        return inv;
      });
      logAudit('Sami Al-Mansoor', 'Manager', 'ISSUE_VEHICLE_LOADOUT', `Issued ${loadoutData.quantity} units of ${loadoutData.sku} to vehicle ${loadoutData.vehicle}`);
      return { success: true, data: loadoutData };
    }
    return request('/fleet/loadouts', {
      method: 'POST',
      body: JSON.stringify(loadoutData),
    });
  },

  // --- SUPER ADMIN MASTER ENDPOINTS ---
  async getBranches() {
    if (USE_MOCK) return dbBranches;
    return request('/superadmin/branches');
  },

  async updateBranchStatus(branchId, status) {
    if (USE_MOCK) {
      dbBranches = dbBranches.map(b => {
        if (b.branchId === branchId || b.id === branchId) {
          return { ...b, status };
        }
        return b;
      });
      logAudit('Abdulaziz Al-Saud', 'Super Admin', 'UPDATE_BRANCH_STATUS', `Updated branch ${branchId} status to ${status}`, 'High Risk');
      return { success: true, branchId, status };
    }
    return request(`/superadmin/branches/${branchId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  },

  async updateBranchDetails(branchId, branchData) {
    if (USE_MOCK) {
      dbBranches = dbBranches.map(b => {
        if (b.branchId === branchId || b.id === branchId) {
          return { ...b, ...branchData };
        }
        return b;
      });
      logAudit('Abdulaziz Al-Saud', 'Super Admin', 'UPDATE_BRANCH_DETAILS', `Updated branch details for ${branchId}`);
      return { success: true, branchId, branchData };
    }
    return request(`/superadmin/branches/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify(branchData)
    });
  },

  async getKillSwitches() {
    if (USE_MOCK) return dbKillSwitches;
    return request('/superadmin/kill-switches');
  },

  async createAdminUser(userData) {
    if (USE_MOCK) {
      const newUser = {
        userId: userData.userId || `USR-${userData.role.substring(0, 3).toUpperCase()}-0${dbUserPermissions.length + 1}`,
        userName: userData.userName,
        role: userData.role || 'Admin',
        assignedLocation: userData.assignedLocation || 'Platform Master Operations',
        status: 'Active',
        canOverrideCredit: true,
        canApproveWriteOff: true,
        canReleaseDispatch: true,
        canVerifyCash: true,
        canCreateProduct: true,
        canDraftPo: true,
        canManageAdmins: userData.role === 'Super Admin'
      };
      dbUserPermissions = [newUser, ...dbUserPermissions];
      logAudit('Abdulaziz Al-Saud', 'Super Admin', 'CREATE_USER_ACCOUNT', `Created new ${userData.role} user account for ${userData.userName}`);
      return { success: true, data: newUser };
    }
    return request('/superadmin/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async updateUserRole(userId, newRole) {
    if (USE_MOCK) {
      dbUserPermissions = dbUserPermissions.map(u => {
        if (u.userId === userId || u.id === userId) {
          return {
            ...u,
            role: newRole,
            canManageAdmins: newRole === 'Super Admin'
          };
        }
        return u;
      });
      logAudit('Abdulaziz Al-Saud', 'Super Admin', 'ESCALATE_USER_ROLE', `Updated role for user ${userId} to ${newRole}`, 'High Risk');
      return { success: true, userId, newRole };
    }
    return request(`/superadmin/users/${userId}/role`, {
      method: 'POST',
      body: JSON.stringify({ role: newRole })
    });
  },

  async toggleKillSwitch(switchId) {
    if (USE_MOCK) {
      dbKillSwitches = dbKillSwitches.map(k => {
        if (k.id === switchId) {
          return { ...k, active: !k.active };
        }
        return k;
      });
      logAudit('Abdulaziz Al-Saud', 'Super Admin', 'TOGGLE_EMERGENCY_KILLSWITCH', `Toggled emergency kill-switch ${switchId}`, 'Critical');
      return { success: true, switchId };
    }
    return request(`/superadmin/kill-switches/${switchId}/toggle`, { method: 'POST' });
  }
};
