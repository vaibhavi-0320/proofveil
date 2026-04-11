import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import { Settings2, Bell, ShieldCheck, Palette, User, Save, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    proofVerified: true,
    accessGranted: false,
    systemAlerts: true,
    weeklyDigest: false,
  });

  const [appearance, setAppearance] = useState({
    reducedMotion: false,
    compactMode: false,
  });

  const [privacy, setPrivacy] = useState({
    analyticsOptIn: false,
    showWalletAddress: true,
  });

  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated.",
    });
  };

  const Toggle = ({
    checked,
    onChange,
    id,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    id: string;
  }) => (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        checked ? "bg-primary" : "bg-surface-container-high"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const Section = ({
    icon,
    title,
    description,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-surface-container rounded-xl ghost-border overflow-hidden">
      <div className="p-6 border-b border-outline-variant/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h2 className="font-medium text-on-surface text-sm">{title}</h2>
          <p className="text-xs text-on-surface-variant">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );

  const Row = ({
    label,
    description,
    children,
  }: {
    label: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-on-surface">{label}</p>
        {description && (
          <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  );

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
            <Settings2 className="w-7 h-7 text-primary" />
            Settings
          </h1>
          <p className="text-on-surface-variant">
            Manage your account preferences, privacy, and notification settings.
          </p>
        </header>

        <div className="space-y-6">
          {/* Profile */}
          <Section
            icon={<User className="w-4 h-4" />}
            title="Profile"
            description="Your identity on the Midnight Network"
          >
            <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-lg ghost-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg select-none">
                P
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface">Anonymous User</p>
                <p className="text-xs text-on-surface-variant font-mono truncate">
                  {privacy.showWalletAddress ? "0x7F...D92B" : "••••••••••••"}
                </p>
              </div>
              <span className="text-[10px] bg-secondary/10 text-secondary ghost-border px-2 py-0.5 rounded-full uppercase tracking-widest">
                Active
              </span>
            </div>

            <Row
              label="Display Wallet Address"
              description="Show your truncated address on your profile"
            >
              <Toggle
                id="toggle-wallet-address"
                checked={privacy.showWalletAddress}
                onChange={(v) => setPrivacy((p) => ({ ...p, showWalletAddress: v }))}
              />
            </Row>
          </Section>

          {/* Notifications */}
          <Section
            icon={<Bell className="w-4 h-4" />}
            title="Notifications"
            description="Control which events trigger alerts"
          >
            <Row label="Proof Verified" description="When a zero-knowledge proof is confirmed">
              <Toggle
                id="toggle-proof-verified"
                checked={notifications.proofVerified}
                onChange={(v) => setNotifications((n) => ({ ...n, proofVerified: v }))}
              />
            </Row>
            <Row label="Access Granted" description="When a third party is given data access">
              <Toggle
                id="toggle-access-granted"
                checked={notifications.accessGranted}
                onChange={(v) => setNotifications((n) => ({ ...n, accessGranted: v }))}
              />
            </Row>
            <Row label="System Alerts" description="Critical protocol-level events">
              <Toggle
                id="toggle-system-alerts"
                checked={notifications.systemAlerts}
                onChange={(v) => setNotifications((n) => ({ ...n, systemAlerts: v }))}
              />
            </Row>
            <Row label="Weekly Digest" description="Summary of activity sent every Monday">
              <Toggle
                id="toggle-weekly-digest"
                checked={notifications.weeklyDigest}
                onChange={(v) => setNotifications((n) => ({ ...n, weeklyDigest: v }))}
              />
            </Row>
          </Section>

          {/* Privacy */}
          <Section
            icon={<ShieldCheck className="w-4 h-4" />}
            title="Privacy & Security"
            description="Zero-knowledge preferences and data sharing"
          >
            <Row
              label="Analytics Opt-In"
              description="Share anonymised usage stats to improve Proofveil"
            >
              <Toggle
                id="toggle-analytics"
                checked={privacy.analyticsOptIn}
                onChange={(v) => setPrivacy((p) => ({ ...p, analyticsOptIn: v }))}
              />
            </Row>
            <div className="pt-2">
              <button className="flex items-center justify-between w-full text-sm text-on-surface-variant hover:text-destructive transition-colors group">
                <div>
                  <p className="font-medium text-left">Revoke All Access Grants</p>
                  <p className="text-xs mt-0.5 text-on-surface-variant/60">
                    Immediately remove all third-party data permissions
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Section>

          {/* Appearance */}
          <Section
            icon={<Palette className="w-4 h-4" />}
            title="Appearance"
            description="Customise the look and feel"
          >
            <Row
              label="Reduced Motion"
              description="Minimise animations for accessibility"
            >
              <Toggle
                id="toggle-reduced-motion"
                checked={appearance.reducedMotion}
                onChange={(v) => setAppearance((a) => ({ ...a, reducedMotion: v }))}
              />
            </Row>
            <Row
              label="Compact Mode"
              description="Denser layout for smaller screens"
            >
              <Toggle
                id="toggle-compact-mode"
                checked={appearance.compactMode}
                onChange={(v) => setAppearance((a) => ({ ...a, compactMode: v }))}
              />
            </Row>
          </Section>

          <div className="flex justify-end pt-2">
            <button
              id="save-settings-btn"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground font-medium rounded-lg hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
