"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const canAnimate = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!canAnimate || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      transition={{
        delay,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ amount: 0.16, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
