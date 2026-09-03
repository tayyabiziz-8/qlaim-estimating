import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/order', label: 'Place Order' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <NavLink to="/" className="flex items-center gap-2.5 font-display text-xl text-ink-heading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" stroke="#8f6018" strokeWidth="1" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="#8f6018" strokeWidth="0.75" />
            <line x1="12" y1="2" x2="12" y2="22" stroke="#8f6018" strokeWidth="0.75" />
            <circle cx="12" cy="12" r="3.2" stroke="#182229" strokeWidth="1" />
          </svg>
          Qlaims&nbsp;Estimating
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] text-ink-body md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative py-1 transition-colors hover:text-ink-heading ${isActive ? 'font-medium text-brass' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-brass transition-all ${isActive ? 'w-full' : 'w-0'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/order"
          className="hidden rounded-none bg-brass px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-heading md:inline-block"
        >
          Get an Estimate
        </NavLink>

        {/* Mobile nav */}
        <nav aria-label="Primary mobile" className="flex items-center gap-4 text-xs text-ink-body md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'font-medium text-brass' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
