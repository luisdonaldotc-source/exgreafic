/**
 * Capa de movimiento: scroll suave (Lenis) + coreografía con GSAP/ScrollTrigger.
 * Todo se activa con atributos data-* para que cualquier sección pueda usarlo:
 *
 *   data-split          titular que entra palabra por palabra
 *   data-scrub          párrafo cuyas palabras se iluminan al hacer scroll
 *   data-count          número que cuenta hasta su valor (data-count="1.2", data-decimals, data-prefix, data-suffix)
 *   data-parallax="n"   desplazamiento vertical relativo al scroll (n = intensidad, ej. 0.15)
 *   data-scale-in       imagen o video que crece al entrar
 *   data-hscroll        sección fijada con scroll horizontal (hijo: data-hscroll-track)
 *   data-magnetic       botón que sigue ligeramente al cursor
 *   data-spotlight      tarjeta con luz que sigue al cursor (CSS: --mx, --my)
 *
 * Con prefers-reduced-motion todo queda en su estado final y sin scroll suave.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Scroll suave ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
}

/* ---------- Utilidades ---------- */
function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone) return [...el.querySelectorAll<HTMLElement>('.sw__in')];
  const label = el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const outer = document.createElement('span');
          outer.className = 'sw';
          const inner = document.createElement('span');
          inner.className = 'sw__in';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(inner);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).matches('br, svg, img')) {
        walk(child);
      }
    });
  };
  walk(el);
  // Los lectores de pantalla leen una copia íntegra del texto; las palabras sueltas se ocultan.
  const copy = document.createElement('span');
  copy.className = 'visually-hidden';
  copy.textContent = label;
  el.prepend(copy);
  el.querySelectorAll('.sw').forEach((w) => w.setAttribute('aria-hidden', 'true'));
  el.dataset.splitDone = '1';
  return words;
}

const formatNumber = (value: number, decimals: number) =>
  value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace(',', ',');

/* ---------- Efectos al hacer scroll ---------- */
if (!reduce) {
  // Titulares palabra por palabra.
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 115,
      rotate: 4,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.045,
      delay: el.dataset.splitDelay ? Number(el.dataset.splitDelay) : 0,
      scrollTrigger: el.hasAttribute('data-split-now') ? undefined : { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Palabras que se iluminan con el scroll.
  document.querySelectorAll<HTMLElement>('[data-scrub]').forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 60%', scrub: true },
      },
    );
  });

  // Contadores.
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const state = { v: 0 };
    el.textContent = `${prefix}${formatNumber(0, decimals)}${suffix}`;
    gsap.to(state, {
      v: target,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${formatNumber(state.v, decimals)}${suffix}`;
      },
    });
  });

  // Parallax.
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 0.15);
    gsap.fromTo(
      el,
      { yPercent: -amount * 50 },
      {
        yPercent: amount * 50,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Medios que crecen al entrar.
  document.querySelectorAll<HTMLElement>('[data-scale-in]').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.86, borderRadius: '48px' },
      {
        scale: 1,
        borderRadius: '20px',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true },
      },
    );
  });

  // Scroll horizontal fijado (solo escritorio).
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      const progress = section.querySelector<HTMLElement>('[data-hscroll-progress]');
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => progress?.style.setProperty('--p', String(self.progress)),
        },
      });
    });
  });
}

/* ---------- Botones magnéticos ---------- */
if (!reduce && finePointer) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic || 0.3);
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ---------- Tarjetas con luz que sigue al cursor ---------- */
if (finePointer) {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Videos: solo se reproducen cuando se ven ---------- */
const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
if (videos.length && 'IntersectionObserver' in window) {
  const vio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      });
    },
    { threshold: 0.05 },
  );
  videos.forEach((v) => vio.observe(v));
}

// Recalcula posiciones cuando terminan de cargar fuentes e imágenes, y cada vez
// que cambia la altura de la página (acordeones, demos, imágenes diferidas).
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
if ('ResizeObserver' in window) {
  let lastHeight = document.body.scrollHeight;
  let timer = 0;
  new ResizeObserver(() => {
    const height = document.body.scrollHeight;
    if (Math.abs(height - lastHeight) < 2) return;
    lastHeight = height;
    clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
  }).observe(document.body);
}

export {};
