// Optional helper to compare the Argix preview with a reference site (e.g. https://nexavoxa.com/) on YOUR machine.
// It saves screenshots and a JSON of measured styles (colours, fonts, radii, shadows) so the two can be compared with facts, not impressions.
//   npm i -D puppeteer            (temporary; not a project dependency)
//   npm run build && npm run preview     (in another terminal; note the local URL)
//   node docs/visual-audit/capture.mjs https://nexavoxa.com/ http://localhost:4173/
// Output: docs/visual-audit/out/<host>-<width>.png and <host>.json. Send the folder back for a real side-by-side audit.
import fs from 'fs';
let puppeteer; try { puppeteer = (await import('puppeteer')).default; } catch { puppeteer = (await import('puppeteer-core')).default; }
const urls = process.argv.slice(2); if (!urls.length) { console.error('Usage: node capture.mjs <url> [<url> ...]'); process.exit(1); }
fs.mkdirSync('docs/visual-audit/out', { recursive: true });
const browser = await puppeteer.launch({ headless: process.env.HEADLESS === 'shell' ? 'shell' : 'new', executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
for (const url of urls) {
  const name = new URL(url).host.replace(/[:.]/g, '-'); const report = {};
  for (const width of [1440, 390]) {
    const page = await browser.newPage(); await page.setViewport({ width, height: 900, isMobile: width < 500 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: `docs/visual-audit/out/${name}-${width}.png`, fullPage: true });
    if (width === 1440) report.styles = await page.evaluate(() => {
      const cs = (el) => el && getComputedStyle(el); const pick = (el, props) => el ? Object.fromEntries(props.map((p) => [p, cs(el)[p]])) : null;
      const btn = [...document.querySelectorAll('a,button')].find((e) => /start|book|talk|let/i.test(e.textContent) && e.getBoundingClientRect().width > 80);
      const sections = [...document.querySelectorAll('section,header,footer')].slice(0, 40).map((s) => ({ tag: s.tagName, bg: cs(s).backgroundColor, color: cs(s).color, h: Math.round(s.getBoundingClientRect().height) }));
      return { body: pick(document.body, ['backgroundColor', 'color', 'fontFamily', 'fontSize', 'lineHeight']), h1: pick(document.querySelector('h1'), ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'color']), h2: pick(document.querySelector('h2'), ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing']),
        nav: pick(document.querySelector('nav,header'), ['backgroundColor', 'height', 'backdropFilter', 'position']), primaryButton: pick(btn, ['backgroundColor', 'backgroundImage', 'color', 'borderRadius', 'padding', 'fontWeight', 'boxShadow']),
        card: pick(document.querySelector('[class*=card],article'), ['backgroundColor', 'borderRadius', 'border', 'boxShadow', 'padding']), sections, cssVars: Object.fromEntries([...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } }).filter((r) => r.selectorText === ':root').flatMap((r) => [...r.style].filter((p) => p.startsWith('--')).map((p) => [p, r.style.getPropertyValue(p).trim()]))) };
    });
    await page.close();
  }
  fs.writeFileSync(`docs/visual-audit/out/${name}.json`, JSON.stringify(report, null, 2)); console.log('saved', name);
}
await browser.close();
