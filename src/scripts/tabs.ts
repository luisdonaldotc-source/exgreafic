/**
 * Pestañas accesibles (patrón WAI-ARIA). Estructura esperada:
 * [data-tabs] > [data-tablist][hidden] > [role=tab][aria-controls]
 *            > [data-panel][id]
 * Sin JS, la lista de pestañas queda oculta y todos los paneles visibles.
 */
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  if (root.classList.contains('is-enhanced')) return;
  const list = root.querySelector<HTMLElement>('[data-tablist]');
  if (!list) return;
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
  list.hidden = false;
  root.classList.add('is-enhanced');

  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      const on = p.id === tab.getAttribute('aria-controls');
      p.hidden = !on;
      if (on) p.dispatchEvent(new CustomEvent('tabshow', { bubbles: true }));
    });
    if (focus) tab.focus();
  };

  select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0]);

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const map: Record<string, number> = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (e.key in map) {
        e.preventDefault();
        select(tabs[map[e.key]], true);
      }
    });
  });
});

export {};
