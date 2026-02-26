"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
}

export default function Reveal({ children, className, delayMs = 0, y = 18 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();

    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] ease-out will-change-transform',
        prefersReducedMotion ? 'duration-0' : 'duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0',
        className
      )}
      style={{
        transitionDelay: prefersReducedMotion ? '0ms' : `${delayMs}ms`,
        transform: visible ? 'translateY(0px)' : `translateY(${prefersReducedMotion ? 0 : y}px)`,
      }}
    >
      {children}
    </div>
  );
}
