import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

const AnimatedCounter = ({ target, duration = 2000 }: AnimatedCounterProps) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animateValue = () => {
    const numericMatch = target.match(/[\d,.]+/);
    if (!numericMatch) { setDisplay(target); return; }
    
    const numStr = numericMatch[0].replace(/,/g, "");
    const targetNum = parseFloat(numStr);
    const prefix = target.slice(0, target.indexOf(numericMatch[0]));
    const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
    const hasComma = numericMatch[0].includes(",");
    const isDecimal = numStr.includes(".");
    
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;
      
      let formatted: string;
      if (isDecimal) {
        formatted = current.toFixed(1);
      } else {
        const rounded = Math.floor(current);
        formatted = hasComma ? rounded.toLocaleString() : rounded.toString();
      }
      
      setDisplay(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
  };

  return <div ref={ref}>{display}</div>;
};

export default AnimatedCounter;
