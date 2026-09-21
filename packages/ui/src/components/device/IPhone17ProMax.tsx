import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Tilt } from "../../animations/Tilt";

/**
 * iPhone 17 Pro Max — mockup CSS puro.
 *
 * Especificaciones usadas (para que las capturas de apps queden a escala real):
 *  - Pantalla 6.9" · resolución 1320×2868 px (@3x) · 460 ppi
 *  - Viewport lógico: 440 × 956 pt  ← el contenido hijo se renderiza en ese tamaño
 *  - Dynamic Island: 126 × 37 pt, a 11 pt del borde superior
 *  - Radio de pantalla ≈ 62 pt · bisel ≈ 9 pt · radio de cuerpo ≈ 70 pt
 *  - Botones: Acción (izq.), Volumen +/- (izq.), Lateral (der.), Control de cámara (der.)
 *  - Colores oficiales: Cosmic Orange · Deep Blue · Silver
 */
export const IPHONE_17_PRO_MAX = {
  width: 440,
  height: 956,
  screenRadius: 62,
  bezel: 9,
  island: { width: 126, height: 37, top: 11 },
  physical: { inches: 6.9, px: [1320, 2868], ppi: 460 },
} as const;

export type IPhoneColor = "deep-blue" | "cosmic-orange" | "silver" | "graphite";

const COLORS: Record<IPhoneColor, { frame: string; edge: string; highlight: string }> = {
  "deep-blue": { frame: "#1f3b66", edge: "#2c4f85", highlight: "#5b7db5" },
  "cosmic-orange": { frame: "#d9651f", edge: "#f0823a", highlight: "#ffb27a" },
  silver: { frame: "#c9ccd2", edge: "#e6e8ec", highlight: "#ffffff" },
  graphite: { frame: "#2a2a2c", edge: "#3a3a3d", highlight: "#6a6a6e" },
};

export interface IPhone17ProMaxProps {
  children?: ReactNode;
  /** Ancho final en px (el mockup escala proporcionalmente). Default 440 = escala 1. */
  width?: number;
  color?: IPhoneColor;
  className?: string;
  style?: CSSProperties;
  /** Muestra hora/señal/batería sobre el contenido. */
  statusBar?: boolean;
  /** Hora de la status bar. */
  time?: string;
  /** Flotación suave continua. */
  float?: boolean;
  /** Inclinación 3D siguiendo al cursor. */
  tilt?: boolean;
  /** Sombra/glow de marca debajo. */
  glow?: boolean;
  /** Fondo por defecto de la pantalla si no hay children. */
  screenClassName?: string;
}

/**
 * Uso:
 *   <IPhone17ProMax width={320} color="deep-blue" tilt float>
 *     <img src="captura.png" className="h-full w-full object-cover" />
 *   </IPhone17ProMax>
 *
 * El hijo vive en un contenedor de 440×956 (pt lógicos) con overflow-hidden;
 * podés poner una app real en React adentro y va a escalar con `width`.
 */
