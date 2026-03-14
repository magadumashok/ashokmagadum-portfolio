'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(val: string): { prefix: string; number: number; suffix: string } {
  // Match optional prefix chars, then digits (with optional decimal), then suffix
  const match = val.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: val };
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const { prefix, number, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const endValue = number;

          const tick = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * endValue));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [number, duration, hasAnimated]);

  const displayValue =
    number % 1 !== 0
      ? count.toFixed(1)
      : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
