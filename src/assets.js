// Resolves optional official brand assets detected at build time (see vite.config.js).
const A = __ASSETS__; const base = import.meta.env.BASE_URL;
const find = (list, slug) => list.find((f) => f.replace(/\.[^.]+$/, '') === slug);
export const logoSrc = A.logo ? `${base}assets/${A.logo}` : null;
export const certImg = (slug) => { const f = find(A.certs, slug); return f ? `${base}assets/certs/${f}` : null; };
export const clientImg = (slug) => { const f = find(A.clients, slug); return f ? `${base}assets/clients/${f}` : null; };
