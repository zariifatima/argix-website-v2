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
            Cybersecurity · Software · AI
          </p>

          <h1>
            Secure your business. Build better technology. Move forward with AI.
          </h1>

          <p className="lead">
            Bring software engineering and cybersecurity together with one
            technology partner. Argix helps you assess risk, build useful
            digital products, modernize cloud operations and adopt AI with
            security and governance in mind.
          </p>

          <div className="row">
            <Link to="/contact/" className="btn primary">
              Book a free consultation
            </Link>
            <Link to="/services/" className="btn ghost">
              Explore our services
            </Link>
          </div>

          <p className="muted small hero-note">
            A practical first conversation about your goals, current challenges
            and possible next steps — with no obligation.
          </p>

          <ul className="tags fw" aria-label="Frameworks and standards">
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
