import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { SPRING } from "../../animations/easings";
import { Logo } from "../brand/Logo";
import { Label } from "../ui/Typography";

export interface NavItem { id: string; label: string; icon: ReactNode; badge?: string | number }

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */
export interface SidebarProps {
  items: NavItem[];
  active: string;
  onSelect: (id: string) => void;
  brand?: ReactNode;
  /** Título chico sobre el grupo de ítems. */
  groupLabel?: string;
  footer?: ReactNode;
  /** Solo íconos. */
  collapsed?: boolean;
  className?: string;
}

/** Navegación lateral: ítem activo = superficie elevada + barra de acento. */
export function Sidebar({ items, active, onSelect, brand, groupLabel = "Panel", footer, collapsed, className }: SidebarProps) {
  const id = useId();
  return (
    <aside className={cn("flex h-full flex-col gap-6 p-4", collapsed ? "w-[72px] items-center" : "w-[232px]", className)}>
      <div className={cn("flex h-10 items-center", collapsed ? "justify-center" : "px-2")}>{brand ?? <Logo size={24} />}</div>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Principal">
        {!collapsed && <Label className="mb-2 px-3">{groupLabel}</Label>}
        {items.map((it) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              aria-current={on ? "page" : undefined}
              title={collapsed ? it.label : undefined}
              className={cn(
                "af-focus relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-200",
                on ? "text-ink" : "text-ink-2 hover:bg-surface-3 hover:text-ink",
                collapsed && "w-10 justify-center px-0",
                ICON_CLASS,
              )}
            >
              {on && <motion.span layoutId={`sb-${id}`} aria-hidden className="absolute inset-0 rounded-md bg-surface shadow-float-xs ring-1 ring-line" transition={SPRING.snappy} />}
              {on && !collapsed && <motion.span layoutId={`sb-bar-${id}`} aria-hidden className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent" transition={SPRING.snappy} />}
              <span className={cn("relative", on && "text-accent")}>{it.icon}</span>
              {!collapsed && <span className="relative flex-1 text-left">{it.label}</span>}
              {!collapsed && it.badge !== undefined && <span className="relative rounded-full bg-accent-50 px-1.5 py-0.5 font-mono text-[11px] text-accent">{it.badge}</span>}
            </button>
          );
        })}
      </nav>
      {footer && <div className={cn(!collapsed && "px-1")}>{footer}</div>}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  TopBar                                                             */
/* ------------------------------------------------------------------ */
export interface TopBarProps {
  title?: ReactNode;
  /** Migas: ["Casa", "Living"] */
  crumbs?: string[];
  /** Centro (CommandBar). */
  center?: ReactNode;
  /** Derecha (IconButtons, avatar). */
  actions?: ReactNode;
  className?: string;
}

/** Barra superior: título a la izquierda, comando al centro, acciones a la derecha. */
export function TopBar({ title, crumbs, center, actions, className }: TopBarProps) {
  return (
    <header className={cn("flex h-16 items-center gap-4 px-5", className)}>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {crumbs && (
          <div className="flex items-center gap-1.5 text-[12px] text-ink-3">
            {crumbs.map((c, i) => <span key={i} className="flex items-center gap-1.5">{i > 0 && <span aria-hidden>/</span>}<span>{c}</span></span>)}
          </div>
        )}
        {title && <h1 className="truncate font-display text-[17px] font-medium tracking-[-0.02em] text-ink">{title}</h1>}
      </div>
      {center && <div className="hidden w-full max-w-sm md:block">{center}</div>}
      <div className="flex flex-1 items-center justify-end gap-1.5">{actions}</div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  FloatingDock (mobile)                                              */
/* ------------------------------------------------------------------ */
export interface FloatingDockProps {
  items: NavItem[];
  active: string;
  onSelect: (id: string) => void;
  className?: string;
  /** Posicionado absoluto dentro del contenedor (default) o fixed en viewport. */
  fixed?: boolean;
}

/** Dock inferior flotante para mobile: pill de vidrio con íconos; activo = acento. */
export function FloatingDock({ items, active, onSelect, className, fixed }: FloatingDockProps) {
  const id = useId();
  return (
    <nav aria-label="Principal" className={cn("af-glass z-30 flex items-center gap-1 rounded-full p-1.5 shadow-float-lg", fixed ? "fixed bottom-5 left-1/2 -translate-x-1/2" : "absolute bottom-4 left-1/2 -translate-x-1/2", className)}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            aria-label={it.label}
            aria-current={on ? "page" : undefined}
            className={cn("af-focus relative flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 transition-colors duration-200", on ? "text-accent" : "text-ink-2 hover:text-ink", ICON_CLASS)}
          >
            {on && <motion.span layoutId={`dock-${id}`} aria-hidden className="absolute inset-0 rounded-full bg-accent-50" transition={SPRING.snappy} />}
            <span className="relative">{it.icon}</span>
            {on && <span className="relative text-[13px] font-medium">{it.label}</span>}
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  AppShell                                                           */
/* ------------------------------------------------------------------ */
export interface AppShellProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  /** Dock para mobile (se muestra < md). */
  dock?: ReactNode;
  children: ReactNode;
  /** Embebido en una página (altura fija, bordes redondeados) en vez de pantalla completa. */
  embedded?: boolean;
  height?: string | number;
  className?: string;
  contentClassName?: string;
}

/**
 * Esqueleto de app: sidebar + topbar + contenido scrolleable + dock mobile.
 * `embedded` lo convierte en un objeto (radio 32 px) para mostrar dentro de una onepage.
 */
export function AppShell({ sidebar, topbar, dock, children, embedded, height = 720, className, contentClassName }: AppShellProps) {
  return (
    <div
      className={cn(
        "af-studio relative isolate flex overflow-hidden",
        embedded ? "af-surface-float rounded-2xl" : "min-h-screen",
        className,
      )}
      style={embedded ? { height } : undefined}
    >
      {sidebar && <div className="hidden shrink-0 border-r border-line md:block">{sidebar}</div>}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <main className={cn("scrollbar-thin relative flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6", contentClassName)}>{children}</main>
      </div>
      {dock && <div className="md:hidden">{dock}</div>}
    </div>
  );
}
