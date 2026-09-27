import { NavLink } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'

const tiers = [
  {
    code: 'T-01',
    name: 'Minor Loss',
    price: '$85',
    unit: 'per claim',
    body: 'One affected room or area, single trade scope.',
    features: ['1 room / area', 'Xactimate estimate', 'Photo packet', '48-hr turnaround'],
  },
  {
    code: 'T-02',
    name: 'Total Loss',
    price: '$220',
    unit: 'per claim',
    highlight: true,
    body: 'Multi-room losses with mixed trades. Our standard package for most restoration jobs.',
    features: ['Up to 6 rooms / areas', 'Xactimate estimate + sketch', 'Photo packet', 'Moisture / char log', '48-hr turnaround'],
  },
  {
    code: 'T-03',
    name: 'Roof Damage',
    price: '$150',
    unit: 'per claim',
    body: 'Roof-only losses: shingles, decking, flashing, and any interior water intrusion from the roof.',
    features: ['Full roof measurement', 'Xactimate estimate', 'Photo packet', '48-hr turnaround'],
  },
  {
    code: 'T-04',
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
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
      <SectionLabel>Rate schedule</SectionLabel>
      <h1 className="max-w-2xl font-display text-3xl text-ink-heading md:text-4xl">
        Straightforward pricing, billed per claim.
      </h1>
      <p className="mt-4 max-w-xl text-ink-body">
        No subscriptions or minimums. Pick the tier that matches the loss, add
        rush or on-site service if needed, and pay when the estimate is
        delivered.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
        {tiers.map((t) => (
          <div key={t.code} className={`flex flex-col bg-paper p-4 sm:p-6 lg:p-8 ${t.highlight ? 'ring-1 ring-inset ring-brass' : ''}`}>
            <div className="flex items-center justify-between text-xs text-ink-dim sm:text-sm">
              <span className="font-medium text-brass">{t.code}</span>
              {t.highlight && <span className="hidden text-xs font-medium uppercase tracking-wide text-brass sm:inline">Most ordered</span>}
            </div>
            <h2 className="mt-3 font-display text-base text-ink-heading sm:text-xl">{t.name}</h2>
            <p className="mt-3 font-display text-2xl text-ink-heading sm:text-3xl">
              {t.price}
              <span className="ml-1 text-xs font-normal text-ink-dim sm:text-sm">{t.unit}</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-body sm:text-sm">{t.body}</p>
            <ul className="mt-4 space-y-1.5 text-xs text-ink-body sm:text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-px w-3 shrink-0 bg-brass/70" />
                  {f}
                </li>
              ))}
            </ul>
            <NavLink
              to="/order"
              className="mt-6 bg-brass py-2 text-center text-xs font-medium text-paper transition-colors hover:bg-ink-heading sm:text-sm"
            >
              Order this tier
            </NavLink>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <SectionLabel>Add-ons</SectionLabel>
        <h2 className="font-display text-2xl text-ink-heading">Optional line items</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] border-t border-line text-left">
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
    </div>
  )
}
