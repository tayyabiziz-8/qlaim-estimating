import { NavLink } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'

const tiers = [
  {
    code: 'T-01',
    name: 'Single Room',
    price: '$85',
    unit: 'per claim',
    body: 'One affected room or area, single trade scope.',
    features: ['1 room / area', 'Xactimate estimate', 'Photo packet', '48-hr turnaround'],
  },
  {
    code: 'T-02',
    name: 'Full Loss',
    price: '$220',
    unit: 'per claim',
    highlight: true,
    body: 'Multi-room losses with mixed trades — the standard package for most restoration jobs.',
    features: ['Up to 6 rooms / areas', 'Xactimate estimate + sketch', 'Photo packet', 'Moisture / char log', '48-hr turnaround'],
  },
  {
    code: 'T-03',
    name: 'Large Loss',
    price: 'Quoted',
    unit: 'per claim',
    body: 'Commercial or whole-structure losses. Scoped individually after a brief file review.',
    features: ['Unlimited rooms / areas', 'Full reconstruction takeoff', 'On-call estimator', 'Priority turnaround'],
  },
]

const addOns = [
  { code: 'A-01', label: 'Rush (same-day)', rate: '+$60' },
  { code: 'A-02', label: 'On-site visit (within 50 mi.)', rate: '+$150' },
  { code: 'A-03', label: 'Estimate revision after carrier pushback', rate: '$40' },
  { code: 'A-04', label: 'Additional room / area beyond tier', rate: '$25 ea.' },
  { code: 'A-05', label: 'Sketch only (no full estimate)', rate: '$45' },
  { code: 'A-06', label: 'Supplement to an existing, approved estimate', rate: '$60' },
]

export default function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <SectionLabel>Rate schedule</SectionLabel>
      <h1 className="max-w-2xl font-display text-3xl text-ink-heading md:text-4xl">
        Straightforward pricing, billed per claim.
      </h1>
      <p className="mt-4 max-w-xl text-ink-body">
        No subscriptions or minimums. Pick the tier that matches the loss, add
        rush or on-site service if needed, and pay when the estimate is
        delivered.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.code} className={`flex flex-col bg-paper p-8 ${t.highlight ? 'ring-1 ring-inset ring-brass' : ''}`}>
            <div className="flex items-center justify-between text-sm text-ink-dim">
              <span className="font-medium text-brass">{t.code}</span>
              {t.highlight && <span className="text-xs font-medium uppercase tracking-wide text-brass">Most ordered</span>}
            </div>
            <h2 className="mt-3 font-display text-xl text-ink-heading">{t.name}</h2>
            <p className="mt-4 font-display text-3xl text-ink-heading">
              {t.price}
              <span className="ml-1 text-sm font-normal text-ink-dim">{t.unit}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-body">{t.body}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-body">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-px w-3 bg-brass/70" />
                  {f}
                </li>
              ))}
            </ul>
            <NavLink
              to="/order"
              className="mt-8 bg-brass py-2.5 text-center text-sm font-medium text-paper transition-colors hover:bg-ink-heading"
            >
              Order this tier
            </NavLink>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <SectionLabel>Add-ons</SectionLabel>
        <h2 className="font-display text-2xl text-ink-heading">Optional line items</h2>
        <table className="mt-6 w-full border-t border-line text-left">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-ink-dim">
              <th className="py-3 pr-4 font-medium">Code</th>
              <th className="py-3 pr-4 font-medium">Item</th>
              <th className="py-3 pr-4 text-right font-medium">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {addOns.map((a) => (
              <tr key={a.code} className="text-sm">
                <td className="py-3 pr-4 font-medium text-brass">{a.code}</td>
                <td className="py-3 pr-4 text-ink-heading">{a.label}</td>
                <td className="py-3 pr-4 text-right text-ink-dim">{a.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
