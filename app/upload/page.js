// "use client";
// import { useState, useEffect } from "react";
// import { 
//   FiUploadCloud, 
//   FiCheckCircle, 
//   FiAlertCircle, 
//   FiFileText, 
//   FiActivity,
//   FiFolder
// } from "react-icons/fi";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   async function fetchHistory() {
//     try {
//       const res = await fetch("/api/history");
//       const data = await res.json();
//       if (res.ok) setHistory(data);
//     } catch (err) {
//       console.error("History error:", err);
//     }
//   }

//   async function handleUpload() {
//     if (!file) return;
//     setLoading(true);
//     setResult(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/upload", { method: "POST", body: formData });
//       const data = await res.json();
//       if (res.ok) {
//         setResult(data);
//         fetchHistory();
//       } else {
//         throw new Error(data.error || "Upload failed");
//       }
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <style>{`
//         .app-container {
//           min-height: 100vh;
//           background-color: #0a0c10;
//           color: #cbd5e1;
//           font-family: 'Inter', sans-serif;
//           position: relative;
//           padding: 40px 20px;
//         }
//         .glow {
//           position: fixed;
//           top: 0; left: 50%; transform: translateX(-50%);
//           width: 100%; height: 400px;
//           background: rgba(37, 99, 235, 0.08);
//           filter: blur(100px);
//           pointer-events: none;
//         }
//         .wrapper { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
//         .header { margin-bottom: 48px; }
//         .brand { display: flex; items-center; gap: 12px; margin-bottom: 8px; }
//         .icon-box { background: #2563eb; padding: 10px; border-radius: 12px; display: flex; }
//         .main-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
//         @media (min-width: 1024px) { .main-grid { grid-template-columns: 4fr 7fr; } }
        
//         .card {
//           background: rgba(15, 23, 42, 0.4);
//           border: 1px solid rgba(51, 65, 85, 0.4);
//           border-radius: 24px;
//           padding: 32px;
//           backdrop-filter: blur(16px);
//         }
//         .dropzone {
//           border: 2px dashed #334155;
//           border-radius: 20px;
//           height: 200px;
//           display: flex; flex-direction: column; items-center; justify-center;
//           cursor: pointer; transition: 0.3s;
//           background: rgba(30, 41, 59, 0.2);
//         }
//         .dropzone:hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
//         .btn {
//           width: 100%; margin-top: 24px; padding: 18px;
//           background: #2563eb; color: white; border: none;
//           border-radius: 14px; font-weight: 800; text-transform: uppercase;
//           letter-spacing: 0.15em; cursor: pointer; transition: 0.2s;
//         }
//         .btn:disabled { background: #1e293b; color: #475569; }

//         .table-wrap { border: 1px solid #334155; border-radius: 24px; overflow: hidden; background: rgba(15, 23, 42, 0.3); }
//         .table-head { background: rgba(15, 23, 42, 0.8); color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; }
//         .table-row { border-top: 1px solid rgba(51, 65, 85, 0.3); transition: 0.2s; }
//         .table-row:hover { background: rgba(37, 99, 235, 0.05); }
//         .pill { font-size: 10px; font-weight: 900; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; }
//         .pill-blue { background: rgba(37, 99, 235, 0.1); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.2); }
//       `}</style>

//       <div className="app-container">
//         <div className="glow" />
//         <div className="wrapper">
//           <header className="header">
//             <div className="brand">
//               <div className="icon-box"><FiFolder color="white" size={24} /></div>
//               <h1 style={{fontSize: '32px', fontWeight: 900, color: 'white', margin: 0}}>
//                 DECLUTTER<span style={{color: '#3b82f6'}}>AI</span>
//               </h1>
//             </div>
//             <p style={{color: '#94a3b8', margin: '8px 0 0 4px'}}>Neural filing system for digital workspaces.</p>
//           </header>

//           <div className="main-grid">
//             <div className="left-section">
//               <div className="card">
//                 <label className="dropzone">
//                   <FiUploadCloud size={32} color="#64748b" />
//                   <p style={{marginTop: '12px', fontSize: '14px', fontWeight: 600}}>
//                     {file ? file.name : "Select Document"}
//                   </p>
//                   <input type="file" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />
//                 </label>
//                 <button className="btn" onClick={handleUpload} disabled={loading || !file}>
//                   {loading ? "Neural Processing..." : "Execute Clean"}
//                 </button>
//               </div>

//               {result && (
//                 <div className="card" style={{marginTop: '24px', padding: '24px'}}>
//                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
//                       <span style={{fontSize: '10px', fontWeight: 900, color: '#3b82f6', letterSpacing: '2px'}}>ANALYSIS COMPLETE</span>
//                       <FiCheckCircle color="#22c55e" />
//                    </div>
//                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px'}}>
//                       <div style={{background: 'rgba(30,41,59,0.4)', padding: '12px', borderRadius: '12px'}}>
//                         <small style={{fontSize: '9px', color: '#64748b'}}>CLASS</small>
//                         <div style={{fontWeight: 900, color: 'white'}}>{result.category}</div>
//                       </div>
//                       <div style={{background: 'rgba(30,41,59,0.4)', padding: '12px', borderRadius: '12px', overflow: 'hidden'}}>
//                         <small style={{fontSize: '9px', color: '#64748b'}}>HASH</small>
//                         <div style={{fontSize: '10px', fontFamily: 'monospace', color: '#94a3b8'}}>{result.fileHash.substring(0,15)}...</div>
//                       </div>
//                    </div>
//                    <div style={{marginTop: '16px', padding: '16px', background: 'rgba(37,99,235,0.1)', borderRadius: '12px', border: '1px solid rgba(37,99,235,0.2)'}}>
//                       <p style={{margin: 0, fontSize: '13px', fontStyle: 'italic', color: '#bfdbfe'}}>"{result.summary}"</p>
//                    </div>
//                 </div>
//               )}
//             </div>

