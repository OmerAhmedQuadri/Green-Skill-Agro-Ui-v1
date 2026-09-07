import React, { useState } from 'react';
import { FileSpreadsheet, Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminAuditTrail = () => {
  const { language, t } = useLanguage();
  const { auditTrail } = useManagerContext();
  const [searchTerm, setSearchTerm] = useState('');

  const logs = auditTrail || [];

  const filteredLogs = logs.filter(l => 
    (l.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.details || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <FileSpreadsheet size={16} />
            <span>{language === 'ar' ? 'سجل الرقابة والتدقيق الرئيسي للنظام ومتابعة الامتثال' : 'Master System Audit Trail & Compliance Log'}</span>
          </div>

          <div className="pos-search-box" style={{ width: '240px' }}>
            <Search size={14} className="pos-search-icon" />
            <input 
              type="text" 
              className="form-input pos-search-input" 
              placeholder={language === 'ar' ? 'ابحث في سجل التدقيق...' : 'Search audit trail...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>{language === 'ar' ? 'معرف التدقيق' : 'Audit ID'}</th>
                <th>{language === 'ar' ? 'الوقت والتاريخ' : 'Timestamp'}</th>
                <th>{language === 'ar' ? 'حساب المستخدم' : 'User Account'}</th>
                <th>{language === 'ar' ? 'الدور' : 'Role'}</th>
                <th>{language === 'ar' ? 'نوع الإجراء' : 'Action Type'}</th>
                <th>{language === 'ar' ? 'التفاصيل وأثر التنفيذ' : 'Details & Execution Impact'}</th>
                <th>{language === 'ar' ? 'تصنيف المخاطر' : 'Risk Classification'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td><span className="code-cell">{log.id}</span></td>
                  <td style={{ fontSize: '11.5px', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                  <td><div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{log.user}</div></td>
                  <td><span className="badge badge-info">{log.role}</span></td>
                  <td><span className="code-cell" style={{ fontSize: '11px' }}>{log.action}</span></td>
                  <td style={{ fontSize: '12px' }}>{log.details}</td>
                  <td>
                    {log.riskLevel === 'High Risk' ? (
                      <span className="badge badge-danger">
                        <AlertTriangle size={11} />
                        {language === 'ar' ? 'مخاطر عالية' : log.riskLevel}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <ShieldCheck size={11} />
                        {language === 'ar' ? 'امتثال عادي' : log.riskLevel}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
