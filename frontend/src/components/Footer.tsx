import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-surface border-t border-outline-variant/10 pt-20 pb-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-headline font-medium tracking-tighter text-on-surface mb-6">
            Proofveil
          </div>
          <p className="text-on-surface-variant font-body max-w-sm mb-8">
            The future of information is verifiable. We provide the tools to prove facts while preserving absolute privacy.
          </p>
          <div className="flex gap-4">
            {["🌐", "📧", "💻"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors hover-lift"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-on-surface font-headline font-medium mb-6">Platform</h5>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/verify" className="hover:text-primary transition-colors">Verify Data</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Governance</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Staking</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-surface font-headline font-medium mb-6">Developers</h5>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">SDK</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/10">
        <p className="text-sm text-on-surface-variant font-label mb-4 md:mb-0">
          © 2024 Proofveil Platform. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-sm font-label text-on-surface-variant">
            Built on <span className="text-on-surface font-medium">Midnight</span>
          </span>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-label text-secondary uppercase tracking-widest">Mainnet Live</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