//             <div className="right-section">
//               <div className="table-wrap">
//                 <div style={{padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                   <span style={{fontSize: '12px', fontWeight: 900, letterSpacing: '2px'}}><FiActivity style={{marginRight: '8px'}} />HISTORICAL LEDGER</span>
//                   <span style={{fontSize: '10px', background: '#334155', padding: '4px 10px', borderRadius: '20px'}}>{history.length} ITEMS</span>
//                 </div>
//                 <table style={{width: '100%', borderCollapse: 'collapse'}}>
//                   <thead className="table-head">
//                     <tr>
//                       <th style={{padding: '16px', textAlign: 'left'}}>Identity</th>
//                       <th style={{padding: '16px', textAlign: 'left'}}>Class</th>
//                       <th style={{padding: '16px', textAlign: 'right'}}>Timestamp</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {history.map((item) => (
//                       <tr key={item.id} className="table-row">
//                         <td style={{padding: '16px', fontSize: '13px', fontWeight: 600}}><FiFileText style={{marginRight: '10px', verticalAlign: 'middle'}} />{item.fileName}</td>
//                         <td style={{padding: '16px'}}><span className="pill pill-blue">{item.category}</span></td>
//                         <td style={{padding: '16px', textAlign: 'right', fontSize: '11px', color: '#64748b', fontFamily: 'monospace'}}>
//                           {new Date(item.uploadDate).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { 
  FiUploadCloud, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiActivity,
  FiFolder
} from "react-icons/fi"; // npm install react-icons

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
      console.error("Failed to load history:", err);
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
        await fetchHistory();
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] bg-grid-white/[0.02] text-slate-200 selection:bg-blue-500/30">
      {/* Abstract Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <main className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
              <FiFolder className="text-white text-xl" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Declutter<span className="text-blue-500">AI</span>
            </h1>
          </div>
          <p className="text-slate-400 font-medium">
            Intelligent neural filing system for a cleaner digital workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload & Analysis */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
              <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all bg-slate-800/20 hover:bg-blue-500/5">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUploadCloud className="text-3xl text-slate-500 group-hover:text-blue-400 transition-colors mb-3" />
                  <p className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
                    {file ? file.name : "Drop file to analyze"}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files[0])} 
                />
              </label>

              <button 
                onClick={handleUpload} 
                disabled={loading || !file} 
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Neural Processing...
                  </span>
                ) : "Execute Organization"}
              </button>
            </section>

            {/* Live Result Feed */}
            {result && (
              <section className="animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Processing Complete</span>
                    <FiCheckCircle className="text-green-500" />
                  </div>
                  
                  {result.isDuplicate && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center gap-3">
                      <FiAlertCircle className="text-amber-500 flex-shrink-0" />
                      <p className="text-xs text-amber-200/80">Redundancy detected. Instance filed as copy.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                      <span className="text-[10px] uppercase text-slate-500 block mb-1">Target Class</span>
                      <span className="text-lg font-bold text-white">{result.category}</span>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                      <span className="text-[10px] uppercase text-slate-500 block mb-1">Fingerprint</span>
                      <span className="text-xs font-mono text-slate-400 truncate block">{result.fileHash}</span>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                    <span className="text-[10px] uppercase text-blue-400 block mb-2 font-bold">Semantic Summary</span>
                    <p className="text-sm italic leading-relaxed text-blue-100">"{result.summary}"</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Historical Ledger */}
          <div className="lg:col-span-7">
            <section className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl min-h-[500px]">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <FiActivity className="text-blue-500" />
                  <h3 className="font-bold text-white uppercase tracking-wider text-sm">Historical Ledger</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-700 rounded-md text-slate-300">
                  {history.length} ITEMS
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/80 text-[10px] uppercase text-slate-500">
                    <tr>
                      <th className="p-5 font-bold">Identity</th>
                      <th className="p-5 font-bold">Class</th>
                      <th className="p-5 font-bold">Status</th>
                      <th className="p-5 font-bold text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {history.map((item) => (
                      <tr key={item.id} className="group hover:bg-blue-500/5 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <FiFileText className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <span className="text-xs font-semibold max-w-[150px] truncate block text-slate-300">
                              {item.fileName}
                            </span>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="text-[10px] font-black px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded uppercase">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-5">
                          {item.isDuplicate ? (
                            <span className="text-amber-500 text-[10px] font-bold">REDUNDANT</span>
                          ) : (
                            <span className="text-green-500 text-[10px] font-bold">OPTIMIZED</span>
                          )}
                        </td>
                        <td className="p-5 text-right text-[10px] font-mono text-slate-600">
                          {new Date(item.uploadDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {history.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 opacity-30">
                    <FiActivity className="text-4xl mb-4" />
                    <p className="text-sm font-medium italic">System idle. Awaiting data input.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}