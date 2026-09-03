# Qlaims Estimating — marketing site

React + Vite + Tailwind CSS + React Router. Four pages: Home (landing),
Services, Pricing, Place Order. Design language: light, paper-toned
architectural aesthetic aimed at an older, professional audience — warm
off-white background, deep ink text, a muted brass accent, Source Serif 4
for headings paired with Inter body text, hairline rules, a faint
blueprint grid, and a restrained animated floor-plan line drawing in the
hero. One dark navy section (footer, stats band, carousel photo panel)
anchors the page for contrast without going full dark-mode.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Wiring up the contact form & order form to your inbox

Both `src/components/ContactForm.jsx` (landing page) and
`src/pages/PlaceOrder.jsx` (Place Order page) validate with **Formik +
Yup**, and send email client-side via [EmailJS](https://www.emailjs.com) —
no backend required. Free tier covers 200 emails/month.

The order form specifically asks for a **scope notes file**, **images**,
and a **measurements file** (Step 3), plus a checkbox for orders that are
a **supplement to an already-approved estimate** (Step 2), which asks for
the original claim/estimate number when checked.

1. Create a free EmailJS account.
2. **Email Services** -> add the inbox that should receive messages (Gmail,
   Outlook, or any SMTP) -> note the **Service ID**.
3. **Email Templates** -> create a template for the contact form (variables
   `from_name`, `from_email`, `message`) and, separately, one for the order
   form (variables `name`, `company`, `email`, `phone`, `address`,
   `lossType`, `tier`, `isSupplement`, `originalEstimateRef`, `urgency`,
   `details`, `filesNote`, plus the file inputs `scope_notes_file`,
   `measurements_file`, and `images` for attachments). Note each
   **Template ID**.
4. **Account** -> **General** -> copy your **Public Key**.
5. Paste the three values into the constants at the top of
   `ContactForm.jsx` and `PlaceOrder.jsx` (`EMAILJS_SERVICE_ID`,
   `EMAILJS_TEMPLATE_ID` / `EMAILJS_ORDER_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`).

The order form uses EmailJS's `sendForm` (not `send`) so the scope notes,
measurements, and images file inputs travel as attachments automatically.
Attachment support and size limits depend on your EmailJS plan — check
their pricing page if a large scope file or photo set fails to send. The
contact form has no attachments and uses the simpler `emailjs.send` call.

Both forms already have a honeypot field for basic spam protection and show
inline sending / success / error states, and both show field-level
validation errors from Yup as the person types.

## Stock images

The landing-page carousel pulls placeholder photography from LoremFlickr by
keyword (water damage, blueprints, fire damage, office/documents) — swap the
`img` URLs in `src/components/Carousel.jsx` for real photography whenever
it's ready; the component doesn't otherwise need to change.

## Structure

```
src/
  components/   Navbar, Footer, Carousel, ContactForm, BlueprintHero, ...
  pages/        Home, Services, Pricing, PlaceOrder
  index.css     design tokens (@theme) + global styles
```
