/**
 * Textos de las demos animadas. Son ejemplos ilustrativos (negocios y datos
 * hipotéticos) y así se indica en pantalla. No representan clientes reales.
 */
import type { StreamTask } from '@/components/demos/StreamDemo.astro';

export const iaTasks: StreamTask[] = [
  {
    label: 'Propuesta',
    prompt: 'Prepara el borrador de propuesta para un distribuidor con la información que ya aprobamos.',
    answer: [
      'Borrador listo para revisión.',
      'Resumen del requerimiento y alcance sugerido con base en el catálogo vigente.',
      'Pendiente antes de enviar: confirmar volumen y fechas de entrega.',
    ],
  },
  {
    label: 'Reunión',
    prompt: 'Resume la llamada de hoy con el cliente y dime qué sigue.',
    answer: [
      'Acuerdos de la llamada.',
      'Enviar cotización el jueves y agendar una demostración para su equipo de compras.',
      'Riesgo: la decisión depende del presupuesto del próximo mes.',
    ],
  },
  {
    label: 'Políticas',
    prompt: '¿Qué dice nuestro manual sobre devoluciones de pedidos especiales?',
    answer: [
      'Según el manual de atención vigente:',
      'Los pedidos especiales solo se devuelven por defecto de fabricación.',
      'Fuente citada: Manual de atención, sección de devoluciones.',
    ],
  },
];

export const iaTasksExtended: StreamTask[] = [
  ...iaTasks,
  {
    label: 'Análisis',
    prompt: 'Revisa los comentarios de clientes del mes y agrúpalos por tema.',
    answer: [
      'Cuatro temas principales.',
      'Tiempos de entrega, claridad de precios, atención por WhatsApp y facturación.',
      'Sugerencia: priorizar tiempos de entrega; aparece en la mayoría de los comentarios negativos.',
    ],
  },
  {
    label: 'Contenido',
    prompt: 'Convierte la presentación de ayer en un correo para clientes, con nuestro tono.',
    answer: [
      'Borrador de correo listo.',
      'Asunto, tres ideas clave de la presentación y una invitación a agendar una llamada.',
      'Marcado para revisión humana antes de enviarse.',
    ],
  },
];
