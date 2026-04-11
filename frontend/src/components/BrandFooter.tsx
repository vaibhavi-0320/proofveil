const BrandFooter = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex flex-col items-center gap-3">
      {/* Custom Shield Logo SVG */}
      <svg
        viewBox="0 0 64 64"
        width="48"
        height="48"
        className="text-on-surface"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White Shield Shape */}
        <path
          d="M32 4L12 14V28C12 42 32 56 32 56C32 56 52 42 52 28V14L32 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner decorative circles */}
        <circle
          cx="32"
          cy="28"
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle
          cx="32"
          cy="28"
          r="4"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>
      <span className="text-sm font-medium text-on-surface-variant">
        Proofveil Network
      </span>
    </div>
  </div>
);

export default BrandFooter;
