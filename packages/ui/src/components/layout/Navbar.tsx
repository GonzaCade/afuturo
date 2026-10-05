import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { ICON } from "../../lib/icon";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";
import { EASE } from "../../animations/easings";
import { scrollToId } from "../../animations/SmoothScroll";

export interface NavLink { label: string; href: string }

export interface NavbarProps {
  links?: NavLink[];
  brand?: ReactNode;
  cta?: { label: string; href: string };
  className?: string;
  /** Nombre del cliente: "Cliente · by A Futuro". */
  clientName?: string;
}

/** Navbar pill flotante de vidrio en desktop (se compacta al scrollear y se esconde al bajar). En mobile no hay barra: solo el logo y la hamburguesa, siempre visibles. */
export function Navbar({ links = [], brand, cta, className, clientName }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240 && !open);
  });
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("#")) { e.preventDefault(); scrollToId(href.slice(1)); setOpen(false); }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE.outExpo }}
      className={cn("fixed inset-x-0 top-3 z-50 flex justify-center px-4 max-md:[transform:none!important] md:top-5", className)}
    >
      <nav className={cn("flex w-full max-w-5xl items-center justify-between gap-6 rounded-full max-md:h-12 max-md:px-1 md:af-glass md:pl-5 md:pr-2 md:transition-all md:duration-300", scrolled ? "md:h-13 md:shadow-float" : "md:h-14")}>
        <a href="#" className="af-focus flex items-center gap-3 rounded-full" onClick={go("#top")}>
          {brand ?? <Logo size={26} />}
          {clientName && (
            <span className="flex items-baseline gap-2 font-display font-medium tracking-[-0.02em]">
              {clientName}
              <span className="hidden text-label font-normal uppercase text-ink-3 sm:inline">by A Futuro</span>
            </span>
          )}
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={go(l.href)} className="af-focus relative rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors duration-200 hover:bg-surface-3 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {cta && <Button size="sm" href={cta.href} arrow className="hidden sm:inline-flex">{cta.label}</Button>}
          <button aria-label="Menú" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="af-focus flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-3 md:hidden">
            {open ? <X {...ICON} /> : <Menu {...ICON} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE.outExpo }}
            className="af-surface-float absolute inset-x-4 top-18 rounded-xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={l.href} onClick={go(l.href)} className="block rounded-md px-4 py-3 text-base font-medium text-ink hover:bg-surface-3">{l.label}</a>
                </motion.li>
              ))}
            </ul>
            {cta && <Button href={cta.href} arrow className="mt-2 w-full">{cta.label}</Button>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
