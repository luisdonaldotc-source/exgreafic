/**
 * Preguntas frecuentes. Las generales vienen del blueprint (sección 27).
 * Las de cada servicio se escribieron con lo que el blueprint y las fuentes oficiales
 * permiten afirmar; ninguna promete resultados.
 */
export interface Faq {
  q: string;
  a: string;
}

export const generalFaqs: Faq[] = [
  {
    q: '¿Necesito saber qué servicio quiero?',
    a: 'No. Puedes contarnos qué estás intentando resolver y a partir de ahí definimos qué combinación tiene sentido.',
  },
  {
    q: '¿Trabajan solo con IA?',
    a: 'No. La IA es un diferenciador importante, pero también trabajamos publicidad, contenido, redes, email, web, SEO, automatización y medición.',
  },
  {
    q: '¿ChatGPT Ads reemplaza a Google Ads?',
    a: 'No. Son momentos y entornos distintos. Una estrategia puede usar ambos según la intención, la audiencia y el objetivo.',
  },
  {
    q: '¿Los anuncios cambian las respuestas de ChatGPT?',
    a: 'No. OpenAI indica que los anuncios están separados de las respuestas y no influyen en lo que el asistente contesta.',
  },
  {
    q: '¿Pueden manejar nuestras redes sociales?',
    a: 'Sí. Podemos encargarnos de la estrategia, la creación de contenido y la gestión continua, según el alcance que definamos.',
  },
  {
    q: '¿También hacen email marketing?',
    a: 'Sí. Campañas, secuencias de seguimiento, newsletters, automatizaciones y segmentación.',
  },
  {
    q: '¿Pueden trabajar con las herramientas que ya tenemos?',
    a: 'Sí. Primero revisamos lo que ya usas y solo recomendamos cambios cuando aportan algo concreto.',
  },
  {
    q: '¿Hacen páginas web o solo marketing?',
    a: 'También desarrollamos landing pages, sitios web, tiendas en línea y funcionalidades a medida.',
  },
  {
    q: '¿Garantizan resultados?',
    a: 'No prometemos resultados absolutos. Diseñamos, medimos y optimizamos con base en datos y en las condiciones reales de tu negocio.',
  },
  {
    q: '¿Muestran precios?',
    a: 'No en el sitio. Cada proyecto depende del objetivo, el alcance y lo que ya tienes. Después de entender tu caso te proponemos un alcance y una cotización.',
  },
];

export const chatgptAdsFaqs: Faq[] = [
  {
    q: '¿ChatGPT Ads está disponible en México?',
    a: 'Sí. En el centro de ayuda de OpenAI, México aparece con acceso de autoservicio a Ads Manager. El canal sigue evolucionando, así que revisamos la disponibilidad y los formatos vigentes al planear cada campaña.',
  },
  {
    q: '¿Los anuncios cambian lo que ChatGPT responde?',
    a: 'No. OpenAI indica que los anuncios están separados de las respuestas y no influyen en lo que el asistente contesta.',
  },
  {
    q: '¿El anunciante puede ver las conversaciones?',
    a: 'No. Según el centro de ayuda de OpenAI, las conversaciones no se comparten con los anunciantes; estos reciben información agregada sobre el desempeño de sus anuncios.',
  },
  {
    q: '¿Reemplaza a Google Ads?',
    a: 'No. Google captura búsquedas explícitas; ChatGPT puede participar antes o durante una exploración más conversacional. Una estrategia puede usar ambos y medir qué papel juega cada uno.',
  },
  {
    q: '¿Para qué negocios tiene más sentido?',
    a: 'Para ofertas que las personas investigan, comparan o necesitan entender antes de decidir. Si tu cliente compra por impulso o solo por precio, quizá otro canal sea mejor punto de partida.',
  },
  {
    q: '¿Qué necesito antes de empezar?',
    a: 'Una oferta clara, una página o destino preparado para convertir y una forma de medir qué pasa después del clic. Si falta alguna pieza, la construimos contigo.',
  },
];

export const whatsappFaqs: Faq[] = [
  {
    q: '¿El asistente reemplaza a mi equipo?',
    a: 'No es la idea. Resuelve lo repetitivo y ordena la información para que tu equipo dedique su tiempo a las conversaciones que lo necesitan.',
  },
  {
    q: '¿Qué pasa si alguien pregunta algo que el asistente no sabe?',
    a: 'Definimos reglas de escalamiento: el asistente reconoce cuando algo está fuera de su alcance y pasa la conversación a una persona con un resumen de lo hablado.',
  },
  {
    q: '¿Puede inventar información?',
    a: 'Lo diseñamos para responder con información aprobada por tu negocio y lo probamos con preguntas simples, ambiguas y fuera de alcance antes de publicarlo. También medimos qué pregunta la gente para ajustarlo.',
  },
  {
    q: '¿Puede agendar citas o registrar prospectos?',
    a: 'Sí, cuando existe integración con tu agenda, CRM u otras herramientas. Lo definimos al mapear tu proceso.',
  },
  {
    q: '¿Necesito cambiar mi número de WhatsApp?',
    a: 'Depende de cómo usas WhatsApp hoy y del alcance del proyecto. Lo revisamos al inicio y te explicamos las opciones antes de mover nada.',
  },
];

export const iaFaqs: Faq[] = [
  {
    q: '¿Necesito tener sistemas o datos complejos para empezar?',
    a: 'No. Muchas mejoras empiezan con documentos, procesos y herramientas que ya existen. Lo primero es elegir una tarea que valga la pena resolver.',
  },
  {
    q: '¿Qué pasa con la información confidencial?',
    a: 'Definimos desde el inicio qué información puede usar la IA y cuál debe quedar fuera, y diseñamos revisión humana donde el riesgo o la decisión lo requieren.',
  },
  {
    q: '¿Trabajan con una herramienta o modelo en particular?',
    a: 'Elegimos las herramientas después de entender el problema. La propuesta se explica por lo que resuelve, no por el nombre del modelo.',
  },
  {
    q: '¿Mi equipo va a poder usar lo que construyan?',
    a: 'Esa es la condición. Lo probamos con ejemplos de tu operación y documentamos la forma de usar cada solución para que no dependa de una sola persona.',
  },
];

export const seoFaqs: Faq[] = [
  {
    q: '¿Qué es GEO o AEO?',
    a: 'Son siglas para la optimización en motores generativos y de respuesta: preparar el contenido de tu sitio para que asistentes como ChatGPT lo entiendan y puedan usarlo al responder. En la práctica significa páginas claras, datos consistentes, respuestas directas y contenido citable.',
  },
  {
    q: '¿Pueden garantizar que aparezca en ChatGPT?',
    a: 'No, y nadie serio debería prometerlo. Sí podemos mejorar la calidad, la estructura, la autoridad y la accesibilidad de la información que existe sobre tu negocio.',
  },
  {
    q: '¿El SEO tradicional sigue sirviendo?',
    a: 'Sí. Google sigue siendo un canal central. El trabajo de visibilidad en IA se suma al SEO; no lo sustituye.',
  },
];