export function IPhone17ProMax({
  children, width = IPHONE_17_PRO_MAX.width, color = "deep-blue", className, style,
  statusBar = true, time = "9:41", float, tilt, glow = true, screenClassName,
}: IPhone17ProMaxProps) {
  const { width: W, height: H, screenRadius, bezel, island } = IPHONE_17_PRO_MAX;
  const frameW = W + bezel * 2;
  const frameH = H + bezel * 2;
  const s = width / frameW;
  const c = COLORS[color];

  const body = (
    <div
      className={cn("relative select-none", float && "animate-float", className)}
      style={{ width: frameW * s, height: frameH * s, ...style }}
    >
      {glow && (
        <div aria-hidden className="absolute inset-x-[10%] bottom-[-6%] h-[30%] rounded-full bg-primary-500/40 blur-3xl" />
      )}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: frameW, height: frameH, transform: `scale(${s})` }}
      >
        {/* Botones laterales */}
        <Btn side="left" top={168} h={34} c={c} />   {/* Acción */}
        <Btn side="left" top={230} h={66} c={c} />   {/* Vol + */}
        <Btn side="left" top={310} h={66} c={c} />   {/* Vol - */}
        <Btn side="right" top={252} h={100} c={c} /> {/* Lateral */}
        <Btn side="right" top={520} h={62} c={c} />  {/* Control de cámara */}

        {/* Cuerpo (aluminio) */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: screenRadius + bezel,
            background: `linear-gradient(160deg, ${c.edge} 0%, ${c.frame} 35%, ${c.frame} 65%, ${c.edge} 100%)`,
            boxShadow: `inset 0 0 0 1.5px ${c.highlight}55, inset 0 0 0 3px ${c.frame}, 0 40px 80px -30px rgb(0 0 0 / 0.7)`,
          }}
        />
        {/* Bisel negro */}
        <div className="absolute" style={{ inset: 3, borderRadius: screenRadius + bezel - 3, background: "#050505" }} />

        {/* Pantalla */}
        <div
          className={cn("absolute overflow-hidden bg-surface-1", screenClassName)}
          style={{ left: bezel, top: bezel, width: W, height: H, borderRadius: screenRadius }}
        >
          {children ?? <DefaultScreen />}

          {/* Dynamic Island */}
          <div
            aria-hidden
            className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
            style={{ top: island.top, width: island.width, height: island.height }}
          >
            <div className="absolute right-[10px] top-1/2 size-[11px] -translate-y-1/2 rounded-full bg-[#101418] ring-1 ring-white/5" />
          </div>

          {statusBar && <StatusBar time={time} />}

          {/* Home indicator */}
          <div aria-hidden className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[140px] -translate-x-1/2 rounded-full bg-white/90 mix-blend-difference" />
        </div>
      </div>
    </div>
  );

  return tilt ? <Tilt max={6} glare={false} className="inline-block">{body}</Tilt> : body;
}

function Btn({ side, top, h, c }: { side: "left" | "right"; top: number; h: number; c: { frame: string; edge: string } }) {
  return (
    <div
      aria-hidden
      className="absolute w-[3px] rounded-sm"
      style={{ top, height: h, [side]: -3, background: `linear-gradient(90deg, ${c.edge}, ${c.frame})` }}
    />
  );
}

/** Barra de estado iOS (hora, señal, wifi, batería). */
export function StatusBar({ time = "9:41", dark = false }: { time?: string; dark?: boolean }) {
  const col = dark ? "text-ink" : "text-white";
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[54px] items-end justify-between px-[38px] pb-[8px] text-[17px] font-semibold", col)} style={{ fontFamily: "-apple-system, 'SF Pro', Inter, sans-serif" }}>
      <span className="w-[54px]">{time}</span>
      <span className="flex items-center gap-[6px]">
        <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.3 0 4.4.9 6 2.3l1.4-1.5A10.5 10.5 0 0 0 8.5 0C5.6 0 3 1.2 1.1 3.4l1.4 1.5a8.3 8.3 0 0 1 6-2.3Zm0 3.5c1.4 0 2.6.5 3.6 1.4l1.4-1.5a7 7 0 0 0-10 0l1.4 1.5a5 5 0 0 1 3.6-1.4Zm0 3.4c.6 0 1.1.2 1.5.6L8.5 12 7 10.1c.4-.4.9-.6 1.5-.6Z" /></svg>
        <span className="relative ml-[2px] h-[12px] w-[27px] rounded-[4px] border-[1.5px] border-current opacity-90">
          <span className="absolute inset-[2px] right-[3px] rounded-[2px] bg-current" />
          <span className="absolute -right-[4px] top-[3px] h-[5px] w-[2px] rounded-r-sm bg-current opacity-60" />
        </span>
      </span>
    </div>
  );
}

function DefaultScreen() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center af-gradient-slow">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <span className="font-display text-[44px] font-semibold tracking-tight text-white">A Futuro</span>
      <span className="mt-2 font-mono text-[12px] uppercase tracking-[0.3em] text-white/70">iPhone 17 Pro Max</span>
      <span className="mt-1 font-mono text-[11px] text-white/50">440 × 956 pt</span>
    </div>
  );
}
