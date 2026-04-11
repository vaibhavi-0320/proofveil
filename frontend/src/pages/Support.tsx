import AppSidebar from "@/components/AppSidebar";
import {
  HelpCircle,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Mail,
  ChevronRight,
  FileQuestion,
} from "lucide-react";

const faqs = [
  {
    q: "What is a Zero-Knowledge Proof?",
    a: "A ZK proof lets you cryptographically prove a fact (e.g. your age) without revealing the underlying data. Proofveil uses Midnight's ZK protocol to generate these proofs on-chain.",
  },
  {
    q: "Which wallets are supported?",
    a: "Proofveil currently supports Lace Wallet (Cardano / Midnight Network). More wallets will be added as the ecosystem matures.",
  },
  {
    q: "Is my data stored on-chain?",
    a: "No raw data is ever stored on-chain. Only the cryptographic commitment (hash) is recorded. Your private data stays entirely local or in an encrypted off-chain vault of your choice.",
  },
  {
    q: "How do I revoke an access grant?",
    a: "Navigate to Settings → Privacy & Security → Revoke All Access Grants. You can also manage individual grants from the Dashboard → Active Grants panel.",
  },
  {
    q: "What is the Midnight Network?",
    a: "Midnight is a Cardano sidechain optimised for data privacy. It provides shielded smart contracts and ZK proof infrastructure that Proofveil is built on top of.",
  },
];

const resources = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Documentation",
    description: "Full API reference and guides",
    href: "https://docs.midnight.network",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Community Discord",
    description: "Join the Proofveil & Midnight community",
    href: "https://discord.gg/midnight",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    title: "Protocol Whitepaper",
    description: "Deep-dive into the ZK architecture",
    href: "https://midnight.network/whitepaper",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Contact Support",
    description: "Email us at support@proofveil.io",
    href: "mailto:support@proofveil.io",
  },
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <AppSidebar />

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[25%] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <main className="lg:ml-64 pt-20 p-8 min-h-screen max-w-3xl">
        <header className="mb-10">
          <h1 className="text-3xl font-medium tracking-tight mb-2 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-primary" />
            Support
          </h1>
          <p className="text-on-surface-variant">
            Everything you need to get the most out of Proofveil.
          </p>
        </header>

        {/* Resources */}
        <section className="mb-10">
          <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-widest mb-4">
            Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((r) => (
              <a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-surface-container rounded-xl ghost-border hover:border-primary/40 hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on-surface">{r.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                    {r.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-on-surface-variant/40 group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-widest mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-surface-container rounded-xl ghost-border overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none select-none text-sm font-medium text-on-surface hover:text-primary transition-colors">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-on-surface-variant group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-10 p-6 bg-surface-container rounded-xl ghost-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-on-surface">Still need help?</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Our support team responds within 24 hours on business days.
            </p>
          </div>
          <a
            href="mailto:support@proofveil.io"
            id="support-contact-btn"
            className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-primary-foreground font-medium rounded-lg hover:scale-[1.02] active:scale-95 transition-all text-sm whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
