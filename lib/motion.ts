import type { Variants } from 'framer-motion';

const calmEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: calmEase
    }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: calmEase
    }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
      ease: calmEase,
      duration: 0.8
    }
  }
};

export const slowReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: calmEase
    }
  }
};
