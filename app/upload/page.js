"use client";
import { useState, useEffect } from "react";
import { 
  FiUploadCloud, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiActivity,
  FiFolder
} from "react-icons/fi";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (res.ok) setHistory(data);
    } catch (err) {
      console.error("History error:", err);
    }
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        fetchHistory();
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .app-container {
          min-height: 100vh;
          background-color: #0a0c10;
          color: #cbd5e1;
          font-family: 'Inter', sans-serif;
          position: relative;
          padding: 40px 20px;
        }
        .glow {
          position: fixed;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 100%; height: 400px;
          background: rgba(37, 99, 235, 0.08);
          filter: blur(100px);
          pointer-events: none;
        }
        .wrapper { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .header { margin-bottom: 48px; }
        .brand { display: flex; items-center; gap: 12px; margin-bottom: 8px; }
        .icon-box { background: #2563eb; padding: 10px; border-radius: 12px; display: flex; }
        .main-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 1024px) { .main-grid { grid-template-columns: 4fr 7fr; } }
        
        .card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(51, 65, 85, 0.4);
          border-radius: 24px;
          padding: 32px;
          backdrop-filter: blur(16px);
        }
        .dropzone {
          border: 2px dashed #334155;
          border-radius: 20px;
          height: 200px;
          display: flex; flex-direction: column; items-center; justify-center;
          cursor: pointer; transition: 0.3s;
          background: rgba(30, 41, 59, 0.2);
        }
        .dropzone:hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
        .btn {
          width: 100%; margin-top: 24px; padding: 18px;
          background: #2563eb; color: white; border: none;
          border-radius: 14px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.15em; cursor: pointer; transition: 0.2s;
        }
        .btn:disabled { background: #1e293b; color: #475569; }

        .table-wrap { border: 1px solid #334155; border-radius: 24px; overflow: hidden; background: rgba(15, 23, 42, 0.3); }
        .table-head { background: rgba(15, 23, 42, 0.8); color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; }
        .table-row { border-top: 1px solid rgba(51, 65, 85, 0.3); transition: 0.2s; }
        .table-row:hover { background: rgba(37, 99, 235, 0.05); }
        .pill { font-size: 10px; font-weight: 900; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; }
        .pill-blue { background: rgba(37, 99, 235, 0.1); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.2); }
      `}</style>

      <div className="app-container">
        <div className="glow" />
        <div className="wrapper">
          <header className="header">
            <div className="brand">
              <div className="icon-box"><FiFolder color="white" size={24} /></div>
              <h1 style={{fontSize: '32px', fontWeight: 900, color: 'white', margin: 0}}>
                DECLUTTER<span style={{color: '#3b82f6'}}>AI</span>
              </h1>
            </div>
            <p style={{color: '#94a3b8', margin: '8px 0 0 4px'}}>Neural filing system for digital workspaces.</p>
          </header>

          <div className="main-grid">
            <div className="left-section">
              <div className="card">
                <label className="dropzone">
                  <FiUploadCloud size={32} color="#64748b" />
                  <p style={{marginTop: '12px', fontSize: '14px', fontWeight: 600}}>
                    {file ? file.name : "Select Document"}
                  </p>
                  <input type="file" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <button className="btn" onClick={handleUpload} disabled={loading || !file}>
                  {loading ? "Neural Processing..." : "Execute Clean"}
                </button>
              </div>

              {result && (
                <div className="card" style={{marginTop: '24px', padding: '24px'}}>
                   <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                      <span style={{fontSize: '10px', fontWeight: 900, color: '#3b82f6', letterSpacing: '2px'}}>ANALYSIS COMPLETE</span>
                      <FiCheckCircle color="#22c55e" />
                   </div>
                   <div style={{display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px'}}>
                      <div style={{background: 'rgba(30,41,59,0.4)', padding: '12px', borderRadius: '12px'}}>
                        <small style={{fontSize: '9px', color: '#64748b'}}>CLASS</small>
                        <div style={{fontWeight: 900, color: 'white'}}>{result.category}</div>
                      </div>
                      <div style={{background: 'rgba(30,41,59,0.4)', padding: '12px', borderRadius: '12px', overflow: 'hidden'}}>
                        <small style={{fontSize: '9px', color: '#64748b'}}>HASH</small>
                        <div style={{fontSize: '10px', fontFamily: 'monospace', color: '#94a3b8'}}>{result.fileHash.substring(0,15)}...</div>
                      </div>
                   </div>
                   <div style={{marginTop: '16px', padding: '16px', background: 'rgba(37,99,235,0.1)', borderRadius: '12px', border: '1px solid rgba(37,99,235,0.2)'}}>
                      <p style={{margin: 0, fontSize: '13px', fontStyle: 'italic', color: '#bfdbfe'}}>"{result.summary}"</p>
                   </div>
                </div>
              )}
            </div>

            <div className="right-section">
              <div className="table-wrap">
                <div style={{padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '12px', fontWeight: 900, letterSpacing: '2px'}}><FiActivity style={{marginRight: '8px'}} />HISTORICAL LEDGER</span>
                  <span style={{fontSize: '10px', background: '#334155', padding: '4px 10px', borderRadius: '20px'}}>{history.length} ITEMS</span>
                </div>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead className="table-head">
                    <tr>
                      <th style={{padding: '16px', textAlign: 'left'}}>Identity</th>
                      <th style={{padding: '16px', textAlign: 'left'}}>Class</th>
                      <th style={{padding: '16px', textAlign: 'right'}}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr key={item.id} className="table-row">
                        <td style={{padding: '16px', fontSize: '13px', fontWeight: 600}}><FiFileText style={{marginRight: '10px', verticalAlign: 'middle'}} />{item.fileName}</td>
                        <td style={{padding: '16px'}}><span className="pill pill-blue">{item.category}</span></td>
                        <td style={{padding: '16px', textAlign: 'right', fontSize: '11px', color: '#64748b', fontFamily: 'monospace'}}>
                          {new Date(item.uploadDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}