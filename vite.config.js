import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
// Custom domain (argix.net) serves from "/". For a github.io/<repo>/ URL set VITE_BASE=/<repo>/
// Official brand assets are optional at build time: whatever exists in public/assets is picked up automatically
// (logo.svg, certs/<slug>.jpg, clients/<slug>.jpg). Anything missing falls back to text, so no broken image links are ever built.
const ls = (d) => (fs.existsSync(d) ? fs.readdirSync(d) : []);
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  define: { __ASSETS__: JSON.stringify({ logo: ls('public/assets').find((f) => /^logo\.(svg|png|webp)$/.test(f)) || null, certs: ls('public/assets/certs'), clients: ls('public/assets/clients') }) },
});
