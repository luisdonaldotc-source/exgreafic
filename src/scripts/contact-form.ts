/**
 * Formulario de contacto: preselección de tema, validación en español,
 * envío con fetch y estados de éxito / error.
 */

const forms = document.querySelectorAll<HTMLFormElement>('[data-contact-form]');
const params = new URLSearchParams(window.location.search);
const presetTopic = params.get('tema');

const fieldMessage = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string => {
  if (el.validity.valueMissing) return el.dataset.error ?? 'Completa este campo.';
  if (el.validity.typeMismatch || el.validity.patternMismatch)
    return el.dataset.errorFormat ?? el.dataset.error ?? 'Revisa este campo.';
  return '';
};

forms.forEach((form) => {
  const done = form.nextElementSibling as HTMLElement | null;
  const status = form.querySelector<HTMLElement>('[data-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const endpoint = form.dataset.endpoint ?? '';

  // Preselecciona el tema que llega en la URL (?tema=whatsapp).
  if (presetTopic) {
    const select = form.querySelector<HTMLSelectElement>('select[name="tema"]');
    if (select && [...select.options].some((o) => o.value === presetTopic)) select.value = presetTopic;
    const radio = form.querySelector<HTMLInputElement>(`input[name="tema"][value="${CSS.escape(presetTopic)}"]`);
    if (radio) radio.checked = true;
  }

  const showError = (control: HTMLElement, message: string) => {
    const name = control.getAttribute('name') ?? (control as HTMLFieldSetElement).querySelector('input')?.name;
    const box = form.querySelector<HTMLElement>(`#${form.id}-${name}-error`);
    if (box) box.textContent = message;
    const target = control.matches('fieldset') ? control.querySelectorAll('input') : [control];
    target.forEach((t) => {
      if (message) {
        t.setAttribute('aria-invalid', 'true');
        if (box) t.setAttribute('aria-describedby', box.id);
      } else {
        t.removeAttribute('aria-invalid');
      }
    });
  };

  const validate = (): HTMLElement | null => {
    let firstInvalid: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[required]:not([type="radio"]), select[required]').forEach((el) => {
      const message = fieldMessage(el);
      showError(el, message);
      if (message && !firstInvalid) firstInvalid = el;
    });
    const group = form.querySelector<HTMLFieldSetElement>('fieldset.choices');
    if (group) {
      const checked = group.querySelector('input:checked');
      showError(group, checked ? '' : group.dataset.error ?? '');
      if (!checked && !firstInvalid) firstInvalid = group.querySelector('input');
    }
    return firstInvalid;
  };

  // Limpia el error en cuanto el campo se corrige.
  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true' && !fieldMessage(el)) showError(el, '');
  });
  form.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.type === 'radio') {
      const group = form.querySelector<HTMLFieldSetElement>('fieldset.choices');
      if (group) showError(group, '');
    } else if (el.matches('select') && !fieldMessage(el)) {
      showError(el, '');
    }
  });

  const setStatus = (message: string, tone: 'info' | 'error' = 'info') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const finish = () => {
    form.hidden = true;
    if (done) {
      done.hidden = false;
      done.focus();
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');

    const invalid = validate();
    if (invalid) {
      invalid.focus();
      setStatus('Revisa los campos marcados.', 'error');
      return;
    }

    const data = new FormData(form);

    // Trampa para bots: si el campo oculto tiene texto, no se envía nada.
    if (String(data.get('sitio_web') ?? '').trim()) {
      finish();
      return;
    }

    if (!endpoint) {
      const alt = [form.dataset.email && `escríbenos a ${form.dataset.email}`, form.dataset.wa && 'mándanos un WhatsApp']
        .filter(Boolean)
        .join(' o ');
      setStatus(
        `Este formulario todavía no está conectado a un servicio de envío.${alt ? ` Mientras tanto, ${alt}.` : ''}`,
        'error',
      );
      console.warn('[formulario] Define PUBLIC_FORM_ENDPOINT para recibir mensajes.');
      return;
    }

    button?.setAttribute('aria-busy', 'true');
    const label = button?.querySelector<HTMLElement>('[data-label]');
    const original = label?.textContent ?? '';
    if (label) label.textContent = 'Enviando…';

    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      finish();
    } catch {
      setStatus('No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.', 'error');
    } finally {
      button?.removeAttribute('aria-busy');
      if (label) label.textContent = original;
    }
  });
});

export {};
