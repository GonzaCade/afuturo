import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases Tailwind resolviendo conflictos (p. ej. `p-4` vs `p-6`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
