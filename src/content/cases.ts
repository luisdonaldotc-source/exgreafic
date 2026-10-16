/**
 * Casos de éxito, testimonios y logos.
 *
 * VACÍO A PROPÓSITO: el sitio no publica evidencia que no exista.
 * Cuando haya casos reales (con autorización del cliente), agrégalos aquí y la
 * sección "Casos" aparecerá automáticamente en /nosotros/.
 *
 * Estructura recomendada por el blueprint: problema → solución → resultado.
 */
export interface CaseStudy {
  /** Nombre del cliente tal como autorizó publicarlo, o una descripción anónima ("Distribuidor B2B en Monterrey"). */
  client: string;
  problem: string;
  solution: string;
  /** Resultado verificable. Sin cifras que no puedan respaldarse. */
  result: string;
  services: string[];
  /** Testimonio textual, solo si el cliente lo autorizó. */
  quote?: { text: string; author: string; role?: string };
}

export const cases: CaseStudy[] = [];
