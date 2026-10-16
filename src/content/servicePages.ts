/**
 * Contenido de las páginas de servicio que se arman por bloques
 * (src/pages/[...path].astro). Las páginas con módulos propios (IA, WhatsApp,
 * ChatGPT Ads y los hubs) tienen su propio archivo en src/pages.
 *
 * Cada bloque elige una composición distinta para que dos secciones vecinas
 * nunca se vean iguales. Copy basado en el blueprint V2; sin cifras inventadas.
 */
import type { Faq } from './faqs';
import { seoFaqs } from './faqs';
import type { SourceId } from './sources';
import type { TopicValue } from './problems';

export type Block =
  | { type: 'list'; title: string; intro?: string; items: (string | { title: string; text?: string })[]; variant?: 'columns' | 'large'; columns?: 2 | 3; theme?: 'ground' | 'surface' }
  | { type: 'pairs'; title: string; intro?: string; head: [string, string]; rows: [string, string][]; quote?: boolean; theme?: 'ground' | 'surface' }
  | { type: 'split'; title: string; paragraphs: string[]; emphasis?: boolean; theme?: 'ground' | 'surface' | 'inverse' }
  | { type: 'steps'; title: string; intro?: string; steps: { title: string; text?: string }[]; theme?: 'ground' | 'surface' | 'inverse' }
  | { type: 'rows'; title: string; intro?: string; rows: { title: string; text: string; list?: string[] }[]; theme?: 'ground' | 'surface' }
  | { type: 'note'; title: string; text: string; detail?: string; tone?: 'accent' | 'inverse' | 'surface' }
  | { type: 'stat'; title: string; facts: { figure: string; unit?: string; text: string; source: SourceId }[]; conclusion?: string; theme?: 'accent' | 'surface' | 'ground' }
  | { type: 'video'; clip: 'ciudad' | 'atardecer' | 'glorieta'; text: string }
  | { type: 'faq'; faqs: Faq[]; title?: string };

export interface ServicePage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    statement: string;
    text: string;
    cta: { label: string; topic: TopicValue };
    size?: 'display' | 'head';
  };
  blocks: Block[];
  related: string[];
  closing: { title: string; text: string };
}

const antesDeInvertir: Block = {
  type: 'note',
  title: 'Antes de invertir',
  text: 'Revisamos que la oferta se entienda, que la página convierta y que alguien dé seguimiento.',
  detail: 'Enviar más tráfico a un proceso roto solo hace más caro el problema.',
  tone: 'inverse',
};

