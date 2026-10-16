/**
 * Comportamiento global: navegación (escritorio y móvil), barra que se oculta
 * al bajar y entradas al hacer scroll.
 */

declare global {
  interface Window {
    __revealTimer?: number;
  }
}

const root = document.documentElement;
if (window.__revealTimer) clearTimeout(window.__revealTimer);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia('(min-width: 1180px)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

/* ---------------------------------------------------------------------------
 * Menús desplegables de escritorio
 * ------------------------------------------------------------------------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const triggers = [...document.querySelectorAll<HTMLButtonElement>('[data-mega-trigger]')];
const scrim = document.querySelector<HTMLElement>('[data-mega-scrim]');
let openId: string | null = null;
let hoverTimer: number | undefined;

const panelFor = (id: string) => document.querySelector<HTMLElement>(`[data-mega="${id}"]`);

function openMega(id: string, focusFirst = false) {
  if (openId === id) return;
  closeMega(false);
  const panel = panelFor(id);
  const trigger = triggers.find((t) => t.dataset.megaTrigger === id);
  if (!panel || !trigger) return;
  panel.setAttribute('data-open', '');
  trigger.setAttribute('aria-expanded', 'true');
  root.classList.add('mega-open');
  openId = id;
  if (!reduceMotion.matches) panel.querySelector<HTMLVideoElement>('[data-mega-video]')?.play().catch(() => {});
  if (focusFirst) panel.querySelector<HTMLElement>('a')?.focus();
}

function closeMega(returnFocus = false) {
  if (!openId) return;
  const id = openId;
  const openPanel = panelFor(id);
  openPanel?.removeAttribute('data-open');
  openPanel?.querySelector<HTMLVideoElement>('[data-mega-video]')?.pause();
  const trigger = triggers.find((t) => t.dataset.megaTrigger === id);
  trigger?.setAttribute('aria-expanded', 'false');
  root.classList.remove('mega-open');
  openId = null;
  if (returnFocus) trigger?.focus();
}

triggers.forEach((trigger) => {
  const id = trigger.dataset.megaTrigger!;
  trigger.addEventListener('click', () => (openId === id ? closeMega() : openMega(id)));
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMega(id, true);
    }
  });
  trigger.addEventListener('pointerenter', () => {
    if (!finePointer.matches) return;
    clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => openMega(id), openId ? 0 : 90);
  });
});

header?.addEventListener('pointerleave', () => {
  if (!finePointer.matches) return;
  clearTimeout(hoverTimer);
  hoverTimer = window.setTimeout(() => closeMega(), 220);
});
header?.addEventListener('pointerenter', () => clearTimeout(hoverTimer));
scrim?.addEventListener('click', () => closeMega());

document.querySelectorAll<HTMLElement>('[data-mega]').forEach((panel) => {
  panel.addEventListener('focusout', (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && !panel.contains(next) && !triggers.some((t) => t === next)) closeMega();
  });
});

/* ---------------------------------------------------------------------------
 * Indicador que se desliza entre las opciones de la cápsula
 * ------------------------------------------------------------------------- */
const navList = document.querySelector<HTMLElement>('.hdr__list');
const indicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
if (navList && indicator) {
  const moveTo = (item: HTMLElement | null) => {
    if (!item) {
      indicator.style.opacity = '0';
      return;
    }
    const navBox = indicator.parentElement!.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    indicator.style.width = `${box.width}px`;
    indicator.style.transform = `translateX(${box.left - navBox.left}px)`;
    indicator.style.opacity = '1';
  };
  const items = [...navList.querySelectorAll<HTMLElement>('[data-nav-item]')];
  items.forEach((item) => {
    item.addEventListener('pointerenter', () => moveTo(item));
    item.addEventListener('focus', () => moveTo(item));
  });
  navList.addEventListener('pointerleave', () => {
    const expanded = items.find((i) => i.getAttribute('aria-expanded') === 'true');
    moveTo(expanded ?? null);
  });
}

/* ---------------------------------------------------------------------------
 * Menú móvil
 * ------------------------------------------------------------------------- */
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');

function setMobileMenu(open: boolean) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  const label = menuToggle.querySelector<HTMLElement>('.menu-toggle__label');
  if (label) label.textContent = open ? label.dataset.labelOpen! : label.dataset.labelClosed!;
  mobileMenu.toggleAttribute('data-open', open);
  root.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
  if (open) lenis?.stop();
  else lenis?.start();
  if (open) {
    root.classList.remove('header-hidden');
    mobileMenu.querySelector<HTMLElement>('a, button')?.focus();
  }
}

menuToggle?.addEventListener('click', () => setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));

mobileMenu?.querySelectorAll<HTMLButtonElement>('[data-accordion]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.getAttribute('aria-controls')!);
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    if (panel) panel.hidden = !open;
  });
});

// Mantiene el foco dentro del menú móvil abierto.
mobileMenu?.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || !mobileMenu.hasAttribute('data-open')) return;
  const focusables = [
    ...mobileMenu.querySelectorAll<HTMLElement>('a, button'),
    menuToggle!,
  ].filter((el) => el.offsetParent !== null);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

desktop.addEventListener('change', (e) => {
  if (e.matches) setMobileMenu(false);
  else closeMega();
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (openId) closeMega(true);
  if (menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMobileMenu(false);
    menuToggle.focus();
  }
});

/* ---------------------------------------------------------------------------
 * Barra superior: se oculta al bajar, vuelve al subir
 * ------------------------------------------------------------------------- */
let lastY = window.scrollY;
let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (openId || root.classList.contains('menu-open')) {
        root.classList.remove('header-hidden');
      } else if (goingDown && y > 160) {
        root.classList.add('header-hidden');
      } else if (goingUp || y < 160) {
        root.classList.remove('header-hidden');
      }
      root.classList.toggle('is-scrolled', y > 24);
      if (goingDown || goingUp) lastY = y;
      ticking = false;
    });
  },
  { passive: true },
);

// Si el foco llega a la barra oculta (teclado), mostrarla.
header?.addEventListener('focusin', () => root.classList.remove('header-hidden'));

/* ---------------------------------------------------------------------------
 * Entradas al hacer scroll
 * ------------------------------------------------------------------------- */
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
revealables.forEach((el) => {
  if (el.dataset.reveal === 'self') return;
  [...el.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
});

if (reduceMotion.matches || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
}

export {};
