import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Cloud, ShieldCheck, Check, ArrowUpRight } from 'lucide-react';
import * as D from '../data/siteData.js';
import { useInView, reduced } from '../hooks.js';
import { Reveal, Head, Arrow, FinalCta } from './ui.jsx';
import { serviceIcon } from './icons.js';
import { certImg, clientImg } from '../assets.js';

const catIcon = { build: Code, run: Cloud, secure: ShieldCheck };

export const Solutions = () => (
  <section className="sec wrap alt" id="solutions"><Head title="One technology partner. Every stage." lead="Software, cloud and security from one team, so the people who build your system also understand how it can fail." />
    <div className="cats">{D.solutions.map((s, i) => { const I = catIcon[s.id]; return (
      <Reveal key={s.id}><article className="cat"><div className="cat-top"><span className="cat-n">0{i + 1}</span><span className="ico"><I size={22} strokeWidth={1.75} aria-hidden="true" /></span></div>
        <h3>{s.title}</h3><p>{s.text}</p>
        <ul className="cat-list">{s.items.map((x) => <li key={x}><Check size={16} strokeWidth={2.25} aria-hidden="true" />{x}</li>)}</ul>
        <Link to={s.to} className="more">{s.cta} <Arrow /></Link></article></Reveal>); })}</div>
  </section>);

export const Services = () => (
  <section className="sec wrap" id="services"><Head title="Technology built around your business." lead="Twelve services across software, AI and cybersecurity. Use them together or on their own." />
    {['Build and run', 'Secure and comply'].map((g) => (<div key={g} className="grp"><h3 className="gt">{g}</h3>
      <div className="bento">{D.services.filter((s) => s.group === g && !s.hubOnly).map((s, i) => { const Icon = serviceIcon[s.slug]; return (
        <Reveal key={s.title}><Link to={D.servicePath(s)} className={`bcard ${i === 0 ? 'big' : ''}`}>
          <span className="ico"><Icon size={22} strokeWidth={1.75} aria-hidden="true" /></span>
          <h3>{s.title}</h3><p>{s.summary}</p>
          <span className="tech">{s.bullets[0]}</span><ArrowUpRight className="go" size={20} strokeWidth={1.75} aria-hidden="true" /></Link></Reveal>); })}</div></div>))}
  </section>);

export const Technology = () => (
  <section className="sec alt" id="technology"><div className="wrap"><Head title="Built with modern technology." lead="The stacks and platforms named across our services." /></div>
    <div className="marq" aria-label={D.tech.join(', ')}><div className="track">{[...D.tech, ...D.tech].map((t, i) => <span key={i} className="chip2" aria-hidden={i >= D.tech.length}>{t}</span>)}</div></div>
  </section>);

export const Process = () => (
  <section className="sec wrap" id="process"><div className="procgrid">
    <div className="procHead"><Head title="How we work" lead="Six stages. Every stage has a build task and a security task. Security is not a checkpoint at the end. It runs through the whole project, from the first workshop to monitoring after launch." /></div>
    <ol className="proc">{D.process.map(([t, b, s], i) => (<li key={t}><Reveal><div className="prow"><span className="pn" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{t}</h3><div className="pcols"><p><b>Build</b>{b}</p><p><b>Secure</b>{s}</p></div></div></div></Reveal></li>))}</ol>
  </div></section>);

