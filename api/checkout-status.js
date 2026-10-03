import { getStripe, json } from './_lib/stripe.js'

/**
 * GET /api/checkout-status?session_id=cs_...
 * Lets the success page confirm the payment with Stripe instead of trusting
 * the redirect alone. Returns only what the page needs to show.
 */
export async function GET(request) {
  const id = new URL(request.url).searchParams.get('session_id') || ''
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) {
    return json({ error: 'Invalid session.' }, 400)
  }
  try {
    const session = await getStripe().checkout.sessions.retrieve(id)
    return json({
      status: session.status, // open | complete | expired
      paymentStatus: session.payment_status, // paid | unpaid | no_payment_required
      amountTotal: session.amount_total,
      orderRef: session.client_reference_id,
    })
  } catch (err) {
    console.error('Checkout status failed', err)
    return json({ error: 'Could not check payment.' }, 404)
  }
}
