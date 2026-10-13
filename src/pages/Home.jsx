import Hero from '../components/Hero.jsx';
import { Solutions, FeaturedServices, Industries, CertPreview, FAQ, CTA } from '../components/Sections.jsx';
import { usePageMeta } from '../hooks.js';
import { staticMeta } from '../data/siteData.js';

// The homepage is an overview, not a replacement for the detailed service pages.
// Each service card directs visitors to a dedicated page with the full scope and information.
export default function Home() {
  usePageMeta(staticMeta['/'], '/');
  return (
    <>
      <Hero />
      <FeaturedServices />
      <Solutions />
      <Industries />
      <CertPreview />
      <FAQ />
      <CTA />
    </>
  );
}
