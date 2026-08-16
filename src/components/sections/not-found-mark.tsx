"use client";

import { motion, useReducedMotion } from "framer-motion";

export function NotFoundMark() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.p
      className="grain font-display text-[3.4rem] uppercase leading-none tracking-[0.06em] text-white/92 sm:text-[4.5rem] md:text-[6.5rem]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      404
    </motion.p>
  );
}
