import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import { useWalletGate } from "@/hooks/useWalletGate";
import { SkeletonCard, SkeletonRow } from "@/components/SkeletonLoader";
import AnimatedCounter from "@/components/AnimatedCounter";
import { toast } from "sonner";

interface Record {
  filename: string;
  hash: string;
  timestamp: string;
  status: string;
}

const grants = [
  { icon: "🏥", name: "St. Jude Research", detail: "Read-only Genomic access • Expires in 2h" },
  { icon: "🏦", name: "Chase Private Client", detail: "Financial proof validation • Perpetual" },
];

const Dashboard = () => {
  useWalletGate();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("proofveil_records");
      if (stored) {
        try {
          setRecords(JSON.parse(stored));
        } catch (e) {
          setRecords([]);
        }
      }
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const truncateHash = (hash: string): string => {
    if (hash.length <= 16) return hash;
    return hash.slice(0, 10) + "..." + hash.slice(-6);
  };

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast.success("Hash copied to clipboard");
  };

  const metrics = [
    { label: "Your Records", value: String(records.length), icon: "🛡️", trend: "Secured on Midnight Preview", trendColor: "text-secondary" },
    { label: "Verified Hashes", value: String(records.length), icon: "✅", trend: "SHA-256 cryptographic proof", trendColor: "text-secondary" },
    { label: "Network", value: "Preview", icon: "⚙️", trend: "Midnight Blockchain", trendColor: "text-primary" },
    { label: "Contract", value: "Live", icon: "🔑", trend: "9308246b...865a4", trendColor: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <AppSidebar />
      
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <main className="lg:ml-64 pt-20 p-8 min-h-screen">
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight mb-2 animate-fade-in-up">Network Overview</h1>
            <p className="text-on-surface-variant max-w-lg animate-fade-in-up-delay-1">
              {records.length > 0
                ? `${records.length} Records Secured on Midnight Preprod`
                : "No records submitted yet. Go to Submit to secure your first record."
              }
            </p>
          </div>
          <div className="text-right animate-fade-in-up-delay-2">
            <div className="label-terminal mb-1">System Health</div>
            <div className="flex items-center gap-2 text-secondary font-medium">
              <span className="animate-pulse">⚡</span> Operational
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`bg-surface-container p-6 rounded-xl ghost-border relative overflow-hidden group hover-lift animate-fade-in-up-delay-${Math.min(i + 1, 4)}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-4xl">
                    {m.icon}
                  </div>
                  <div className="text-on-surface-variant text-sm font-medium mb-4">{m.label}</div>
                  <div className="text-3xl font-medium">
                    <AnimatedCounter target={m.value} />
                  </div>
                  <div className={`mt-4 flex items-center gap-1 ${m.trendColor} text-xs`}>
                    {m.trend}
                  </div>
                </div>
              ))}
        </div>

        {/* Records Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {loading ? (
              <div className="bg-surface p-1 rounded-xl ghost-border overflow-hidden shadow-2xl">
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-xl font-medium">Secured Records</h2>
                </div>
                <div className="p-6">
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </div>
              </div>
            ) : records.length === 0 ? (
              <div className="bg-surface-container rounded-xl ghost-border p-12 flex flex-col items-center justify-center min-h-[300px]">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-on-surface mb-2">No Records Submitted</h3>
                <p className="text-on-surface-variant text-sm text-center mb-6">
                  You haven't secured any records yet. Go to Submit to secure your first record.
                </p>
                <a
                  href="/submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-all"
                >
                  Go to Submit
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.map((record, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-container rounded-xl ghost-border p-6 hover-lift transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Filename</div>
                        <p className="text-sm font-medium text-on-surface truncate">{record.filename}</p>
                      </div>
                      <span className="ml-2 px-2 py-1 rounded text-[10px] font-bold uppercase bg-secondary/10 text-secondary border border-secondary/20 whitespace-nowrap">
                        {record.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Hash</div>
                      <code className="text-xs font-mono text-primary break-all">{truncateHash(record.hash)}</code>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Timestamp</div>
                      <p className="text-xs text-on-surface">{record.timestamp}</p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(record.hash)}
                      className="w-full px-4 py-2 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-all active:scale-95"
                    >
                      📋 Copy Hash
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Privacy Distribution */}
            <div className="bg-surface-container h-64 rounded-xl ghost-border relative overflow-hidden p-6">
              <div className="relative z-10">
                <h3 className="text-sm font-medium mb-1">Privacy Distribution</h3>
                <p className="text-xs text-on-surface-variant">Global cryptographic load</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-primary/20 animate-spin-slow" />
                <div className="absolute w-32 h-32 rounded-full border border-secondary/40" />
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-xl" />
                <span className="text-4xl absolute">🌐</span>
              </div>
            </div>

            {/* Active Grants */}
            <div className="bg-surface-container rounded-xl ghost-border p-6">
              <h3 className="text-sm font-medium mb-4 flex items-center justify-between">
                Active Grants
                <span className="text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded">4 New</span>
              </h3>
              <div className="space-y-4">
                {grants.map((g) => (
                  <div key={g.name} className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                    <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{g.icon}</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium">{g.name}</div>
                      <div className="text-[10px] text-on-surface-variant">{g.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 ghost-border rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-highest transition-colors">
                Manage All Access
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
