import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type MotionSectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function MotionSection({ id, className, children }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}
