import { Link } from 'react-router-dom'
import SectionLabel from './SectionLabel'
import { SITE } from '../siteConfig'

const legalNav = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms and Conditions' },
  { to: '/refund-policy', label: 'Refund Policy' },
]

/**
 * Shared layout for the three legal pages.
 * Wide screens: contents rail | document | "the short version" summary.
 * Phones: summary first, collapsible contents, then the document.
 *
 * sections: [{ id, title, content: <JSX> }]
 * summary:  array of short plain-English points
 */
export default function LegalPage({ title, intro, summary, sections, current }) {
  return (
    <div className="mx-auto max-w-site px-6 py-10 md:px-10 md:py-14 xl:px-16">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="font-display text-3xl text-ink-heading md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-dim">Last updated {SITE.legalUpdated}</p>
      {intro && <p className="mt-5 max-w-2xl text-ink-body">{intro}</p>}

      <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)_320px] xl:gap-16">
        {/* Contents rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <details className="group border border-line lg:border-0">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden text-sm font-medium text-ink-heading lg:hidden">
              On this page
              <span className="text-brass transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <TocList sections={sections} className="border-t border-line px-4 py-3 lg:hidden" />
          </details>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-ink-heading">On this page</p>
            <TocList sections={sections} className="mt-3" />
            <p className="mt-8 text-sm font-medium text-ink-heading">Other policies</p>
            <ul className="mt-3 space-y-2 text-sm">
              {legalNav.filter((l) => l.to !== current).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-dim hover:text-brass">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Document */}
        <article className="min-w-0">
          <Summary points={summary} className="mb-10 xl:hidden" />
          <div className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="flex gap-3 font-display text-xl text-ink-heading md:text-2xl">
                  <span className="text-brass">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="legal-prose mt-3">{s.content}</div>
              </section>
            ))}
          </div>

          {/* Other policies, for phones and tablets */}
          <div className="mt-12 border-t border-line pt-6 lg:hidden">
            <p className="text-sm font-medium text-ink-heading">Other policies</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {legalNav.filter((l) => l.to !== current).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-brass underline underline-offset-4">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Summary rail, wide screens */}
        <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start">
          <Summary points={summary} />
        </aside>
      </div>
    </div>
  )
}

function TocList({ sections, className = '' }) {
  return (
    <ol className={`space-y-2 text-sm ${className}`}>
      {sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="flex gap-2 text-ink-dim transition-colors hover:text-brass">
            <span className="w-5 shrink-0 text-brass">{i + 1}.</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

function Summary({ points, className = '' }) {
  return (
    <div className={`border border-line bg-paper-alt p-5 sm:p-6 ${className}`}>
      <h2 className="font-display text-lg text-ink-heading">The short version</h2>
      <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-body">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-brass" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-4 text-sm text-ink-dim">
        Questions? Email{' '}
        <a href={`mailto:${SITE.email}`} className="break-all text-brass underline underline-offset-4 hover:text-ink-heading">
          {SITE.email}
        </a>
      </p>
    </div>
  )
}
