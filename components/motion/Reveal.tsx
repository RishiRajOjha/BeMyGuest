"use client";
import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

const easeEditorial: Transition["ease"] = [0.16, 0.84, 0.24, 1];

/** Fades + rises content into view once, on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.8,
  as = "div"
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: easeEditorial }}
    >
      {children}
    </MotionTag>
  );
}
