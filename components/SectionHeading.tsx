import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Eyebrow label + large display heading used to open every homepage section. */
export function SectionHeading({
  label,
  heading,
  children,
  tone = "dark",
  align = "left"
}: {
  label: string;
  heading: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${align === "right" ? "justify-end" : ""} ${tone === "light" ? "text-white/60" : "text-[color:var(--stone)]"}`}>
          <span aria-hidden className={`h-px w-8 ${tone === "light" ? "bg-white/30" : "bg-[color:var(--line)]"}`} />
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mt-5 text-[clamp(2.4rem,6vw,5.5rem)] leading-[.98]">{heading}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.16}>
          <div className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${align === "right" ? "ml-auto" : ""} ${tone === "light" ? "text-white/65" : "text-[color:var(--stone)]"}`}>
            {children}
          </div>
        </Reveal>
      )}
    </div>
  );
}
