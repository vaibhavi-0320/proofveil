import { Shield, FileCheck, CheckCircle, Clock, TrendingUp } from "lucide-react";
const C = "9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4";
const reports = [
  {id:"0x9a3f...",cat:"Financial",status:"Verified",time:"2h ago"},
  {id:"0x7b2e...",cat:"Compliance",status:"Verified",time:"5h ago"},
  {id:"0x4d1c...",cat:"Data Breach",status:"Pending",time:"8h ago"},
  {id:"0x2a8f...",cat:"Fraud",status:"Verified",time:"1d ago"},
];
export default function Dashboard() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-2" style={{fontFamily:"Syne,sans-serif"}}>Dashboard</h1>
      <p className="text-gray-400 text-sm mb-10" style={{fontFamily:"Space Mono,monospace"}}>Live · Midnight Preprod Network</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[{icon:FileCheck,l:"Total Reports",v:"47",c:"text-purple-400"},{icon:CheckCircle,l:"Verified",v:"41",c:"text-green-400"},{icon:Clock,l:"Pending",v:"6",c:"text-yellow-400"},{icon:TrendingUp,l:"This Week",v:"12",c:"text-blue-400"}]
          .map(({icon:I,l,v,c})=>(
          <div key={l} className="glass rounded-xl p-5">
            <I className={`w-5 h-5 ${c} mb-3`} />
            <p className="text-3xl font-black mb-1" style={{fontFamily:"Syne,sans-serif"}}>{v}</p>
            <p className="text-xs text-gray-500" style={{fontFamily:"Space Mono,monospace"}}>{l}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-6 mb-8 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-sm" style={{fontFamily:"Syne,sans-serif"}}>Smart Contract</span>
          <span className="ml-auto flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-xs text-green-400">Active</span></span>
        </div>
        <p className="text-xs text-purple-300 break-all" style={{fontFamily:"Space Mono,monospace"}}>{C}</p>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5"><h2 className="font-bold" style={{fontFamily:"Syne,sans-serif"}}>Recent Reports</h2></div>
        {reports.map(r=>(
          <div key={r.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/3 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-400 w-24" style={{fontFamily:"Space Mono,monospace"}}>{r.id}</span>
            <span className="text-sm flex-1" style={{fontFamily:"Syne,sans-serif"}}>{r.cat}</span>
            <span className="text-xs text-gray-500" style={{fontFamily:"Space Mono,monospace"}}>{r.time}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${r.status==="Verified"?"bg-green-500/10 text-green-400":"bg-yellow-500/10 text-yellow-400"}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
