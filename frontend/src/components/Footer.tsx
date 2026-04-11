export default function Footer() {
  const contractAddress = "8d847cc316c8a4ac838da90f21d363aed24915cb2a9e607c1fd2741bd8d61dad";
  const explorerUrl = `https://explorer.midnight-ntwrk.preview.midnight.network/contracts/${contractAddress}`;
  
  return (
    <footer style={{background:"#1a1a2e",color:"#9ca3af",padding:"2rem",textAlign:"center",borderTop:"1px solid #374151",marginTop:"auto"}}>
      <div style={{display:"flex",justifyContent:"center",gap:"2rem",marginBottom:"1rem",flexWrap:"wrap"}}>
        <a href="https://github.com/vaibhavi-0320/proofveil" target="_blank" rel="noopener noreferrer" style={{color:"#a78bfa",textDecoration:"none"}}>GitHub</a>
        <a href="https://docs.midnight.network" target="_blank" rel="noopener noreferrer" style={{color:"#a78bfa",textDecoration:"none"}}>Documentation</a>
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{color:"#a78bfa",textDecoration:"none"}}>Smart Contract</a>
      </div>
      <p style={{margin:0,fontSize:"0.875rem"}}>© 2026 ProofVeil — Built on Midnight Blockchain | PREVIEW TESTNET</p>
      <p style={{margin:"0.5rem 0 0",fontSize:"0.75rem"}}>Contract: {contractAddress.slice(0,20)}...</p>
    </footer>
  );
}
