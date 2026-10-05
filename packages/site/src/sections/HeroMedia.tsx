import { useEffect, useRef, useState } from "react";
import { LensGlare } from "@afuturo/ui";
import heroImg from "../assets/girl-hero-banner.webp";
import lensMask from "../assets/lens-mask.png";
import intro4k from "../assets/hero-intro-4k.webm";
import intro720 from "../assets/hero-intro-720p.webm";
import idle4k from "../assets/hero-idle-4k.webm";
import idle720 from "../assets/hero-idle-720p.webm";

/* Rectángulo del visor dentro del encuadre (fracciones), calculado contra imagenes/anteojos.png.
   El lente no se mueve en ningún video, así que sirve para la foto y para el idle. */
export const LENS = { x: 0.3438, y: 0.4115, w: 0.3094, h: 0.1904 };
const PHOTO = { width: 5504, height: 3072 };
const VIDEO = { width: 3840, height: 2160 };

/* Los videos exportados traen una franja negra horneada de ~0.46 % de alto arriba y abajo (medida en los 4 archivos).
   Se compensa escalando 1.2 % (0.6 % por lado), que la recorta sin tocar los archivos. Si se re-exportan sin franja,
   quitar `scale-[1.012]`. */
const VIDEO_CLASS = "absolute inset-0 h-full w-full scale-[1.012] object-cover";

/** Tope de seguridad por si el intro nunca arranca (red lenta, autoplay trabado). */
const MAX_INTRO_MS = 12000;
/** Cuánto esperamos al idle después de que el intro terminó, antes de rendirnos y mostrar la foto. */
const MAX_IDLE_WAIT_MS = 8000;

type Phase = "intro" | "idle" | "photo";

/** Baja un archivo entero a un blob en memoria (devuelve la URL) para que el video corra sin cortes. */
function useBlobUrl(src: string, enabled: boolean, onFail: () => void) {
  const [url, setUrl] = useState<string | null>(null);
  const fail = useRef(onFail);
  fail.current = onFail;
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let made: string | null = null;
    fetch(src)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.blob(); })
      .then((b) => { if (cancelled) return; made = URL.createObjectURL(b); setUrl(made); })
      .catch(() => { if (!cancelled) fail.current(); });
    return () => { cancelled = true; if (made) URL.revokeObjectURL(made); };
  }, [src, enabled]);
  return url;
}

/**
 * Fondo del hero en tres fases:
 *  1. `intro`: video de entrada (su último frame = la foto). Sin reflejo.
 *  2. `idle`: video en bucle (el lente no se mueve) con el reflejo del cursor encima del visor.
 *  3. `photo`: foto fija + reflejo. Fallback si algo falla (autoplay bloqueado, error, reduced-motion).
 *
 * Transición intro → idle: corte directo, sin crossfade (se quitó a pedido). El idle (en 720p, liviano) se precarga
 * completo mientras corre el intro y arranca desde 0 en el mismo instante en que el intro termina. Si todavía
 * no está listo, el intro espera congelado en su último frame.
 *
 * Calidad: el idle siempre arranca en 720p; en pantallas grandes el 4K se baja en segundo plano y, cuando
 * está completo, reemplaza al 720p sin corte, retomando el bucle en el mismo instante.
 */
