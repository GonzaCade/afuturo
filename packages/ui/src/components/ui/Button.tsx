import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { EASE } from "../../animations/easings";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "glass" | "ember";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "af-gradient text-white shadow-glow-sm hover:shadow-glow",
  secondary: "bg-paper text-ink hover:bg-white",
  ember: "bg-ember-500 text-white hover:bg-ember-400 shadow-glow-ember",
  ghost: "bg-transparent text-paper hover:bg-white/8",
  outline: "border border-line-strong text-paper hover:border-primary-400/60 hover:bg-white/5",
  glass: "glass text-paper hover:bg-white/10",
};
const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
  xl: "h-16 px-10 text-lg gap-3",
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Flecha animada a la derecha. */
  arrow?: boolean;
  icon?: ReactNode;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /** Efecto shimmer al hover (solo primary). */
  shine?: boolean;
}

/**
 * Botón de marca. Siempre pill (rounded-full), con hover con escala suave y flecha opcional.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, icon, href, target, shine = true, className, children, ...rest },
  ref,
) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-tight select-none",
    "transition-[box-shadow,background-color,border-color,color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  const inner = (
    <>
      {shine && variant === "primary" && (
        <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
      )}
      {icon && <span className="relative shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight className="relative size-[1.1em] shrink-0 transition-transform duration-500 ease-out group-hover/btn:translate-x-1" strokeWidth={2.2} />
      )}
    </>
  );
  const motionProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { duration: 0.3, ease: EASE.outQuart } };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={classes} {...motionProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref} className={classes} {...motionProps} {...rest}>
      {inner}
    </motion.button>
  );
});
