'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeUp, slowReveal } from '@/lib/motion';

type RevealVariant = 'fadeUp' | 'fadeIn' | 'slowReveal';

type RevealProps = {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
};

const variantsByName = {
  fadeIn,
  fadeUp,
  slowReveal
} as const;

export default function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variantsByName[variant]}
      initial="hidden"
      animate={isVisible ? 'show' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
