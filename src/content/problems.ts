/**
 * Temas del formulario ("¿Qué quieres mejorar?") y problemas del índice del Home.
 * Están escritos con las palabras del cliente, no con nombres de servicio.
 * El valor de cada tema viaja en la URL (/contacto/?tema=whatsapp) y preselecciona el formulario.
 */

export const topics = [
  { value: 'clientes', label: 'Quiero conseguir más clientes' },
  { value: 'publicidad', label: 'Quiero mejorar mi publicidad' },
  { value: 'chatgpt', label: 'Quiero anunciarme en ChatGPT' },
  { value: 'ia', label: 'Quiero usar IA en mi negocio' },
  { value: 'capacitacion', label: 'Quiero capacitar a mi equipo en IA' },
  { value: 'whatsapp', label: 'Quiero mejorar mi WhatsApp' },
  { value: 'automatizar', label: 'Quiero automatizar algo' },
  { value: 'seguimiento', label: 'Quiero dar seguimiento a mis prospectos' },
  { value: 'web', label: 'Necesito una página o tienda en línea' },
  { value: 'contenido', label: 'Necesito ayuda con contenido o redes' },
  { value: 'visibilidad', label: 'Quiero aparecer en Google y en asistentes de IA' },
  { value: 'medicion', label: 'Quiero saber qué está funcionando' },
  { value: 'idea', label: 'Tengo una idea y no sé qué necesito' },
] as const;

export type TopicValue = (typeof topics)[number]['value'];

export interface Problem {
  id: string;
  /** El problema, como lo diría el cliente. */
  problem: string;
  /** Lo que suele estar pasando. */
  diagnosis: string;
  /** Por dónde empezaríamos. */
  approach: string;
  /** Servicios relacionados (slugs de services.ts). */
  services: string[];
  topic: TopicValue;
}

