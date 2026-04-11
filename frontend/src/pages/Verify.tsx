import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import { toast } from "sonner";
import { Fingerprint, BarChart3, ShieldCheck, ShieldX, Loader2 } from "lucide-react";

const Verify = () => {
  const [hash, setHash] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<null | "valid" | "invalid">(null);

  const handleAudit = async () => {
    if (!hash.trim()) {
      toast.error("Please enter a record hash");
      return;
    }
    setVerifying(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2500));
    setVerifying(false);
    // Simulate: hashes starting with "0x" are valid
    const isValid = hash.trim().startsWith("0x");
    setResult(isValid ? "valid" : "invalid");
    if (isValid) toast.success("ZK Proof verified successfully");
    else toast.error("Proof not found on ledger");
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
              Verify the zero-knowledge validity of any record hash within the Proofveil ecosystem.
            </p>
          </header>

          {/* Audit Search */}
          <div className="bg-surface-container p-8 rounded-xl ghost-border shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold">Enter Record Hash</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={hash}
                    onChange={(e) => { setHash(e.target.value); setResult(null); }}
                    className="w-full bg-surface-container-lowest ring-[0.5px] ring-outline-variant/40 rounded-lg px-4 py-4 text-primary font-mono focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 border-0"
                    placeholder="0x72a...d3e"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Fingerprint className="w-5 h-5 text-outline/40" />
                  </div>
                </div>
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
              <span className="text-sm font-medium tracking-tight">Scanning Midnight Network...</span>
            </div>
          )}

          {/* Result Grid */}
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
              {/* Valid Card */}
              <div className={`bg-surface-container rounded-xl p-6 relative overflow-hidden transition-all ${result === "valid" ? "ghost-border border-secondary/20 opacity-100" : "opacity-40 ghost-border"}`}>
                <div className="absolute top-0 right-0 p-4">
                  <ShieldCheck className={`w-8 h-8 ${result === "valid" ? "text-secondary" : "text-outline/30"}`} />
                </div>
                <div className="space-y-6">
                  <header>
                    <h3 className={`font-medium text-lg ${result === "valid" ? "text-secondary" : "text-on-surface-variant"}`}>ZK Proof Valid</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Verified on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                  </header>
                  {result === "valid" && (
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-tighter text-on-surface-variant/60">Proof Hash Reference</label>
                      <div className="bg-surface-container-lowest p-3 rounded-lg ghost-border">
                        <code className="text-[10px] break-all text-on-surface-variant font-mono leading-relaxed">
                          z7k_92f1b40e9d3c5a7182740bcdef9210485721a9c3d4e5f6a7b8c9d0e1f2
                        </code>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-secondary/5 blur-2xl rounded-full" />
              </div>

              {/* Error Card */}
              <div className={`bg-surface-container-low rounded-xl p-6 transition-all ${result === "invalid" ? "ghost-border border-error/30 opacity-100" : "opacity-40 ghost-border"}`}>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-error/10">
                      <ShieldX className="w-5 h-5 text-error" />
                    </div>
                    <span className="text-[10px] text-error/60 font-mono">CODE: 404_NF</span>
                  </div>
                  <div className="mt-8">
                    <h4 className="text-on-surface font-medium">Proof not found</h4>
                    <p className="text-xs text-on-surface-variant/60 mt-1">The provided hash does not correspond to a valid commitment on the ledger.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Technical Specs */}
          <div className="grid grid-cols-3 gap-8 py-8 border-t border-outline-variant/20">
            <div className="space-y-1">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">Network</span>
              <span className="text-sm font-medium text-on-surface">Midnight Testnet V4</span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">Efficiency</span>
              <span className="text-sm font-medium text-on-surface">99.98% Uptime</span>
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
