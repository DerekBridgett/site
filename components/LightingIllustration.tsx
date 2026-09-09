export type LightingScene = "uplight" | "path" | "facade";

/**
 * Placeholder night-scene illustrations for the lighting page, used because
 * there are no lighting photos in data/proof.ts yet.
 *
 * Deliberately drawn rather than sourced: a stock photo of someone else's
 * install would read as our work. These are obviously illustrations, cost no
 * network bytes, and stay sharp at any size.
 *
 * Colours are fixed rather than themed — a night scene is dark in both light
 * and dark mode, the same way a photograph would be. Each is a self-contained
 * card, so it sits fine on either background.
 */
export default function LightingIllustration({ scene, className = "" }: { scene: LightingScene; className?: string }) {
  const label = {
    uplight: "Illustration of a palm tree lit from below by a ground fixture",
    path: "Illustration of a garden path edged with low path lights",
    facade: "Illustration of a house front washed with low-voltage light",
  }[scene];

  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1410" />
          <stop offset="100%" stopColor="#16281e" />
        </linearGradient>
        <linearGradient id={`beam-${scene}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`pool-${scene}`}>
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#sky-${scene})`} />
      {[[38, 34], [96, 62], [188, 28], [286, 52], [344, 30], [246, 76]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.1 : 1.7} fill="#e8f2ec" opacity={i % 2 ? 0.35 : 0.55} />
      ))}

      {scene === "uplight" && (
        <>
          <polygon points="200,262 138,96 262,96" fill={`url(#beam-${scene})`} />
          <path d="M197 262c-2-46 1-84 5-116" stroke="#6b5a44" strokeWidth="8" fill="none" strokeLinecap="round" />
          {[
            "M203 148c-26-22-52-26-72-14 24-2 46 6 66 22",
            "M203 148c26-22 52-26 72-14-24-2-46 6-66 22",
            "M203 146c-14-30-34-46-58-48 20 12 38 30 50 56",
            "M203 146c14-30 34-46 58-48-20 12-38 30-50 56",
            "M203 144c0-26-8-48-22-62 6 24 10 46 12 66",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#3f7f57" strokeWidth="7" fill="none" strokeLinecap="round" />
          ))}
          <ellipse cx="200" cy="266" rx="86" ry="16" fill={`url(#pool-${scene})`} />
          <rect x="193" y="252" width="14" height="12" rx="3" fill="#22332a" stroke="#4a5f52" strokeWidth="1.5" />
        </>
      )}

      {scene === "path" && (
        <>
          <path d="M126 300c22-70 58-102 98-118 30-12 52-16 68-18v22c-18 2-40 8-64 20-34 18-58 48-74 94z" fill="#1f3128" />
          {([[132, 250, 15], [176, 214, 12], [224, 186, 10], [274, 168, 8]] as const).map(([x, y, r], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y + r * 1.6} rx={r * 3.4} ry={r * 1.15} fill={`url(#pool-${scene})`} />
              <path d={`M${x} ${y + r * 1.5}v${-r * 1.7}`} stroke="#43524a" strokeWidth={r > 11 ? 3 : 2.2} strokeLinecap="round" />
              <path d={`M${x - r * 0.75} ${y - r * 0.2}h${r * 1.5}l${-r * 0.35} ${r * 0.5}h${-r * 0.8}z`} fill="#c9d6cd" />
              <circle cx={x} cy={y + r * 0.15} r={r * 0.42} fill="#ffe6bd" opacity="0.9" />
            </g>
          ))}
          {([[70, 268, 26], [330, 214, 22], [356, 250, 18]] as const).map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.72} fill="#2b473a" />
          ))}
        </>
      )}

      {scene === "facade" && (
        <>
          <polygon points="96,300 62,168 150,168" fill={`url(#beam-${scene})`} />
          <polygon points="306,300 262,168 348,168" fill={`url(#beam-${scene})`} />
          <rect x="70" y="166" width="260" height="112" fill="#243a2e" />
          <polygon points="58,166 200,96 342,166" fill="#1b2c23" />
          <rect x="182" y="212" width="36" height="66" rx="3" fill="#12201a" stroke="#3d5346" strokeWidth="2" />
          {([[112, 196], [268, 196]] as const).map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="42" height="34" rx="3" fill="#ffe6bd" opacity="0.55" />
          ))}
          <rect x="0" y="278" width="400" height="22" fill="#1c2f25" />
          {([[96, 278], [306, 278]] as const).map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="46" ry="10" fill={`url(#pool-${scene})`} />
          ))}
        </>
      )}
    </svg>
  );
}
