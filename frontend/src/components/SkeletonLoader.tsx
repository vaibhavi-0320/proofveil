import { useEffect, useState } from "react";

interface SkeletonLoaderProps {
  children: React.ReactNode;
  className?: string;
}

const SkeletonLoader = ({ children, className = "" }: SkeletonLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-4 w-3/4 skeleton-pulse" />
        <div className="h-4 w-1/2 skeleton-pulse" />
        <div className="h-8 w-full skeleton-pulse" />
      </div>
    );
  }

  return <div className="animate-fade-in-up">{children}</div>;
};

export const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse p-6 rounded-xl bg-surface-container ghost-border ${className}`}>
    <div className="h-3 w-20 skeleton-pulse mb-4" />
    <div className="h-8 w-16 skeleton-pulse mb-4" />
    <div className="h-2 w-24 skeleton-pulse" />
  </div>
);

export const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-6"><div className="h-2 w-24 skeleton-pulse" /></td>
    <td className="px-6 py-6"><div className="h-2 w-16 skeleton-pulse" /></td>
    <td className="px-6 py-6"><div className="h-2 w-20 skeleton-pulse" /></td>
    <td className="px-6 py-6"><div className="h-4 w-12 skeleton-pulse" /></td>
    <td className="px-6 py-6 text-right"><div className="h-2 w-8 skeleton-pulse ml-auto" /></td>
  </tr>
);

export default SkeletonLoader;
