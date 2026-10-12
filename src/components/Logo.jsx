import { useState } from 'react';
import { logoSrc } from '../assets.js';
// Official Argix logo: public/assets/logo.svg (run `npm run assets:fetch`). Until it is present, a plain text wordmark is shown.
export default function Logo({ height = 26 }) {
  const [broken, setBroken] = useState(false);
  if (!logoSrc || broken) return <span className="wordmark">Argix</span>;
  return <img src={logoSrc} alt="Argix" height={height} onError={() => setBroken(true)} />;
}
