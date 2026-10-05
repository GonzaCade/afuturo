import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Surface } from "../ui/Surface";
import { Label } from "../ui/Typography";

export interface ProductCardProps {
  /** Imagen de producto (idealmente sobre fondo blanco). */
  image: string;
  alt?: string;
  title: string;
  description?: ReactNode;
  /** Label chico arriba. */
  tag?: string;
  href?: string;
  /** Ratio del área de imagen. */
  aspect?: string;
  /** Imagen a sangre (sin padding). */
  bleed?: boolean;
  className?: string;
  onClick?: () => void;
}

/** Tarjeta de producto: imagen en escenario blanco, título y una línea. Hover físico. */
export function ProductCard({ image, alt = "", title, description, tag, href, aspect = "4 / 3", bleed, className, onClick }: ProductCardProps) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper href={href} onClick={onClick} className={cn("group block af-focus rounded-xl", (href || onClick) && "cursor-pointer", className)}>
      <Surface padding="none" radius="xl" hover className="overflow-hidden">
        <div className={cn("af-studio-inner relative flex items-center justify-center overflow-hidden bg-surface", !bleed && "p-6")} style={{ aspectRatio: aspect }}>
          <img src={image} alt={alt} loading="lazy" className={cn("h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]", bleed ? "object-cover" : "object-contain")} />
          {tag && <Label className="absolute left-5 top-5 rounded-full bg-white/80 px-2.5 py-1.5 backdrop-blur">{tag}</Label>}
        </div>
        <div className="flex items-start justify-between gap-4 border-t border-line p-5">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">{title}</h3>
            {description && <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{description}</p>}
          </div>
          {(href || onClick) && (
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-3 text-ink-2 transition-colors duration-200 group-hover:bg-accent-50 group-hover:text-accent">
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </span>
          )}
        </div>
      </Surface>
    </Wrapper>
  );
}
