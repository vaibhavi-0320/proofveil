import { Link } from "react-router-dom";
import BrandFooter from "@/components/BrandFooter";

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
        </div>
        <div>
          <h5 className="text-on-surface font-headline font-medium mb-6">Platform</h5>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/verify" className="hover:text-primary transition-colors">Verify Data</Link></li>
            <li><Link to="/submit" className="hover:text-primary transition-colors">Submit Record</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-surface font-headline font-medium mb-6">Developers</h5>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><a href="https://docs.midnight.network" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="https://github.com/vaibhavi-0320/proofveil" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://explorer.preprod.midnight.network/contracts/9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Smart Contract ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/10">
        <p className="text-sm text-on-surface-variant font-label mb-4 md:mb-0">
          © 2026 Proofveil Platform. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-sm font-label text-on-surface-variant">
            Built on <span className="text-on-surface font-medium">Midnight</span>
          </span>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-label text-secondary uppercase tracking-widest">Preprod Testnet</span>
        </div>
      </div>
      
      <BrandFooter />
    </div>
  </footer>
);

export default Footer;