export const Security = () => (
  <section className="sec wrap" id="security"><div className="secbox">
    <Head title="Security isn't an afterthought." lead="Security is not a checkpoint at the end. It runs through the whole project, from the first workshop to monitoring after launch." />
    <div className="shield" role="img" aria-label="Lifecycle: Plan, Design, Build, Test, Deploy, Monitor, wrapped in security">
      <span className="sh-label">Security</span><ol>{D.lifecycle.map((l) => <li key={l}>{l}</li>)}</ol></div>
    <div className="grid2 gap-t">
      <div><h3>Secure coding while we build</h3><ul className="ticks">{D.codingList.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div><h3>A report your auditor can use after</h3><ul className="ticks">{D.reportList.map((x) => <li key={x}>{x}</li>)}</ul></div>
    </div><p className="muted small">{D.reportNote}</p>
  </div></section>);

export const SecurityDept = () => (
  <section className="sec wrap alt"><Head title="A security department, without building one." lead="Hiring a full security team is slow and expensive. Argix can provide the leadership, the process and the people, at the level you need." />
    <div className="grid4">{D.securityDept.map(([t, d, to]) => (<Reveal key={t}><article className="card"><h3>{t}</h3><p>{d}</p>{to && <Link to={to} className="more">Learn more <Arrow /></Link>}</article></Reveal>))}</div>
  </section>);

export function Industries() {
  const [i, setI] = useState(0); const cur = D.industries[i];
  return (
    <section className="sec wrap" id="industries"><Head title="Built for industries where security matters." lead="Each sector has its own rules, data risks and integrations. These are the five we focus on." />
      <div className="ind">
        <ul className="ind-list" role="tablist" aria-label="Industries">{D.industries.map((x, k) => (
          <li key={x.slug} role="presentation"><button role="tab" id={`ind-${k}`} aria-selected={k === i} aria-controls="ind-panel" className={k === i ? 'on' : ''} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}><span>{String(k + 1).padStart(2, '0')}</span>{x.title}</button></li>))}</ul>
        <div className="ind-panel" id="ind-panel" role="tabpanel" aria-labelledby={`ind-${i}`} key={cur.slug}>
          <h3>{cur.title}</h3><p>{cur.summary}</p><ul className="ticks">{cur.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <Link to={`/${cur.slug}/`} className="more">See {cur.title.toLowerCase()} solutions <Arrow /></Link></div>
      </div>
      <p className="ind-more">We also build for <Link to="/logistics/">logistics and transport</Link> and <Link to="/real-estate/">real estate and property tech</Link> companies.</p>
    </section>);
}

export const AboutBlock = () => (
  <section className="sec wrap alt" id="about-us"><div className="aboutg">
    <Head title="One team for software and security." lead="Argix brings software development and security together in one team, with offices in Islamabad, Pakistan and Ottawa, Canada." />
    <ul className="princ">{D.principles.map(([t, d], i) => (<li key={t}><span className="pn sm" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></li>))}</ul>
  </div><p className="more-l"><Link to="/about/" className="more">About Argix <Arrow /></Link></p></section>);

function Counter({ to, suffix }) {
  const [r, seen] = useInView(); const [n, setN] = useState(0);
  useEffect(() => { if (!seen) return; if (reduced()) { setN(to); return; } let t0; const f = (t) => { t0 ??= t; const p = Math.min((t - t0) / 1200, 1); setN(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }, [seen]);
  return <span ref={r}>{n}{suffix && <i className="sfx">{suffix}</i>}</span>;
}
// Client names are shown as plain typography: no logo files have been supplied (see docs/ASSETS-NEEDED.txt).
export const Trust = () => (
  <section className="sec wrap trust" id="trust"><Head title="Organizations we work with" lead="Teams in healthcare and technology trust Argix with their software and security." />
    <ul className="orgs" aria-label="Organizations we work with">{D.clients.map((c) => { const src = clientImg(D.clientSlug[c]); return <li key={c} className={src ? 'logo-li' : ''}>{src ? <img src={src} alt={c} height="44" loading="lazy" decoding="async" /> : c}</li>; })}</ul>
    <dl className="stats">{D.stats.map((s) => <div key={s.label}><dt className="lbl">{s.label}</dt><dd><b><Counter to={s.value} suffix={s.suffix} /></b></dd></div>)}</dl>
  </section>);

export const CertPreview = () => (
  <section className="sec wrap alt"><Head title="Certified people behind the work." lead="Our engineers hold recognized credentials across governance, offensive security and incident response." />
    <ul className="tags">{D.certNames.map((c) => <li key={c}>{c}</li>)}</ul>
    {D.certNames.some((c) => certImg(D.certSlug[c])) && <ul className="badgerow" aria-label="Certification badges">{D.certNames.filter((c) => certImg(D.certSlug[c])).map((c) => <li key={c}><img src={certImg(D.certSlug[c])} alt={`${c} badge`} height="64" loading="lazy" decoding="async" /></li>)}</ul>}
    <p className="lead sm"><strong>Certifications belong to individual engineers, not to Argix as a company.</strong> Verification of individual credentials is available on request.</p>
    <p className="more-l"><Link to="/certifications/" className="more">See all certifications and issuers <Arrow /></Link></p>
  </section>);

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec wrap narrow" id="faq"><Head title="Questions we hear before every project." lead="Something missing? Ask on the consultation call and we will answer it straight." />
      {D.faq.map(([q, a], i) => (<div key={q} className={`qa ${open === i ? 'open' : ''}`}>
        <h3><button aria-expanded={open === i} aria-controls={`f${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span aria-hidden="true">+</span></button></h3>
        <div className="ans" id={`f${i}`} role="region"><p>{a}</p></div></div>))}
    </section>);
}

export const CTA = FinalCta;
