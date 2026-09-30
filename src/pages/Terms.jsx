import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { SITE } from '../siteConfig'

const summary = [
  'We write estimates from the photos, notes, and measurements you send.',
  'An estimate is our professional opinion. We cannot promise what a carrier will pay.',
  'You pay per claim, when the estimate is delivered.',
  'We are not public adjusters and do not negotiate with carriers for you.',
]

const sections = [
  {
    id: 'agreement',
    title: 'Agreeing to these terms',
    content: (
      <p>
        These terms apply when you use {SITE.domain} or order an estimate from{' '}
        {SITE.name}. By submitting an order, you agree to these terms, our{' '}
        <Link to="/refund-policy">Refund Policy</Link>, and our{' '}
        <Link to="/privacy">Privacy Policy</Link>. If you order for a company,
        you confirm you can agree on its behalf.
      </p>
    ),
  },
  {
    id: 'service',
    title: 'What we provide',
    content: (
      <>
        <p>
          We prepare Xactimate estimates, sketches, takeoffs, reviews, and
          supplements based on the information you provide. Unless you order
          an on-site visit, we do not inspect the property ourselves.
        </p>
        <p>
          <strong>An estimate is a professional opinion of repair cost.</strong>{' '}
          It is not a guarantee that an insurance carrier will approve or pay
          any amount. We are not a public adjuster, insurer, attorney, or
          engineer, and we do not negotiate claims or give legal advice.
        </p>
      </>
    ),
  },
  {
    id: 'your-part',
    title: 'Your responsibilities',
    content: (
      <>
        <p>When you place an order, you agree that:</p>
        <ul>
          <li>The photos, notes, and measurements you send are accurate to the best of your knowledge.</li>
          <li>You have permission to share the property details and photos with us.</li>
          <li>You will review the estimate before sending it to a carrier or customer.</li>
          <li>You will not use our work for anything unlawful or misleading, such as inflating a claim.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'turnaround',
    title: 'Orders and turnaround',
    content: (
      <>
        <p>
          Standard turnaround is 48 hours and starts once we have everything
          we need to begin. If something is missing, we will email you and
          the clock pauses until it arrives.
        </p>
        <p>
          Rush (same-day) orders depend on our schedule. If we cannot accept a
          rush order, we tell you before starting and do not charge the rush
          fee.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing and payment',
    content: (
      <>
        <p>
          Prices are listed on our <Link to="/pricing">Pricing</Link> page and
          are charged per claim. Large Loss work is quoted before we begin.
          You pay when the estimate is delivered, using the method on your
          invoice. Invoices are due on receipt unless we agree otherwise in
          writing.
        </p>
        <p>
          If an order turns out to be larger than the tier you chose (for
          example, more rooms), we will tell you the new price and get your
          approval before continuing.
        </p>
      </>
    ),
  },
  {
    id: 'revisions',
    title: 'Corrections, revisions, and supplements',
    content: (
      <ul>
        <li>If we made a mistake, we fix it free of charge.</li>
        <li>Changes after carrier pushback are billed as a revision (see add-on A-03).</li>
        <li>New damage found after approval is billed as a supplement (see add-on A-06).</li>
      </ul>
    ),
  },
  {
    id: 'ownership',
    title: 'Who owns the work',
    content: (
      <p>
        Once paid, you may use the estimate and its files for the claim it was
        written for, including sharing it with the carrier, the property owner,
        and your team. We keep ownership of our own templates, methods, and
        notes. Xactimate is a trademark of Verisk Analytics. {SITE.name} is
        independent and not affiliated with Verisk.
      </p>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    content: (
      <p>
        We keep your files and property details confidential and use them only
        for your order, as described in our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limits on our liability',
    content: (
      <p>
        To the extent the law allows, our total liability for any order is
        limited to the amount you paid for that order. We are not liable for
        indirect losses, such as lost profit or a carrier's decision on a
        claim. Nothing in these terms limits liability that cannot be limited
        by law.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    content: (
      <p>
        These terms are governed by the laws of the state in which{' '}
        {SITE.name} is registered. If a problem comes up, please email us
        first. Most issues can be solved quickly and directly.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: (
      <p>
        We may update these terms from time to time. The version shown on
        this page when you place an order is the one that applies to that
        order.
      </p>
    ),
  },
]

export default function Terms() {
  return (
    <LegalPage
      current="/terms"
      title="Terms and Conditions"
      intro="The rules for using this website and ordering estimates from us."
      summary={summary}
      sections={sections}
    />
  )
}
