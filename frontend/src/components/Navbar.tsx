import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [wallet, setWallet] = useState(localStorage.getItem("proofveil_wallet") || "");
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const connect = () => {
    const addr = input.trim() || "mn_addr_preview1demo";
    localStorage.setItem("proofveil_wallet", addr);
    setWallet(addr);
    setShowModal(false);
  };

  return (
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 2rem",background:"#1a1a2e",color:"white"}}>
      <Link to="/" style={{color:"white",textDecoration:"none",fontSize:"1.5rem",fontWeight:"bold"}}>🛡️ ProofVeil</Link>
      <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
        <Link to="/submit" style={{color:"#a78bfa",textDecoration:"none"}}>Submit</Link>
        <Link to="/verify" style={{color:"#a78bfa",textDecoration:"none"}}>Verify</Link>
        <Link to="/dashboard" style={{color:"#a78bfa",textDecoration:"none"}}>Dashboard</Link>
        {wallet ? (
          <span style={{background:"#7c3aed",padding:"0.5rem 1rem",borderRadius:"8px",fontSize:"0.8rem"}}>
            {wallet.slice(0,20)}...
          </span>
        ) : (
          <button onClick={() => setShowModal(true)} style={{background:"#7c3aed",color:"white",border:"none",padding:"0.5rem 1rem",borderRadius:"8px",cursor:"pointer"}}>
            Connect Wallet
          </button>
        )}
      </div>
      {showModal && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#1a1a2e",padding:"2rem",borderRadius:"12px",border:"1px solid #7c3aed",minWidth:"400px"}}>
            <h2 style={{color:"white",marginBottom:"1rem"}}>Connect Midnight Wallet</h2>
            <input
              placeholder="Enter your mn_addr_preview1... address"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{width:"100%",padding:"0.75rem",borderRadius:"8px",border:"1px solid #7c3aed",background:"#0f0f23",color:"white",marginBottom:"1rem",boxSizing:"border-box"}}
            />
            <div style={{display:"flex",gap:"1rem"}}>
              <button onClick={connect} style={{flex:1,background:"#7c3aed",color:"white",border:"none",padding:"0.75rem",borderRadius:"8px",cursor:"pointer"}}>Connect</button>
              <button onClick={() => setShowModal(false)} style={{flex:1,background:"#374151",color:"white",border:"none",padding:"0.75rem",borderRadius:"8px",cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
