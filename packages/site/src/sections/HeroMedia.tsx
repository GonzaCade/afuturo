import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/girl-hero-banner.webp";
import intro4k from "../assets/hero-intro-4k.webm";
import intro1080 from "../assets/hero-intro-1080p.webm";
import intro720 from "../assets/hero-intro-720p.webm";
import idle4k from "../assets/hero-idle-4k.webm";
import idle1080 from "../assets/hero-idle-1080p.webm";
import idle720 from "../assets/hero-idle-720p.webm";

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
 *  1. `intro`: video de entrada (su último frame = la foto). 
 *  2. `idle`: video en bucle.
 *  3. `photo`: foto fija. Fallback si algo falla (autoplay bloqueado, error, reduced-motion).
 *
 * Transición intro → idle: corte directo con un glitch corto (`.hero-glitch` en styles.css), sin crossfade (se quitó a pedido). El idle 720p (liviano) se precarga
 * completo mientras corre el intro y arranca desde 0 en el mismo instante en que el intro termina. Si todavía
 * no está listo, el intro espera congelado en su último frame.
 *
 * Calidad del idle, en cadena: 720p → 1080p → 4K (4K solo en pantallas grandes). Cada nivel se baja entero a un blob
 * recién cuando el anterior ya está en pantalla. Al estar listo, se posiciona en el frame en curso del nivel
 * anterior, se reproduce y recién cuando presenta su primer frame se muestra: el bucle no se reinicia.
 */
export function HeroMedia() {
  const introRef = useRef<HTMLVideoElement>(null);
  const idleLoRef = useRef<HTMLVideoElement>(null);

  const [phase, setPhase] = useState<Phase>(() => (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "photo" : "intro"));
  const [introGone, setIntroGone] = useState(phase !== "intro");
  const [introPlaying, setIntroPlaying] = useState(false);
  const [loReady, setLoReady] = useState(false);
  const [started, setStarted] = useState(false);
  // mejor nivel ya en pantalla (0 = 720p) y primer nivel que sigue montado
  const [level, setLevel] = useState(0);
  const [kept, setKept] = useState(0);

  // 4K solo en pantallas grandes o densas; el intro usa 1080p en pantallas medianas. Elegido en JS: `media` en <source> no es fiable.
  const [big] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1920px), ((min-width: 1280px) and (min-resolution: 1.5dppx))").matches);
  const [mid] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  const introSrc = big ? intro4k : mid ? intro1080 : intro720;
  // mejoras del idle sobre el 720p, en orden
  const upgrades = big ? [idle1080, idle4k] : [idle1080];
  const toPhoto = () => setPhase("photo");

  // precarga: el idle 720p apenas el intro ya está reproduciendo; las mejoras después, una a la vez
  const loUrl = useBlobUrl(idle720, introPlaying, toPhoto);
  const layers = useRef<(HTMLVideoElement | null)[]>([]);

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

  // el nivel anterior sale del DOM cuando el siguiente ya está dibujando
  useEffect(() => {
    if (kept >= level) return;
    const t = window.setTimeout(() => setKept(level), 300);
    return () => window.clearTimeout(t);
  }, [level, kept]);

  // el intro sale del DOM cuando el idle ya está dibujando (o se cayó a la foto)
  useEffect(() => {
    if (phase === "intro" || introGone) return;
    const t = window.setTimeout(() => setIntroGone(true), 800);
    return () => window.clearTimeout(t);
  }, [phase, introGone]);

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
          className={`${VIDEO_CLASS} ${started ? "hero-glitch-out" : ""}`}
          src={introSrc}
        />
      )}

      {/* idle 720p: invisible hasta que arranca; se retira cuando el siguiente nivel lo reemplaza */}
      {showVideos && loUrl && kept < 1 && (
        <video
          ref={(el) => { idleLoRef.current = el; layers.current[0] = el; }}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlayThrough={() => setLoReady(true)}
          onError={toPhoto}
          className={`${VIDEO_CLASS} ${started ? "opacity-100 hero-glitch" : "opacity-0"}`}
          src={loUrl}
        />
      )}

      {/* mejoras 1080p y 4K: se cargan detrás, invisibles, y aparecen de golpe (mismo frame) ya corriendo */}
      {showVideos && started && upgrades.map((src, i) => kept < i + 2 && (
        <IdleUpgrade
          key={src}
          src={src}
          enabled={level === i}
          videoRef={(el) => { layers.current[i + 1] = el; }}
          getBase={() => layers.current[i] ?? null}
          onLive={() => setLevel(i + 1)}
        />
      ))}
    </>
  );
}

/** Una mejora de calidad del idle: se baja completa, toma el frame en curso del nivel anterior y recién entonces se muestra. */
function IdleUpgrade({ src, enabled, videoRef, getBase, onLive }: {
  src: string;
  enabled: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
  getBase: () => HTMLVideoElement | null;
  onLive: () => void;
}) {
  const url = useBlobUrl(src, enabled, () => { /* sin esta mejora nos quedamos en el nivel actual */ });
  const el = useRef<HTMLVideoElement | null>(null);
  const [live, setLive] = useState(false);
  const begun = useRef(false);

  const onReady = () => {
    const v = el.current;
    if (!v || begun.current) return;
    begun.current = true;
    const play = () => {
      v.play().then(() => {
        const show = () => { setLive(true); onLive(); };
        if ("requestVideoFrameCallback" in v) v.requestVideoFrameCallback(show); else show();
      }).catch(() => { /* seguimos en el nivel actual */ });
    };
    const base = getBase();
    const t = base && v.duration ? base.currentTime % v.duration : 0;
    if (Math.abs(v.currentTime - t) < 0.001) { play(); return; }
    v.addEventListener("seeked", play, { once: true });
    v.currentTime = t;
  };

  if (!url) return null;
  return (
    <video
      ref={(n) => { el.current = n; videoRef(n); }}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onCanPlayThrough={onReady}
      onError={() => { /* seguimos en el nivel actual */ }}
      className={`${VIDEO_CLASS} ${live ? "opacity-100" : "opacity-0"}`}
      src={url}
    />
  );
}
