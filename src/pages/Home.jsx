import { NavLink } from 'react-router-dom'
import Carousel from '../components/Carousel'
import ContactForm from '../components/ContactForm'
import SectionLabel from '../components/SectionLabel'
import BlueprintHero from '../components/BlueprintHero'

const steps = [
  {
    n: '01',
    title: 'Submit the claim',
    body: 'Send photos, scope notes, or a completed Encircle/Matterport export through Place Order.',
  },
  {
    n: '02',
    title: 'We measure and scope',
    body: 'A certified estimator maps affected areas against carrier requirements and current price lists.',
  },
  {
    n: '03',
    title: 'Estimate delivered',
    body: 'A carrier-ready Xactimate estimate, sketch, and photo packet lands in your inbox within 48 hours.',
  },
]

const stats = [
  { value: '48 hrs', label: 'Average turnaround' },
  { value: '3,100+', label: 'Estimates written' },
  { value: '±2%', label: 'Variance vs. carrier audit' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
          <div className="relative z-10">
            <SectionLabel>Est. for restoration &amp; property claims</SectionLabel>
            <h1 className="font-display text-4xl leading-[1.15] text-ink-heading md:text-5xl">
              Estimates measured to the line, not the guess.
            </h1>
            <p className="mt-5 max-w-md text-ink-body">
              Qlaims Estimating writes carrier-ready Xactimate estimates for
              restoration contractors — scoped by certified estimators,
              delivered in days, not weeks.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink
                to="/order"
                className="bg-brass px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-heading"
              >
                Get an estimate
              </NavLink>
              <NavLink
                to="/services"
                className="border border-line px-6 py-3 text-sm font-medium text-ink-body transition-colors hover:border-ink-heading hover:text-ink-heading"
              >
                View services
              </NavLink>
            </div>
          </div>
          <div className="relative z-10">
            <BlueprintHero />
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <SectionLabel>Recent field work</SectionLabel>
        <Carousel />
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-paper-alt">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <SectionLabel>Process</SectionLabel>
          <h2 className="font-display text-2xl text-ink-heading md:text-3xl">How an order moves through the shop</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 border-brass pt-4">
                <span className="text-sm font-medium text-brass">{s.n}</span>
                <h3 className="mt-2 font-display text-lg text-ink-heading">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-line bg-ink-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3 md:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-display text-3xl text-brass-bright">{s.value}</p>
              <p className="mt-1 text-sm text-cream-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display text-2xl text-ink-heading md:text-3xl">Send us the file</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
              Questions about a claim, timeline, or coverage area? Write to us
              directly and an estimator will respond within one business day.
            </p>
            <dl className="mt-8 space-y-2 text-sm text-ink-body">
              <div className="flex gap-2">
                <dt className="font-medium text-ink-heading">Email</dt>
                <dd>estimates@qlaimsestimating.com</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-ink-heading">Phone</dt>
                <dd>+1 (555) 019-2044</dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
