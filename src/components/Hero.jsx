import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual.jsx';
import { frameworksStrip } from '../data/siteData.js';
export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="pill"><span className="pdot" aria-hidden="true" />Build it. Run it. Secure it.</p>
          <h1>Custom software, AI and cybersecurity, with security built in from day one.</h1>
          <p className="lead">Argix builds custom software and AI solutions, then protects them with penetration testing, compliance work and security monitoring. One partner from first design to audit.</p>
          <div className="row">
            <Link to="/contact/" className="btn primary">Book a free consultation</Link>
            <Link to="/services/" className="btn ghost">See all services</Link>
          </div>
          <p className="muted small">A 30-minute call with an engineer. No obligation, no sales script.</p>
          <ul className="tags fw" aria-label="Frameworks we build and test to">{frameworksStrip.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
