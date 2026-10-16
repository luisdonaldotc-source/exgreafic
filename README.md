# Sitio: Marketing + IA

Sitio estático construido con **Astro 7**, CSS propio con tokens, **GSAP + ScrollTrigger** para la coreografía
de scroll y **Lenis** para el scroll suave. Basado en el *Blueprint Sitio Marketing IA Growth V2*.

> El nombre "Marketing + IA" es **provisional** (viene del blueprint). Se cambia en un solo lugar: `src/config/site.ts`.

## Comandos

```bash
npm install
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera /dist (HTML estático)
npm run preview    # sirve /dist
npm run check      # verificación de tipos de Astro/TypeScript
node tools/og-image.mjs   # regenera la imagen para redes (public/og/default.png)
```

Variables de entorno (ver `.env.example`):

| Variable | Para qué |
| --- | --- |
| `SITE_URL` | Dominio definitivo. Se usa en canonical, Open Graph, sitemap, robots y schema. **Sin ella se publica con `https://example.com`.** |
| `PUBLIC_FORM_ENDPOINT` | URL que recibe el formulario (Formspree, Basin, una función propia...). Debe aceptar `POST` con `FormData` y responder 2xx. Sin ella, el formulario avisa que no está conectado. |

## Antes de publicar

1. Definir `SITE_URL` y `PUBLIC_FORM_ENDPOINT`.
2. Completar en `src/config/site.ts`: correo, WhatsApp, teléfono, ciudad, redes y datos legales (`legal`).
3. Revisar el aviso de privacidad (`src/pages/aviso-de-privacidad.astro`) con asesoría legal. Hoy es una plantilla con campos marcados.
4. Cambiar el nombre provisional si ya existe marca, y regenerar la imagen para redes.
5. Cuando existan casos, testimonios o logos **reales y autorizados**, agregarlos en `src/content/cases.ts`: la sección aparece sola en `/nosotros/`.

## Estructura

```
src/
  config/site.ts            Marca, contacto, datos legales, endpoint del formulario
  content/                  Todo el contenido editable
    services.ts             Catálogo de servicios (menú, footer, enlaces, schema, llms.txt)
    servicePages.ts         Páginas de servicio armadas por bloques
    problems.ts             Temas del formulario e índice de problemas del Home
    demos.ts                Textos de las demos animadas (ilustrativas)
    faqs.ts                 Preguntas frecuentes (generales y por servicio)
    sources.ts              Fuentes de cada cifra publicada
    cases.ts                Casos reales (vacío a propósito)
  components/
    layout/                 Header (cápsula flotante, menús desplegables, menú móvil), Footer
    ui/                     Flecha, botón, enlace de acción, logotipo, citas y fuentes
    blocks/                 Secciones reutilizables (hero, listas, tablas, pasos, notas, cifras, FAQ, video, cierre, formulario)
    demos/                  Demos vivas: asistente en streaming, anuncio en ChatGPT, chat de WhatsApp
    home/ ia/ ads/ content/ web/   Módulos propios de cada área (hero con video, bento, campo de puntos...)
  layouts/BaseLayout.astro  <head>, SEO, Open Graph, JSON-LD, fuente, scripts
  pages/                    Rutas. [...path].astro genera las páginas por bloques
  scripts/
    site.ts                 Navegación, cápsula con indicador, entradas al hacer scroll
    motion.ts               Lenis + GSAP: titulares por palabra, texto que se ilumina, contadores,
                            paralaje, scroll horizontal, botones magnéticos, tarjetas con luz
    demos.ts                Animación de las demos (solo cuando están en pantalla)
    tabs.ts                 Pestañas accesibles
    contact-form.ts         Validación y envío del formulario
  styles/                   tokens.css (sistema de diseño) y global.css
  assets/fonts/             Satoshi (variable, autoalojada)
public/video/               Videos de fondo comprimidos (Mixkit) y sus pósters
tools/og-image.mjs          Genera public/og/default.png
```

### Efectos por atributo

Cualquier sección puede usar los efectos de `scripts/motion.ts` agregando atributos:

| Atributo | Efecto |
| --- | --- |
| `data-split` | El titular entra palabra por palabra. |
| `data-scrub` | Las palabras se iluminan conforme se hace scroll. |
| `data-count="117.4" data-decimals="1" data-prefix="+" data-suffix="%"` | Contador animado. |
| `data-parallax="0.15"` | Desplazamiento vertical relativo al scroll. |
| `data-scale-in` | Imagen o video que crece al entrar. |
| `data-hscroll` + `data-hscroll-track` | Sección fijada con recorrido horizontal (escritorio). |
| `data-magnetic="0.25"` | Botón que sigue ligeramente al cursor. |
| `data-spotlight` | Tarjeta con luz que sigue al cursor (CSS `--mx`, `--my`). |
| `data-reveal` | Los hijos entran escalonados al hacer scroll. |

Todo respeta `prefers-reduced-motion`: sin scroll suave, sin animaciones de desplazamiento y con el contenido en su estado final.

### Agregar o editar un servicio

1. Registrar el servicio en `src/content/services.ts` (aparece en menú, footer y llms.txt).
2. Si es una página por bloques, agregar su contenido en `src/content/servicePages.ts`. Tipos de bloque: `list`, `pairs`, `split`, `steps`, `rows`, `note`, `stat`, `video`, `faq`.
3. Si necesita módulos propios, crear su archivo en `src/pages/...` (tiene prioridad sobre la ruta por bloques).

## Sistema de diseño

- **Tipografía:** Satoshi (variable 300–900), autoalojada con la API de fuentes de Astro (fallback métrico y precarga).
- **Color:** base oscura `#0b0912`, morado de marca `#7c3aed`, dorado de acción `#f5c451`, secciones claras `#f6f4f0` para lectura.
  Los roles (`--c-ground`, `--c-ink`, `--c-accent`...) cambian solos con `data-theme="dark"` o `"accent"`.
- **Formas:** botones en cápsula con barrido de color, tarjetas de 20–32px de radio, vidrio solo en navegación y tarjetas sobre video.
- **Fondos de hero por área:** IA = campo de puntos interactivo; Publicidad = ciudad de noche; Contenido = atardecer; Web = glorieta.

## SEO y visibilidad en IA

- Títulos, descripciones, canonical, Open Graph y Twitter por página.
- JSON-LD: `ProfessionalService`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `ContactPage`.
- `sitemap-index.xml`, `robots.txt` y `llms.txt` generados en el build.
- Las preguntas frecuentes están en acordeones `<details>`: su texto sigue en el HTML.

## Contenido y honestidad

- Ninguna cifra sin fuente. Las fuentes están en `src/content/sources.ts` y se citan en la página.
- No hay clientes, testimonios, logos ni resultados inventados. Las demos animadas dicen "Ejemplo ilustrativo".
- Videos de Mixkit bajo la *Mixkit Stock Video Free License* (uso comercial permitido); ver `/creditos/`.
