import { NavLink } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'

const services = [
  {
    code: 'S-01',
    title: 'Water damage estimating',
    body: 'Full-loss scoping for burst pipes, appliance failures, and storm intrusion. Moisture mapping, drying equipment logs, and affected-material schedules built to carrier line-item standard.',
    deliverables: ['Xactimate estimate', 'Moisture log', 'Photo packet'],
  },
  {
    code: 'S-02',
    title: 'Fire & smoke restoration estimating',
    body: 'Char depth, soot deposition, and structural assessment translated into a defensible reconstruction and cleaning scope.',
    deliverables: ['Xactimate estimate', 'Room-by-room narrative', 'Photo packet'],
  },
  {
    code: 'S-03',
    title: 'Mold remediation estimating',
    body: 'Containment, air scrubbing, and material removal scoped against IICRC S520 protocol and current regional pricing.',
    deliverables: ['Xactimate estimate', 'Containment sketch'],
  },
  {
    code: 'S-04',
    title: 'Reconstruction takeoffs',
    body: 'Framing, drywall, flooring, and finish-schedule quantities measured from site photos, sketches, or laser scans.',
    deliverables: ['Line-item takeoff', 'Floor plan sketch'],
  },
  {
    code: 'S-05',
    title: 'Estimate review & supplements',
    body: 'A second-pass review of an existing estimate against scope photos and current price list — including supplements for damage found after the original estimate was written.',
    deliverables: ['Markup report', 'Supplement / revised estimate'],
  },
  {
    code: 'S-06',
    title: 'Rush estimating',
    body: 'Same-day turnaround for time-sensitive claims, subject to availability. Ask when you place your order.',
    deliverables: ['Xactimate estimate', 'Priority queue'],
  },
]

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <SectionLabel>Schedule of services</SectionLabel>
      <h1 className="max-w-2xl font-display text-3xl text-ink-heading md:text-4xl">
        Six ways to get a claim measured, scoped, and written.
      </h1>
      <p className="mt-4 max-w-xl text-ink-body">
        Every engagement is scoped by a certified claim estimator and checked
        against the current Xactimate price list for your region before
        delivery.
      </p>

      <div className="mt-8 max-w-2xl border-l-2 border-brass bg-paper-alt py-4 pl-5 pr-6">
        <p className="text-sm leading-relaxed text-ink-body">
          <span className="font-medium text-ink-heading">Most of our work is supplements.</span>{' '}
          If you already have a base estimate on file and later find
          additional damage, we'll write the supplement against your original
          scope rather than starting over — just note it when you place your
          order.
        </p>
      </div>

      <div className="mt-12 divide-y divide-line border-t border-line">
        {services.map((s) => (
          <div key={s.code} className="grid gap-4 py-8 md:grid-cols-[100px_1fr_220px] md:gap-8">
            <span className="text-sm font-medium text-brass">{s.code}</span>
            <div>
              <h2 className="font-display text-xl text-ink-heading">{s.title}</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-dim">{s.body}</p>
            </div>
            <div className="text-sm text-ink-dim">
              <p className="mb-1.5 font-medium text-ink-heading">Deliverables</p>
              <ul className="space-y-1">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-brass/70" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
        <p className="max-w-md text-ink-dim">
          Not sure which service fits your claim? See pricing by tier, or send
          us the file and we'll scope it for you.
        </p>
        <div className="flex gap-4">
          <NavLink to="/pricing" className="border border-line px-6 py-3 text-sm font-medium text-ink-body transition-colors hover:border-ink-heading hover:text-ink-heading">
            View pricing
          </NavLink>
          <NavLink to="/order" className="bg-brass px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-heading">
            Place an order
          </NavLink>
        </div>
      </div>
    </div>
  )
}
