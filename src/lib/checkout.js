// Browser side of the Stripe flow. Card details never pass through this
// code: we ask our own server function for a Checkout URL and send the
// customer to Stripe's hosted page.

const STORAGE_KEY = 're-pending-checkout'

// e.g. RE-260929-K7QZ. Matches ORDER_REF_PATTERN in api/_lib/stripe.js.
export function newOrderRef(date = new Date()) {
  const yymmdd = date.toISOString().slice(2, 10).replaceAll('-', '')
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I mix-ups
  const bytes = crypto.getRandomValues(new Uint8Array(4))
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
  return `RE-${yymmdd}-${suffix}`
}

export async function startCheckout(payload) {
  let res
  try {
    res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('We could not reach the payment service. Check your connection and try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Payment could not be started. Please try again.')
  }
  window.location.assign(data.url)
}

// sessionStorage (this tab only, cleared when it closes) keeps the order
// selection so the "cancelled" page can offer to reopen checkout.
export function savePendingCheckout(payload) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* storage blocked: retry button just will not show */
  }
}

export function loadPendingCheckout() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export function clearPendingCheckout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
