// Genera public/og/default.png (1200x630) con la tipografía, la paleta y el video del sitio.
// Requiere playwright-core y un navegador Chromium/Edge instalado:
//   node tools/og-image.mjs
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
// Se incrustan como data URI: una página creada con setContent no puede leer file://.
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(path.join(root, file)).toString('base64')}`;
const font = dataUri('src/assets/fonts/satoshi-variable.woff2', 'font/woff2');
const photo = dataUri('public/video/ciudad-poster.jpg', 'image/jpeg');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Satoshi;src:url(${font}) format('woff2');font-weight:300 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;font-family:Satoshi;color:#fff;overflow:hidden;position:relative;background:#0b0912}
.bg{position:absolute;inset:0;background:url(${photo}) center/cover}
.tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,9,18,.55),rgba(11,9,18,.9)),linear-gradient(100deg,rgba(91,33,182,.75),rgba(124,58,237,.15) 60%,transparent)}
.c{position:absolute;inset:0;padding:60px 70px;display:flex;flex-direction:column;justify-content:space-between}
.mark{font-weight:800;font-size:34px;letter-spacing:-.04em}.mark b{color:#f5c451;font-weight:900;margin:0 .06em}
h1{font-weight:700;font-size:92px;line-height:.95;letter-spacing:-.05em}h1 span{color:#f5c451}
p{font-size:28px;font-weight:500;color:rgba(255,255,255,.85);max-width:30em}
</style></head><body><div class="bg"></div><div class="tint"></div><div class="c">
<div class="mark">Marketing<b>+</b>IA</div>
<h1>IA que trabaja.<br>Marketing que genera <span>oportunidades.</span></h1>
<p>ChatGPT Ads, Google y Meta, WhatsApp con IA, contenido, web y automatización.</p></div></body></html>`;

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
fs.mkdirSync(path.join(root, 'public/og'), { recursive: true });
await page.screenshot({ path: path.join(root, 'public/og/default.png') });
await browser.close();
console.log('public/og/default.png');
