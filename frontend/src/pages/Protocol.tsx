import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

const steps = [
  {
    num: "01",
    icon: "📄",
    title: "Submit Data",
    desc: "Initialize an encrypted transaction with your local data. Your sensitive information never leaves your machine in its raw state.",
    visual: "terminal",
  },
  {
    num: "02",
    icon: "🔐",
    title: "Midnight Encrypts",
    desc: "Midnight blockchain fragmentates and obfuscates your records using ZK-proofs, creating a mathematically verifiable yet private state.",
    visual: "shield",
  },
  {
    num: "03",
    icon: "👁️",
    title: "Selective Disclosure",
    desc: "Share only the cryptographic proof, never the raw data. You control who sees what, when, and for how long.",
    visual: "bars",
  },
];

const TerminalVisual = () => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "0x71...fE2                    READY",
    "ENC_PAYLOAD_START: 48 65 6c 6c 6f...",
    "LOC_BUFFER_MAP: 1024_BYTES",
    "PRV_KEY_SIG: VALIDATED",
    "SEED_NONCE: [REDACTED]",
    "--------------------------",
    "INITIALIZING HANDSHAKE...",
  ];

  useEffect(() => {
    allLines.forEach((line, i) => {
      setTimeout(() => setLines((prev) => [...prev, line]), i * 400);
    });
  }, []);

  return (
    <div className="h-40 w-full rounded-lg overflow-hidden ghost-border bg-surface-container-lowest relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="p-4 font-mono text-[10px] text-primary/60 space-y-1 overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            {line.includes("VALIDATED") ? (
              <span className="text-primary">{line}</span>
            ) : line.includes("HANDSHAKE") ? (
              <span className="text-secondary">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ShieldVisual = () => (
  <div className="h-40 w-full rounded-lg overflow-hidden ghost-border bg-surface-container-lowest relative flex items-center justify-center">
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3),transparent)]" />
    </div>
    <div className="relative w-24 h-24 border border-primary/40 rounded-full animate-spin-slow flex items-center justify-center">
      <div className="w-16 h-16 border border-secondary/40 rounded-full animate-spin-slower flex items-center justify-center">
        <span className="text-2xl animate-glow-pulse">🛡️</span>
      </div>
    </div>
  </div>
);

const BarsVisual = () => (
  <div className="h-40 w-full rounded-lg overflow-hidden ghost-border bg-surface-container-lowest relative flex flex-col justify-center px-6 gap-3">
    {[
      { active: true, width: "w-3/4" },
      { active: false, width: "w-1/2" },
      { active: true, width: "w-2/3" },
    ].map((bar, i) => (
      <div key={i} className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
        <div className={`w-2 h-2 rounded-full ${bar.active ? "bg-secondary animate-pulse" : "bg-outline"}`} />
        <div className={`h-2 ${bar.width} bg-outline-variant/40 rounded-full relative overflow-hidden`}>
          {bar.active && (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent animate-[shimmer_2s_infinite]" />
          )}
        </div>
      </div>
    ))}
  </div>
);

const Protocol = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen">
        <header className="max-w-4xl mx-auto text-center mb-24 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full ghost-border bg-surface-container-low mb-6">
            <span className="text-sm mr-2">✅</span>
            <span className="text-xs font-label tracking-[0.05em] uppercase text-on-surface-variant">
              Zero-Knowledge Architecture
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-tight">
            The Protocol <br />
            <span className="text-primary italic">Architecture</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Discover the underlying engineering that powers Proofveil's midnight-tier privacy. Securely fragment data into non-custodial proofs.
          </p>
        </header>

        {/* Flow Steps */}
        <div className="relative max-w-7xl mx-auto py-12">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent hidden lg:block -translate-y-1/2" />
          
          {/* Step indicators */}
          <div className="flex justify-center gap-4 mb-8 lg:hidden">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeStep === i ? "bg-primary scale-125" : "bg-outline-variant"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`group relative bg-surface-container ghost-border p-8 rounded-xl transition-all duration-500 cursor-pointer hover-lift ${
                  activeStep === i
                    ? "ring-2 ring-primary/40 shadow-[0_0_60px_hsl(var(--primary)/0.1)]"
                    : "hover:border-primary/20"
                }`}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-surface-container-lowest ghost-border rounded-lg flex items-center justify-center text-primary font-medium text-lg">
                  {step.num}
                </div>
                <div className="mb-10 flex flex-col items-start">
                  <div className={`w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 ${activeStep === i ? "scale-110" : "group-hover:scale-110"}`}>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-on-surface mb-4">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
                {step.visual === "terminal" && <TerminalVisual />}
                {step.visual === "shield" && <ShieldVisual />}
                {step.visual === "bars" && <BarsVisual />}
              </div>
            ))}
          </div>
        </div>

        {/* Cryptography Section */}
        <section className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-4xl font-medium tracking-tight">
              Built on the bedrock of <span className="text-secondary">Cryptography</span>.
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Our architecture utilizes the <strong className="text-on-surface">Midnight Network</strong>, a protection-first blockchain. By decoupling the execution of proofs from the main chain, we ensure that your identity remains anonymous while your claims remain indisputable.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Zero-Knowledge Proofs (ZKP)", desc: "Prove validity without revealing the secret itself." },
                { title: "Multi-Party Computation", desc: "Securely compute values while keeping inputs private." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4 group">
                  <span className="text-secondary mt-1 group-hover:scale-125 transition-transform">✅</span>
                  <div>
                    <p className="font-medium text-on-surface">{item.title}</p>
                    <p className="text-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ghost-border group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-container to-secondary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated network visualization */}
              <div className="relative w-full h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/60 rounded-full animate-pulse"
                    style={{
                      left: `${15 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 30}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={i}
                      x1={`${15 + (i % 4) * 25}%`}
                      y1={`${20 + Math.floor(i / 4) * 30}%`}
                      x2={`${15 + ((i + 1) % 4) * 25}%`}
                      y2={`${20 + Math.floor((i + 1) / 4) * 30}%`}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-xl ghost-border">
              <p className="text-sm font-mono text-primary mb-2">NETWORK_STATUS: OPTIMIZED</p>
              <p className="text-on-surface text-sm">Real-time cryptographic verification active across 432 fragment nodes.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-40 text-center py-20 border-t border-outline-variant/10">
          <h2 className="text-3xl font-medium mb-6">Ready to secure your data?</h2>
          <p className="text-on-surface-variant mb-10 max-w-lg mx-auto">
            Join the new era of selective disclosure and regain control of your digital footprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/submit" className="px-8 py-3 gradient-primary text-primary-foreground font-medium rounded-lg gradient-primary-glow transition-all">
              Get Started
            </a>
            <a href="/protocol" className="px-8 py-3 ghost-border text-on-surface font-medium rounded-lg hover:bg-surface-container transition-colors">
              Read Documentation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Protocol;
