import logoImg from "@/assets/proofveil-logo.png";

const BrandFooter = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex flex-col items-center gap-3">
      <img
        src={logoImg}
        alt="Proofveil logo"
        className="h-12 w-12 object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
        width={48}
        height={48}
      />
      <span className="text-sm font-medium text-on-surface-variant">
        Proofveil Network
      </span>
    </div>
  </div>
);

export default BrandFooter;
