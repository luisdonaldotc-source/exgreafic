/**
 * /llms.txt: resumen estructurado del sitio para asistentes de IA (propuesta llmstxt.org).
 * Se genera desde el catálogo de servicios, así nunca se desactualiza.
 */
import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { families, servicesByFamily, type Family } from '@/content/services';
import { generalFaqs } from '@/content/faqs';

export const GET: APIRoute = ({ site: base }) => {
  const url = (path: string) => new URL(path, base).toString();
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'Trabajamos con empresas en México. No publicamos precios: cada proyecto empieza por entender el objetivo y lo que ya existe. No prometemos resultados absolutos ni posiciones garantizadas en buscadores o asistentes de IA.',
    '',
  ];

  for (const f of families) {
    lines.push(`## ${f.name}`, '', `${f.summary} Más información: ${url(f.path)}`, '');
    for (const s of servicesByFamily(f.id as Family)) lines.push(`- [${s.name}](${url(s.path)}): ${s.summary}`);
    lines.push('');
  }

  lines.push('## Preguntas frecuentes', '');
  for (const q of generalFaqs) lines.push(`- ${q.q} ${q.a}`);
  lines.push('', '## Contacto', '', `- [Formulario de contacto](${url('/contacto/')})`, `- [Nosotros](${url('/nosotros/')})`);
  if (site.contact.email) lines.push(`- Correo: ${site.contact.email}`);

  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
