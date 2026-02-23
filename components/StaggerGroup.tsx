'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function StaggerGroup({ children, className, style }: StaggerGroupProps) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.ul
      ref={ref}
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'show' : 'hidden'}
    >
      {children}
    </motion.ul>
  );
}
