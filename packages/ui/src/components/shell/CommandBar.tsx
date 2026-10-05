import { useState, type ReactNode, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";

export interface CommandBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Atajo mostrado a la derecha. */
  shortcut?: string;
  icon?: ReactNode;
  /** Acciones a la derecha (IconButtons). */
  actions?: ReactNode;
  /** Flotante (glass + sombra fuerte) o embebida en una barra. */
  floating?: boolean;
  className?: string;
}

/** Barra de comandos / búsqueda en pill. Foco = anillo de acento. */
export function CommandBar({ shortcut = "⌘K", icon, actions, floating, className, placeholder = "Buscar o escribir un comando…", ...rest }: CommandBarProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={cn(
        "flex h-11 items-center gap-3 rounded-full pl-4 pr-2 transition-[box-shadow,border-color] duration-200",
        floating ? "af-glass shadow-float-lg" : "af-inset border border-transparent",
        focus && "border-accent-200 bg-surface shadow-[0_0_0_3px_rgb(23_107_255_/_0.12)]",
        ICON_CLASS,
        className,
      )}
    >
      <span className="text-ink-3">{icon ?? <Search />}</span>
      <input
        type="search"
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
      {shortcut && !focus && <kbd className="hidden rounded-sm border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-3 sm:inline-block">{shortcut}</kbd>}
      {actions && <span className="flex items-center gap-1">{actions}</span>}
    </div>
  );
}

export interface FloatingControlsProps {
  children: ReactNode;
  /** Posición cuando es `fixed`. */
  position?: "bottom-center" | "bottom-right" | "top-right" | "static";
  className?: string;
}

/** Grupo flotante de IconButtons en pill de vidrio. */
export function FloatingControls({ children, position = "static", className }: FloatingControlsProps) {
  const POS = {
    "bottom-center": "fixed bottom-6 left-1/2 z-40 -translate-x-1/2",
    "bottom-right": "fixed bottom-6 right-6 z-40",
    "top-right": "fixed right-6 top-6 z-40",
    static: "relative",
  };
  return (
    <div className={cn("af-glass inline-flex items-center gap-1 rounded-full p-1.5 shadow-float-lg", POS[position], className)}>
      {children}
    </div>
  );
}
