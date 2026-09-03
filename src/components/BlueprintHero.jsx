export default function BlueprintHero() {
  return (
    <svg
      viewBox="0 0 640 480"
      className="h-auto w-full"
      role="img"
      aria-label="Line drawing of a room floor plan with annotated dimensions, in the style of an architectural blueprint"
    >
      <g fill="none" stroke="#182229" strokeWidth="1.5">
        {/* outer room */}
        <polyline className="draw-line" points="80,60 480,60 480,300 260,300 260,400 80,400 80,60" />
        {/* interior partition */}
        <polyline className="draw-line" points="260,60 260,220 480,220" style={{ animationDelay: '0.25s' }} />
        {/* door swing */}
        <path className="draw-line" d="M 80 220 A 60 60 0 0 1 140 280" style={{ animationDelay: '0.45s' }} />
        <line className="draw-line" x1="80" y1="220" x2="80" y2="280" style={{ animationDelay: '0.45s' }} />
        {/* window marks */}
        <line className="draw-line" x1="180" y1="60" x2="220" y2="60" strokeWidth="4" style={{ animationDelay: '0.4s' }} />
        <line className="draw-line" x1="340" y1="60" x2="400" y2="60" strokeWidth="4" style={{ animationDelay: '0.4s' }} />
      </g>

      {/* dimension lines */}
      <g stroke="#8f6018" strokeWidth="1" opacity="0.85">
        <line className="draw-line" x1="80" y1="35" x2="480" y2="35" style={{ animationDelay: '0.8s' }} />
        <line x1="80" y1="28" x2="80" y2="42" />
        <line x1="480" y1="28" x2="480" y2="42" />

        <line className="draw-line" x1="500" y1="60" x2="500" y2="400" style={{ animationDelay: '0.9s' }} />
        <line x1="493" y1="60" x2="507" y2="60" />
        <line x1="493" y1="400" x2="507" y2="400" />
      </g>

      {/* annotation labels */}
      <g className="fade-in-annot" style={{ animationDelay: '1.3s' }} fill="#6b7a7f" fontFamily="Inter, sans-serif" fontSize="12">
        <text x="230" y="26">18'-4" clear</text>
        <text x="512" y="235" transform="rotate(90 512 235)">14'-0" clear</text>
      </g>
      <g className="fade-in-annot" style={{ animationDelay: '1.5s' }} fill="#6b7a7f" fontFamily="Inter, sans-serif" fontSize="11">
        <text x="330" y="145">Scope area A</text>
        <text x="90" y="345">Scope area B</text>
      </g>
    </svg>
  )
}
