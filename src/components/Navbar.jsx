import { NavLink } from 'react-router-dom'
import logoMark from '../assets/logo-mark.png'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/order', label: 'Place Order', mobileLabel: 'Order' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white shadow-[0_1px_3px_rgba(26,47,66,0.06)]">
      <div className="mx-auto flex max-w-site items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:px-10 xl:px-16">
        <NavLink to="/" className="flex min-w-0 items-center gap-2">
          <img src={logoMark} alt="Restore Estimation" className="h-11 w-auto shrink-0 sm:h-12" />
          <span className="font-logo hidden truncate text-lg font-bold tracking-tight text-ink-heading sm:inline">
            Restore Estimation
          </span>
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] text-ink-body md:flex">
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
          className="hidden shrink-0 rounded-none bg-brass px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-heading md:inline-block"
        >
          Get an Estimate
        </NavLink>

        {/* Mobile nav */}
        <nav aria-label="Primary mobile" className="flex shrink-0 items-center gap-3 text-xs text-ink-body md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'font-medium text-brass' : '')}
            >
              {l.mobileLabel || l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
