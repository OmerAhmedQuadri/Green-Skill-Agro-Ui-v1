import React from 'react';
import { X } from 'lucide-react';

export const PhotoViewerModal = ({ photoUrl, title, onClose }) => {
  if (!photoUrl) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <span className="modal-title">{title || 'Audit Photo Evidence'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ padding: 0 }}>
          <div style={{ backgroundColor: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px' }}>
            <img 
              src={photoUrl} 
              alt="Evidence" 
              style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close Viewer</button>
        </div>
      </div>
    </div>
  );
};
