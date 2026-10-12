// Downloads the official Argix brand assets from your own site (https://argix.net/assets/...) into public/assets/.
// Run on a machine with internet access:  npm run assets:fetch   (add  -- --og  to also take the live og-image.png)
// Every file is checked (HTTP status, content type, non-empty) and reported; failures never leave partial files behind.
import fs from 'fs'; import path from 'path';
const BASE = 'https://argix.net/assets/';
const certs = ['cissp', 'cism', 'cisa', 'iso27001la', 'oscp', 'osep', 'oswe', 'osed', 'osce3', 'crtp', 'crest-cpsa', 'crest-crt', 'ewptx', 'ecppt', 'ceh', 'ceh-practical', 'cbbh', 'ecir', 'ecthp', 'chfi'];
const clients = ['american-telephysicians', 'cura4u', 'smartclinix', 'bizauras', 'udhc'];
const files = [['logo.svg', 'image/svg'], ['logo-white.svg', 'image/svg'], ...certs.map((c) => [`certs/${c}.jpg`, 'image/jp']), ...clients.map((c) => [`clients/${c}.jpg`, 'image/jp'])];
if (process.argv.includes('--og')) files.push(['og-image.png', 'image/png']);
let failed = 0;
for (const [rel, type] of files) {
  try {
    const res = await fetch(BASE + rel); const buf = Buffer.from(await res.arrayBuffer()); const ct = res.headers.get('content-type') || '';
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (!ct.startsWith(type)) throw new Error(`unexpected content-type ${ct}`);
    if (!buf.length || (type === 'image/svg' && !buf.toString('utf8').includes('<svg'))) throw new Error('empty or invalid file');
    const out = path.join('public/assets', rel); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, buf);
    console.log(`ok      ${rel} (${buf.length} bytes)`);
  } catch (e) { failed++; console.log(`FAILED  ${rel}: ${e.message}`); }
}
console.log(failed ? `\n${failed} of ${files.length} files failed. Nothing was invented; missing assets fall back to text.` : `\nAll ${files.length} assets downloaded.`);
process.exit(failed ? 1 : 0);
