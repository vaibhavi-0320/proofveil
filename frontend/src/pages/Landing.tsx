import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Zap, ArrowRight } from "lucide-react";
const C = "9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4";
export default function Landing() {
  return (
    <div className="relative z-10">
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 text-xs text-purple-300" style={{fontFamily:"Space Mono,monospace"}}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Deployed on Midnight Network · Preview
        </div>
        <h1 className="text-6xl md:text-8xl font-black leading-none mb-6" style={{fontFamily:"Syne,sans-serif"}}>
          <span className="block text-white">Truth you</span>
          <span className="block" style={{background:"linear-gradient(90deg,#a78bfa,#60a5fa,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>can prove.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">The first decentralized platform for anonymous, verifiable data reporting. Powered by Midnight's zero-knowledge protocol.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/submit" className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-white transition-all" style={{fontFamily:"Syne,sans-serif"}}>
            Submit Report <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 px-8 py-4 glass hover:bg-white/5 rounded-lg font-bold text-gray-300 transition-all" style={{fontFamily:"Syne,sans-serif"}}>
            View Dashboard
          </Link>
        </div>
        <div className="mt-16 glass rounded-xl p-4 max-w-xl w-full">
          <p className="text-xs text-gray-500 mb-1" style={{fontFamily:"Space Mono,monospace"}}>DEPLOYED CONTRACT · MIDNIGHT PREPROD</p>
          <p className="text-xs text-purple-300 break-all" style={{fontFamily:"Space Mono,monospace"}}>{C}</p>
        </div>
      </section>
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[{icon:Lock,t:"Zero-Knowledge Proofs",d:"Your identity is never revealed. ZK protocol proves your data is valid without exposing who you are.",c:"text-purple-400"},
            {icon:Eye,t:"Anonymous Reporting",d:"Submit sensitive data with cryptographic guarantees. No wallet address, no identity.",c:"text-blue-400"},
            {icon:Zap,t:"On-Chain Verification",d:"Every report is anchored to Midnight blockchain. Immutable, auditable, tamper-proof.",c:"text-green-400"}
          ].map(({icon:I,t,d,c})=>(
            <div key={t} className="glass rounded-2xl p-8 hover:bg-white/5 transition-all">
              <I className={`w-8 h-8 ${c} mb-4`} />
              <h3 className="font-bold text-xl mb-3" style={{fontFamily:"Syne,sans-serif"}}>{t}</h3>
              <p className="text-gray-400 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
