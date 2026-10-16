/**
 * Constructores de datos estructurados (schema.org / JSON-LD).
 * Solo se publican datos reales: si un campo de contacto está vacío, no se incluye.
 */
import { site } from '@/config/site';
import type { Faq } from '@/content/faqs';

export type Crumb = { name: string; path: string };

const abs = (base: URL | string, path: string) => new URL(path, base).toString();

export function organization(base: URL | string) {
  const sameAs = site.social.map((s) => s.href);
  return {
    '@type': 'ProfessionalService',
    '@id': abs(base, '/#organizacion'),
    name: site.name,
    url: abs(base, '/'),
    description: site.description,
    areaServed: { '@type': 'Country', name: site.areaServed === 'MX' ? 'México' : site.areaServed },
    knowsAbout: [
      'Inteligencia artificial aplicada a negocios',
      'Publicidad digital',
      'ChatGPT Ads',
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
      'WhatsApp con inteligencia artificial',
      'Automatización de marketing',
      'CRM',
      'Email marketing',
      'SEO',
      'Visibilidad en buscadores de IA',
      'Desarrollo de sitios web',
      'Analítica digital',
    ],
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function website(base: URL | string) {
  return {
    '@type': 'WebSite',
    '@id': abs(base, '/#sitio'),
    url: abs(base, '/'),
    name: site.name,
    inLanguage: site.lang,
    publisher: { '@id': abs(base, '/#organizacion') },
  };
}

export function service(base: URL | string, opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    '@type': 'Service',
    '@id': abs(base, `${opts.path}#servicio`),
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: abs(base, opts.path),
    provider: { '@id': abs(base, '/#organizacion') },
    areaServed: { '@type': 'Country', name: site.areaServed === 'MX' ? 'México' : site.areaServed },
    inLanguage: site.lang,
  };
}

export function breadcrumbs(base: URL | string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(base, c.path),
    })),
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
