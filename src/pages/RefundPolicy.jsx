import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { SITE } from '../siteConfig'

const summary = [
  'Cancel before we start and you pay nothing.',
  'If we made a mistake, we fix it free. If we cannot, you get your money back.',
  'Missed a rush deadline? We refund the rush fee.',
  'A carrier paying less than the estimate is not grounds for a refund.',
]

const sections = [
  {
    id: 'how-billing-works',
    title: 'How billing works',
    content: (
      <p>
        You pay per claim when the estimate is delivered, as explained in our{' '}
        <Link to="/terms">Terms and Conditions</Link>. Because you do not pay
        up front, most issues are settled before any money changes hands.
        This policy covers what happens when something goes wrong.
      </p>
    ),
  },
  {
    id: 'cancelling',
    title: 'Cancelling an order',
    content: (
      <ul>
        <li><strong>Before work starts:</strong> cancel at no cost. Just email us.</li>
        <li>
          <strong>After work starts, before delivery:</strong> we charge only
          for the work already done, and never more than half the tier price.
          We tell you the amount before invoicing.
        </li>
        <li><strong>After delivery:</strong> the order is complete and billed in full.</li>
      </ul>
    ),
  },
  {
    id: 'our-mistakes',
    title: 'If we made a mistake',
    content: (
      <>
        <p>
          If the estimate has an error on our side, such as wrong measurements
          from the files you gave us or missing line items from your scope
          notes, tell us within 30 days of delivery. We will correct it free
          of charge, usually within 2 business days.
        </p>
        <p>
          If we cannot fix it, or the corrected estimate still is not usable,
          we refund the order in full or in part, depending on how much of the
          work you were able to use.
        </p>
      </>
    ),
  },
  {
    id: 'rush-fees',
    title: 'Rush and add-on fees',
    content: (
      <ul>
        <li>If we accept a rush order and miss the same-day deadline, we refund the rush fee.</li>
        <li>If an on-site visit is cancelled by us, we refund that add-on in full.</li>
      </ul>
    ),
  },
  {
    id: 'not-covered',
    title: 'What is not refundable',
    content: (
      <ul>
        <li>An insurance carrier denying, reducing, or delaying payment on a claim.</li>
        <li>Errors caused by missing, unclear, or inaccurate information you sent us.</li>
        <li>Changes to the scope after delivery. These are billed as a revision or supplement.</li>
        <li>Orders reported more than 30 days after delivery.</li>
      </ul>
    ),
  },
  {
    id: 'request',
    title: 'How to ask for a refund',
    content: (
      <>
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the
          property address, the date you placed the order, and a short note
          on what went wrong.
        </p>
        <p>
          We reply within 5 business days. Approved refunds go back to your
          original payment method within 10 business days. Your bank may take
          a few extra days to show it.
        </p>
      </>
    ),
  },
]

export default function RefundPolicy() {
  return (
    <LegalPage
      current="/refund-policy"
      title="Refund Policy"
      intro="When you can cancel, when we fix things for free, and when you get money back."
      summary={summary}
      sections={sections}
    />
  )
}
