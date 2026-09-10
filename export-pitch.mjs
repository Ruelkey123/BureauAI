import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLIDE_COUNT = 10;
const OUTPUT = path.join(__dirname, 'public', 'bureauai-pitch.pdf');
const PITCH_URL = `file://${path.join(__dirname, 'public', 'pitch.html')}`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function exportPitch() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Loading pitch deck...');
  await page.goto(PITCH_URL, { waitUntil: 'networkidle0' });
  await wait(2500); // let fonts render

  const screenshots = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    console.log(`  Capturing slide ${i + 1} / ${SLIDE_COUNT}...`);
    if (i > 0) {
      await page.evaluate((n) => goTo(n), i);
      await wait(650);
    }
    const buf = await page.screenshot({ type: 'jpeg', quality: 95, encoding: 'base64' });
    screenshots.push(buf);
  }

  console.log('Assembling PDF...');
  const html = `<!DOCTYPE html><html><head><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff}
    .p{width:1440px;height:900px;page-break-after:always;overflow:hidden}
    .p:last-child{page-break-after:avoid}
    img{width:100%;height:100%;display:block}
    @page{size:1440px 900px;margin:0}
  </style></head><body>
  ${screenshots.map((b) => `<div class="p"><img src="data:image/jpeg;base64,${b}"></div>`).join('')}
  </body></html>`;

  const assembly = await browser.newPage();
  await assembly.setViewport({ width: 1440, height: 900 });
  await assembly.setContent(html, { waitUntil: 'networkidle0' });
  await assembly.pdf({
    path: OUTPUT,
    width: '1440px',
    height: '900px',
    printBackground: true,
  });

  await browser.close();
  console.log(`\n✓ PDF saved → ${OUTPUT}`);
}

exportPitch().catch((err) => { console.error(err); process.exit(1); });