export const problems: Problem[] = [
  {
    id: 'mas-clientes',
    problem: 'Necesito más clientes y no sé por dónde empezar.',
    diagnosis:
      'Antes de invertir en anuncios conviene saber dónde busca tu cliente, qué tan clara es tu oferta y qué pasa cuando alguien te contacta.',
    approach:
      'Empezaríamos por el canal con la intención más clara para tu negocio (Google, ChatGPT, Meta o LinkedIn) y una página preparada para recibir ese tráfico.',
    services: ['google-ads', 'chatgpt-ads', 'meta-ads', 'sitios-web-y-landing-pages'],
    topic: 'clientes',
  },
  {
    id: 'clics-sin-clientes',
    problem: 'Mis anuncios traen clics, pero no clientes.',
    diagnosis:
      'Casi siempre el problema está después del clic: una página que no explica, un formulario largo o nadie que responda a tiempo.',
    approach:
      'Revisaríamos la oferta, el destino, la medición y el seguimiento antes de subir el presupuesto. Enviar más tráfico a un proceso roto solo encarece el problema.',
    services: ['sitios-web-y-landing-pages', 'analitica-y-medicion', 'email-y-seguimiento-de-prospectos'],
    topic: 'publicidad',
  },
  {
    id: 'whatsapp-repetitivo',
    problem: 'Respondemos lo mismo por WhatsApp todo el día.',
    diagnosis:
      'Tu equipo contesta precios, horarios y requisitos una y otra vez, y las conversaciones que sí importan se pierden entre las demás.',
    approach:
      'Un asistente con información aprobada responde lo repetitivo, pide los datos necesarios y pasa a una persona las conversaciones que lo requieren, con el resumen incluido.',
    services: ['whatsapp-con-ia', 'automatizacion-y-crm'],
    topic: 'whatsapp',
  },
  {
    id: 'prospectos-frios',
    problem: 'Los prospectos se enfrían porque nadie les da seguimiento.',
    diagnosis:
      'Llegan registros, cotizaciones y mensajes, pero el seguimiento depende de que alguien se acuerde de escribir.',
    approach:
      'Correos y recordatorios que se activan solos, un CRM con el estado de cada contacto y alertas para ventas cuando alguien muestra interés.',
    services: ['email-y-seguimiento-de-prospectos', 'automatizacion-y-crm', 'newsletters'],
    topic: 'seguimiento',
  },
  {
    id: 'ia-sin-rumbo',
    problem: 'Sé que la IA nos podría ayudar, pero no sé en qué.',
    diagnosis:
      'El equipo usa IA de forma suelta, sin método ni criterios de calidad, o no la usa porque no sabe por dónde empezar.',
    approach:
      'Identificaríamos dos o tres tareas donde la IA ahorra tiempo de verdad y las convertiríamos en flujos, asistentes o una capacitación práctica para tu equipo.',
    services: ['ia-para-tu-negocio', 'capacitacion'],
    topic: 'ia',
  },
  {
    id: 'propuestas',
    problem: 'Cada propuesta comercial empieza desde cero.',
    diagnosis:
      'Cada vendedor arma su propuesta buscando archivos, copiando textos y rehaciendo lo que ya existía en otra carpeta.',
    approach:
      'Un flujo que organiza el requerimiento, reutiliza información aprobada y prepara un borrador para que una persona lo revise y lo envíe.',
    services: ['ia-para-tu-negocio', 'desarrollos-a-medida'],
    topic: 'ia',
  },
  {
    id: 'pagina-sin-contactos',
    problem: 'Mi página no genera contactos.',
    diagnosis:
      'La página dice qué haces, pero no por qué elegirte ni qué hacer después. En el celular suele ser todavía más difícil.',
    approach:
      'Revisaríamos mensaje, estructura, formularios, velocidad y medición, y rediseñaríamos lo que está frenando el contacto.',
    services: ['sitios-web-y-landing-pages', 'seo-y-visibilidad-en-ia', 'analitica-y-medicion'],
    topic: 'web',
  },
  {
    id: 'redes-sin-plan',
    problem: 'Publicamos en redes, pero sin un plan.',
    diagnosis:
      'Se publica para cumplir el calendario, sin un objetivo claro ni relación con lo que el negocio necesita vender.',
    approach:
      'Definiríamos qué decir, a quién, en qué canal y para qué. Después producimos y gestionamos el contenido con ese criterio.',
    services: ['estrategia-y-creacion-de-contenido', 'gestion-de-redes-sociales', 'social-selling'],
    topic: 'contenido',
  },
  {
    id: 'aparecer',
    problem: 'Quiero aparecer cuando buscan lo que vendo.',
    diagnosis:
      'Tus clientes buscan en Google, en Maps y cada vez más en asistentes como ChatGPT. Tu negocio no aparece, o aparece con información incompleta.',
    approach:
      'SEO, búsqueda local y contenido claro y verificable para que buscadores y asistentes entiendan qué haces; anuncios donde la intención ya es clara.',
    services: ['seo-y-visibilidad-en-ia', 'google-ads', 'chatgpt-ads'],
    topic: 'visibilidad',
  },
  {
    id: 'que-funciona',
    problem: 'No sé qué está funcionando.',
    diagnosis:
      'Cada plataforma tiene su reporte, pero nadie puede decir qué canal trae oportunidades reales y cuál solo trae visitas.',
    approach:
      'Configuraríamos la medición desde el clic hasta la oportunidad en el CRM, con un tablero que el equipo pueda leer sin ayuda.',
    services: ['analitica-y-medicion', 'automatizacion-y-crm'],
    topic: 'medicion',
  },
  {
    id: 'tengo-una-idea',
    problem: 'Tengo una idea y no sé qué necesito.',
    diagnosis:
      'Un cotizador, un asistente, una herramienta interna o un proyecto con IA que todavía no tiene forma ni alcance.',
    approach:
      'La aterrizamos contigo: alcance, prototipo, pruebas con ejemplos de tu operación y un plan para construirla.',
    services: ['desarrollos-a-medida', 'ia-para-tu-negocio'],
    topic: 'idea',
  },
];
