import { useCallback, useEffect, useRef, useState } from 'react'

// Images are specific, curated photos from Pexels (free to use, no
// attribution required under the Pexels License: pexels.com/license).
// Each URL is pinned to one photo ID rather than a random keyword search,
// so the same relevant image always shows. Swap for real jobsite photos
// whenever the client has them, see README.md.
const slides = [
  {
    plate: 'Exhibit 01',
    title: 'Water damage, documented room by room',
    body: 'Moisture readings, affected materials, and drying equipment logged to Xactimate line-item standard.',
    img: 'https://images.pexels.com/photos/18302377/pexels-photo-18302377.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
  },
  {
    plate: 'Exhibit 02',
    title: 'On-site measurement and scoping',
    body: 'Laser-measured floor plans and elevations, cross-checked against carrier scope requirements.',
    img: 'https://images.pexels.com/photos/5476051/pexels-photo-5476051.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
  },
  {
    plate: 'Exhibit 03',
    title: 'Fire and smoke restoration scoping',
    body: 'Char depth, soot pattern, and structural assessment translated into defensible claim narrative.',
    img: 'https://images.pexels.com/photos/10252687/pexels-photo-10252687.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
  },
  {
    plate: 'Exhibit 04',
    title: 'Carrier-ready estimate delivery',
    body: 'Finished Xactimate estimates, photo packets, and sketches delivered within 48 hours.',
    img: 'https://images.pexels.com/photos/7054757/pexels-photo-7054757.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
  },
]

export default function Carousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const go = useCallback((i) => {
    setIndex((prev) => (i + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined
    timerRef.current = setInterval(() => go(index + 1), 5500)
    return () => clearInterval(timerRef.current)
  }, [index, paused, go])

  return (
    <div
      className="border border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Field work examples"
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] xl:aspect-[21/9] overflow-hidden bg-ink-900">
        {slides.map((s, i) => (
          <div
            key={s.plate}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={i !== index}
          >
            <img
              src={s.img}
              alt={s.title}
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-brass-bright">{s.plate}</p>
              <h3 className="mt-2 font-display text-xl text-cream md:text-2xl">{s.title}</h3>
              <p className="mt-1 max-w-md text-sm text-cream-dim">{s.body}</p>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous example"
          className="absolute left-3 top-1/2 -translate-y-1/2 border border-cream/25 bg-ink-900/60 px-2.5 py-2 text-cream transition-colors hover:border-brass-bright hover:text-brass-bright"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next example"
          className="absolute right-3 top-1/2 -translate-y-1/2 border border-cream/25 bg-ink-900/60 px-2.5 py-2 text-cream transition-colors hover:border-brass-bright hover:text-brass-bright"
        >
          ›
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-paper-alt px-4 py-3 text-xs text-ink-dim">
        <span>{index + 1} of {slides.length}</span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.plate}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${s.plate}`}
              aria-current={i === index}
              className={`h-1.5 w-6 transition-colors ${i === index ? 'bg-brass' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
