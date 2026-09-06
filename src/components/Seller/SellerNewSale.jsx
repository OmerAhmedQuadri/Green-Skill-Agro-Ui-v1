import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Store, 
  Package, 
  CheckCircle, 
  FileText, 
  Lock,
  Plus,
  Trash2,
  Search,
  Check
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';

export const SellerNewSale = ({ onCompleteSale }) => {
  const { stores, inventory, systemRules } = useManagerContext();

  const storeList = stores && stores.length > 0 ? stores : [];
  const inventoryList = inventory && inventory.length > 0 ? inventory : [];

  const [selectedStoreId, setSelectedStoreId] = useState(storeList[0]?.storeId || 'STR-102');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileTab, setMobileTab] = useState('stock'); // 'stock' or 'cart'
  const [cart, setCart] = useState([
    { sku: 'OKRA-PK-5KG', name: 'Okra Seed (Parbhani Kranti 5KG)', unitPrice: 360, qty: 5, discountPct: 0, lotNumber: 'OKR-2025-09A' },
    { sku: 'TOM-HYB-1KG', name: 'Hybrid Tomato Seed (Red Crown F1 1KG)', unitPrice: 370, qty: 10, discountPct: 0, lotNumber: 'TOM-2026-01' }
  ]);
  const [paymentMode, setPaymentMode] = useState('Immediate Cash');
  const [discountError, setDiscountError] = useState('');

  const selectedStore = storeList.find(s => s.storeId === selectedStoreId) || storeList[0] || { storeName: 'Select Store', blocked: false, outstandingBalance: 0, creditLimit: 10000 };

  const filteredStock = inventoryList.filter(item => 
    (item.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.sku || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.qty * (1 - item.discountPct / 100)), 0);
  const maxDiscountCeiling = systemRules?.maxSellerDiscountPct ?? 10;

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
    if (numPct > maxDiscountCeiling) {
      setDiscountError(`Discount ${numPct}% exceeds permitted seller ceiling (Max ${maxDiscountCeiling}%). Manager approval required.`);
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
      storeId: selectedStore.storeId,
      storeName: selectedStore.storeName,
      totalAmount: subtotal,
      itemCount: cart.length,
      paymentMode,
      items: cart
    });
  };

  const scrollToCart = () => {
    setMobileTab('cart');
    const cartElement = document.getElementById('pos-cart-section');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pos-wrapper">
      {/* Mobile-Only Tab Segment Control */}
      <div className="mobile-pos-tabs">
        <button 
          className={`mobile-tab-btn ${mobileTab === 'stock' ? 'active' : ''}`}
          onClick={() => setMobileTab('stock')}
        >
          <Package size={15} />
          <span>1. Van Stock ({filteredStock.length})</span>
        </button>
        <button 
          className={`mobile-tab-btn ${mobileTab === 'cart' ? 'active' : ''}`}
          onClick={() => setMobileTab('cart')}
        >
          <ShoppingCart size={15} />
          <span>2. Cart ({cart.length}) • SAR {subtotal.toLocaleString()}</span>
        </button>
      </div>

      <div className="seller-pos-layout">
        {/* LEFT COLUMN: Store Selector & Van Inventory Picker */}
        <div className={`pos-left-column ${mobileTab === 'cart' ? 'mobile-hidden' : ''}`}>
          {/* Step 1: Store Selector & Credit Status Check */}
          <div className="data-panel seller-pos-step1-panel" style={{ padding: '16px', minHeight: 'auto', height: 'auto', flex: 'none' }}>
            <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--color-forest-dark)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Store size={16} />
              <span>Step 1: Select Store Account</span>
            </div>

            <select 
              className="form-select pos-store-select" 
              style={{ width: '100%', fontSize: '13px', padding: '10px 12px' }}
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
            >
              {storeList.map(s => (
                <option key={s.storeId} value={s.storeId}>
                  {s.storeName} ({s.city}) - {s.creditCycle} {s.blocked ? '[BLOCKED]' : ''}
                </option>
              ))}
            </select>

            {/* Credit Check Status Banner */}
            {selectedStore.blocked ? (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px', borderRadius: '6px', marginTop: '10px', color: '#991b1b', fontSize: '12px' }}>
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} />
                  <span>Account Blocked from Sales</span>
                </div>
                <div style={{ marginTop: '3px' }}>
                  Outstanding: SAR {selectedStore.outstandingBalance?.toLocaleString()} (Limit SAR {selectedStore.creditLimit?.toLocaleString()})
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: '6px', marginTop: '10px', color: '#166534', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} />
                <span>Credit Check Passed: Active Account</span>
              </div>
            )}
          </div>

          {/* Step 2: Live Vehicle Inventory Picker */}
          <div className="data-panel seller-pos-step2-panel" style={{ minHeight: 'auto', height: 'auto' }}>
            <div className="panel-header-toolbar pos-header-toolbar">
              <div className="panel-main-title">
                <Package size={15} />
                <span>Step 2: Add Items from Van Stock</span>
              </div>

              <div className="pos-search-box">
                <Search size={14} className="pos-search-icon" />
                <input 
                  type="text" 
                  className="form-input pos-search-input" 
                  placeholder="Search item or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="erp-table-wrapper seller-pos-table-wrapper desktop-pos-table">
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
                  {filteredStock.map((item) => {
                    const inCart = cart.some(c => c.sku === item.sku);
                    return (
                      <tr key={item.sku}>
                        <td><span className="code-cell">{item.sku}</span></td>
                        <td><div style={{ fontWeight: 600 }}>{item.productName}</div></td>
                        <td><strong>{item.fleetQty}</strong></td>
                        <td>SAR {item.unitPrice}</td>
                        <td>
                          <button 
                            className={inCart ? "btn-sm-secondary" : "btn-sm-primary"}
                            disabled={selectedStore.blocked || inCart}
                            onClick={() => handleAddItem(item)}
                          >
                            {inCart ? <Check size={12} /> : <Plus size={12} />}
                            <span>{inCart ? "Added" : "Add"}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStock.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                        No inventory matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch Cards View */}
            <div className="mobile-pos-cards">
              {filteredStock.map((item) => {
                const inCart = cart.some(c => c.sku === item.sku);
                return (
                  <div key={item.sku} className="pos-mobile-card">
                    <div className="pos-card-top">
                      <span className="code-cell pos-card-sku">{item.sku}</span>
                      <div className="pos-card-title">{item.productName}</div>
                    </div>

                    <div className="pos-card-meta">
                      <div className="pos-meta-item">
                        <span className="meta-label">Van Stock:</span>
                        <strong className="meta-val">{item.fleetQty} units</strong>
                      </div>
                      <div className="pos-meta-item">
                        <span className="meta-label">Price:</span>
                        <strong className="meta-val price-val">SAR {item.unitPrice}</strong>
                      </div>
                    </div>

                    <button 
                      className={inCart ? "btn-mobile-added" : "btn-mobile-add"}
                      disabled={selectedStore.blocked || inCart}
                      onClick={() => handleAddItem(item)}
                    >
                      {inCart ? <Check size={15} /> : <Plus size={15} />}
                      <span>{inCart ? "Added to Cart" : "Add to Order"}</span>
                    </button>
                  </div>
                );
              })}
              {filteredStock.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No stock items match "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Cart & Delivery Receipt Summary */}
        <div id="pos-cart-section" className={`pos-right-column ${mobileTab === 'stock' ? 'mobile-hidden' : ''}`}>
          <div className="side-panel-card pos-cart-card" style={{ padding: '16px' }}>
            <div className="side-panel-title">
              <ShoppingCart size={16} />
              <span>Order Cart & Delivery Receipt</span>
            </div>

            {cart.length === 0 ? (
              <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                Cart is empty. Select items from van stock to build order.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cart.map((item) => (
                  <div key={item.sku} className="seller-pos-cart-item" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 12px', border: '1px solid var(--border-color-light)', backgroundColor: '#ffffff', borderRadius: '6px' }}>
                    
                    {/* Row 1: Item Name & Trash Delete Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-forest-dark)', flex: 1, lineHeight: '1.3' }}>
                        {item.name}
                      </span>
                      <button 
                        style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', cursor: 'pointer', padding: '4px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        title="Remove item" 
                        onClick={() => handleRemoveItem(item.sku)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Row 2: Controls (- qty +, Disc %, Total Price) strictly in ONE single horizontal row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', paddingTop: '6px', borderTop: '1px solid #f3f4f6', width: '100%', flexWrap: 'nowrap' }}>
                      
                      {/* Quantity [-] 5 [+] */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <button 
                          style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#f3f4f6', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                          onClick={() => handleQtyChange(item.sku, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '13px', minWidth: '18px', textAlign: 'center', display: 'inline-block' }}>
                          {item.qty}
                        </span>
                        <button 
                          style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#f3f4f6', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                          onClick={() => handleQtyChange(item.sku, 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Discount % Box */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>
                        <span>Disc:</span>
                        <input 
                          type="number" 
                          style={{ width: '38px', height: '26px', padding: '2px 4px', fontSize: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', textAlign: 'center' }}
                          value={item.discountPct}
                          onChange={(e) => handleDiscountChange(item.sku, e.target.value)}
                        />
                        <span>%</span>
                      </div>

                      {/* Price Subtotal */}
                      <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--color-forest-dark)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        SAR {(item.unitPrice * item.qty * (1 - item.discountPct / 100)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}

                {discountError && (
                  <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '8px 10px', borderRadius: '6px', fontSize: '11.5px', marginTop: '4px' }}>
                    {discountError}
                  </div>
                )}

                <div className="form-group" style={{ marginTop: '8px' }}>
                  <span className="form-label" style={{ fontWeight: 600, fontSize: '12px', marginBottom: '4px', display: 'block' }}>Payment Mode</span>
                  <select className="form-select" style={{ fontSize: '13px', padding: '8px 10px' }} value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="Immediate Cash">Immediate Cash (Bill-to-Bill)</option>
                    <option value="Add to Credit Cycle Balance">Add to Running Credit Balance</option>
                  </select>
                </div>

                <div style={{ paddingTop: '12px', borderTop: '2px solid var(--border-color)', marginTop: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                    <span>Total Order:</span>
                    <span>SAR {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', minHeight: '44px', marginTop: '8px', justifyContent: 'center', fontSize: '13.5px', fontWeight: 700 }}
                  disabled={selectedStore.blocked || cart.length === 0}
                  onClick={handleSubmitSale}
                >
                  <FileText size={16} />
                  <span>Issue Delivery Document</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Sticky Cart Footer on Mobile */}
      {cart.length > 0 && (
        <div className="mobile-pos-floating-bar">
          <div className="floating-bar-info">
            <ShoppingCart size={18} />
            <div>
              <div className="floating-cart-count">{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</div>
              <div className="floating-cart-total">SAR {subtotal.toLocaleString()}</div>
            </div>
          </div>

          <button className="floating-bar-action" onClick={scrollToCart}>
            <span>{mobileTab === 'cart' ? 'Review Order' : 'Checkout Cart →'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
