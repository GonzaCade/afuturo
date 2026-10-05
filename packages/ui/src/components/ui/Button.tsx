import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { EASE, DURATION } from "../../animations/easings";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "ink";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white shadow-accent hover:bg-accent-600",
  secondary: "af-surface text-ink hover:border-line-strong hover:shadow-float",
  ghost: "bg-transparent text-ink-2 hover:bg-surface-3 hover:text-ink",
  ink: "bg-ink text-white shadow-float-sm hover:bg-black",
};
const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2.5",
  xl: "h-14 px-8 text-base gap-3",
};

type NativeButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">;

export interface ButtonProps extends NativeButton {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Flecha a la derecha. */
  arrow?: boolean;
  icon?: ReactNode;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

const MOTION = { whileHover: { y: -2 }, whileTap: { scale: 0.98, y: 0 }, transition: { duration: DURATION.base, ease: EASE.outQuart } };

/** Botón pill. Hover: sube 2 px; press: escala .98. Acento solo en `primary`. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, icon, href, target, className, children, ...rest },
  ref,
) {
  const classes = cn(
    "group/btn af-focus relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,box-shadow,color] duration-200",
    "disabled:pointer-events-none disabled:opacity-40",
    ICON_CLASS,
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrow && <ArrowRight className="size-[1.05em] shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" strokeWidth={1.8} />}
    </>
  );
  if (href) {
    return (
      <motion.a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={classes} {...MOTION}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref} className={classes} {...MOTION} {...rest}>
      {inner}
    </motion.button>
  );
});

export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, "variant">>(function PrimaryButton(p, ref) {
  return <Button ref={ref} variant="primary" {...p} />;
});
export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, "variant">>(function SecondaryButton(p, ref) {
  return <Button ref={ref} variant="secondary" {...p} />;
});

export interface IconButtonProps extends NativeButton {
  /** Texto accesible (obligatorio: el botón no tiene label visible). */
  label: string;
  variant?: "secondary" | "ghost" | "primary" | "ink";
  size?: "sm" | "md" | "lg";
  /** Estado activo (acento). */
  active?: boolean;
  children: ReactNode;
}

const ICON_SIZES = { sm: "size-9", md: "size-10", lg: "size-12" };

/** Botón cuadrado de ícono, radio 14 px. Target mínimo 40 px. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = "secondary", size = "md", active, className, children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "af-focus inline-flex shrink-0 items-center justify-center rounded-md transition-[background-color,border-color,box-shadow,color] duration-200 disabled:pointer-events-none disabled:opacity-40",
        ICON_CLASS,
        ICON_SIZES[size],
        active ? "bg-accent-50 text-accent border border-accent-100" : VARIANTS[variant],
        className,
      )}
      {...MOTION}
      {...rest}
    >
      {children}
    </motion.button>
  );
});
