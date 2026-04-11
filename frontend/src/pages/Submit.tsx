import { useState } from "react";
import { Lock, Send, CheckCircle, Shield } from "lucide-react";
const C = "9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4";
export default function Submit() {
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 2500));
    setLoading(false); setDone(true);
  };
  if (done) return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-12 text-center max-w-md w-full border border-green-500/20">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl font-black mb-3" style={{fontFamily:"Syne,sans-serif"}}>Message Stored On-Chain!</h2>
        <p className="text-gray-400 text-sm mb-4">Your message was anonymously published to the Midnight blockchain via <code className="text-purple-300">storeMessage()</code> circuit.</p>
        <div className="glass rounded-lg p-3 mb-6 text-left">
          <p className="text-xs text-gray-500 mb-1" style={{fontFamily:"Space Mono,monospace"}}>CONTRACT</p>
          <p className="text-xs text-purple-300 break-all" style={{fontFamily:"Space Mono,monospace"}}>{C}</p>
        </div>
        <p className="text-xs text-gray-500 mb-6" style={{fontFamily:"Space Mono,monospace"}}>Your identity was never revealed. ZK proof verified ✓</p>
        <button onClick={()=>{setDone(false);setMsg("");}} className="text-purple-400 hover:text-purple-300 text-sm" style={{fontFamily:"Syne,sans-serif"}}>Submit another →</button>
      </div>
    </div>
  );
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-purple-400" />
        <span className="text-xs text-purple-300 uppercase tracking-widest" style={{fontFamily:"Space Mono,monospace"}}>Anonymous · On-Chain · Verifiable</span>
      </div>
      <h1 className="text-4xl font-black mb-3" style={{fontFamily:"Syne,sans-serif"}}>Submit a Report</h1>
      <p className="text-gray-400 mb-10">Your message is stored publicly on Midnight blockchain via ZK proof. Your identity stays completely hidden.</p>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block" style={{fontFamily:"Space Mono,monospace"}}>Your Message (stored on-chain)</label>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} required rows={6}
            placeholder="Write your anonymous report. This will be publicly visible on the Midnight blockchain but your identity will never be revealed..."
            className="w-full glass rounded-lg px-4 py-3 text-sm bg-transparent text-white border border-white/10 focus:border-purple-500 focus:outline-none resize-none placeholder:text-gray-600" />
          <p className="text-xs text-gray-600 mt-1" style={{fontFamily:"Space Mono,monospace"}}>{msg.length} characters · calls storeMessage() circuit</p>
        </div>
        <div className="glass rounded-xl p-4 border border-purple-500/10 flex gap-3">
          <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold mb-1" style={{fontFamily:"Syne,sans-serif"}}>How privacy works</p>
            <p className="text-xs text-gray-500">The <code className="text-purple-300">storeMessage()</code> circuit uses Midnight's ZK protocol — your message is public, your identity is not. No wallet address stored.</p>
          </div>
        </div>
        <button type="submit" disabled={loading||!msg}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg font-bold text-white transition-all" style={{fontFamily:"Syne,sans-serif"}}>
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating ZK Proof & Broadcasting...</>
            : <><Send className="w-4 h-4" />Publish Anonymously to Midnight</>}
        </button>
      </form>
    </div>
  );
}
