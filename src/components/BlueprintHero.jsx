/**
 * Hero floor plan, drawn like a real measured sketch.
 *
 * Scale: 12 SVG units = 1 foot. Plan corners sit on wall centrelines at
 * x 120/560 and y 90/420 (36'-8" x 27'-6").
 *
 * Sequence (one orchestrated moment, all CSS in index.css):
 *   1. construction lines draw in
 *   2. solid walls "ink" over them
 *   3. doors and windows, then dimension strings
 *   4. affected-area hatch and room labels
 * Reduced motion shows the finished drawing immediately.
 */

const NAVY = '#1a2f42'
const AMBER = '#8f6035'
const HAIR = '#45535c'

// Solid wall poché as exact rectangles [x, y, w, h]. Exterior 10u, interior 6u.
// Gaps in these runs are the door and window openings.
const exteriorWalls = [
  [115, 85, 55, 10], [230, 85, 170, 10], [490, 85, 75, 10], // top, 2 windows
  [115, 415, 355, 10], [512, 415, 53, 10], // bottom, entry door
  [115, 95, 10, 45], [115, 210, 10, 205], // left, 1 window
  [555, 95, 10, 225], [555, 380, 10, 35], // right, 1 window
]
const interiorWalls = [
  [125, 267, 35, 6], [194, 267, 226, 6], [456, 267, 99, 6], // cross wall, 2 doors
  [327, 95, 6, 55], [327, 230, 6, 37], // kitchen / living, cased opening
  [247, 273, 6, 142], // bath / bedroom
]

// Windows: [x1, y1, x2, y2] along the wall centreline, wall thickness 10.
const windows = [
  [170, 90, 230, 90],
  [400, 90, 490, 90],
  [120, 140, 120, 210],
  [560, 320, 560, 380],
]

// Doors: hinge point, leaf end, and the arc from the free jamb to the leaf end.
const doors = [
  { hinge: [160, 273], leaf: [160, 307], arc: 'M 194 273 A 34 34 0 0 1 160 307' }, // bath
  { hinge: [456, 273], leaf: [456, 309], arc: 'M 420 273 A 36 36 0 0 0 456 309' }, // bedroom
  { hinge: [470, 415], leaf: [470, 373], arc: 'M 512 415 A 42 42 0 0 0 470 373' }, // entry
]

const rooms = [
  { name: 'Kitchen', area: '248 sq ft', x: 226, y: 196 },
  { name: 'Living', area: '274 sq ft', x: 482, y: 196 },
  { name: 'Bath', area: '126 sq ft', x: 186, y: 350 },
  { name: 'Bedroom', area: '310 sq ft', x: 404, y: 356 },
]

function Tick({ x, y }) {
  // Architectural 45 degree slash, the mark used on hand-drafted dimension strings.
  return <line x1={x - 4.5} y1={y + 4.5} x2={x + 4.5} y2={y - 4.5} strokeWidth="1.6" strokeLinecap="square" />
}

function Window({ x1, y1, x2, y2 }) {
  const horizontal = y1 === y2
  const o = 5 // half wall thickness
  return horizontal ? (
    <g>
      <line x1={x1} y1={y1 - o} x2={x2} y2={y2 - o} />
      <line x1={x1} y1={y1 + o} x2={x2} y2={y2 + o} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.4" />
      <line x1={x1} y1={y1 - o} x2={x1} y2={y1 + o} />
      <line x1={x2} y1={y2 - o} x2={x2} y2={y2 + o} />
    </g>
  ) : (
    <g>
      <line x1={x1 - o} y1={y1} x2={x2 - o} y2={y2} />
      <line x1={x1 + o} y1={y1} x2={x2 + o} y2={y2} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.4" />
      <line x1={x1 - o} y1={y1} x2={x1 + o} y2={y1} />
      <line x1={x2 - o} y1={y2} x2={x2 + o} y2={y2} />
    </g>
  )
}

