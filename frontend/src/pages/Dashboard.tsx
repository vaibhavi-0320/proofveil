import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import { SkeletonCard, SkeletonRow } from "@/components/SkeletonLoader";
import AnimatedCounter from "@/components/AnimatedCounter";

const records = [
  { id: "0x4F...8B21", type: "Genomic", date: "Oct 24, 2023", status: "verified" },
  { id: "0xE2...0A94", type: "Financial", date: "Oct 24, 2023", status: "pending" },
  { id: "0x99...3C10", type: "Legal", date: "Oct 23, 2023", status: "verified" },
];

const grants = [
  { icon: "🏥", name: "St. Jude Research", detail: "Read-only Genomic access • Expires in 2h" },
  { icon: "🏦", name: "Chase Private Client", detail: "Financial proof validation • Perpetual" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { label: "Active Proofs", value: "1,284", icon: "🛡️", trend: "+12.5% from last period", trendColor: "text-secondary" },
    { label: "Verified Records", value: "942", icon: "✅", trend: "System Integrity 99.9%", trendColor: "text-secondary" },
    { label: "Processing", value: "12", icon: "⚙️", trend: "Average latency 42ms", trendColor: "text-primary" },
    { label: "Access Grants", value: "45", icon: "🔑", trend: "3 expiring within 24h", trendColor: "text-destructive" },
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
              Monitoring cryptographic integrity and zero-knowledge proof generation across the Midnight ecosystem.
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

        {/* Table + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-surface p-1 rounded-xl ghost-border overflow-hidden shadow-2xl">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">Recent Cryptographic Records</h2>
              <button className="text-xs text-primary font-medium hover:underline transition-all">
                Export Audit Log
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-on-surface-variant/60 text-xs uppercase tracking-widest bg-surface-container-low/50">
                    <th className="px-6 py-4 font-medium">Record ID</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                  ) : (
                    records.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-container/30 transition-colors group">
                        <td className="px-6 py-4 font-mono text-sm text-primary">{r.id}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{r.type}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{r.date}</td>
                        <td className="px-6 py-4">
                          {r.status === "verified" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary/10 text-secondary border border-secondary/20">
                              ZK Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3 text-on-surface-variant">
                            <button className="hover:text-primary transition-colors hover:scale-110">👁️</button>
                            <button className="hover:text-primary transition-colors hover:scale-110">🔗</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  <SkeletonRow />
                  <SkeletonRow />
                </tbody>
              </table>
            </div>
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
