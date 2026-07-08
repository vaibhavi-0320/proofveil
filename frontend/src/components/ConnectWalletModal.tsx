import { useState, useEffect } from "react";
import { X, ChevronRight, Wallet, ShieldCheck, ExternalLink, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  connectWallet,
  getInjectedWallet,
  WalletConnectionRejectedError,
  WalletNotFoundError,
} from "@/midnight/wallet";

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

type State = "idle" | "connecting" | "connected" | "no-extension" | "error";

const ConnectWalletModal = ({ open, onClose, onConnect }: ConnectWalletModalProps) => {
  const [state, setState] = useState<State>("idle");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Detect the Midnight Lace wallet extension on mount
  const [laceInstalled, setLaceInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    if (!open) return;
    // Give the extension a moment to inject itself
    const timeout = setTimeout(() => {
      setLaceInstalled(!!getInjectedWallet());
    }, 300);
    return () => clearTimeout(timeout);
  }, [open]);

  if (!open) return null;

  const handleConnect = async () => {
    if (!getInjectedWallet()) {
      setState("no-extension");
      return;
    }

    setState("connecting");
    setErrorMsg("");

    try {
      const { state: walletState } = await connectWallet();
      const addr = walletState.address;
      const shortAddr = addr.length > 12 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;

      setAddress(shortAddr);
      setState("connected");
      onConnect(addr);
    } catch (err: unknown) {
      if (err instanceof WalletNotFoundError) {
        setState("no-extension");
        return;
      }
      const message =
        err instanceof WalletConnectionRejectedError || err instanceof Error
          ? err.message
          : "Connection was rejected. Please try again.";
      setErrorMsg(message.slice(0, 120));
      setState("error");
    }
  };

  const handleProceed = () => {
    onClose();
    navigate("/dashboard");
  };

  const handleDisconnect = () => {
    setState("idle");
    setAddress("");
    onConnect("");
  };

  const handleRetry = () => {
    setState("idle");
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* ─── CONNECTED STATE ─── */}
        {state === "connected" ? (
          <div className="glass-panel ghost-border rounded-xl shadow-[0px_32px_64px_rgba(0,0,0,0.5)] overflow-hidden relative">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
            <div className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-secondary/10 ghost-border flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-headline font-medium tracking-tight text-on-surface">
                    Lace Wallet Connected
                  </h2>
                  <p className="text-on-surface-variant text-sm">
                    Identity linked via Midnight's dApp connector
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                  <div className="col-span-2 bg-surface-container-lowest/50 p-4 rounded-lg ghost-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium font-label text-on-surface font-mono">
                        {address}
                      </span>
                    </div>
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-label">
                      Active
                    </span>
                  </div>
                  <div className="col-span-2 bg-surface-container-lowest/50 p-4 rounded-lg ghost-border text-left">
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-label mb-1">
                      Network
                    </span>
                    <span className="block text-lg font-medium text-on-surface">
                      Midnight Preprod
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full py-4 px-6 gradient-primary text-primary-foreground font-headline font-medium rounded-lg gradient-primary-glow hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Proceed to Dashboard
                </button>
                <button
                  onClick={handleDisconnect}
                  className="text-on-surface-variant text-sm hover:text-on-surface transition-colors font-label"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ─── CONNECT / ERROR / NO-EXTENSION STATES ─── */
          <div className="glass-panel ghost-border rounded-xl shadow-[0px_24px_48px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-on-surface font-headline font-medium tracking-tighter text-xl">
                    Proofveil
                  </span>
                  <span className="text-[10px] bg-secondary/10 text-secondary ghost-border px-2 py-0.5 rounded-full font-label tracking-widest uppercase">
                    Midnight
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-headline font-medium tracking-tight text-on-surface">
                    Connect Your Wallet
                  </h1>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Proofveil uses the Midnight Lace Wallet to authenticate your identity and sign
                    zero-knowledge proofs on the Midnight Network.
                  </p>
                </div>

                {/* No extension warning */}
                {(state === "no-extension" || laceInstalled === false) && (
                  <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-300">
                        Lace Wallet not detected
                      </p>
                      <p className="text-xs text-orange-300/70 mt-1">
                        Please install the Lace browser extension and refresh this page.
                      </p>
                      <a
                        href="https://www.lace.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-orange-400 hover:text-orange-300 underline transition-colors"
                      >
                        Get Lace Wallet
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {state === "error" && (
                  <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Connection failed</p>
                      {errorMsg && (
                        <p className="text-xs text-destructive/70 mt-1">{errorMsg}</p>
                      )}
                      <button
                        onClick={handleRetry}
                        className="mt-2 text-xs text-destructive hover:text-destructive/70 underline transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                )}

                {/* Lace connect button */}
                <div className="space-y-4">
                  <button
                    id="connect-lace-wallet-btn"
                    onClick={handleConnect}
                    disabled={state === "connecting"}
                    className="w-full group relative flex items-center justify-between p-4 bg-surface-container ghost-border rounded-lg hover:border-primary/60 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-4">
                      {/* Lace logo */}
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center ghost-border flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 32 32">
                          <path
                            d="M16 4L6 9.5V22.5L16 28L26 22.5V9.5L16 4Z"
                            stroke="url(#lace_grad)"
                            strokeWidth="2"
                          />
                          <path
                            d="M16 10L10 13.5V18.5L16 22L22 18.5V13.5L16 10Z"
                            fill="url(#lace_grad)"
                          />
                          <defs>
                            <linearGradient
                              id="lace_grad"
                              x1="6"
                              x2="26"
                              y1="4"
                              y2="28"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="hsl(var(--primary))" />
                              <stop offset="1" stopColor="hsl(var(--secondary))" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="block font-headline font-medium text-on-surface">
                          Lace Wallet
                        </span>
                        <span className="block text-xs text-on-surface-variant mt-0.5">
                          Midnight Network
                        </span>
                      </div>
                    </div>
                    {state === "connecting" ? (
                      <div className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>

                  {state === "connecting" && (
                    <div className="flex items-center gap-3 px-4 py-2 opacity-60 animate-fade-in-up text-xs font-label tracking-wide text-on-surface-variant">
                      Waiting for Lace Wallet approval…
                    </div>
                  )}

                  <p className="text-center text-[11px] text-on-surface-variant/60 leading-relaxed">
                    By connecting you agree to Proofveil's{" "}
                    <a href="#" className="underline hover:text-on-surface transition-colors">
                      Terms of Service
                    </a>
                    . No transaction fees are charged for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Encrypted badge */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full ghost-border shadow-xl backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
            End-to-End Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
