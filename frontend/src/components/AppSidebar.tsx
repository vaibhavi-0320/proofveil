import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/proofveil-logo.png";

const sidebarLinks = [
  { to: "/dashboard", icon: "📊", label: "Dashboard" },
  { to: "/submit", icon: "📤", label: "Submit" },
  { to: "/verify", icon: "✅", label: "Verify" },
  { to: "/settings", icon: "⚙️", label: "Settings" },
  { to: "/support", icon: "❓", label: "Support" },
];

const AppSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-lowest flex flex-col p-4 pt-20 gap-2 hidden lg:flex">
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center overflow-hidden">
          <img src={logoImg} alt="" className="w-6 h-6" width={24} height={24} />
        </div>
        <div>
          <p className="text-on-surface text-sm font-semibold tracking-tight">Proofveil</p>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Midnight Network</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-sm font-medium ${
              isActive(link.to)
                ? "text-primary bg-surface-container"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="pt-4 mt-auto border-t border-outline-variant/10">
        <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all w-full text-sm font-medium">
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
