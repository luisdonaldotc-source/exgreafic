/**
 * Fuentes verificadas en el blueprint (sección 30). Toda cifra publicada en el
 * sitio debe referenciar una de estas fuentes. No agregar datos sin fuente.
 */
export interface Source {
  id: string;
  publisher: string;
  title: string;
  date?: string;
  url: string;
}

const sourceData = {
  openaiAds: {
    id: 'openaiAds',
    publisher: 'OpenAI',
    title: 'Building advertising for the way people use AI',
    date: '5 de octubre de 2026',
    url: 'https://openai.com/index/new-chatgpt-ads-format-and-measurement/',
  },
  openaiAvailability: {
    id: 'openaiAvailability',
    publisher: 'OpenAI Help Center',
    title: 'Ads Manager availability',
    url: 'https://help.openai.com/es-419/articles/20001245-ads-manager-availability',
  },
  openaiAdsSite: {
    id: 'openaiAdsSite',
    publisher: 'OpenAI Ads',
    title: 'Anúnciate en ChatGPT',
    url: 'https://ads.openai.com/es-419',
  },
  openaiTesting: {
    id: 'openaiTesting',
    publisher: 'OpenAI',
    title: 'Pruebas de anuncios en ChatGPT',
    date: 'actualización del 11 de agosto de 2026',
    url: 'https://openai.com/es-419/index/testing-ads-in-chatgpt/',
  },
  openaiHelpAds: {
    id: 'openaiHelpAds',
    publisher: 'OpenAI Help Center',
    title: 'Anuncios en ChatGPT',
    url: 'https://help.openai.com/es-419/articles/20001047-ads-in-chatgpt',
  },
  similarweb: {
    id: 'similarweb',
    publisher: 'Similarweb',
    title: 'AI Referral Traffic by Industry: 2026 Data',
    date: '3 de septiembre de 2026',
    url: 'https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/',
  },
  metaBusinessAgent: {
    id: 'metaBusinessAgent',
    publisher: 'Meta',
    title: 'Conversations 2026: presentamos el agente comercial de Meta',
    date: '3 de junio de 2026',
    url: 'https://about.fb.com/ltam/news/2026/06/conversations-2026-presentamos-el-agente-comercial-de-meta/',
  },
  metaWhatsapp: {
    id: 'metaWhatsapp',
    publisher: 'Meta',
    title: "It's Time to Reserve Your WhatsApp Username",
    date: 'junio de 2026',
    url: 'https://about.fb.com/news/2026/06/its-time-to-reserve-your-whatsapp-username/',
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sourceData;
export const sources: Record<SourceId, Source> = sourceData;
