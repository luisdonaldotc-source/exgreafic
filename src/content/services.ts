/**
 * Catálogo de servicios: fuente única para navegación, footer, enlaces
 * relacionados, schema.org y llms.txt. El contenido largo de cada página
 * vive en su archivo (páginas propias) o en servicePages.ts (páginas por bloques).
 */

export type Family = 'ia' | 'publicidad' | 'contenido' | 'web';

export interface Service {
  slug: string;
  family: Family;
  path: string;
  /** Nombre tal como aparece en menús y enlaces. */
  name: string;
  /** Una línea en lenguaje de negocio: lo que el cliente compra realmente. */
  summary: string;
  /** Subgrupo dentro de la familia (para el menú de Web y Automatización). */
  group?: string;
}

export interface FamilyInfo {
  id: Family;
  name: string;
  path: string;
  summary: string;
  /** Texto del enlace al hub dentro del menú. */
  hubLink: string;
}

export const families: FamilyInfo[] = [
  {
    id: 'ia',
    name: 'Inteligencia Artificial',
    path: '/inteligencia-artificial/',
    summary: 'IA para el trabajo de todos los días: asistentes, flujos de trabajo, capacitación y WhatsApp.',
    hubLink: 'Cómo usamos la IA',
  },
  {
    id: 'publicidad',
    name: 'Publicidad',
    path: '/publicidad/',
    summary: 'Campañas en ChatGPT, Google, Meta, LinkedIn y video según dónde está la oportunidad.',
    hubLink: 'Cómo elegimos los canales',
  },
  {
    id: 'contenido',
    name: 'Estrategia y Contenido',
    path: '/estrategia-y-contenido/',
    summary: 'El plan, las piezas y la presencia constante en redes y perfiles comerciales.',
    hubLink: 'Estrategia digital y contenido',
  },
  {
    id: 'web',
    name: 'Web y Automatización',
    path: '/web-y-automatizacion/',
    summary: 'Lo que convierte, da seguimiento y mide después del clic.',
    hubLink: 'Cómo se conectan las piezas',
  },
];

export const services: Service[] = [
  // ---------- Inteligencia Artificial ----------
  {
    slug: 'ia-para-tu-negocio',
    family: 'ia',
    path: '/inteligencia-artificial/ia-para-tu-negocio/',
    name: 'IA aplicada a tu negocio',
    summary: 'Asistentes y flujos construidos alrededor de un proceso de tu negocio.',
  },
  {
    slug: 'capacitacion',
    family: 'ia',
    path: '/inteligencia-artificial/capacitacion/',
    name: 'Capacitación y acompañamiento',
    summary: 'Para personas y equipos que quieren trabajar mejor con IA.',
  },
  {
    slug: 'whatsapp-con-ia',
    family: 'ia',
    path: '/inteligencia-artificial/whatsapp-con-ia/',
    name: 'WhatsApp con IA',
    summary: 'Responder, orientar, calificar y pasar a una persona cuando hace falta.',
  },

  // ---------- Publicidad ----------
  {
    slug: 'chatgpt-ads',
    family: 'publicidad',
    path: '/publicidad/chatgpt-ads/',
    name: 'ChatGPT Ads',
    summary: 'Anuncios mientras una persona explora y compara opciones.',
  },
  {
    slug: 'google-ads',
    family: 'publicidad',
    path: '/publicidad/google-ads/',
    name: 'Google Ads',
    summary: 'Captar a quien ya está buscando lo que vendes.',
  },
  {
    slug: 'meta-ads',
    family: 'publicidad',
    path: '/publicidad/meta-ads/',
    name: 'Meta Ads',
    summary: 'Facebook e Instagram: demanda, mensajes y remarketing.',
  },
  {
    slug: 'linkedin-ads',
    family: 'publicidad',
    path: '/publicidad/linkedin-ads/',
    name: 'LinkedIn Ads',
    summary: 'Llegar a perfiles B2B por empresa, cargo e industria.',
  },
  {
    slug: 'tiktok-y-youtube-ads',
    family: 'publicidad',
    path: '/publicidad/tiktok-y-youtube-ads/',
    name: 'TikTok y YouTube Ads',
    summary: 'Video cuando explica mejor que una imagen.',
  },

  // ---------- Estrategia y Contenido ----------
  {
    slug: 'estrategia-y-creacion-de-contenido',
    family: 'contenido',
    path: '/estrategia-y-contenido/estrategia-y-creacion-de-contenido/',
    name: 'Estrategia y creación de contenido',
    summary: 'Qué decir, a quién y para qué, y las piezas para decirlo.',
  },
  {
    slug: 'gestion-de-redes-sociales',
    family: 'contenido',
    path: '/estrategia-y-contenido/gestion-de-redes-sociales/',
    name: 'Gestión de redes sociales',
    summary: 'Presencia constante, ordenada y alineada con el negocio.',
  },
  {
    slug: 'social-selling',
    family: 'contenido',
    path: '/estrategia-y-contenido/social-selling/',
    name: 'Social Selling',
    summary: 'Perfiles comerciales que abren conversaciones de negocio.',
  },

  // ---------- Web y Automatización ----------
  {
    slug: 'sitios-web-y-landing-pages',
    family: 'web',
    group: 'Web',
    path: '/web-y-automatizacion/sitios-web-y-landing-pages/',
    name: 'Sitios web, landing pages y e-commerce',
    summary: 'Páginas que ayudan a entender, confiar y actuar.',
  },
  {
    slug: 'desarrollos-a-medida',
    family: 'web',
    group: 'Web',
    path: '/web-y-automatizacion/desarrollos-a-medida/',
    name: 'Funcionalidades y desarrollos a medida',
    summary: 'Cotizadores, reservas, portales, dashboards y herramientas.',
  },
  {
    slug: 'email-y-seguimiento-de-prospectos',
    family: 'web',
    group: 'Seguimiento',
    path: '/web-y-automatizacion/email-y-seguimiento-de-prospectos/',
    name: 'Email y seguimiento de prospectos',
    summary: 'Que ningún contacto se pierda porque nadie le volvió a escribir.',
  },
  {
    slug: 'newsletters',
    family: 'web',
    group: 'Seguimiento',
    path: '/web-y-automatizacion/newsletters/',
    name: 'Newsletters',
    summary: 'Un canal propio para seguir siendo relevante.',
  },
  {
    slug: 'automatizacion-y-crm',
    family: 'web',
    group: 'Seguimiento',
    path: '/web-y-automatizacion/automatizacion-y-crm/',
    name: 'Automatización y CRM',
    summary: 'Formularios, correo, WhatsApp y ventas conectados.',
  },
  {
    slug: 'seo-y-visibilidad-en-ia',
    family: 'web',
    group: 'Visibilidad y medición',
    path: '/web-y-automatizacion/seo-y-visibilidad-en-ia/',
    name: 'SEO y visibilidad en IA',
    summary: 'Aparecer en Google, en Maps y en asistentes como ChatGPT.',
  },
  {
    slug: 'analitica-y-medicion',
    family: 'web',
    group: 'Visibilidad y medición',
    path: '/web-y-automatizacion/analitica-y-medicion/',
    name: 'Analítica y medición',
    summary: 'Saber qué está generando oportunidades y qué no.',
  },
];

export const servicesByFamily = (family: Family) => services.filter((s) => s.family === family);

export const getService = (slug: string) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Servicio no encontrado: ${slug}`);
  return s;
};

export const getFamily = (id: Family) => families.find((f) => f.id === id)!;
