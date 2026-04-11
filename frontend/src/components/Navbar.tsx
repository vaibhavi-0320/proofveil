import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "@/assets/proofveil-logo.png";
import ConnectWalletModal from "@/components/ConnectWalletModal";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConnectClick = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress("");
    } else {
      setModalOpen(true);
    }
  };

  const handleWalletConnect = (address: string) => {
    if (address) {
      setWalletConnected(true);
      setWalletAddress(address);
    } else {
      setWalletConnected(false);
      setWalletAddress("");
    }
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/submit", label: "Submit" },
    { to: "/verify", label: "Verify" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 transition-all duration-300 ${
          scrolled
            ? "glass-panel shadow-[0px_24px_48px_rgba(0,0,0,0.4)]"
            : "bg-surface-container-lowest/80 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="Proofveil"
              className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              width={32}
              height={32}
            />
            <span className="text-xl font-medium tracking-tighter text-on-surface font-headline">
              Proofveil
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium tracking-tight transition-all duration-200 active:scale-95 ${
                  isActive(link.to)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {walletConnected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-lg ghost-border animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_hsl(var(--secondary))]" />
              <span className="text-xs font-mono text-on-surface-variant">{walletAddress}</span>
            </div>
          )}
          <button
            onClick={handleConnectClick}
            className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-sm gradient-primary-glow active:scale-95 transition-all hover:brightness-110"
          >
            {walletConnected ? "Disconnect" : "Connect Wallet"}
          </button>
        </div>
      </nav>

      <ConnectWalletModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </>
  );
};

export default Navbar;
