import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import * as XLSX from 'xlsx';

// STEP 2: LOSS RUN VERIFICATION VIEW
export function VerificationView({ backendResult, fileStats }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Use uploaded files list if available, otherwise fallback to default mock files
  const files = fileStats?.uploadedList && fileStats.uploadedList.length > 0 
    ? fileStats.uploadedList 
    : [
        { name: 'wc_claims_2024_Q1.pdf', size: '240 KB', type: 'pdf', valid: true, reason: 'Contains claimant listings, dates of loss, and reserve thresholds. Verified Workers Comp Loss Run.' },
        { name: 'auto_liability_claims.xlsx', size: '120 KB', type: 'xlsx', valid: true, reason: 'Contains structured columns for claim identifiers, line of business, and paid losses. Verified Excel Spreadsheet.' },
        { name: 'property_damage_claims.csv', size: '45 KB', type: 'csv', valid: true, reason: 'Contains CSV tabular records of property damages. Verified CSV Loss Run.' },
        { name: 'bodily_injury_report.docx', size: '180 KB', type: 'docx', valid: true, reason: 'Contains accident descriptions, claimant identifiers, and medical loss reserves. Converted and verified.' },
        { name: 'commercial_loss_run_extract.pdf', size: '310 KB', type: 'pdf', valid: true, reason: 'Contains policy detail structures and historical loss lines. Verified Commercial Loss Run.' }
      ];

  const activeFile = selectedFile || files[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="section-title">
        <LucideIcons.ShieldCheck color="var(--accent-color)" /> Step 2: Loss Run Verification
      </div>
      <p className="section-subtitle">
        Intake Agent scan complete. The Loss Run Detection Agent has verified document types and filtered out invalid files.
      </p>

      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden', marginTop: '16px' }}>
        {/* Left list of files */}
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', paddingRight: '8px' }}>
          {files.map((file, i) => (
            <button
              key={i}
              onClick={() => setSelectedFile(file)}
              className="glass-panel"
              style={{
                padding: '16px',
                textAlign: 'left',
                border: activeFile?.name === file.name ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                background: activeFile?.name === file.name ? 'rgba(234, 88, 12, 0.05)' : 'var(--bg-card-hover)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`file-ext-badge badge-${file.type}`} style={{ fontSize: '0.7rem' }}>{file.type}</span>
                <div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600 }}>{file.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{file.size}</div>
                </div>
              </div>
              <div>
                {file.valid ? (
                  <div style={{ color: 'var(--status-green)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <LucideIcons.CheckCircle2 size={16} /> VERIFIED
                  </div>
                ) : (
                  <div style={{ color: 'var(--status-red)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <LucideIcons.XCircle size={16} /> EXCLUDED
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right Verification Details */}
        <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', background: 'var(--bg-card-hover)', overflowY: 'auto' }}>
          {activeFile ? (
            <>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <span className={`file-ext-badge badge-${activeFile.type}`} style={{ marginBottom: '8px' }}>{activeFile.type.toUpperCase()} File</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0' }}>{activeFile.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Size: {activeFile.size}</span>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Verification Result</h4>
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '6px', 
                    background: activeFile.valid ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    color: activeFile.valid ? 'var(--status-green)' : 'var(--status-red)',
                    border: `1px solid ${activeFile.valid ? 'var(--status-green)44' : 'var(--status-red)44'}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {activeFile.valid ? <LucideIcons.ShieldCheck size={18} /> : <LucideIcons.AlertTriangle size={18} />}
                    {activeFile.valid ? 'Verified Loss Run Report Document' : 'Non-Loss Run Invoice Excluded'}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>LLM Classification Audit</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {activeFile.reason}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              Select a file on the left to view verification audit logs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// STEP 3: OCR & PREPROCESSING (DIVIDED VIEW)
export function PreprocessingView({ fileStats }) {
  const hasDocFiles = fileStats ? (fileStats.pdf > 0 || fileStats.docx > 0) : true;
  const hasExcelFiles = fileStats ? (fileStats.excel > 0 || fileStats.csv > 0) : true;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="section-title">
        <LucideIcons.Network color="var(--accent-color)" /> Step 3: OCR & Pre-processing
      </div>
      <p className="section-subtitle">
        Document parsing and spreadsheet ingestion suites processing files concurrently.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1, overflow: 'hidden', marginTop: '16px' }}>
        
        {/* Left Side: Document Stream (PDF/Word) */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '3px solid rgba(239, 68, 68, 0.4)' }}>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LucideIcons.FileText color="#ef4444" size={18} /> Document Parsing Suite (PDF & Word)
          </h4>
          
          {hasDocFiles ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
              <div style={{ background: 'var(--bg-card-hover)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Active Conversion Logs</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>[15:13:25] [docx_conv] Word tables converted to PDF vectors.</div>
                  <div>[15:13:28] [pdf_img] Splitting pages into 150 DPI layouts...</div>
                  <div>[15:13:30] [pdf_img] Page 2: Rotated 90° clockwise. Auto-aligned.</div>
                  <div>[15:13:34] [img_txt] Running layout-aware OCR extraction...</div>
                </div>
              </div>

              {/* Page rotation preview mockups */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>Layout rotation correction check</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '80px', height: '110px', background: 'var(--bg-card-hover)', border: '1px solid var(--status-green)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--status-green)', position: 'relative' }}>
                      <LucideIcons.FileText size={24} />
                      <span style={{ position: 'absolute', bottom: '4px', fontSize: '0.6rem', fontWeight: 600 }}>PAGE 1</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--status-green)', fontWeight: 600 }}>[✓] Standard</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '80px', height: '110px', background: 'var(--bg-card-hover)', border: '1px solid var(--accent-color)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', position: 'relative' }}>
                      <LucideIcons.RotateCw size={24} style={{ animation: 'spin-loader 3s infinite linear' }} />
                      <span style={{ position: 'absolute', bottom: '4px', fontSize: '0.6rem', fontWeight: 600 }}>PAGE 2</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 600 }}>Auto-Rotated</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No PDF or Word documents uploaded in this batch.
            </div>
          )}
        </div>

        {/* Right Side: Spreadsheet Stream (Excel/CSV) */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '3px solid rgba(16, 185, 129, 0.4)' }}>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LucideIcons.FileSpreadsheet color="#10b981" size={18} /> Spreadsheet Ingestion Suite (Excel & CSV)
          </h4>

          {hasExcelFiles ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
              <div style={{ background: 'var(--bg-card-hover)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Active Extraction Logs</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>[15:13:25] [excel_detect] Scanning grid cell coordinates...</div>
                  <div>[15:13:27] [excel_detect] Identified table boundary blocks (A1:N14).</div>
                  <div>[15:13:29] [excel_extract] Normalizing header structures.</div>
                  <div>[15:13:31] [excel_extract] Extracted 8 claim rows to tabular JSON.</div>
                </div>
              </div>

              {/* Sheet block visualizer */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>Spreadsheet cell grid matrix mapping</div>
                <div style={{ border: '1px dashed var(--border-color)', padding: '12px', borderRadius: '6px', background: 'var(--bg-card-hover)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                    <div style={{ border: '1px solid var(--border-color)', padding: '4px', background: 'var(--bg-main)' }}>ClaimID</div>
                    <div style={{ border: '1px solid var(--border-color)', padding: '4px', background: 'var(--bg-main)' }}>Date</div>
                    <div style={{ border: '1px solid var(--border-color)', padding: '4px', background: 'var(--bg-main)' }}>Claimant</div>
                    <div style={{ border: '1px solid var(--border-color)', padding: '4px', background: 'var(--bg-main)' }}>Paid</div>
                    <div style={{ border: '1px solid var(--border-color)', padding: '4px', background: 'var(--bg-main)' }}>Reserve</div>

                    <div style={{ border: '1px solid var(--status-green)', padding: '4px', color: 'var(--status-green)', background: 'rgba(16,185,129,0.05)' }}>GL-1029</div>
                    <div style={{ border: '1px solid var(--status-green)', padding: '4px', color: 'var(--status-green)', background: 'rgba(16,185,129,0.05)' }}>02/14/23</div>
                    <div style={{ border: '1px solid var(--status-green)', padding: '4px', color: 'var(--status-green)', background: 'rgba(16,185,129,0.05)' }}>John Doe</div>
                    <div style={{ border: '1px solid var(--status-green)', padding: '4px', color: 'var(--status-green)', background: 'rgba(16,185,129,0.05)' }}>$12,000</div>
                    <div style={{ border: '1px solid var(--status-green)', padding: '4px', color: 'var(--status-green)', background: 'rgba(16,185,129,0.05)' }}>$33,000</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>Found: 1 table block. Extracted: 5 records</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No Excel or CSV spreadsheets uploaded in this batch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// STEP 4: UNIFIED CLAIMS OUTPUT
export function ExtractionView({ backendResult, isRolledUp, onRunRollup }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const dataToUse = backendResult?.rawRows || (DEMO_MODE ? finalTableData : []);
  const totalPages = Math.ceil(dataToUse.length / itemsPerPage);
  const currentItems = dataToUse.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const [isRunningRollup, setIsRunningRollup] = useState(false);

  const handleTriggerRollup = () => {
    setIsRunningRollup(true);
    setTimeout(() => {
      onRunRollup();
      setIsRunningRollup(false);
    }, 1800); // 1.8s simulation delay
  };

  if (!backendResult) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <LucideIcons.Loader2 size={48} className="spin-loader" color="var(--accent-color)" />
        <h3 style={{ color: 'var(--text-main)', marginTop: '16px' }}>Extraction Agent is mining data from streams...</h3>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="section-title">
            <LucideIcons.Wand2 color="var(--accent-color)" /> Step 4: Extracted Claims File
          </div>
          <p className="section-subtitle">
            Flat list of claims extracted from PDF documents, DOCX vectors, and Excel spreadsheets.
          </p>
        </div>
        <div>
          <button
            onClick={handleTriggerRollup}
            disabled={isRolledUp || isRunningRollup}
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isRolledUp ? 'var(--status-green)' : 'var(--accent-color)',
              borderColor: isRolledUp ? 'var(--status-green)' : 'var(--accent-color)',
              opacity: (isRolledUp || isRunningRollup) && !isRolledUp ? 0.6 : 1
            }}
          >
            {isRunningRollup ? (
              <>
                <LucideIcons.Loader2 size={16} className="spin-loader" /> Running Rollup Agent...
              </>
            ) : isRolledUp ? (
              <>
                <LucideIcons.Check size={16} /> Claimant Rollup Done
              </>
            ) : (
              <>
                <LucideIcons.GitMerge size={16} /> Run Claimant Rollup
              </>
            )}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Accident Date</th>
                <th>Claimant</th>
                <th>LOB</th>
                <th>State</th>
                <th>Paid</th>
                <th>Reserve</th>
                <th>Incurred</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.claim_id || c.claim_number}</td>
                  <td>{c.accident_date || c.loss_date}</td>
                  <td>{c.claimant}</td>
                  <td>{c.line_of_business || c.lob}</td>
                  <td>{c.accident_state || c.state}</td>
                  <td style={{ color: 'var(--status-green)' }}>{c.total_paid || c.paid}</td>
                  <td>{c.total_reserve || c.reserve}</td>
                  <td style={{ fontWeight: 600 }}>{c.total_incurred || c.incurred}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card-hover)', flexShrink: 0 }}>
            <button className="btn-secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ padding: '4px 12px' }}>Previous</button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Page {page + 1} of {totalPages}</span>
            <button className="btn-secondary" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ padding: '4px 12px' }}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

// STEP 5: ROLLUP & FINAL EXPORT VIEW
export function RollupView({ backendResult }) {
  const [showYearModal, setShowYearModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const totalClaims = backendResult?.claimsExtracted || 0;
  const byLob = backendResult?.lobSummary || [];
  const years = backendResult?.yearWiseSummary || [];
  const rawRows = backendResult?.rawRows || [];

  const totalPaid = years.length > 0 ? years.reduce((sum, y) => sum + parseFloat(y.totalPaid.replace(/[^0-9.-]+/g,"")), 0) : 0;
  const totalIncurred = years.length > 0 ? years.reduce((sum, y) => sum + parseFloat(y.totalIncurred.replace(/[^0-9.-]+/g,"")), 0) : 0;
  const totalReserve = years.length > 0 ? years.reduce((sum, y) => sum + parseFloat(y.totalReserve.replace(/[^0-9.-]+/g,"")), 0) : 0;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchFullCSV = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/download/csv');
      if (!response.ok) throw new Error("Failed to fetch CSV");
      return await response.text();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleDownloadCSV = async () => {
    setIsExporting(true);
    const csvText = await fetchFullCSV();
    if (csvText) {
      const blob = new Blob([csvText], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `loss_run_claims.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Downloaded CSV report successfully`);
    } else {
      alert("Failed to download CSV from backend.");
    }
    setIsExporting(false);
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    const csvText = await fetchFullCSV();
    if (csvText) {
      const wb = XLSX.read(csvText, { type: 'string' });
      const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      
      const newWb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWb, XLSX.utils.json_to_sheet(jsonData), "CLAIMS");
      XLSX.utils.book_append_sheet(newWb, XLSX.utils.json_to_sheet(byLob), "LOB_SUMMARY");
      
      XLSX.writeFile(newWb, "loss_run_master_package.xlsx");
      showToast('Exported Master Excel package successfully');
    } else {
      alert("Failed to download spreadsheet from backend.");
    }
    setIsExporting(false);
  };

  // Fuzzy-grouped claimant records
  // We aggregate rawRows by claimant matching rollup key logic
  const rollupGroups = React.useMemo(() => {
    const groups = {};
    rawRows.forEach(row => {
      const name = row.claimant || '';
      // Simple fuzzy key: titlecase + strip whitespace
      const cleanKey = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
      if (!groups[cleanKey]) {
        groups[cleanKey] = {
          name: name,
          namesMerged: new Set([name]),
          count: 0,
          incurred: 0,
          paid: 0,
          claims: []
        };
      }
      const p = parseFloat(String(row.total_paid || row.paid || 0).replace(/[^0-9.-]+/g,"")) || 0;
      const inc = parseFloat(String(row.total_incurred || row.incurred || 0).replace(/[^0-9.-]+/g,"")) || 0;
      
      groups[cleanKey].namesMerged.add(name);
      groups[cleanKey].count++;
      groups[cleanKey].incurred += inc;
      groups[cleanKey].paid += p;
      groups[cleanKey].claims.push(row);
    });

    return Object.values(groups).sort((a,b) => b.incurred - a.incurred);
  }, [rawRows]);

  if (!backendResult) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <div className="section-title"><LucideIcons.Layers color="var(--accent-color)" /> Step 5: Rollup & Export Dashboard</div>
        <div style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Awaiting Rollup Agent Execution in Step 4</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="section-title">
        <LucideIcons.Layers color="var(--accent-color)" /> Step 5: Rollup & Export Dashboard
      </div>

      {toastMessage && (
        <div style={{
          position: 'absolute', top: '0', right: '0', background: 'var(--status-green)', color: 'var(--bg-main)',
          padding: '8px 16px', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px',
          zIndex: 100, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', fontWeight: 600
        }}>
          <LucideIcons.CheckCircle2 size={16} /> {toastMessage}
        </div>
      )}

      {/* Main Grid View */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 4fr', gap: '16px', marginTop: '12px', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Side: Consolidated Claimant Rollup List */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LucideIcons.Users color="var(--accent-color)" size={16} /> Consolidated Claimant Rollups
          </h4>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            {rollupGroups.map((g, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', background: 'var(--bg-card-hover)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{g.name}</span>
                    {g.namesMerged.size > 1 && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--status-yellow)', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontWeight: 600 }}>
                        Fuzzy Merged ({g.namesMerged.size})
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--status-green)' }}>
                    {formatCurrency(g.incurred)}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyItems: 'space-between', gap: '16px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', borderTop: '1px solid var(--border-color)11', paddingTop: '4px' }}>
                  <span>Claims: {g.count}</span>
                  <span>Paid: {formatCurrency(g.paid)}</span>
                  <span>Names: {Array.from(g.namesMerged).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visuals & Export */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          
          {/* Executive Stats Card */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.04) 0%, rgba(11, 11, 11, 0) 100%)', flexShrink: 0 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Grouped Losses</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--status-green)', margin: '4px 0' }}>{formatCurrency(totalIncurred)}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across {totalClaims} Claims</span>
          </div>

          {/* LOB Distribution Progress Bars (Visual Chart) */}
          <div className="glass-panel" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LucideIcons.BarChart3 size={16} color="var(--accent-color)" /> Loss Distribution by Line of Business
            </h4>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
              {byLob.map((lob, i) => {
                const incNum = parseFloat(lob.incurred.replace(/[^0-9.-]+/g,"")) || 0;
                const pct = totalIncurred > 0 ? Math.round((incNum / totalIncurred) * 100) : 0;
                return (
                  <div key={i} style={{ fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{lob.lob} ({pct}%)</span>
                      <span style={{ color: 'var(--text-muted)' }}>{lob.incurred}</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent-color)', borderRadius: '4px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions & Export Panel */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => setShowYearModal(true)}>
              <LucideIcons.Calendar size={14} /> Year-wise Summary
            </button>
            <button className="btn-secondary" style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={handleDownloadCSV} disabled={isExporting}>
              <LucideIcons.FileDown size={14} /> Download CSV
            </button>
            <button className="btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={handleExportExcel} disabled={isExporting}>
              <LucideIcons.FileSpreadsheet size={14} /> Master Excel
            </button>
          </div>
        </div>
      </div>

      {showYearModal && (
        <div style={{ position: 'absolute', top: '-24px', left: '-40px', right: '-40px', bottom: '-20px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '80%', maxHeight: '80%', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '1.1rem' }}><LucideIcons.Calendar size={18} color="var(--accent-color)" /> Year-wise Breakdown</h3>
              <button onClick={() => setShowYearModal(false)} style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><LucideIcons.X size={18} /></button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Year</th><th>Claims</th><th>Paid</th><th>Reserve</th><th>Incurred</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((y, i) => (
                    <tr key={i} style={{ fontWeight: y.year === 'Total' ? 'bold' : 'normal', background: y.year === 'Total' ? 'var(--bg-card-hover)' : 'transparent' }}>
                      <td>{y.year}</td><td>{y.claimCount.toLocaleString()}</td><td>{y.totalPaid}</td><td>{y.totalReserve}</td><td>{y.totalIncurred}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
