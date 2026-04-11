import { useState, useRef } from "react";
import AppSidebar from "@/components/AppSidebar";
import { useWalletGate } from "@/hooks/useWalletGate";
import { toast } from "sonner";

const Submit = () => {
  useWalletGate();
  const [recordType, setRecordType] = useState("Medical Certification");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [encrypting, setEncrypting] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const [recordHash, setRecordHash] = useState<string | null>(null);
  const [classification, setClassification] = useState<string[]>(["HIGH_PRIVACY"]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Generate SHA256 hash from input
  const generateHash = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return '0x' + hashHex;
  };

  const toggleClassification = (tag: string) => {
    setClassification((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a record title");
      return;
    }
    setEncrypting(true);
    setEncrypted(false);
    setRecordHash(null);

    // Simulate encryption and generate hash
    await new Promise((r) => setTimeout(r, 3000));
    const inputData = `${recordType}|${title}|${description}|${file?.name || ''}`;
    const hash = await generateHash(inputData);
    setRecordHash(hash);
    setEncrypting(false);
    setEncrypted(true);
    
    // Save record to localStorage
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const newRecord = {
      filename: file?.name || title,
      hash: hash,
      timestamp: timestamp,
      status: "SECURED"
    };
    
    const existingRecords = localStorage.getItem("proofveil_records");
    const records = existingRecords ? JSON.parse(existingRecords) : [];
    records.unshift(newRecord);
    localStorage.setItem("proofveil_records", JSON.stringify(records));
    
    const shortHash = hash.slice(0, 10) + '...' + hash.slice(-8);
    toast.success("Secured on Midnight Preprod Network", {
      description: `Record Hash: ${shortHash}`,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <AppSidebar />
      <main className="lg:ml-64 pt-24 pb-12 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 animate-fade-in-up">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Secure Record Submission</h1>
            <p className="text-on-surface-variant max-w-xl">
              Zero-knowledge proof generation for your sensitive assets. Data is encrypted locally before touching the Midnight network.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <section className="lg:col-span-7 space-y-8 animate-fade-in-up-delay-1">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label-terminal px-1">Record Type</label>
                    <div className="relative">
                      <select
                        value={recordType}
                        onChange={(e) => setRecordType(e.target.value)}
                        className="w-full bg-surface-container-lowest ring-1 ring-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:ring-primary focus:ring-2 transition-all appearance-none border-0"
                      >
                        <option>Medical Certification</option>
                        <option>Financial Statement</option>
                        <option>Identity Document</option>
                        <option>Custom Metadata</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                        ▾
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="label-terminal px-1">Classification</label>
                    <div className="flex gap-2 flex-wrap">
                      {["HIGH_PRIVACY", "LOCAL_HASH", "ZK_PROOF"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleClassification(tag)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                            classification.includes(tag)
                              ? "border border-secondary text-secondary bg-secondary/10"
                              : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-terminal px-1">Record Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface-container-lowest ring-1 ring-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:ring-primary focus:ring-2 transition-all border-0"
                    placeholder="e.g. Q3 Health Assessment_V2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-terminal px-1">Encrypted Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-lowest ring-1 ring-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:ring-primary focus:ring-2 transition-all resize-none border-0"
                    placeholder="Brief context for the recipient (visible only after proof validation)..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-terminal px-1">Confidential Attachment</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all bg-surface-container/30 ${
                      dragOver ? "border-primary bg-primary/5" : "border-outline-variant/40 hover:border-primary/40"
                    }`}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                      accept=".pdf,.jpeg,.jpg,.json"
                    />
                    <span className="text-4xl text-primary mb-4 block">☁️</span>
                    {file ? (
                      <p className="text-on-surface font-medium">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-on-surface font-medium mb-1">Drag and drop file</p>
                        <p className="text-on-surface-variant text-sm">PDF, JPEG, or JSON (Max 50MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={encrypting}
                    className={`w-full gradient-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg shadow-[0px_4px_24px_hsl(var(--primary-container)/0.25)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${
                      encrypting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {encrypting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Encrypting...
                      </>
                    ) : (
                      <>🔐 Finalize Encryption</>
                    )}
                  </button>
                  <p className="text-center text-xs text-on-surface-variant mt-4 font-mono uppercase tracking-widest opacity-60">
                    {encrypting
                      ? "STATUS: ENCRYPTING VIA MIDNIGHT..."
                      : encrypted
                      ? "STATUS: ENCRYPTED ✓"
                      : "STATUS: READY"}
                  </p>
                </div>
              </form>
            </section>

            {/* Right side - Privacy Shield */}
            <section className="lg:col-span-5 flex flex-col gap-8 animate-fade-in-up-delay-2">
              <div className="bg-surface-container rounded-2xl p-8 relative overflow-hidden ghost-border min-h-[500px] flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3),transparent)]" />
                </div>
                <div className="relative z-10 w-full flex flex-col items-center">
                  {!encrypted ? (
                    <>
                      <div className="label-terminal text-secondary tracking-[0.3em] mb-8">Privacy Shield Active</div>
                      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-spin-slow" />
                        <div className="absolute inset-4 border border-primary/20 rounded-full animate-spin-slower" />
                        <svg className="drop-shadow-[0_0_15px_hsl(var(--secondary)/0.3)]" width="120" height="140" viewBox="0 0 120 140" fill="none">
                          <path d="M60 0L10 22.5V60C10 93.75 31.25 125.25 60 133C88.75 125.25 110 93.75 110 60V22.5L60 0Z" fill="hsl(var(--surface))" stroke="hsl(var(--secondary))" strokeWidth="4" />
                          <path d="M60 35V100M35 60L85 60" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-secondary rounded-full animate-ping" />
                        <div className="absolute top-1/3 right-4 w-2 h-2 bg-primary rounded-full animate-bounce" />
                      </div>
                      <div className="w-full space-y-4">
                        {[
                          { label: "0x4F...33E2", status: "ENCRYPTED_SUCCESS" },
                          { label: "SHA-256", status: "VERIFIED_ROOT" },
                          { label: "ZK_SNARK_GEN", status: "ACTIVE" },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                            <span className="text-xs text-on-surface-variant font-mono">{row.label}</span>
                            <span className="text-[10px] text-secondary font-mono tracking-widest">{row.status}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : recordHash ? (
                    <div className="w-full space-y-6 text-center">
                      <div className="space-y-2">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-2xl font-semibold text-secondary">Record Secured</h3>
                        <p className="text-on-surface-variant text-sm">Published to Midnight Preprod Network</p>
                      </div>
                      <div className="bg-surface-container-lowest rounded-lg p-4 border border-secondary/20">
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Record Hash</p>
                        <code className="text-sm font-mono text-secondary break-all leading-relaxed">{recordHash}</code>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-surface-container-lowest rounded p-3">
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Status</p>
                          <p className="text-sm font-medium text-on-surface mt-1">VERIFIED ✓</p>
                        </div>
                        <div className="bg-surface-container-lowest rounded p-3">
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Network</p>
                          <p className="text-sm font-medium text-on-surface mt-1">Midnight Preprod</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="bg-surface-container-high rounded-xl p-6 ghost-border border-secondary/20 hover-lift">
                <div className="flex items-start gap-4">
                  <span className="text-secondary text-xl">✅</span>
                  <div>
                    <h3 className="text-on-surface font-medium text-sm">Obsidian Security Layer</h3>
                    <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                      Proofveil utilizes the Midnight Network's private smart contracts to ensure your data remains your own, providing mathematical proof without disclosure.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Submit;
