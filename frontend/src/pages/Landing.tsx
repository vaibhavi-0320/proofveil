import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Database, ShieldCheck, Zap, Glasses, Lock, CircuitBoard, Diamond, Link2, KeyRound } from "lucide-react";
import heroShield from "@/assets/hero-shield.png";
import obsidianCube from "@/assets/obsidian-cube.png";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";

/* Floating ZK particle component */
const ZKParticle = ({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) => (
  <div
    className="absolute pointer-events-none text-primary/20 font-headline font-medium select-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      fontSize: `${size}px`,
      animation: `floatParticle ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    Z
  </div>
);

const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  // Fewer, slower particles that barely drift
  const particles = [
    { delay: 0,   x: 8,  y: 12, size: 14, duration: 28 },
    { delay: 5,   x: 88, y: 18, size: 12, duration: 32 },
    { delay: 10,  x: 18, y: 65, size: 16, duration: 25 },
    { delay: 3,   x: 72, y: 78, size: 13, duration: 30 },
    { delay: 15,  x: 50, y: 8,  size: 11, duration: 35 },
    { delay: 8,   x: 92, y: 50, size: 15, duration: 22 },
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <main className="relative pt-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] glow-sphere pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] glow-sphere pointer-events-none" />

        {/* Floating ZK Particles */}
        {particles.map((p, i) => (
          <ZKParticle key={i} {...p} />
        ))}

        {/* Hero */}
        <section className="relative container mx-auto px-6 pt-20 pb-32 min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12">
          <div className={`w-full md:w-1/2 z-10 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-7xl font-headline font-medium leading-[1.1] tracking-tighter mb-6">
              Truth you can prove. <br />
              <span className="text-primary">Privacy you can trust.</span>
            </h1>
            <p className="text-lg md:text-xl font-body text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              The first decentralized platform for anonymous, verifiable data reporting. Powered by Midnight's zero-knowledge protocol.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 gradient-primary text-primary-foreground rounded-lg font-medium text-lg gradient-primary-glow hover:shadow-[0_0_45px_hsl(var(--primary-container)/0.5)] active:scale-95 transition-all"
              >
                Connect Wallet
              </Link>
              <Link
                to="/protocol"
                className="px-8 py-4 bg-surface-container-high text-on-surface rounded-lg font-medium text-lg ghost-border hover:bg-surface-container-highest transition-all"
              >
                Documentation
              </Link>
            </div>
          </div>

          <div className={`w-full md:w-1/2 flex justify-center items-center relative py-12 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] rotate-12 blur-3xl opacity-50" />
              <img
                src={heroShield}
                alt="Proofveil Shield"
              className="w-72 h-72 md:w-96 md:h-96 object-contain relative z-20 drop-shadow-[0_0_50px_hsl(var(--primary)/0.3)] transition-transform duration-1000 ease-out group-hover:scale-[1.02] animate-float"
                width={384}
                height={384}
              />
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-6 py-24 border-t border-outline-variant/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Database className="w-6 h-6 text-primary" />, label: "Total Volume", value: "4.2M+", sub: "Records Secured" },
              { icon: <ShieldCheck className="w-6 h-6 text-secondary" />, label: "Security Standard", value: "100%", sub: "Zero-Knowledge" },
              { icon: <Zap className="w-6 h-6 text-primary" />, label: "Network Speed", value: "250ms", sub: "Proof Generation" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-surface-container rounded-xl p-8 hover-lift ghost-border group animate-fade-in-up-delay-${i + 1}`}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
                <h3 className="label-terminal mb-2">{stat.label}</h3>
                <div className="text-4xl font-headline font-medium text-on-surface mb-1">
                  <AnimatedCounter target={stat.value} />
                </div>
                <p className="text-on-surface-variant font-body">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Section - Text left, Image right */}
        <section className="container mx-auto px-6 py-32">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-headline font-medium mb-8 leading-tight">
                Encryption without <br />
                <span className="text-secondary">compromise.</span>
              </h2>
              <div className="space-y-12">
                {[
                  {
                    icon: <Glasses className="w-5 h-5 text-primary" />,
                    title: "Anonymous Reporting",
                    desc: "Submit data without revealing your identity. Our protocol ensures your source remains cryptographically hidden.",
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-secondary" />,
                    title: "Immutable Verification",
                    desc: "Verified reports are etched onto the Midnight ledger, providing a permanent, untamperable record of truth.",
                  },
                  {
                    icon: <CircuitBoard className="w-5 h-5 text-primary" />,
                    title: "Zero-Knowledge Circuits",
                    desc: "Advanced ZK-SNARK circuits validate your data without exposing any underlying information to validators.",
                  },
                ].map((f) => (
                  <div key={f.title} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center ghost-border group-hover:bg-surface-container-high transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-medium mb-2">{f.title}</h4>
                      <p className="text-on-surface-variant font-body leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center items-center">
              <div style={{ perspective: "900px" }} className="w-full max-w-md mx-auto">
                <img
                  src={obsidianCube}
                  alt="Obsidian data block"
                  className="rounded-xl w-full animate-cube-rotate drop-shadow-[0_20px_60px_hsl(var(--primary)/0.2)]"
                  loading="lazy"
                  width={640}
                  height={640}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-surface-container-lowest py-24 border-y border-outline-variant/10">
          <div className="container mx-auto px-6 text-center">
            <p className="label-terminal mb-12">Built on the foundation of trust</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500">
              {[
                { icon: <KeyRound className="w-6 h-6" />, name: "MIDNIGHT" },
                { icon: <Diamond className="w-6 h-6" />, name: "CARDANO" },
                { icon: <Link2 className="w-6 h-6" />, name: "ZK-SYNC" },
                { icon: <Lock className="w-6 h-6" />, name: "OBSIDIAN" },
              ].map((partner) => (
                <div key={partner.name} className="text-2xl font-headline font-bold flex items-center gap-3 hover:scale-110 transition-transform text-on-surface">
                  <span className="text-primary">{partner.icon}</span> {partner.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-headline font-medium mb-6">Ready to secure your data?</h2>
            <p className="text-on-surface-variant mb-10 max-w-lg mx-auto">
              Join the new era of selective disclosure and regain control of your digital footprint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="px-8 py-3 gradient-primary text-primary-foreground font-medium rounded-lg gradient-primary-glow hover:brightness-110 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/protocol"
                className="px-8 py-3 ghost-border text-on-surface font-medium rounded-lg hover:bg-surface-container transition-colors"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