export const servicePages: ServicePage[] = [
  // ---------------------------------------------------------------- Publicidad
  {
    slug: 'google-ads',
    metaTitle: 'Google Ads para empresas: campañas por intención de búsqueda',
    metaDescription:
      'Campañas de Google Ads diseñadas alrededor de la intención de búsqueda: anuncios claros, landing alineada y medición de llamadas, formularios, WhatsApp y citas.',
    hero: {
      title: 'Google Ads',
      statement: 'Capta la demanda que ya está buscando una solución.',
      text: 'Google Search puede ser uno de los canales más directos cuando una persona ya expresa lo que necesita. Diseñamos campañas alrededor de la intención, no de listas enormes de palabras clave sin contexto.',
      cta: { label: 'Revisar oportunidad en Google', topic: 'publicidad' },
    },
    blocks: [
      {
        type: 'list',
        variant: 'large',
        title: 'Qué buscamos en una campaña',
        items: [
          'Búsquedas con relación clara con tu oferta.',
          'Mensajes que expliquen rápido por qué elegirte.',
          'Extensiones, ubicación y Maps que faciliten la acción.',
          'Una landing alineada con lo que la persona buscó.',
          'Medición de llamadas, formularios, WhatsApp, compras o citas.',
          'Optimización por calidad de la oportunidad, no solo por clic.',
        ],
      },
      {
        type: 'split',
        title: 'Cuándo tiene más sentido',
        emphasis: true,
        paragraphs: [
          'Cuando ya existe una búsqueda explícita por tu producto, servicio o solución.',
          'Si la gente todavía no sabe que tu categoría existe, otros canales pueden generar esa demanda primero. Google no compite con ChatGPT Ads ni con Meta: cubre un momento distinto, y muchas estrategias usan más de un canal y miden qué papel juega cada uno.',
        ],
        theme: 'surface',
      },
      antesDeInvertir,
    ],
    related: ['chatgpt-ads', 'seo-y-visibilidad-en-ia', 'sitios-web-y-landing-pages', 'analitica-y-medicion'],
    closing: {
      title: 'Revisemos tu caso en Google',
      text: 'Te decimos qué búsquedas valen la pena, qué página necesitas y cómo medir lo que pase después del clic.',
    },
  },
  {
    slug: 'meta-ads',
    metaTitle: 'Meta Ads: campañas en Facebook e Instagram que generan oportunidades',
    metaDescription:
      'Campañas en Facebook e Instagram para generar mensajes, registros, ventas y remarketing, con creatividad, segmentación y una ruta clara después del anuncio.',
    hero: {
      title: 'Meta Ads',
      statement: 'Convierte atención en mensajes, registros y oportunidades.',
      text: 'Facebook e Instagram permiten generar demanda incluso antes de que una persona haga una búsqueda. Combinamos estrategia, creatividad, segmentación, remarketing y una ruta clara después del anuncio.',
      cta: { label: 'Revisar campañas en Meta', topic: 'publicidad' },
    },
    blocks: [
      {
        type: 'list',
        title: 'Objetivos que podemos trabajar',
        items: [
          'Mensajes y conversaciones.',
          'Prospectos y formularios.',
          'Tráfico calificado.',
          'Ventas potenciales o compras.',
          'Visitas y acciones locales.',
          'Remarketing: volver a mostrar tu oferta a quien ya mostró interés.',
          'Reconocimiento, cuando forma parte de una estrategia más amplia.',
        ],
      },
      {
        type: 'split',
        title: 'La creatividad no es un accesorio',
        emphasis: true,
        paragraphs: [
          'En Meta, el anuncio es parte central de la segmentación y del aprendizaje.',
          'Por eso producimos conceptos, textos, piezas estáticas, carruseles y video corto alrededor del mensaje que necesitamos validar. Cada variante responde a una pregunta concreta: qué mensaje, para quién y con qué oferta.',
        ],
      },
      {
        type: 'steps',
        title: 'Una ruta clara después del anuncio',
        theme: 'surface',
        steps: [
          { title: 'Anuncio', text: 'Un mensaje pensado para una audiencia y un objetivo.' },
          { title: 'Conversación o formulario', text: 'WhatsApp, Messenger o un formulario corto, según lo que pidas.' },
          { title: 'Respuesta', text: 'Tu equipo o un asistente con IA responde rápido y pide los datos necesarios.' },
          { title: 'Seguimiento', text: 'El contacto entra al CRM y recibe el siguiente paso.' },
          { title: 'Medición', text: 'Sabemos qué anuncio trajo oportunidades, no solo clics.' },
        ],
      },
    ],
    related: ['whatsapp-con-ia', 'estrategia-y-creacion-de-contenido', 'tiktok-y-youtube-ads', 'automatizacion-y-crm'],
    closing: {
      title: 'Del anuncio a la conversación',
      text: 'Revisamos tus campañas actuales o planeamos unas nuevas, con la ruta completa después del anuncio.',
    },
  },
  {
    slug: 'linkedin-ads',
    metaTitle: 'LinkedIn Ads: publicidad B2B por cargo, empresa e industria',
    metaDescription:
      'Campañas de LinkedIn Ads para servicios empresariales y venta consultiva: audiencias por cargo, función, industria y empresa, formularios de prospectos y retargeting.',
    hero: {
      title: 'LinkedIn Ads',
      statement: 'Publicidad B2B cuando importa quién es la persona y en qué empresa trabaja.',
      text: 'Para servicios empresariales, tecnología y ofertas con venta consultiva, LinkedIn permite llegar a audiencias por cargo, función, industria, empresa y nivel de responsabilidad.',
      cta: { label: 'Revisar mi audiencia B2B', topic: 'clientes' },
    },
    blocks: [
      {
        type: 'list',
        variant: 'large',
        title: 'Qué podemos combinar',
        items: [
          'Campañas por industria o perfil.',
          'Contenido de autoridad y casos.',
          'Formularios para captar prospectos sin salir de LinkedIn.',
          'Retargeting a quien ya interactuó.',
          'Listas de cuentas objetivo (ABM), cuando hay una estrategia clara.',
          'Social Selling desde perfiles comerciales.',
        ],
      },
      {
        type: 'split',
        title: 'Cuándo tiene sentido',
        paragraphs: [
          'Cuando el valor de cada cliente justifica llegar a perfiles específicos y la venta pasa por varias conversaciones.',
          'Si tu comprador no se define por su cargo o su empresa, otros canales suelen ser más eficientes. Y funciona mejor cuando la campaña, los perfiles de tu equipo y el seguimiento comercial dicen lo mismo.',
        ],
        theme: 'surface',
      },
    ],
    related: ['social-selling', 'email-y-seguimiento-de-prospectos', 'automatizacion-y-crm', 'chatgpt-ads'],
    closing: {
      title: 'Revisemos a quién necesitas llegar',
      text: 'Definimos la audiencia, el mensaje y lo que pasa después del formulario antes de invertir.',
    },
  },
  {
    slug: 'tiktok-y-youtube-ads',
    metaTitle: 'TikTok y YouTube Ads: campañas de video con objetivo',
    metaDescription:
      'Campañas de video en TikTok y YouTube cuando el producto se entiende mejor viéndolo: concepto, guion, formatos, piezas por etapa y medición de acciones.',
    hero: {
      title: 'TikTok y YouTube Ads',
      statement: 'Video cuando puede explicar, demostrar o generar demanda mejor que una imagen fija.',
      text: 'No recomendamos video por moda. Lo usamos cuando el producto, servicio o historia se entiende mejor viéndolo y existe una audiencia que vale la pena alcanzar.',
      cta: { label: 'Evaluar campañas de video', topic: 'publicidad' },
    },
    blocks: [
      {
        type: 'pairs',
        title: 'Una pieza para cada etapa',
        intro: 'El mismo video no sirve para todo. Cada etapa necesita algo distinto de quien lo ve.',
        head: ['Etapa', 'Qué debe lograr el video'],
        rows: [
          ['Descubrimiento', 'Que alguien que no te conoce entienda en segundos qué haces y por qué le importa.'],
          ['Prueba', 'Mostrar el producto o servicio funcionando: demostraciones, casos de uso y dudas resueltas.'],
          ['Remarketing', 'Recordar la oferta a quien ya mostró interés y facilitar el siguiente paso.'],
        ],
      },
      {
        type: 'list',
        title: 'Qué incluye',
        theme: 'surface',
        items: [
          'Concepto y guion.',
          'Adaptación a formato vertical u horizontal.',
          'Piezas para descubrimiento, prueba y remarketing.',
          'Segmentación y objetivos.',
          'Medición de lo que la persona hace después de ver el video.',
        ],
      },
    ],
    related: ['meta-ads', 'estrategia-y-creacion-de-contenido', 'google-ads'],
    closing: {
      title: 'Evaluemos el video para tu marca',
      text: 'Si tu producto se entiende mejor viéndolo, diseñamos la campaña; si no, te lo decimos.',
    },
  },

  // ------------------------------------------------------ Estrategia y contenido
  {
    slug: 'estrategia-y-creacion-de-contenido',
    metaTitle: 'Estrategia y creación de contenido para empresas',
    metaDescription:
      'Estrategia de contenido y producción de posts, carruseles, video corto, artículos, guías y materiales comerciales que atraen, explican y mueven a una acción.',
    hero: {
      title: 'Estrategia y creación de contenido',
      size: 'head',
      statement: 'Tu negocio no necesita “más posts”. Necesita mejores mensajes.',
      text: 'Convertimos objetivos comerciales, preguntas de clientes y conocimiento interno en contenidos que puedan atraer, explicar, educar y mover a una acción.',
      cta: { label: 'Construir mi estrategia de contenido', topic: 'contenido' },
    },
    blocks: [
      {
        type: 'rows',
        title: 'Primero el plan, después las piezas',
        rows: [
          {
            title: 'Estrategia de contenido',
            text: 'Definimos temas, audiencias, formatos y objetivos para que cada pieza tenga una función.',
            list: ['Pilares y narrativa', 'Calendario', 'Canales y formatos', 'Criterios de medición'],
          },
          {
            title: 'Creación de contenido',
            text: 'Producimos las piezas que necesita la estrategia, con tu tono y revisión de tu equipo.',
            list: ['Textos', 'Diseño', 'Carruseles', 'Video corto', 'Artículos, guías y materiales', 'Adaptaciones para campañas y ventas'],
          },
        ],
      },
      {
        type: 'list',
        title: 'Qué podemos producir',
        columns: 3,
        theme: 'surface',
        items: [
          'Posts y carruseles.',
          'Reels y video corto.',
          'Guiones.',
          'Artículos y contenido para buscadores y asistentes de IA.',
          'Casos de uso.',
          'Guías y recursos descargables.',
          'Contenido para campañas pagadas.',
          'Contenido para email y newsletter.',
          'Piezas para equipos comerciales.',
          'Nuevas versiones de webinars, eventos, videos o materiales que ya tienes.',
        ],
      },
      {
        type: 'split',
        title: 'Reutilizar es estrategia',
        emphasis: true,
        paragraphs: [
          'Una sesión, un webinar, un artículo o una entrevista pueden convertirse en varias piezas con objetivos distintos.',
          'Así aprovechamos el conocimiento que ya existe en tu empresa sin repetir el mismo mensaje en todos los canales.',
        ],
      },
      {
        type: 'note',
        title: 'IA con control humano',
        text: 'Usamos IA para investigar y acelerar borradores. El criterio y la revisión final son humanos.',
        tone: 'accent',
      },
    ],
    related: ['gestion-de-redes-sociales', 'social-selling', 'newsletters', 'seo-y-visibilidad-en-ia'],
    closing: {
      title: 'Mensajes que sí muevan algo',
      text: 'Partimos de lo que necesitas vender y de las preguntas que tus clientes ya te hacen.',
    },
  },
  {
    slug: 'gestion-de-redes-sociales',
    metaTitle: 'Gestión de redes sociales con estrategia y criterio',
    metaDescription:
      'Gestión de redes sociales: calendario editorial, textos, diseño, video corto, publicación, coordinación con campañas y reportes enfocados en acciones.',
    hero: {
      title: 'Gestión de redes sociales',
      size: 'head',
      statement: 'Una presencia constante sin convertir tus redes en una fábrica de publicaciones.',
      text: 'Planificamos y gestionamos la comunicación orgánica para que exista coherencia entre lo que tu empresa hace, lo que publica y lo que quieres que la audiencia recuerde.',
      cta: { label: 'Revisar gestión de redes', topic: 'contenido' },
    },
    blocks: [
      {
        type: 'list',
        variant: 'large',
        title: 'Qué puede incluir',
        items: [
          'Calendario editorial.',
          'Textos adaptados a cada red.',
          'Diseño de piezas.',
          'Video corto.',
          'Programación y publicación.',
          'Coordinación con campañas y fechas.',
          'Monitoreo y aprendizajes.',
          'Reportes enfocados en acciones, no en métricas de vanidad.',
        ],
      },
      {
        type: 'note',
        title: 'Criterio',
        text: 'No todas las marcas necesitan publicar todos los días ni estar en todas las redes.',
        detail: 'La frecuencia y los canales se definen según tu audiencia, tu capacidad y tu objetivo.',
        tone: 'accent',
      },
      {
        type: 'steps',
        title: 'Cómo funciona cada mes',
        steps: [
          { title: 'Planeación', text: 'Prioridades del mes y calendario editorial.' },
          { title: 'Producción', text: 'Textos, diseño y video adaptados a cada red.' },
          { title: 'Publicación', text: 'Programación y coordinación con campañas y fechas.' },
          { title: 'Aprendizaje', text: 'Monitoreo, reporte y ajustes para el siguiente mes.' },
        ],
      },
    ],
    related: ['estrategia-y-creacion-de-contenido', 'meta-ads', 'social-selling'],
    closing: {
      title: 'Ordenemos tu presencia en redes',
      text: 'Definimos en qué redes estar, con qué frecuencia y para qué, antes de producir una sola pieza.',
    },
  },
  {
    slug: 'social-selling',
    metaTitle: 'Social Selling: perfiles comerciales que abren conversaciones B2B',
    metaDescription:
      'Social Selling para equipos B2B: perfil y propuesta de valor, listas de cuentas, contenido desde experiencia real y mensajes de conexión y seguimiento en LinkedIn.',
    hero: {
      title: 'Social Selling',
      statement: 'Que los perfiles de tu equipo también ayuden a abrir conversaciones.',
      text: 'En B2B, muchas decisiones empiezan con una persona, no con una página corporativa. Diseñamos una presencia y un proceso para que perfiles comerciales o expertos aporten valor y generen relaciones.',
      cta: { label: 'Activar Social Selling', topic: 'clientes' },
    },
    blocks: [
      {
        type: 'split',
        title: 'Qué es, sin jerga',
        emphasis: true,
        paragraphs: [
          'Que tu equipo use LinkedIn para compartir lo que sabe y conectar con las personas correctas.',
          'El objetivo es abrir conversaciones de negocio con contexto, en lugar de enviar mensajes en frío que todos ignoran.',
        ],
      },
      {
        type: 'steps',
        title: 'Cómo se activa',
        theme: 'surface',
        steps: [
          { title: 'Perfil y propuesta de valor', text: 'Que quien visite el perfil entienda en qué puede ayudar esa persona.' },
          { title: 'Audiencias y cuentas', text: 'Listas de personas y empresas con las que vale la pena conectar.' },
          { title: 'Contenido desde la experiencia', text: 'Publicaciones que muestran criterio propio, no frases genéricas.' },
          { title: 'Conexión y seguimiento', text: 'Mensajes con contexto y un ritmo de seguimiento sostenible.' },
        ],
      },
      {
        type: 'list',
        title: 'Qué trabajamos',
        items: [
          'Perfil y propuesta de valor.',
          'Audiencias y listas de cuentas.',
          'Contenido desde experiencia real.',
          'Mensajes de conexión y seguimiento.',
          'Uso de LinkedIn y Sales Navigator cuando aplica.',
          'Coordinación con campañas, eventos y contenido de marca.',
        ],
      },
    ],
    related: ['linkedin-ads', 'estrategia-y-creacion-de-contenido', 'email-y-seguimiento-de-prospectos'],
    closing: {
      title: 'Activemos a tu equipo',
      text: 'Empezamos con pocas personas, un mensaje claro y un proceso que puedan sostener.',
    },
  },

  // ------------------------------------------------------- Web y automatización
  {
    slug: 'sitios-web-y-landing-pages',
    metaTitle: 'Sitios web, landing pages y e-commerce orientados a conversión',
    metaDescription:
      'Diseño y desarrollo de sitios web, landing pages y tiendas en línea claros, rápidos y medibles, conectados con CRM, WhatsApp y correo.',
    hero: {
      title: 'Sitios web, landing pages y e-commerce',
      size: 'head',
      statement: 'Una página debe ayudar a entender, confiar y actuar.',
      text: 'Diseñamos y desarrollamos páginas claras y pensadas para convertir: una landing para una campaña, un sitio completo o una tienda en línea.',
      cta: { label: 'Revisar mi sitio o proyecto web', topic: 'web' },
    },
    blocks: [
      {
        type: 'rows',
        title: 'Qué construimos',
        rows: [
          {
            title: 'Landing pages',
            text: 'Para campañas, lanzamientos, eventos o servicios específicos.',
            list: ['Propuesta de valor', 'Estructura y textos', 'Formularios', 'Experiencia móvil', 'Medición', 'Conexión con seguimiento'],
          },
          {
            title: 'Sitios web',
            text: 'Una estructura que explica tu oferta y puede crecer con el negocio.',
            list: ['Arquitectura de contenidos', 'Diseño UX/UI', 'Textos', 'Integraciones', 'Rendimiento', 'SEO técnico'],
          },
          {
            title: 'E-commerce',
            text: 'Catálogo, navegación, producto, compra, medición y automatizaciones. El alcance depende de tu catálogo, operación, pagos, inventario y conexiones.',
          },
          {
            title: 'Diagnóstico y optimización',
            text: 'También trabajamos sobre una página existente: mensaje, jerarquía, llamadas a la acción, móvil, formularios, velocidad y medición, antes de invertir más en tráfico.',
          },
        ],
      },
      {
        type: 'list',
        variant: 'large',
        title: 'Lo que cuidamos en cada página',
        theme: 'surface',
        items: [
          'Que se entienda qué haces en segundos.',
          'Que responda las dudas en el orden en que aparecen.',
          'Formularios cortos y acciones claras.',
          'Que funcione igual de bien en el celular.',
          'Velocidad y SEO técnico desde el inicio.',
          'Medición y conexión con tus herramientas.',
        ],
      },
    ],
    related: ['desarrollos-a-medida', 'seo-y-visibilidad-en-ia', 'analitica-y-medicion', 'google-ads'],
    closing: {
      title: 'Revisemos tu sitio o tu proyecto',
      text: 'Si ya tienes una página, empezamos por un diagnóstico. Si no, por lo que necesita entender tu cliente.',
    },
  },
  {
    slug: 'desarrollos-a-medida',
    metaTitle: 'Funcionalidades y desarrollos web a medida',
    metaDescription:
      'Cotizadores, reservas, CRM, catálogos, portales, dashboards, automatización de documentos y herramientas con IA para convertir procesos manuales en experiencias simples.',
    hero: {
      title: 'Desarrollos a medida',
      statement: 'Tu sitio puede hacer más que mostrar información.',
      text: 'Cuando el negocio lo necesita, convertimos la web o un subdominio en una herramienta que ayuda a vender, atender, organizar información o automatizar procesos.',
      cta: { label: 'Tengo una idea para desarrollar', topic: 'idea' },
    },
    blocks: [
      {
        type: 'list',
        title: 'Funcionalidades que podemos construir',
        columns: 3,
        items: [
          'Asistentes con IA para tu sitio.',
          'Cotizadores y formularios avanzados.',
          'CRM o gestión de prospectos.',
          'Reservas, citas y calendarios.',
          'Inventario, catálogo, listas de precios y pedidos.',
          'Programas de recompensas.',
          'Menús y comandas.',
          'Encuestas.',
          'Dashboards y reportes.',
          'Portales o herramientas para empleados.',
          'Flujos administrativos o financieros.',
          'Automatización de documentos.',
          'Blog y centros de recursos.',
          'Generadores con IA.',
          'Diagnósticos interactivos para captar prospectos.',
        ],
      },
      {
        type: 'split',
        title: 'No es desarrollo por desarrollar',
        emphasis: true,
        theme: 'surface',
        paragraphs: [
          'Convertimos una tarea repetitiva o un proceso manual en algo más simple para tu cliente o tu equipo.',
          'Si una herramienta existente ya resuelve el problema, te lo decimos antes de construir algo nuevo.',
        ],
      },
      {
        type: 'steps',
        title: 'Cómo lo aterrizamos',
        steps: [
          { title: 'Definición', text: 'Qué problema resuelve, para quién y cómo sabremos que funciona.' },
          { title: 'Prototipo', text: 'Una primera versión que se pueda probar pronto.' },
          { title: 'Pruebas', text: 'Con casos y usuarios reales, no con demos perfectas.' },
          { title: 'Lanzamiento y ajustes', text: 'Medimos el uso y mejoramos lo que haga falta.' },
        ],
      },
    ],
    related: ['ia-para-tu-negocio', 'automatizacion-y-crm', 'sitios-web-y-landing-pages'],
    closing: {
      title: 'Trae la idea, aunque no tenga forma',
      text: 'La aterrizamos contigo: alcance, prototipo y un plan claro para construirla.',
    },
  },
  {
    slug: 'email-y-seguimiento-de-prospectos',
    metaTitle: 'Email marketing y seguimiento automatizado de prospectos',
    metaDescription:
      'Correos de bienvenida, secuencias después de un formulario, seguimiento de cotizaciones, reactivación de contactos y alertas para ventas. Seguimiento que no depende de la memoria.',
    hero: {
      title: 'Email y seguimiento de prospectos',
      size: 'head',
      statement: 'Que un contacto no se pierda porque nadie volvió a escribirle.',
      text: 'Creamos correos y seguimientos automatizados para mantener activa la conversación después de un registro, una descarga, un evento, una solicitud o una primera interacción.',
      cta: { label: 'Mejorar mi seguimiento', topic: 'seguimiento' },
    },
    blocks: [
      {
        type: 'split',
        title: 'La idea en lenguaje simple',
        emphasis: true,
        paragraphs: [
          'Alguien muestra interés y, en lugar de esperar, recibe información útil para su caso.',
          'Nada de mandar el mismo mensaje a todos: tu equipo comercial interviene cuando hay una mejor señal o más contexto para conversar. En el medio le llaman inbound marketing o lead nurturing; para nosotros es seguimiento bien hecho.',
        ],
      },
      {
        type: 'steps',
        title: 'Ejemplo: después de pedir una cotización',
        intro: 'Una secuencia posible. Los tiempos y mensajes se ajustan a tu proceso de venta.',
        theme: 'inverse',
        steps: [
          { title: 'Mismo día', text: 'Confirmación con lo que pidió y qué va a pasar después.' },
          { title: 'Dos días después', text: 'Un caso o una guía relacionada con su necesidad.' },
          { title: 'Una semana después', text: 'Un recordatorio con una pregunta concreta.' },
          { title: 'Si responde o hace clic', text: 'Ventas recibe una alerta con todo el contexto.' },
        ],
      },
      {
        type: 'list',
        variant: 'large',
        title: 'Qué podemos construir',
        items: [
          'Correos de bienvenida.',
          'Secuencias después de un formulario o descarga.',
          'Seguimiento de cotizaciones o solicitudes.',
          'Recordatorios de eventos, citas o demos.',
          'Reactivación de contactos inactivos.',
          'Contenido por interés, industria o etapa.',
          'Alertas y tareas para ventas cuando alguien muestra interés.',
        ],
      },
    ],
    related: ['automatizacion-y-crm', 'newsletters', 'analitica-y-medicion', 'whatsapp-con-ia'],
    closing: {
      title: 'Que nadie se enfríe por olvido',
      text: 'Revisamos qué pasa hoy después de que alguien te contacta y diseñamos el seguimiento que falta.',
    },
  },
  {
    slug: 'newsletters',
    metaTitle: 'Newsletters para empresas: un canal propio y constante',
    metaDescription:
      'Diseño y operación de newsletters con frecuencia sostenible, segmentación, curaduría, estructura reconocible y llamadas a la acción medibles.',
    hero: {
      title: 'Newsletters',
      statement: 'Un canal propio para seguir siendo relevante sin depender siempre de un anuncio.',
      text: 'Diseñamos newsletters que mantienen la relación con clientes y prospectos a través de contenido seleccionado, casos, novedades e ideas aplicables.',
      cta: { label: 'Diseñar mi newsletter', topic: 'contenido' },
    },
    blocks: [
      {
        type: 'list',
        title: 'Qué define una buena newsletter',
        items: [
          { title: 'Frecuencia sostenible', text: 'Mensual o quincenal, según lo que el equipo pueda sostener.' },
          { title: 'Segmentación', text: 'Cuando hay audiencias con necesidades distintas.' },
          { title: 'Curaduría', text: 'Por relevancia, valor práctico y vigencia.' },
          { title: 'Una estructura reconocible', text: 'Para que el lector sepa qué esperar.' },
          { title: 'Llamadas a la acción medibles', text: 'Para saber qué despierta interés y qué no.' },
          { title: 'Reutilización', text: 'De contenidos propios y conocimiento interno.' },
        ],
      },
      {
        type: 'steps',
        title: 'Una estructura que se reconoce',
        theme: 'surface',
        steps: [
          { title: 'Una idea breve', text: 'Lo que vale la pena saber este mes.' },
          { title: 'Un caso', text: 'Algo concreto que haya funcionado o enseñado algo.' },
          { title: 'Contenido recomendado', text: 'Lecturas, videos o recursos seleccionados.' },
          { title: 'Una idea aplicable', text: 'Algo que el lector pueda hacer esta semana.' },
          { title: 'El siguiente paso', text: 'Una sola acción clara.' },
        ],
      },
    ],
    related: ['email-y-seguimiento-de-prospectos', 'estrategia-y-creacion-de-contenido', 'automatizacion-y-crm'],
    closing: {
      title: 'Diseñemos tu newsletter',
      text: 'Con una frecuencia que tu equipo pueda sostener y un formato que la gente quiera abrir.',
    },
  },
  {
    slug: 'automatizacion-y-crm',
    metaTitle: 'Automatización de marketing y CRM',
    metaDescription:
      'Conectamos formularios, correo, WhatsApp, CRM y otras herramientas para que la información avance sola: registros, alertas, tareas, seguimientos y reactivación.',
    hero: {
      title: 'Automatización y CRM',
      statement: 'Menos tareas manuales y menos contactos olvidados, con más contexto para actuar.',
      text: 'Conectamos formularios, correo, WhatsApp, CRM y otras herramientas para que la información avance sola cuando existe una regla clara.',
      cta: { label: 'Detectar qué puedo automatizar', topic: 'automatizar' },
    },
    blocks: [
      {
        type: 'pairs',
        title: 'Cuando pasa esto, podemos hacer que…',
        intro: 'Ejemplos de reglas simples que ahorran trabajo y evitan que algo se pierda.',
        head: ['Cuando pasa esto…', 'Podemos hacer que…'],
        rows: [
          ['Alguien llena un formulario.', 'Reciba confirmación, se registre en el CRM y se avise al responsable.'],
          ['Un prospecto muestra interés en cierto servicio.', 'Entre a un seguimiento específico en lugar de recibir mensajes genéricos.'],
          ['Se agenda una cita.', 'Salgan recordatorios y se actualice el estado del contacto.'],
          ['Ventas necesita intervenir.', 'Se cree una tarea o alerta con el contexto previo.'],
          ['Hay prospectos sin actividad.', 'Se active una secuencia de reactivación.'],
          ['Necesitas medir oportunidades reales.', 'El CRM conecte fuente, campaña y etapa comercial.'],
        ],
      },
      {
        type: 'split',
        title: 'Con tus herramientas',
        theme: 'surface',
        paragraphs: [
          'Podemos trabajar con las herramientas que ya usas o integrar nuevas cuando exista una razón clara.',
          'Explicamos cada propuesta por flujo y resultado, no por una lista de logos.',
        ],
      },
      {
        type: 'note',
        title: 'Criterio',
        text: 'No automatizamos una tarea solo porque sea posible. Si algo no vale la pena automatizar, te lo diremos.',
        tone: 'accent',
      },
    ],
    related: ['email-y-seguimiento-de-prospectos', 'whatsapp-con-ia', 'analitica-y-medicion', 'desarrollos-a-medida'],
    closing: {
      title: 'Detectemos qué se puede automatizar',
      text: 'Revisamos tu proceso actual y te mostramos qué reglas ahorran más tiempo con menos complejidad.',
    },
  },
  {
    slug: 'seo-y-visibilidad-en-ia',
    metaTitle: 'SEO y visibilidad en buscadores de IA (GEO / AEO)',
    metaDescription:
      'SEO técnico, local y de contenidos, más preparación para asistentes como ChatGPT: páginas claras, datos consistentes, respuestas directas y contenido citable.',
    hero: {
      title: 'SEO y visibilidad en IA',
      size: 'head',
      statement: 'Ser encontrado ya no ocurre en un solo tipo de buscador.',
      text: 'Mejoramos la estructura y el contenido de tu sitio para aumentar su visibilidad en búsquedas tradicionales y prepararlo para los nuevos entornos de respuesta con IA.',
      cta: { label: 'Revisar mi visibilidad', topic: 'visibilidad' },
    },
    blocks: [
      {
        type: 'list',
        title: 'SEO: lo que trabajamos',
        items: [
          'Arquitectura y contenidos.',
          'Intención de búsqueda.',
          'Metadatos y estructura técnica.',
          'Contenido útil y original.',
          'Enlaces internos y autoridad.',
          'Rendimiento y rastreo.',
          'Medición de tráfico y conversiones.',
          'Google Business Profile, Maps y SEO local cuando aplica.',
        ],
      },
      {
        type: 'split',
        title: 'GEO y AEO, sin jerga',
        emphasis: true,
        theme: 'surface',
        paragraphs: [
          'Además de Google, las personas hacen preguntas en ChatGPT y otros asistentes.',
          'GEO y AEO son siglas para preparar tu sitio para esos entornos: páginas claras, datos consistentes, respuestas directas, casos, preguntas frecuentes y contenido que se pueda citar.',
          'No prometemos “salir siempre en ChatGPT”. Nadie serio debería hacerlo. Sí podemos mejorar la calidad, la estructura, la autoridad y la accesibilidad de la información que existe sobre tu negocio.',
        ],
      },
      {
        type: 'stat',
        title: 'Por qué medirlo desde ahora',
        theme: 'ground',
        facts: [
          {
            figure: '770.7',
            unit: 'millones de visitas al mes',
            text: 'llegaron en promedio a sitios web desde plataformas de IA, según el análisis global 2026 de Similarweb.',
            source: 'similarweb',
          },
          {
            figure: '+117.4%',
            text: 'creció ese tráfico frente al año anterior, en el mismo análisis.',
            source: 'similarweb',
          },
        ],
        conclusion:
          'Para muchos sitios sigue siendo menos que el tráfico tradicional, pero su crecimiento hace razonable empezar a medirlo y optimizarlo.',
      },
      { type: 'faq', faqs: seoFaqs },
    ],
    related: ['estrategia-y-creacion-de-contenido', 'analitica-y-medicion', 'google-ads', 'chatgpt-ads'],
    closing: {
      title: 'Revisemos cómo te encuentran hoy',
      text: 'En Google, en Maps y en asistentes de IA: qué aparece, qué falta y qué conviene mejorar primero.',
    },
  },
  {
    slug: 'analitica-y-medicion',
    metaTitle: 'Analítica y medición: saber qué genera oportunidades',
    metaDescription:
      'Medición de visitas, formularios, clics a WhatsApp, llamadas, prospectos calificados y oportunidades por canal y campaña, con GA4, píxeles, UTMs, CRM y dashboards.',
    hero: {
      title: 'Analítica y medición',
      statement: 'Medir para decidir, no para llenar un reporte.',
      text: 'Configuramos la medición necesaria para saber qué atrae personas, qué convierte y qué termina generando una oportunidad real.',
      cta: { label: 'Revisar mi medición', topic: 'medicion' },
    },
    blocks: [
      {
        type: 'pairs',
        title: 'Preguntas, no métricas sueltas',
        head: ['Lo que quieres saber', 'Lo que medimos para responderlo'],
        rows: [
          ['¿Qué canal trae oportunidades, no solo visitas?', 'Fuente y campaña de cada contacto, conectadas con su etapa en el CRM.'],
          ['¿Dónde se pierde la gente?', 'Formularios iniciados y enviados, clics en llamadas a la acción y recorridos entre páginas.'],
          ['¿WhatsApp está vendiendo?', 'Clics a WhatsApp, conversaciones iniciadas y prospectos calificados.'],
          ['¿Crece lo que llega desde la IA?', 'Visitas referidas por asistentes como ChatGPT, separadas del resto.'],
        ],
      },
      {
        type: 'list',
        title: 'Qué podemos medir',
        columns: 3,
        theme: 'surface',
        items: [
          'Visitas y fuentes.',
          'Clics en llamadas a la acción.',
          'Formularios iniciados y enviados.',
          'Clics a WhatsApp y llamadas.',
          'Reservas o compras.',
          'Descargas.',
          'Prospectos calificados.',
          'Oportunidades creadas.',
          'Conversiones por campaña.',
          'Recorridos entre canales.',
          'Visitas referidas desde herramientas de IA.',
        ],
      },
      {
        type: 'split',
        title: 'Las herramientas',
        paragraphs: [
          'Google Analytics 4, píxeles y APIs de conversión de las plataformas, etiquetas UTM en los enlaces de campaña, CRM y dashboards cuando el proyecto lo requiere.',
          'El objetivo es conectar el marketing con acciones de negocio, no coleccionar herramientas.',
        ],
      },
    ],
    related: ['automatizacion-y-crm', 'google-ads', 'sitios-web-y-landing-pages', 'seo-y-visibilidad-en-ia'],
    closing: {
      title: 'Revisemos qué estás midiendo',
      text: 'Y qué te falta medir para decidir dónde invertir el próximo mes.',
    },
  },
];

export const getServicePage = (slug: string) => servicePages.find((p) => p.slug === slug);