export default function BlueprintHero() {
  return (
    <svg
      viewBox="92 8 566 492"
      className="h-auto w-full"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-label="Measured floor plan sketch of a four-room home with dimension strings, door swings, windows, and a hatched water-affected area across the kitchen and living room"
    >
      <defs>
        <pattern id="re-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={AMBER} strokeWidth="0.9" />
        </pattern>
      </defs>

      {/* Sheet: rooms sit on paper so the page grid does not show through */}
      <rect x="120" y="90" width="440" height="330" fill="#fbfaf7" />

      {/* 1. Construction lines */}
      <g fill="none" stroke={HAIR} strokeWidth="0.75" opacity="0.7">
        <path className="plan-draw" pathLength="1" d="M 120 90 H 560 V 420 H 120 Z" />
        <path className="plan-draw" pathLength="1" d="M 120 270 H 560 M 330 90 V 270 M 250 270 V 420" style={{ animationDelay: '0.3s' }} />
      </g>

      {/* 4a. Affected area (drawn under the walls so the walls clip it cleanly) */}
      <g className="plan-fade" style={{ animationDelay: '1.9s' }}>
        <path
          d="M 125 95 H 430 V 168 C 418 196 398 212 368 220 C 350 224 338 232 333 244 V 267 H 125 Z"
          fill={AMBER}
          fillOpacity="0.06"
        />
        <path
          d="M 125 95 H 430 V 168 C 418 196 398 212 368 220 C 350 224 338 232 333 244 V 267 H 125 Z"
          fill="url(#re-hatch)"
          opacity="0.55"
        />
        <path
          d="M 430 95 V 168 C 418 196 398 212 368 220 C 350 224 338 232 333 244"
          fill="none"
          stroke={AMBER}
          strokeWidth="1.1"
          strokeDasharray="5 3"
        />
      </g>

      {/* 2. Walls */}
      <g className="plan-fade" style={{ animationDelay: '0.9s' }} fill={NAVY}>
        {exteriorWalls.map(([x, y, w, h]) => (
          <rect key={`e${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
        {interiorWalls.map(([x, y, w, h]) => (
          <rect key={`i${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>

      {/* 3a. Openings: windows, door leaves and swings, cased-opening header */}
      <g className="plan-fade" style={{ animationDelay: '1.2s' }} fill="none" stroke={NAVY} strokeWidth="0.9">
        {windows.map(([x1, y1, x2, y2]) => (
          <Window key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
        {doors.map((d) => (
          <g key={d.arc}>
            <line x1={d.hinge[0]} y1={d.hinge[1]} x2={d.leaf[0]} y2={d.leaf[1]} strokeWidth="2.2" strokeLinecap="square" />
            <path d={d.arc} strokeWidth="0.75" stroke={HAIR} />
          </g>
        ))}
        <line x1="330" y1="150" x2="330" y2="230" stroke={HAIR} strokeWidth="0.75" strokeDasharray="4 3" />
      </g>

      {/* 3b. Dimension strings */}
      <g fill="none" stroke={AMBER} strokeWidth="0.9">
        {/* extension lines, with a small gap off the wall face */}
        <g className="plan-fade" style={{ animationDelay: '1.35s' }} strokeOpacity="0.75">
          <line x1="120" y1="78" x2="120" y2="28" />
          <line x1="560" y1="78" x2="560" y2="28" />
          <line x1="330" y1="78" x2="330" y2="51" className="plan-mobile-hide" />
          <line x1="572" y1="90" x2="636" y2="90" />
          <line x1="572" y1="420" x2="636" y2="420" />
          <line x1="572" y1="270" x2="608" y2="270" className="plan-mobile-hide" />
        </g>

        {/* overall */}
        <path className="plan-draw" pathLength="1" d="M 116 34 H 564" style={{ animationDelay: '1.4s' }} />
        <path className="plan-draw" pathLength="1" d="M 630 86 V 424" style={{ animationDelay: '1.5s' }} />
        {/* chains */}
        <g className="plan-mobile-hide">
          <path className="plan-draw" pathLength="1" d="M 116 57 H 564" style={{ animationDelay: '1.45s' }} />
          <path className="plan-draw" pathLength="1" d="M 602 86 V 424" style={{ animationDelay: '1.55s' }} />
        </g>

        <g className="plan-fade" style={{ animationDelay: '1.6s' }}>
          <Tick x={120} y={34} />
          <Tick x={560} y={34} />
          <Tick x={630} y={90} />
          <Tick x={630} y={420} />
          <g className="plan-mobile-hide">
            <Tick x={120} y={57} />
            <Tick x={330} y={57} />
            <Tick x={560} y={57} />
            <Tick x={602} y={90} />
            <Tick x={602} y={270} />
            <Tick x={602} y={420} />
          </g>
        </g>
      </g>

      <g className="plan-fade" style={{ animationDelay: '1.75s' }} textAnchor="middle" dominantBaseline="central">
        <text className="plan-dim" x="340" y="34">36'-8"</text>
        <text className="plan-dim" x="630" y="255" transform="rotate(-90 630 255)">27'-6"</text>
        <g className="plan-mobile-hide">
          <text className="plan-dim" x="225" y="57">17'-6"</text>
          <text className="plan-dim" x="445" y="57">19'-2"</text>
          <text className="plan-dim" x="602" y="180" transform="rotate(-90 602 180)">15'-0"</text>
          <text className="plan-dim" x="602" y="345" transform="rotate(-90 602 345)">12'-6"</text>
        </g>
      </g>

      {/* 4b. Room labels and affected-area tag */}
      <g className="plan-fade" style={{ animationDelay: '2.05s' }} textAnchor="middle">
        {rooms.map((r) => (
          <g key={r.name}>
            <text className="plan-room" x={r.x} y={r.y}>{r.name}</text>
            <text className="plan-area plan-mobile-hide" x={r.x} y={r.y + 17}>{r.area}</text>
          </g>
        ))}

        <g className="plan-mobile-hide">
          <rect x="138" y="108" width="118" height="36" fill="#fbfaf7" stroke={AMBER} strokeWidth="0.9" />
          <text className="plan-tag" x="197" y="122">Affected area</text>
          <text className="plan-tag-sub" x="197" y="136">412 sq ft, category 2</text>
        </g>
      </g>

      {/* Scale bar and north arrow */}
      <g className="plan-fade" style={{ animationDelay: '2.2s' }}>
        <g stroke={NAVY} strokeWidth="0.9">
          <rect x="120" y="462" width="48" height="6" fill={NAVY} />
          <rect x="168" y="462" width="48" height="6" fill="#fbfaf7" />
          <rect x="216" y="462" width="96" height="6" fill={NAVY} />
        </g>
        <g className="plan-mobile-hide" textAnchor="middle">
          <text className="plan-fine" x="120" y="484">0</text>
          <text className="plan-fine" x="168" y="484">4</text>
          <text className="plan-fine" x="216" y="484">8</text>
          <text className="plan-fine" x="312" y="484">16 ft</text>
        </g>

        <g transform="translate(544 470)">
          <circle r="15" fill="none" stroke={HAIR} strokeWidth="0.75" />
          <path d="M 0 -12 L 6 9 L 0 5 Z" fill={NAVY} />
          <path d="M 0 -12 L -6 9 L 0 5 Z" fill="none" stroke={NAVY} strokeWidth="0.9" strokeLinejoin="miter" />
          <text className="plan-fine plan-north" x="0" y="-21" textAnchor="middle">N</text>
        </g>
      </g>
    </svg>
  )
}
