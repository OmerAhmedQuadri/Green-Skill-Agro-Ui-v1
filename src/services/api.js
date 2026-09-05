/**
 * Green Skill Agro Manager ERP - Backend Integration Layer
 * 
 * BACKEND ENGINEER NOTE:
 * All API interactions are routed through this service file.
 * Set `VITE_USE_MOCK=false` in your `.env` file to plug in real REST API endpoints.
 */

import { METRICS, APPROVAL_ITEMS, FLEET_DATA, INVENTORY_STOCK, PURCHASE_ORDERS, STORE_CREDIT_DATA } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Helper for real HTTP requests (AXIOS / FETCH)
async function request(endpoint, options = {}) {
  if (USE_MOCK) {
    // Simulate realistic 200ms network latency in mock mode
    await new Promise((resolve) => setTimeout(resolve, 200));
    return null; // Fallback to mock data handlers
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

export const apiService = {
  // 1. Executive Dashboard & Metrics API
  async getMetrics() {
    if (USE_MOCK) return METRICS;
    return request('/dashboard/metrics');
  },

  // 2. Approval Queues API
  async getApprovalQueue() {
    if (USE_MOCK) return APPROVAL_ITEMS;
    return request('/approvals/queue');
  },

  // 3. Stock Write-off Workflow (Workflow E)
  async approveWriteOff(writeOffId, notes = '') {
    if (USE_MOCK) {
      console.log(`[MOCK API] Approved Write-off ${writeOffId}`, { notes });
      return { success: true, message: 'Stock write-off executed successfully', writeOffId };
    }
    return request(`/approvals/write-offs/${writeOffId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ manager_notes: notes }),
    });
  },

  // 4. Warehouse Dispatch Workflow (Workflows J & K)
  async releaseDispatchOrder(dispatchId, payload) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Released Dispatch ${dispatchId}`, payload);
      return { success: true, message: 'Dispatch order released into in-transit', dispatchId };
    }
    return request(`/dispatches/${dispatchId}/release`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // 5. Store Credit Override (Section 07 Rule)
  async overrideStoreCredit(storeId, reason) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Store Credit Override Granted for ${storeId}`, { reason });
      return { success: true, message: 'Manager override recorded', storeId };
    }
    return request(`/stores/${storeId}/override-credit-block`, {
      method: 'POST',
      body: JSON.stringify({ manager_reason: reason }),
    });
  },

  // 6. Cash Handover Verification (Workflow M)
  async verifyCashHandover(cashId) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Verified Cash Handover ${cashId}`);
      return { success: true, cashId };
    }
    return request(`/cash-handovers/${cashId}/verify`, { method: 'POST' });
  },

  // 7. Store Onboarding Approval (Workflow H)
  async approveStoreOnboarding(storeId) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Store Approved ${storeId}`);
      return { success: true, storeId };
    }
    return request(`/stores/${storeId}/approve`, { method: 'POST' });
  },

  // 8. Setup Product & Generate SKU (Workflow A)
  async createProduct(productData) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Created Product`, productData);
      return { success: true, data: productData };
    }
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // 9. Draft Purchase Order (Workflows C & O)
  async createPurchaseOrder(poData) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Created Draft PO`, poData);
      return { success: true, data: poData };
    }
    return request('/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(poData),
    });
  },

  // 10. SKU Conversion & Repackaging (Workflow D)
  async convertSku(conversionData) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Converted SKU`, conversionData);
      return { success: true, data: conversionData };
    }
    return request('/inventory/convert-sku', {
      method: 'POST',
      body: JSON.stringify(conversionData),
    });
  },

  // 11. Vehicle Physical Audit (Workflow N)
  async submitVehicleAudit(auditData) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Submitted Vehicle Audit`, auditData);
      return { success: true, data: auditData };
    }
    return request('/fleet/audits', {
      method: 'POST',
      body: JSON.stringify(auditData),
    });
  },

  // 12. Issue Vehicle Stock Loadout (Workflow F)
  async issueVehicleLoadout(loadoutData) {
    if (USE_MOCK) {
      console.log(`[MOCK API] Issued Vehicle Loadout`, loadoutData);
      return { success: true, data: loadoutData };
    }
    return request('/fleet/loadouts', {
      method: 'POST',
      body: JSON.stringify(loadoutData),
    });
  },

  // 13. Data Tables Fetch API
  async getFleetData() {
    if (USE_MOCK) return FLEET_DATA;
    return request('/fleet');
  },

  async getInventoryData() {
    if (USE_MOCK) return INVENTORY_STOCK;
    return request('/inventory');
  },

  async getPurchaseOrders() {
    if (USE_MOCK) return PURCHASE_ORDERS;
    return request('/purchase-orders');
  },

  async getStoreCreditData() {
    if (USE_MOCK) return STORE_CREDIT_DATA;
    return request('/stores/credit-ledger');
  }
};
