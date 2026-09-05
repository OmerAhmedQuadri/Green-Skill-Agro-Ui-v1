import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Store, 
  Package, 
  CheckCircle, 
  FileText, 
  Lock,
  Plus,
  Trash2
} from 'lucide-react';
import { STORE_CREDIT_DATA, INVENTORY_STOCK } from '../../data/mockData';

export const SellerNewSale = ({ onCompleteSale }) => {
  const [selectedStoreId, setSelectedStoreId] = useState('STR-102');
  const [cart, setCart] = useState([
    { sku: 'OKRA-PK-5KG', name: 'Okra Seed (Parbhani Kranti 5KG)', unitPrice: 360, qty: 5, discountPct: 0, lotNumber: 'OKR-2025-09A' },
    { sku: 'TOM-HYB-1KG', name: 'Hybrid Tomato Seed (Red Crown F1 1KG)', unitPrice: 370, qty: 10, discountPct: 0, lotNumber: 'TOM-2026-01' }
  ]);
  const [paymentMode, setPaymentMode] = useState('Immediate Cash');
  const [discountError, setDiscountError] = useState('');

  const selectedStore = STORE_CREDIT_DATA.find(s => s.storeId === selectedStoreId) || STORE_CREDIT_DATA[0];

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.qty * (1 - item.discountPct / 100)), 0);

  const handleQtyChange = (sku, delta) => {
    setCart(prev => prev.map(item => {
      if (item.sku === sku) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const handleDiscountChange = (sku, pct) => {
    const numPct = Number(pct);
    if (numPct > 10) {
      setDiscountError(`Discount ${numPct}% exceeds permitted seller ceiling (Max 10%). Manager approval required.`);
    } else {
      setDiscountError('');
    }
    setCart(prev => prev.map(item => {
      if (item.sku === sku) {
        return { ...item, discountPct: numPct };
      }
      return item;
    }));
  };

  const handleAddItem = (inventoryItem) => {
    if (cart.find(c => c.sku === inventoryItem.sku)) return;
    setCart(prev => [
      ...prev,
      {
        sku: inventoryItem.sku,
        name: inventoryItem.productName,
        unitPrice: inventoryItem.unitPrice,
        qty: 1,
        discountPct: 0,
        lotNumber: inventoryItem.lotNumber
      }
    ]);
  };

  const handleRemoveItem = (sku) => {
    setCart(prev => prev.filter(c => c.sku !== sku));
  };

  const handleSubmitSale = (e) => {
    e.preventDefault();
    if (selectedStore.blocked) {
      alert(`Cannot complete sale: ${selectedStore.storeName} is blocked due to overdue balance.`);
      return;
    }
    onCompleteSale({
      storeName: selectedStore.storeName,
      totalAmount: subtotal,
      itemCount: cart.length,
      paymentMode
    });
  };

  return (
    <div className="seller-pos-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* LEFT COLUMN: Store Selector & Van Inventory Picker */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Step 1: Store Selector & Credit Status Check */}
        <div className="data-panel" style={{ padding: '16px' }}>
          <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--color-forest-dark)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Store size={16} />
            <span>Step 1: Select Store Account</span>
          </div>

          <select 
            className="form-select" 
            style={{ width: '100%', fontSize: '12.5px', padding: '8px' }}
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
          >
            {STORE_CREDIT_DATA.map(s => (
              <option key={s.storeId} value={s.storeId}>
                {s.storeName} ({s.city}) - {s.creditCycle} {s.blocked ? '[BLOCKED]' : ''}
              </option>
            ))}
          </select>

          {/* Credit Check Status Banner */}
          {selectedStore.blocked ? (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px', borderRadius: '4px', marginTop: '10px', color: '#991b1b', fontSize: '11.5px' }}>
              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} />
                <span>Account Blocked from Sales</span>
              </div>
              <div style={{ marginTop: '2px' }}>
                Outstanding: SAR {selectedStore.outstandingBalance.toLocaleString()} (Limit SAR {selectedStore.creditLimit.toLocaleString()})
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 10px', borderRadius: '4px', marginTop: '10px', color: '#166534', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} />
              <span>Credit Check Passed: Active Account</span>
            </div>
          )}
        </div>

        {/* Step 2: Live Vehicle Inventory Picker */}
        <div className="data-panel">
          <div className="panel-header-toolbar">
            <div className="panel-main-title">
              <Package size={15} />
              <span>Step 2: Add Items from Van Stock</span>
            </div>
          </div>

          <div className="erp-table-wrapper">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Item Name</th>
                  <th>Van Qty</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY_STOCK.map((item) => (
                  <tr key={item.sku}>
                    <td><span className="code-cell">{item.sku}</span></td>
                    <td><div style={{ fontWeight: 600 }}>{item.productName}</div></td>
                    <td><strong>{item.fleetQty}</strong></td>
                    <td>SAR {item.unitPrice}</td>
                    <td>
                      <button 
                        className="btn-sm-primary" 
                        disabled={selectedStore.blocked}
                        onClick={() => handleAddItem(item)}
                      >
                        <Plus size={12} />
                        <span>Add</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Order Cart & Delivery Receipt Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="side-panel-card" style={{ padding: '16px' }}>
          <div className="side-panel-title">
            <ShoppingCart size={15} />
            <span>Order Cart & Delivery Receipt</span>
          </div>

          {cart.length === 0 ? (
            <div style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              Cart is empty. Select items from van stock.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cart.map((item) => (
                <div key={item.sku} style={{ borderBottom: '1px solid var(--border-color-light)', paddingBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '12px' }}>
                    <span>{item.name}</span>
                    <button style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer' }} onClick={() => handleRemoveItem(item.sku)}>
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '11.5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button className="btn-sm-secondary" style={{ padding: '1px 6px' }} onClick={() => handleQtyChange(item.sku, -1)}>-</button>
                      <span style={{ fontWeight: 700 }}>{item.qty}</span>
                      <button className="btn-sm-secondary" style={{ padding: '1px 6px' }} onClick={() => handleQtyChange(item.sku, 1)}>+</button>
                    </div>

                    <div>
                      <span>Disc: </span>
                      <input 
                        type="number" 
                        style={{ width: '40px', padding: '1px 3px', fontSize: '11px', border: '1px solid var(--border-color)', borderRadius: '3px' }}
                        value={item.discountPct}
                        onChange={(e) => handleDiscountChange(item.sku, e.target.value)}
                      /> %
                    </div>

                    <div style={{ fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                      SAR {(item.unitPrice * item.qty * (1 - item.discountPct / 100)).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}

              {discountError && (
                <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px', borderRadius: '4px', fontSize: '10.5px' }}>
                  {discountError}
                </div>
              )}

              <div className="form-group" style={{ marginTop: '4px' }}>
                <span className="form-label">Payment Mode</span>
                <select className="form-select" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                  <option value="Immediate Cash">Immediate Cash (Bill-to-Bill)</option>
                  <option value="Add to Credit Cycle Balance">Add to Running Credit Balance</option>
                </select>
              </div>

              <div style={{ paddingTop: '10px', borderTop: '2px solid var(--border-color)', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                  <span>Total Order:</span>
                  <span>SAR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', height: '42px', marginTop: '8px', justifyContent: 'center', fontSize: '12.5px' }}
                disabled={selectedStore.blocked || cart.length === 0}
                onClick={handleSubmitSale}
              >
                <FileText size={15} />
                <span>Issue Delivery Document</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
