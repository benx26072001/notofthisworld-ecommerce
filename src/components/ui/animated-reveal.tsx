"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type AnimatedRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number;
}>;

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  amount = 0.25,
}: AnimatedRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
