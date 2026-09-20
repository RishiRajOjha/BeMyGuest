"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Reveals an image (or any block) with a rising clip-path, like a curtain lifting. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="relative h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 0.84, 0.24, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.6, delay, ease: [0.16, 0.84, 0.24, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
