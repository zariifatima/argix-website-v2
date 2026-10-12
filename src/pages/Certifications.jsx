import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks.js';
import { PageHero, Head, Arrow, FinalCta } from '../components/ui.jsx';
import { certGroups, certSlug, frameworks, staticMeta } from '../data/siteData.js';
import { certImg } from '../assets.js';
const SHORT = { 'Governance, risk and audit': 'Governance', 'Offensive security and penetration testing': 'Offensive security', 'Incident response and forensics': 'Incident response' };
const LABEL = { '/grc-compliance/': 'See GRC and compliance', '/cybersecurity/': 'See cybersecurity services', '/penetration-testing/': 'See penetration testing' };
// Badge artwork has not been supplied: each credential shows its official abbreviation, name and issuer as text (see docs/ASSETS-NEEDED.txt).
export default function Certifications() {
  usePageMeta(staticMeta['/certifications/'], '/certifications/');
  return (<>
    <PageHero title="Certifications and frameworks" lead="The credentials our engineers hold, and the standards our work is built around." crumbs={[['Home', '/'], ['Certifications']]} />
    <section className="sec wrap"><Head title="Credentials held by our team" lead="Grouped by area of work, with the issuing body for each." />
      <aside className="noteb"><p><strong>Certifications belong to individual engineers, not to Argix as a company.</strong> Verification of individual credentials is available on request.</p></aside>
      {certGroups.map(([g, list]) => (<div key={g} className="grp gap-t"><h3 className="gt">{g}</h3><div className="certgrid">{list.map(([n, full, org]) => { const img = certImg(certSlug[n]); return (
        <article key={n} className="cert">
          <div className={`badge-area ${img ? 'has-img' : ''}`}>{img ? <img src={img} alt={`${n} badge`} width="320" height="200" loading="lazy" decoding="async" /> : <h4>{n}</h4>}</div>
          <div className="cpad">{img && <h4>{n}</h4>}<p className="catlabel">{SHORT[g]}</p><p className="cname">{full}</p><p className="iss">Issued by {org}</p></div></article>); })}</div></div>))}
      <p className="muted small">Certification names, issuers and logos belong to their respective owners.</p></section>
    <section className="sec wrap alt"><Head title="Frameworks and standards we work to" lead="We help you meet these standards. Certification or attestation is issued by the relevant independent body." />
      <ul className="fwlist">{frameworks.map(([t, d, to]) => (<li key={t}><div><h3>{t}</h3><p>{d}</p></div><Link to={to} className="more">{LABEL[to]} <Arrow /></Link></li>))}</ul></section>
    <FinalCta />
  </>);
}
