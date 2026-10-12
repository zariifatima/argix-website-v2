import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Sparkles, Network, ArrowRight } from 'lucide-react';
import { demoAnswers } from '../data/siteData.js';
import { reduced } from '../hooks.js';
const API = import.meta.env.VITE_AI_API_URL; // optional; your own server, never a secret key
async function getAnswer(item) {
  if (!API) return item.a;
  try { const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: item.q }) }); const j = await r.json(); return typeof j.answer === 'string' ? j.answer : item.a; } catch { return item.a; }
}
// Data cards restate what the live ai-solutions page offers.
const cards = [['AI features for your products', 'Assistants, search and automation added to software you run.'], ['AI security testing', 'Prompt injection, data leakage and agent permissions.'], ['AI governance', 'Usage policies, risk assessments and vendor reviews.']];
export default function AIDemo() {
  const [i, setI] = useState(0); const [text, setText] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => {
    let t, dead = false; setText(''); setBusy(true);
    getAnswer(demoAnswers[i]).then((a) => {
      if (dead) return; if (reduced()) { setText(a); setBusy(false); return; }
      let n = 0; const tick = () => { if (dead) return; n += 2; setText(a.slice(0, n)); if (n < a.length) t = setTimeout(tick, 18); else setBusy(false); }; tick();
    });
    return () => { dead = true; clearTimeout(t); };
  }, [i]);
  return (
    <section className="sec wrap alt" id="ai-demo">
      <Head2 />
      <div className="aiui">
        <div className="demo">
          <div className="win"><i /><i /><i /><span>Argix AI demo</span></div>
          <div className="chips" role="tablist" aria-label="Sample questions">{demoAnswers.map((d, k) => <button key={k} role="tab" aria-selected={k === i} className={`chip ${k === i ? 'on' : ''}`} onClick={() => setI(k)}>{d.q}</button>)}</div>
          <div className="bar"><span className="dot dot-s" aria-hidden="true" /> {API ? 'Ask Argix AI' : 'Argix AI demo'} {!API && <span className="badge">Sample answers, not a live assistant</span>} <span className="wave" aria-hidden="true">{Array.from({ length: 12 }, (_, k) => <i key={k} style={{ animationDelay: `${k * 80}ms` }} className={busy ? 'wv-on' : ''} />)}</span></div>
          <p className="status" aria-hidden="true"><span className={busy ? 'pulse' : ''} />{busy ? 'Writing sample answer' : 'Ready'}</p>
          <ol className="stages" aria-hidden="true"><li className="on">Input</li><li className={busy ? 'on' : ''}>Processing</li><li className={busy ? '' : 'on'}>Sample output</li></ol>
          <p className="q">{demoAnswers[i].q}</p>
          <p className="a" aria-live="polite">{text}{busy && <span className="caret" />}</p>
          <p className="muted small">{API ? 'Response from the configured service.' : 'Sample response. Not a live AI.'}</p>
        </div>
        <aside className="aiside" aria-label="How AI fits into a system (illustration)">
          <p className="eyebrow">Illustration: where AI fits</p>
          <ol className="aflow"><li><Database size={18} strokeWidth={1.75} />Your data</li><ArrowRight size={16} aria-hidden="true" /><li><Sparkles size={18} strokeWidth={1.75} />AI feature</li><ArrowRight size={16} aria-hidden="true" /><li><Network size={18} strokeWidth={1.75} />Your systems</li></ol>
          {cards.map(([t, d]) => <Link key={t} to="/ai-solutions/" className="dcard"><b>{t}</b><span>{d}</span></Link>)}
        </aside>
      </div>
    </section>
  );
}
const Head2 = () => (<div className="head"><h2 className="h2">See what AI can do for your business.</h2><p className="lead">A front-end demo with pre-written sample answers based on our services. It is not connected to a backend or a live AI. Pick a question.</p></div>);
