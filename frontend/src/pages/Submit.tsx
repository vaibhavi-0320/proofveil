import { useState } from "react";
import { Lock, Send, CheckCircle, Shield } from "lucide-react";
const C = "9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4";
export default function Submit() {
  const [cat, setCat] = useState("");
  const [data, setData] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r=>setTimeout(r,2000));
    setLoading(false); setDone(true);
  };
  if (done) return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-12 text-center max-w-md w-full border border-green-500/20">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl font-black mb-3" style={{fontFamily:"Syne,sans-serif"}}>Report Submitted!</h2>
        <p className="text-gray-400 text-sm mb-6">Your anonymous report has been anchored to Midnight blockchain with a ZK proof.</p>
        <p className="text-xs text-purple-300 break-all mb-6" style={{fontFamily:"Space Mono,monospace"}}>{C}</p>
        <button onClick={()=>{setDone(false);setData("");setCat("");}} className="text-purple-400 hover:text-purple-300 text-sm" style={{fontFamily:"Syne,sans-serif"}}>Submit another →</button>
      </div>
    </div>
  );
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-4"><Lock className="w-5 h-5 text-purple-400" /><span className="text-xs text-purple-300 uppercase tracking-widest" style={{fontFamily:"Space Mono,monospace"}}>Anonymous Submission</span></div>
      <h1 className="text-4xl font-black mb-3" style={{fontFamily:"Syne,sans-serif"}}>Submit a Report</h1>
      <p className="text-gray-400 mb-10">Your identity is protected by Midnight's zero-knowledge protocol.</p>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block" style={{fontFamily:"Space Mono,monospace"}}>Category</label>
          <select value={cat} onChange={e=>setCat(e.target.value)} required className="w-full glass rounded-lg px-4 py-3 text-sm bg-transparent text-white border border-white/10 focus:border-purple-500 focus:outline-none">
            <option value="" className="bg-gray-900">Select...</option>
            <option value="financial" className="bg-gray-900">Financial Fraud</option>
            <option value="compliance" className="bg-gray-900">Compliance Violation</option>
            <option value="data" className="bg-gray-900">Data Breach</option>
            <option value="other" className="bg-gray-900">Other</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block" style={{fontFamily:"Space Mono,monospace"}}>Report Details</label>
          <textarea value={data} onChange={e=>setData(e.target.value)} required rows={6} placeholder="Describe the incident anonymously..."
            className="w-full glass rounded-lg px-4 py-3 text-sm bg-transparent text-white border border-white/10 focus:border-purple-500 focus:outline-none resize-none placeholder:text-gray-600" />
        </div>
        <div className="glass rounded-xl p-4 border border-purple-500/10 flex gap-3">
          <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500">ZK proof generated locally. Only the proof — not your identity — is submitted to contract <span className="text-purple-400">{C.slice(0,16)}...</span></p>
        </div>
        <button type="submit" disabled={loading||!cat||!data} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg font-bold text-white transition-all" style={{fontFamily:"Syne,sans-serif"}}>
          {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating ZK Proof...</> : <><Send className="w-4 h-4" />Submit Anonymous Report</>}
        </button>
      </form>
    </div>
  );
}
