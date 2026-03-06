"use client";
import { useState, useEffect } from "react";
import { 
  FiUploadCloud, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiActivity,
  FiFolder,
  FiGrid,
  FiArrowLeft,
  FiImage
} from "react-icons/fi";

export default function App() {
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' | 'dashboard'

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <main className="relative z-10 p-6 md:p-12 max-w-6xl mx-auto flex flex-col min-h-screen">
        {/* Branding Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/40">
                <FiFolder className="text-white text-2xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white">
                DECLUTTER<span className="text-blue-500">AI</span>
              </h1>
            </div>
            <p className="text-slate-400 font-medium ml-1">
              Intelligent neural filing system for a cleaner digital workspace.
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800 backdrop-blur-xl shrink-0">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "upload"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FiUploadCloud className="text-lg" />
              Upload
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FiGrid className="text-lg" />
              Dashboard
            </button>
          </div>
        </header>

        {activeTab === "upload" ? <UploadView /> : <DashboardView />}
      </main>
    </div>
  );
}

function UploadView() {
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
        setFile(null); // Reset file selection after a successful upload
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Action Panel: Upload & Analysis */}
      <div className="lg:col-span-5 space-y-6">
        <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl border-t-slate-700/50">
          <label className="group relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-3xl cursor-pointer transition-all bg-slate-800/20 hover:bg-blue-500/5">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <FiUploadCloud className="text-4xl text-slate-500 group-hover:text-blue-400 transition-colors mb-4" />
              <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200 uppercase tracking-widest">
                {file ? file.name : "Select Document"}
              </p>
              <p className="text-xs text-slate-500 mt-2 font-medium">PDF, PNG, JPG up to 10MB</p>
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
            className="w-full mt-8 py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-2xl font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.97]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Neural Processing
              </span>
            ) : "Execute Clean"}
          </button>
        </section>

        {/* Analysis Result Card */}
        {result && (
          <section className="animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-slate-900/90 border border-slate-700 rounded-[2rem] p-7 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Analysis Output</span>
                <FiCheckCircle className="text-green-500 text-xl" />
              </div>
              
              {result.isDuplicate && (
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-4">
                  <FiAlertCircle className="text-amber-500 text-lg flex-shrink-0" />
                  <p className="text-[11px] font-bold text-amber-200/70 uppercase leading-tight">Redundancy detected. Instance filed as copy.</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <span className="text-[9px] uppercase font-black text-slate-500 block mb-1 tracking-widest">Target Class</span>
                  <span className="text-xl font-black text-white">{result.category}</span>
                </div>
                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30 overflow-hidden">
                  <span className="text-[9px] uppercase font-black text-slate-500 block mb-1 tracking-widest">Fingerprint</span>
                  <span className="text-[10px] font-mono text-slate-400 truncate block">{result.fileHash}</span>
                </div>
              </div>

              <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl shadow-inner">
                <span className="text-[9px] uppercase text-blue-400 block mb-2 font-black tracking-[0.2em]">Semantic Summary</span>
                <p className="text-sm italic leading-relaxed text-blue-100 font-medium">"{result.summary}"</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Activity Panel: Historical Ledger */}
      <div className="lg:col-span-7">
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl h-full min-h-[600px] border-t-slate-700/50">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
            <div className="flex items-center gap-3">
              <FiActivity className="text-blue-500 text-xl" />
              <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs">Historical Ledger</h3>
            </div>
            <span className="text-[10px] font-black px-3 py-1 bg-slate-700 rounded-full text-slate-300">
              {history.length} OBJECTS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/60 text-[9px] uppercase text-slate-500 font-black tracking-[0.2em]">
                <tr>
                  <th className="p-6 text-left">Identity</th>
                  <th className="p-6 text-left">Classification</th>
                  <th className="p-6 text-left">Status</th>
                  <th className="p-6 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {history.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-600/5 transition-all">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <FiFileText className="text-slate-500 group-hover:text-blue-400 transition-colors text-lg" />
                        <span className="text-xs font-bold max-w-[180px] truncate text-slate-300 group-hover:text-white transition-colors">
                          {item.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[9px] font-black px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md uppercase tracking-widest">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-6">
                      {item.isDuplicate ? (
                        <span className="text-amber-500/80 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 border border-amber-500/20 rounded-md bg-amber-500/5">Redundant</span>
                      ) : (
                        <span className="text-green-500/80 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 border border-green-500/20 rounded-md bg-green-500/5">Optimized</span>
                      )}
                    </td>
                    <td className="p-6 text-right text-[10px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                      {new Date(item.uploadDate).toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {history.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-slate-600">
                <FiActivity className="text-5xl mb-6 opacity-20" />
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30">Neural Ledger Empty</p>
                <p className="text-[10px] mt-2 font-medium opacity-20 italic">Awaiting initial data stream...</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardView() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      if (res.ok) {
        setFolders(data);
      }
    } catch (err) {
      console.error("Failed to load documents schema:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] animate-in fade-in duration-500">
        <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Scanning File System</p>
      </div>
    );
  }

  // Folder Files View
  if (selectedFolder) {
    return (
      <div className="flex-1 animate-in slide-in-from-right-8 duration-500 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedFolder(null)}
            className="p-3 bg-slate-800/40 hover:bg-slate-700/60 rounded-xl border border-slate-700/50 transition-colors text-slate-300 hover:text-white"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <FiFolder className="text-blue-500" />
              {selectedFolder.name}
            </h2>
            <p className="text-sm font-medium text-slate-400 mt-1">
              {selectedFolder.files.length} {selectedFolder.files.length === 1 ? 'Object' : 'Objects'} Detected
            </p>
          </div>
        </div>

        {selectedFolder.files.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
               <FiActivity className="text-4xl text-slate-600" />
             </div>
             <p className="text-lg font-black uppercase tracking-widest text-slate-400">Empty Directory</p>
             <p className="text-sm text-slate-500 mt-2 max-w-sm">No digital objects found within this classification vector.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedFolder.files.map((file, idx) => {
              const ext = file.name.split('.').pop().toLowerCase();
              const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);

              return (
                <a 
                  key={idx}
                  href={`/api/file?path=${encodeURIComponent(file.path)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="h-40 bg-slate-800/40 flex items-center justify-center border-b border-slate-800 group-hover:bg-blue-900/20 transition-colors relative">
                    {isImage ? (
                      <FiImage className="text-5xl text-slate-600 group-hover:text-blue-400/50 transition-colors relative z-10" />
                    ) : (
                      <FiFileText className="text-5xl text-slate-600 group-hover:text-blue-400/50 transition-colors relative z-10" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-bold text-slate-300 group-hover:text-blue-400 truncate transition-colors" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">
                       {ext} Document
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Folders Grid View
  return (
    <div className="flex-1 animate-in fade-in duration-500 pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
           <FiGrid className="text-blue-500" />
           System Directories
        </h2>
        <p className="text-sm font-medium text-slate-400 mt-1">
           {folders.length} active classification groups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {folders.map((folder, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedFolder(folder)}
            className="group text-left bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all hover:bg-blue-900/10 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.98]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800/80 group-hover:bg-blue-500/20 rounded-xl transition-colors">
                <FiFolder className="text-2xl text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-slate-800 text-slate-400 rounded-md">
                {folder.files.length} ITEMS
              </span>
            </div>
            <h3 className="text-lg font-black text-white truncate group-hover:text-blue-400 transition-colors">
              {folder.name}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 mt-1">
              Protected Path
            </p>
          </button>
        ))}
        {folders.length === 0 && (
           <div className="col-span-full py-20 text-center">
             <FiFolder className="text-6xl text-slate-800 mx-auto mb-4" />
             <p className="text-slate-400 font-bold uppercase tracking-widest">No Directories Initialized</p>
           </div>
        )}
      </div>
    </div>
  );
}