export function HeroMedia() {
  const introRef = useRef<HTMLVideoElement>(null);
  const idleLoRef = useRef<HTMLVideoElement>(null);
  const idleHiRef = useRef<HTMLVideoElement>(null);

  const [phase, setPhase] = useState<Phase>(() => (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "photo" : "intro"));
  const [introGone, setIntroGone] = useState(phase !== "intro");
  const [introPlaying, setIntroPlaying] = useState(false);
  const [loReady, setLoReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [hiLive, setHiLive] = useState(false);
  const [loGone, setLoGone] = useState(false);

  // 4K solo en pantallas grandes o densas. Elegido en JS: `media` en <source> no es fiable.
  const [big] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1920px), ((min-width: 1280px) and (min-resolution: 1.5dppx))").matches);
  const introSrc = big ? intro4k : intro720;
  const toPhoto = () => setPhase("photo");

  // precarga: el idle 720p apenas el intro ya está reproduciendo; el 4K recién cuando el idle empezó a correr
  const loUrl = useBlobUrl(idle720, introPlaying, toPhoto);
  const hiUrl = useBlobUrl(idle4k, big && started, () => { /* sin 4K nos quedamos en 720p */ });

  // intro: arrancar; si no puede, foto
  useEffect(() => {
    if (phase !== "intro") return;
    const v = introRef.current;
    if (!v) return;
    const t = window.setTimeout(toPhoto, MAX_INTRO_MS);
    v.play().catch(toPhoto);
    return () => window.clearTimeout(t);
  }, [phase]);

  // disparador: el intro terminó y el idle ya está listo (si el intro termina antes, espera congelado)
  useEffect(() => {
    if (phase !== "intro" || !loReady || started) return;
    const v = introRef.current;
    if (!v) return;
    if (v.ended) { setStarted(true); return; }
    const onEnded = () => setStarted(true);
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [phase, loReady, started]);

  // si el intro terminó y el idle sigue sin estar listo mucho tiempo, foto
  useEffect(() => {
    if (phase !== "intro" || loReady) return;
    const v = introRef.current;
    if (!v) return;
    let t = 0;
    const onEnded = () => { t = window.setTimeout(toPhoto, MAX_IDLE_WAIT_MS); };
    v.addEventListener("ended", onEnded);
    return () => { v.removeEventListener("ended", onEnded); window.clearTimeout(t); };
  }, [phase, loReady]);

  // el idle arranca desde 0 y pasamos a la fase idle (con reflejo)
  useEffect(() => {
    if (!started) return;
    const v = idleLoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPhase("idle"), toPhoto);
  }, [started]);

  // el intro sale del DOM cuando el idle ya está dibujando (o se cayó a la foto)
  useEffect(() => {
    if (phase === "intro" || introGone) return;
    const t = window.setTimeout(() => setIntroGone(true), 300);
    return () => window.clearTimeout(t);
  }, [phase, introGone]);

  // 4K listo: retoma el bucle en el mismo instante que el 720p y, ya corriendo, lo reemplaza
  const hiStarted = useRef(false);
  const onHiReady = () => {
    const hi = idleHiRef.current, lo = idleLoRef.current;
    if (!hi || hiStarted.current) return;
    hiStarted.current = true;
    if (lo && !lo.paused) hi.currentTime = lo.currentTime;
    hi.play().catch(() => { /* seguimos en 720p */ });
  };
  const onHiPlaying = () => {
    setHiLive(true);
    window.setTimeout(() => setLoGone(true), 300);
  };

  const showVideos = phase !== "photo";

  return (
    <>
      {/* base: la foto, solo visible si el idle no puede reproducir */}
      <img src={heroImg} alt="" fetchPriority="high" className={`relative transition-opacity duration-500 ease-out ${phase === "photo" ? "opacity-100" : "opacity-0"}`} />

      {/* intro: queda congelado en su último frame hasta que el idle está corriendo */}
      {!introGone && (
        <video
          ref={introRef}
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setIntroPlaying(true)}
          onError={toPhoto}
          className={VIDEO_CLASS}
          src={introSrc}
        />
      )}

      {/* idle 720p: invisible hasta que arranca; se retira cuando el 4K lo reemplaza */}
      {showVideos && loUrl && !loGone && (
        <video
          ref={idleLoRef}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlayThrough={() => setLoReady(true)}
          onError={toPhoto}
          className={`${VIDEO_CLASS} ${started ? "opacity-100" : "opacity-0"}`}
          src={loUrl}
        />
      )}

      {/* idle 4K: se carga detrás, invisible, y aparece de golpe (mismo frame) cuando ya está corriendo */}
      {showVideos && hiUrl && (
        <video
          ref={idleHiRef}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlayThrough={onHiReady}
          onPlaying={onHiPlaying}
          onError={() => { /* seguimos en 720p */ }}
          className={`${VIDEO_CLASS} ${hiLive ? "opacity-100" : "opacity-0"}`}
          src={hiUrl}
        />
      )}

      {phase !== "intro" && <LensGlare image={phase === "photo" ? PHOTO : VIDEO} rect={LENS} mask={lensMask} />}
    </>
  );
}
