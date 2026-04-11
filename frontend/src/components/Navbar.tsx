import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
export default function Navbar() {
  const loc = useLocation();
  const a = (p: string) => loc.pathname === p ? "text-purple-400 border-b border-purple-500 pb-0.5" : "text-gray-400 hover:text-white transition-colors";
  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-5 border-b border-white/5">
      <Link to="/" className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-purple-400" />
        <span style={{fontFamily:"Syne,sans-serif"}} className="font-bold text-lg">proof<span className="text-purple-400">veil</span></span>
      </Link>
      <div className="flex items-center gap-8 text-sm" style={{fontFamily:"Space Mono,monospace"}}>
        <Link to="/" className={a("/")}>home</Link>
        <Link to="/dashboard" className={a("/dashboard")}>dashboard</Link>
        <Link to="/submit" className={a("/submit")}>submit</Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-gray-500">preprod live</span>
      </div>
    </nav>
  );
}
