import React, { useState } from 'react';
import { Tag, Plus, Search, CheckCircle, Package, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES_DATA } from '../../data/mockData';

export const AdminCatalogTemplates = ({ onShowToast }) => {
  const [categories, setCategories] = useState([...PRODUCT_CATEGORIES_DATA]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    codePrefix: '',
    defaultUom: '1KG Pack',
    taxRatePct: 15,
    fefoPolicy: 'Strict 30-Day FEFO Clearance'
  });

  const filteredCategories = categories.filter(c => 
    c.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.codePrefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.categoryName || !newCategory.codePrefix) return;
    const catObj = {
      categoryId: `CAT-0${categories.length + 1}`,
      categoryName: newCategory.categoryName,
      codePrefix: newCategory.codePrefix.toUpperCase(),
      defaultUom: newCategory.defaultUom,
      taxRatePct: Number(newCategory.taxRatePct),
      skusCount: 0,
      fefoPolicy: newCategory.fefoPolicy,
      status: 'Active Master Category'
    };
    setCategories(prev => [...prev, catObj]);
    setModalOpen(false);
    setNewCategory({ categoryName: '', codePrefix: '', defaultUom: '1KG Pack', taxRatePct: 15, fefoPolicy: 'Strict 30-Day FEFO Clearance' });
    if (onShowToast) {
      onShowToast(`Created Product Category "${catObj.categoryName}" (Prefix: ${catObj.codePrefix})`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <Tag size={16} />
            <span>Product Type Templates & Master Categories Setup</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pos-search-box" style={{ width: '220px' }}>
              <Search size={14} className="pos-search-icon" />
              <input 
                type="text" 
                className="form-input pos-search-input" 
                placeholder="Search category or prefix..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={() => setModalOpen(true)} style={{ gap: '6px' }}>
              <Plus size={14} />
              <span>+ Add Product Category</span>
            </button>
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Code Prefix</th>
                <th>Default UOM</th>
                <th>VAT Tax Rate</th>
                <th>Active SKUs</th>
                <th>FEFO / Warehousing Policy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((c) => (
                <tr key={c.categoryId}>
                  <td><span className="code-cell">{c.categoryId}</span></td>
                  <td><div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{c.categoryName}</div></td>
                  <td><span className="code-cell">{c.codePrefix}</span></td>
                  <td>{c.defaultUom}</td>
                  <td><strong>{c.taxRatePct}% VAT</strong></td>
                  <td><span className="badge badge-info">{c.skusCount} SKUs</span></td>
                  <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{c.fefoPolicy}</td>
                  <td>
                    <span className="badge badge-success">
                      <CheckCircle size={11} />
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Product Category */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ width: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tag size={16} />
                <span>Add Master Product Category</span>
              </div>
            </div>

            <form onSubmit={handleAddCategory}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Category Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Organic Crop Boosters"
                    value={newCategory.categoryName}
                    onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>SKU Code Prefix</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. ORG-BOOST"
                      value={newCategory.codePrefix}
                      onChange={(e) => setNewCategory({ ...newCategory, codePrefix: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Default Unit of Measure</label>
                    <select 
                      className="form-select"
                      value={newCategory.defaultUom}
                      onChange={(e) => setNewCategory({ ...newCategory, defaultUom: e.target.value })}
                    >
                      <option value="1KG Pack">1KG Pack</option>
                      <option value="5KG Bag">5KG Bag</option>
                      <option value="Roll (50m)">Roll (50m)</option>
                      <option value="5L Canister">5L Canister</option>
                      <option value="25KG SACK">25KG SACK</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Warehousing FEFO Policy</label>
                  <select 
                    className="form-select"
                    value={newCategory.fefoPolicy}
                    onChange={(e) => setNewCategory({ ...newCategory, fefoPolicy: e.target.value })}
                  >
                    <option value="Strict 30-Day FEFO Clearance">Strict 30-Day FEFO Clearance</option>
                    <option value="Standard FIFO Warehousing">Standard FIFO Warehousing</option>
                    <option value="Batch Expiry Tracked">Batch Expiry Tracked</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
