import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import { ImageReveal } from "@/components/motion/ImageReveal";

export type CardVariant = "landscape" | "portrait" | "overlay" | "split" | "compact";

/**
 * A single Experience rendered through one of several editorial layouts.
 * Reuses the same data model — only the presentation changes.
 */
export function EditorialExperienceCard({
  experience: e,
  variant = "overlay",
  priority = false
}: {
  experience: Experience;
  variant?: CardVariant;
  priority?: boolean;
}) {
  const meta = `${e.city}, ${e.region} · ${e.date}`;

  if (variant === "landscape") {
    return (
      <Link href={`/experiences/${e.slug}`} className="group focus-ring block">
        <ImageReveal className="aspect-[16/10] bg-stone-200">
          <Image src={e.images[0]} alt={e.title} fill priority={priority} sizes="(max-width: 768px) 100vw, 66vw" className="card-image" />
        </ImageReveal>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-[color:var(--stone)]">{e.type} · {meta}</p>
            <h3 className="display mt-2 max-w-xl text-2xl leading-tight md:text-4xl">{e.title}</h3>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "portrait") {
    return (
      <Link href={`/experiences/${e.slug}`} className="group focus-ring block">
        <ImageReveal className="aspect-[3/4] bg-stone-200">
          <Image src={e.images[0]} alt={e.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="card-image" />
        </ImageReveal>
        <div className="mt-4">
          <p className="eyebrow text-[color:var(--stone)]">{e.type}</p>
          <h3 className="display mt-2 text-xl leading-snug">{e.title}</h3>
          <p className="mt-2 text-sm text-[color:var(--stone)]">{meta}</p>
        </div>
      </Link>
    );
  }

  if (variant === "split") {
    return (
      <Link href={`/experiences/${e.slug}`} className="group focus-ring grid gap-5 sm:grid-cols-2 sm:items-center">
        <ImageReveal className="aspect-[4/5] bg-stone-200">
          <Image src={e.images[0]} alt={e.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="card-image" />
        </ImageReveal>
        <div>
          <p className="eyebrow text-[color:var(--stone)]">{e.type}</p>
          <h3 className="display mt-3 text-2xl leading-tight md:text-3xl">{e.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--stone)]">{e.shortDescription}</p>
          <p className="mt-4 text-xs uppercase tracking-[.12em] text-[color:var(--stone)]">{meta}</p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/experiences/${e.slug}`} className="group focus-ring flex items-center gap-5 border-t border-[color:var(--line)] py-6">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-stone-200">
          <Image src={e.images[0]} alt={e.title} fill sizes="112px" className="card-image" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow text-[color:var(--stone)]">{e.type}</p>
          <h3 className="display mt-1 truncate text-lg">{e.title}</h3>
          <p className="mt-1 text-xs text-[color:var(--stone)]">{meta}</p>
        </div>
        <span aria-hidden className="link-underline ml-auto shrink-0 text-sm">View →</span>
      </Link>
    );
  }

  // overlay (default)
  return (
    <Link href={`/experiences/${e.slug}`} className="group focus-ring block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
        <Image src={e.images[0]} alt={e.title} fill priority={priority} sizes="(max-width: 768px) 100vw, 33vw" className="card-image" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 pt-24 text-white">
          <div>
            <p className="eyebrow mb-2 text-white/80">{e.type}</p>
            <h3 className="display max-w-xl text-xl leading-tight md:text-2xl">{e.title}</h3>
            <p className="mt-2 max-w-lg text-xs text-white/85">{meta}</p>
          </div>
          
        </div>
      </div>
    </Link>
  );
}
