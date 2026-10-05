import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge no conoce las escalas de @theme: sin esto, `text-display-md` se pisa con `text-ink`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md", "display-sm", "label"] }],
      shadow: [{ shadow: ["float-xs", "float-sm", "float", "float-lg", "accent", "inset", "ring"] }],
    },
  },
});

/** Combina clases Tailwind resolviendo conflictos (p. ej. `p-4` vs `p-6`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
