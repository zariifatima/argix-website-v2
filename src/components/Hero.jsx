import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual.jsx';
import { frameworksStrip } from '../data/siteData.js';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="pill">
            <span className="pdot" aria-hidden="true" />
            Secure by design. Ready for what’s next.
          </p>

          <h1>
            Cybersecurity first. Smarter software. AI built for business.
          </h1>

          <p className="lead">
            Protect your systems, strengthen your security posture and build
            better digital solutions with Argix. From cybersecurity services
            and compliance support to custom software and AI automation, bring
            your technology goals together with one partner.
          </p>

          <div className="row">
            <Link to="/contact/" className="btn primary">
              Talk to our team
            </Link>
            <Link to="/services/" className="btn ghost">
              Explore our services
            </Link>
          </div>

          <p className="muted small">
            Tell us about your goals. We’ll discuss your needs and possible next steps.
          </p>

          <ul className="tags fw" aria-label="Technologies and frameworks">
            {frameworksStrip.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
