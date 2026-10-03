import { getStripe } from './_lib/stripe.js'

/**
 * POST /api/stripe-webhook
 * Stripe calls this after payment events. It is the ONLY trustworthy
 * "this order is paid" signal (the success page redirect can be skipped or
 * faked). Each event emails the office via EmailJS's REST API so the
 * estimator knows the order can start.
 *
 * Stripe retries failed deliveries, so the same event can arrive twice.
 * The email subject includes the order ref, which makes duplicates obvious.
 */
export async function POST(request) {
  const signature = request.headers.get('stripe-signature')
  const rawBody = await request.text() // must be the raw text for signature checks

  let event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature check failed', err.message)
    return new Response('Invalid signature', { status: 400 })
  }

  const session = event.data.object
  let paymentStatus = null

  switch (event.type) {
    case 'checkout.session.completed':
      // Cards are paid immediately. Bank debits (ACH) complete later and
      // arrive as async_payment_succeeded or async_payment_failed.
      paymentStatus = session.payment_status === 'paid' ? 'PAID, start work' : 'Processing (bank payment), do not start yet'
      break
    case 'checkout.session.async_payment_succeeded':
      paymentStatus = 'PAID (bank payment cleared), start work'
      break
    case 'checkout.session.async_payment_failed':
      paymentStatus = 'Bank payment FAILED, contact the customer'
      break
    default:
      return Response.json({ received: true, ignored: event.type })
  }

  try {
    await notifyOffice(session, paymentStatus)
  } catch (err) {
    // A 500 makes Stripe retry later, so a temporary email outage does not
    // lose the notification.
    console.error('Payment notification failed', err)
    return new Response('Notification failed', { status: 500 })
  }

  return Response.json({ received: true })
}

async function notifyOffice(session, paymentStatus) {
  const params = {
    order_ref: session.client_reference_id || session.metadata?.order_ref || 'unknown',
    payment_status: paymentStatus,
    amount: `$${((session.amount_total || 0) / 100).toFixed(2)}`,
    customer_name: session.metadata?.customer_name || '',
    customer_email: session.customer_details?.email || session.customer_email || '',
    property_address: session.metadata?.property_address || '',
    stripe_payment: session.payment_intent || session.id,
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_PAYMENT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env
  if (!EMAILJS_SERVICE_ID || !EMAILJS_PAYMENT_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    // Not configured yet: log it so it still shows in Vercel's function logs.
    console.log('Payment event (EmailJS not configured)', params)
    return
  }

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_PAYMENT_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  })
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`)
}
