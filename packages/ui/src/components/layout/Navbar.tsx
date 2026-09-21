import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";
import { EASE } from "../../animations/easings";
import { scrollToId } from "../../animations/SmoothScroll";

export interface NavLink { label: string; href: string }

export interface NavbarProps {
  links?: NavLink[];
  /** Nodo a la izquierda (default: logo A Futuro + wordmark). */
  brand?: ReactNode;
  cta?: { label: string; href: string };
  className?: string;
  /** Nombre del cliente para mostrar "Cliente · by A Futuro". */
  clientName?: string;
}

/**
 * Navbar pill flotante (estilo Pulso): se compacta y gana blur al scrollear, se esconde al bajar rápido.
 */
export function Navbar({ links = [], brand, cta, className, clientName }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 200 && !open);
  });
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("#")) { e.preventDefault(); scrollToId(href.slice(1)); setOpen(false); }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE.outExpo }}
      className={cn("fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6", className)}
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-6 rounded-full pl-5 pr-2 transition-all duration-500",
          scrolled ? "glass-strong h-14 shadow-soft" : "h-16 border border-transparent bg-transparent",
        )}
      >
        <a href="#" className="flex items-center gap-3" onClick={go("#top")}>
          {brand ?? <Logo size={30} wordmark={!clientName} />}
          {clientName && (
            <span className="flex items-baseline gap-2 font-display font-semibold tracking-tight">
              {clientName}
              <span className="hidden font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-muted sm:inline">by A Futuro</span>
            </span>
          )}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={go(l.href)} className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {cta && <Button size="sm" href={cta.href} arrow className="hidden sm:inline-flex">{cta.label}</Button>}
          <button aria-label="Menú" onClick={() => setOpen((o) => !o)} className="flex size-10 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/10 md:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: EASE.outExpo }}
            className="glass-strong absolute inset-x-4 top-20 rounded-3xl p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={l.href} onClick={go(l.href)} className="block rounded-2xl px-4 py-3 text-lg font-medium hover:bg-white/8">{l.label}</a>
                </motion.li>
              ))}
            </ul>
            {cta && <Button href={cta.href} arrow className="mt-3 w-full">{cta.label}</Button>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
