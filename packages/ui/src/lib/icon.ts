/** Props estándar para íconos Lucide: 18 px, trazo 1.6. Spread: `<Zap {...ICON} />`. */
export const ICON = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const;
export const ICON_SM = { size: 16, strokeWidth: 1.6, absoluteStrokeWidth: true } as const;
export const ICON_LG = { size: 22, strokeWidth: 1.6, absoluteStrokeWidth: true } as const;

/** Clases para forzar el estándar en SVGs hijos (cuando no se puede pasar props). */
export const ICON_CLASS = "[&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:stroke-[1.6]";
