/**
 * Datos globales del sitio.
 *
 * IMPORTANTE: el nombre es provisional (tomado del blueprint, "Marketing + IA").
 * Los datos de contacto están vacíos a propósito: no se inventan. Cuando existan,
 * basta con completarlos aquí y el sitio los mostrará en header, footer, contacto y schema.
 */
export interface SiteConfig {
  name: string;
  description: string;
  lang: string;
  ogLocale: string;
  contact: { email: string; whatsapp: string; phone: string; city: string };
  legal: { name: string; address: string; privacyEmail: string; updated: string };
  social: { label: string; href: string }[];
  areaServed: string;
  formEndpoint: string;
}

export const site: SiteConfig = {
  /** Nombre provisional de la marca. Reemplazar cuando exista el nombre definitivo. */
  name: 'Marketing + IA',
  /** Descripción corta usada en metadatos y schema. */
  description:
    'Ayudamos a empresas a conseguir clientes, automatizar tareas y aprovechar la inteligencia artificial con publicidad digital, ChatGPT Ads, WhatsApp con IA, contenido, sitios web y automatización.',
  lang: 'es-MX',
  ogLocale: 'es_MX',

  /** Contacto directo. Dejar en blanco lo que todavía no exista. */
  contact: {
    email: '', // ej. 'hola@midominio.mx'
    /** Número en formato internacional sin espacios ni signos, ej. '5215512345678'. */
    whatsapp: '',
    phone: '', // ej. '+52 55 1234 5678'
    city: '', // ej. 'Ciudad de México'
  },

  /** Datos legales para el aviso de privacidad. Completar antes de publicar. */
  legal: {
    name: '', // razón social o nombre del responsable
    address: '', // domicilio para efectos del aviso de privacidad
    privacyEmail: '', // correo para solicitudes de derechos ARCO
    updated: '', // fecha de la última actualización del aviso, ej. '14 de octubre de 2026'
  },

  /** Perfiles sociales reales. Ej. { label: 'LinkedIn', href: 'https://www.linkedin.com/company/...' } */
  social: [],

  /** País donde se ofrece el servicio (schema.org areaServed). */
  areaServed: 'MX',

  /** Endpoint del formulario. Se define con PUBLIC_FORM_ENDPOINT en el entorno de build. */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
};

export const whatsappHref = (text?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : '';
