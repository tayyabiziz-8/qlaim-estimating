import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 border-b border-cream/10 px-6 py-12 md:grid-cols-3 md:px-10">
        <div>
          <img src={logo} alt="Restore Estimation" className="h-10 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-cream-dim">
            Certified claim estimators producing Xactimate-ready
            documentation for restoration and property-damage claims.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-cream">Contact</p>
          <p className="mt-2 text-sm leading-relaxed text-cream-dim">
            estimates@restoreestimation.com<br />
            +1 (555) 019-2044<br />
            Mon–Fri, 8:00–18:00 CT
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-cream">Quick links</p>
          <ul className="mt-2 space-y-1 text-sm text-cream-dim">
            <li><a href="/services" className="hover:text-cream">Services</a></li>
            <li><a href="/pricing" className="hover:text-cream">Pricing</a></li>
            <li><a href="/order" className="hover:text-cream">Place an order</a></li>
          </ul>
        </div>
      </div>
      <div className="px-6 py-4 text-center text-xs text-cream-dim md:px-10">
        © {new Date().getFullYear()} Restore Estimation. All rights reserved.
      </div>
    </footer>
  )
}
