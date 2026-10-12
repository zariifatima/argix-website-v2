import { Code, Sparkles, Cloud, Workflow, ShieldCheck } from 'lucide-react';
// Original illustration: software, AI, cloud, automation and security as connected parts of one system.
// Decorative only (aria-hidden); all labels are category names, no performance claims.
const HUB = [300, 330];
const links = [[145, 121], [465, 250], [88, 400], [480, 470]];
const Node = ({ cx, cy, Icon, label, hub }) => (
  <foreignObject x={cx - 60} y={cy - (hub ? 44 : 36)} width="120" height="130"><div className={`hn ${hub ? 'hub' : ''}`}><span><Icon size={hub ? 36 : 26} strokeWidth={1.6} /></span><em>{label}</em></div></foreignObject>
);
export default function HeroVisual() {
  return (
    <div className="hv" aria-hidden="true">
      <svg viewBox="0 0 600 600" focusable="false">
        <defs><radialGradient id="hvg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#18C6C8" stopOpacity=".24" /><stop offset="100%" stopColor="#18C6C8" stopOpacity="0" /></radialGradient></defs>
        <circle cx={HUB[0]} cy={HUB[1]} r="260" fill="url(#hvg)" />
        <g className="hv-r1"><circle cx={HUB[0]} cy={HUB[1]} r="120" className="hv-ring" /></g>
        <g className="hv-r2"><circle cx={HUB[0]} cy={HUB[1]} r="195" className="hv-ring d" /></g>
        {links.map(([x, y], i) => <path key={i} d={`M${HUB[0]} ${HUB[1]} L${x} ${y}`} className="hv-flow" />)}
        <foreignObject x="20" y="36" width="260" height="170"><div className="hw"><div className="hw-bar"><i /><i /><i /><span><Code size={13} /> Software</span></div>
          <div className="hw-body"><b className="l w60" /><b className="l t w85" /><b className="l w40" /><b className="l w70" /><div className="hw-blocks"><u /><u /><u /></div></div></div></foreignObject>
        <foreignObject x="350" y="150" width="230" height="200"><div className="hw b"><div className="hw-bar"><i /><i /><i /><span><Sparkles size={13} /> AI</span></div>
          <div className="hw-body"><div className="bub l" /><div className="bub r" /><div className="bub l" style={{ width: '58%' }} /><span className="dots"><i /><i /><i /></span></div></div></foreignObject>
        <Node cx={88} cy={400} Icon={Cloud} label="Cloud" />
        <Node cx={480} cy={470} Icon={Workflow} label="Automation" />
        <Node cx={HUB[0]} cy={HUB[1]} Icon={ShieldCheck} label="Security" hub />
      </svg>
    </div>
  );
}
