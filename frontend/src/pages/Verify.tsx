import { useEffect, useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import { useWalletGate } from "@/hooks/useWalletGate";
import { toast } from "sonner";
import { Fingerprint, BarChart3, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { connectWallet } from "@/midnight/wallet";
import { connectContract, CONTRACT_ADDRESS } from "@/midnight/contract";
import { loadProofRecords, type ProofRecord } from "@/types/credential";

interface VerificationResult {
  hash: string;
  status: string;
  block: string;
  timestamp: string;
  network: string;
  contract: string;
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

const Verify = () => {
  useWalletGate();
  const [records, setRecords] = useState<ProofRecord[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [documentHex, setDocumentHex] = useState("");
  const [saltHex, setSaltHex] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<null | "valid" | "invalid">(null);
  const [verificationData, setVerificationData] = useState<VerificationResult | null>(null);

  useEffect(() => {
    setRecords(loadProofRecords());
  }, []);

  const selectRecord = (label: string) => {
    setSelectedLabel(label);
    const record = records.find((r) => r.label === label);
    if (record) {
      setDocumentHex(record.document);
      setSaltHex(record.salt);
    }
    setResult(null);
  };

  const handleAudit = async () => {
    if (!documentHex.trim() || !saltHex.trim()) {
      toast.error("Select a saved credential, or paste a document + salt hash pair");
      return;
    }
    setVerifying(true);
    setResult(null);
    setVerificationData(null);

    try {
      const wallet = await connectWallet();
      const contract = await connectContract(wallet);
      const tx = await contract.verifyCredential(fromHex(documentHex.trim()), fromHex(saltHex.trim()));

      setResult("valid");
      setVerificationData({
        hash: `0x${documentHex.trim()}`,
        status: "VERIFIED",
        block: String(tx.blockHeight),
        timestamp: new Date().toLocaleString(),
        network: "Midnight Preprod",
        contract: CONTRACT_ADDRESS ?? "not deployed",
      });
      toast.success("ZK proof verified — credential matches an on-chain commitment", {
        description: `Transaction: ${tx.txId}`,
      });
    } catch (error) {
      setResult("invalid");
      toast.error("Credential not found", {
        description: error instanceof Error ? error.message : "This document/salt pair has no matching on-chain commitment.",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <AppSidebar />
      <main className="lg:ml-16 min-h-screen pt-16 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-2xl z-10 space-y-12">
          {/* Hero Header */}
          <header className="text-center space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ghost-border bg-surface-container-low">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_hsl(var(--secondary))]" />
              <span className="text-[10px] uppercase tracking-[0.1em] text-on-surface-variant font-medium">Midnight Network Oracle</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-on-surface font-headline">Audit Integrity</h1>
            <p className="text-on-surface-variant text-lg max-w-md mx-auto">
              Prove a credential is valid without revealing it. Verifying re-derives the same commitment
              from your document and salt and checks it on-chain — the document itself is never disclosed.
            </p>
          </header>

          {/* Audit Search */}
          <div className="bg-surface-container p-8 rounded-xl ghost-border shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-6">
              {records.length > 0 && (
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold">Your Saved Credentials</label>
                  <select
                    value={selectedLabel}
                    onChange={(e) => selectRecord(e.target.value)}
                    className="w-full bg-surface-container-lowest ring-1 ring-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:ring-primary focus:ring-2 transition-all border-0"
                  >
                    <option value="">Select a credential you submitted...</option>
                    {records.map((r) => (
                      <option key={r.label + r.timestamp} value={r.label}>
                        {r.label} — {new Date(r.timestamp).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold">Document Hash (hex)</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={documentHex}
                    onChange={(e) => { setDocumentHex(e.target.value); setResult(null); }}
                    className="w-full bg-surface-container-lowest ring-[0.5px] ring-outline-variant/40 rounded-lg px-4 py-4 text-primary font-mono focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 border-0"
                    placeholder="64 hex characters"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Fingerprint className="w-5 h-5 text-outline/40" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold">Salt (hex)</label>
                <input
                  type="text"
                  value={saltHex}
                  onChange={(e) => { setSaltHex(e.target.value); setResult(null); }}
                  className="w-full bg-surface-container-lowest ring-[0.5px] ring-outline-variant/40 rounded-lg px-4 py-4 text-primary font-mono focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 border-0"
                  placeholder="64 hex characters"
                />
              </div>

              <button
                onClick={handleAudit}
                disabled={verifying}
                className="w-full gradient-primary py-4 rounded-lg text-primary-foreground font-medium text-lg flex items-center justify-center gap-2 gradient-primary-glow hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <BarChart3 className="w-5 h-5" />
                Audit Integrity
              </button>
            </div>
          </div>

          {/* Loading State */}
          {verifying && (
            <div className="flex items-center justify-center gap-3 py-4 text-on-surface-variant/60 animate-fade-in-up">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm font-medium tracking-tight">Generating proof and querying Midnight Network...</span>
            </div>
          )}

          {/* Result Grid */}
          {result && (
            <>
              {result === "valid" && verificationData ? (
                <div className="bg-surface-container rounded-xl p-8 ghost-border border-secondary/20 animate-fade-in-up">
                  <div className="flex items-start gap-4 mb-8">
                    <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold text-secondary">ZK Proof Valid</h3>
                      <p className="text-sm text-on-surface-variant mt-1">Record verified on ledger</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Hash */}
                    <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Hash</p>
                      <code className="text-sm font-mono text-primary break-all">{verificationData.hash}</code>
                    </div>

                    {/* Status, Block, Timestamp */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Status</p>
                        <p className="text-sm font-semibold text-secondary">{verificationData.status}</p>
                      </div>
                      <div className="bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Block</p>
                        <p className="text-sm font-mono text-on-surface font-semibold">{verificationData.block}</p>
                      </div>
                      <div className="bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Timestamp</p>
                        <p className="text-sm font-mono text-on-surface text-right">{verificationData.timestamp}</p>
                      </div>
                    </div>

                    {/* Network and Contract */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Network</p>
                        <p className="text-sm font-medium text-on-surface">{verificationData.network}</p>
                      </div>
                      <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2">Contract Address</p>
                        <code className="text-sm font-mono text-primary break-all">{verificationData.contract}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ) : result === "invalid" ? (
                <div className="bg-surface-container-low rounded-xl p-8 ghost-border border-error/30 animate-fade-in-up">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-2 rounded-lg bg-error/10">
                      <ShieldX className="w-6 h-6 text-error" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-error">Proof Not Found</h3>
                      <p className="text-sm text-on-surface-variant mt-1">CODE: 404_NF</p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant">This document/salt pair does not correspond to a valid commitment on the ledger.</p>
                </div>
              ) : null}
            </>
          )}

          {/* Bottom Technical Specs */}
          <div className="grid grid-cols-3 gap-8 py-8 border-t border-outline-variant/20">
            <div className="space-y-1">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">Network</span>
              <span className="text-sm font-medium text-on-surface">Midnight Preprod</span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">Circuit</span>
              <span className="text-sm font-medium text-on-surface">verifyCredential</span>
            </div>
            <div className="space-y-1 text-right">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">Protocol</span>
              <span className="text-sm font-medium text-on-surface">PLONK ZK-SNARK</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Verify;
