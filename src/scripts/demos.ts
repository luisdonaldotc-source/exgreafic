/**
 * Demostraciones animadas (ilustrativas) de IA, anuncios y WhatsApp.
 * Corren solo cuando están en pantalla; con movimiento reducido muestran el estado final.
 *
 *   [data-demo="stream"]  tarea escrita + respuesta en streaming (data-tasks = JSON)
 *   [data-demo="ads"]     pregunta en chat, respuesta y anuncio separado
 *   [data-demo="chat"]    conversación de WhatsApp con indicador de escritura
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Runner = { start(): void; stop(): void };

async function typeInto(el: HTMLElement, text: string, speed: number, alive: () => boolean) {
  el.textContent = '';
  for (let i = 0; i < text.length; i++) {
    if (!alive()) return;
    el.textContent += text[i];
    await sleep(speed + (text[i] === ' ' ? 0 : Math.random() * speed * 0.6));
  }
}

/* ---------- IA: tarea + respuesta en streaming ---------- */
function streamDemo(root: HTMLElement): Runner {
  const tasks: { label: string; prompt: string; answer: string[] }[] = JSON.parse(root.dataset.tasks ?? '[]');
  const promptEl = root.querySelector<HTMLElement>('[data-prompt]')!;
  const outEl = root.querySelector<HTMLElement>('[data-output]')!;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-task]')];
  let run = 0;
  let index = 0;
  let running = false;

  const render = async (i: number, id: number) => {
    const alive = () => running && id === run;
    const t = tasks[i];
    tabs.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    root.classList.remove('is-done');
    outEl.innerHTML = '';
    if (reduce) {
      promptEl.textContent = t.prompt;
      outEl.innerHTML = t.answer.map((l) => `<p>${l}</p>`).join('');
      root.classList.add('is-done');
      return;
    }
    await typeInto(promptEl, t.prompt, 22, alive);
    if (!alive()) return;
    root.classList.add('is-thinking');
    await sleep(900);
    root.classList.remove('is-thinking');
    for (const line of t.answer) {
      if (!alive()) return;
      const p = document.createElement('p');
      outEl.appendChild(p);
      const words = line.split(' ');
      for (const w of words) {
        if (!alive()) return;
        p.textContent += (p.textContent ? ' ' : '') + w;
        await sleep(38 + Math.random() * 40);
      }
      await sleep(180);
    }
    root.classList.add('is-done');
    await sleep(3200);
    if (alive() && root.dataset.autoplay !== 'false') {
      index = (index + 1) % tasks.length;
      render(index, ++run);
    }
  };

  tabs.forEach((b, k) =>
    b.addEventListener('click', () => {
      index = k;
      running = true;
      render(k, ++run);
    }),
  );

  return {
    start() {
      if (running) return;
      running = true;
      render(index, ++run);
    },
    stop() {
      running = false;
      run++;
    },
  };
}

/* ---------- Anuncios: chat + anuncio separado ---------- */
function adsDemo(root: HTMLElement): Runner {
  const q = root.querySelector<HTMLElement>('[data-q]')!;
  const a = root.querySelector<HTMLElement>('[data-a]')!;
  const qText = q.dataset.text ?? '';
  const aText = a.dataset.text ?? '';
  let running = false;
  let run = 0;

  const play = async (id: number) => {
    const alive = () => running && id === run;
    root.className = root.className.replace(/\bstage-\d\b/g, '').trim();
    if (reduce) {
      q.textContent = qText;
      a.textContent = aText;
      root.classList.add('stage-3');
      return;
    }
    q.textContent = '';
    a.textContent = '';
    root.classList.add('stage-1');
    await typeInto(q, qText, 26, alive);
    if (!alive()) return;
    root.classList.add('stage-2');
    await sleep(700);
    const words = aText.split(' ');
    for (const w of words) {
      if (!alive()) return;
      a.textContent += (a.textContent ? ' ' : '') + w;
      await sleep(45);
    }
    root.classList.add('stage-3');
    await sleep(4200);
    if (alive()) play(++run);
  };

  return {
    start() {
      if (running) return;
      running = true;
      play(++run);
    },
    stop() {
      running = false;
      run++;
    },
  };
}

/* ---------- WhatsApp: mensajes con indicador de escritura ---------- */
function chatDemo(root: HTMLElement): Runner {
  const items = [...root.querySelectorAll<HTMLElement>('[data-msg]')];
  const typing = root.querySelector<HTMLElement>('[data-typing]');
  const list = root.querySelector<HTMLElement>('[data-chat-list]');
  let running = false;
  let run = 0;

  const play = async (id: number) => {
    const alive = () => running && id === run;
    if (reduce) {
      items.forEach((m) => m.classList.add('is-shown'));
      return;
    }
    items.forEach((m) => m.classList.remove('is-shown'));
    if (list) list.scrollTop = 0;
    await sleep(500);
    for (const m of items) {
      if (!alive()) return;
      const fromBot = m.dataset.msg === 'bot';
      if (fromBot && typing) {
        typing.classList.add('is-shown');
        m.before(typing);
        await sleep(900 + Math.min(1400, (m.textContent?.length ?? 0) * 12));
        typing.classList.remove('is-shown');
      } else {
        await sleep(800);
      }
      if (!alive()) return;
      m.classList.add('is-shown');
      if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
      await sleep(350);
    }
    await sleep(4000);
    if (alive()) play(++run);
  };

  return {
    start() {
      if (running) return;
      running = true;
      play(++run);
    },
    stop() {
      running = false;
      run++;
    },
  };
}

const factories: Record<string, (el: HTMLElement) => Runner> = {
  stream: streamDemo,
  ads: adsDemo,
  chat: chatDemo,
};

document.querySelectorAll<HTMLElement>('[data-demo]').forEach((el) => {
  if (el.dataset.demoReady) return;
  el.dataset.demoReady = '1';
  const make = factories[el.dataset.demo ?? ''];
  if (!make) return;
  const runner = make(el);
  if (!('IntersectionObserver' in window)) {
    runner.start();
    return;
  }
  new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? runner.start() : runner.stop())),
    { threshold: 0.35 },
  ).observe(el);
});

export {};
