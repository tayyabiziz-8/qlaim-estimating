# Restore Estimation - marketing site

React + Vite + Tailwind CSS + React Router. Four pages: Home (landing),
Services, Pricing, Place Order. Design language: light, paper-toned
architectural aesthetic aimed at an older, professional audience: warm
off-white background, deep ink text, an amber accent sampled from the
Restore Estimation logo, Source Serif 4 for page headings, Poppins
(matching the logo's own wordmark) for the navbar brand name, hairline
rules, a faint blueprint grid, and a restrained animated floor-plan line
drawing in the hero. One dark navy section (footer, stats band, carousel
photo panel) anchors the page for contrast without going full dark-mode.

Domain: restoreestimation.com, registered/managed through Squarespace.
This is a standalone React app, not a Squarespace site builder page, see
"Deploying & connecting the domain" below for how the two fit together.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Logo

`src/assets/logo.png` (full lockup, used in the footer) and
`src/assets/logo-mark.png` (icon only, used in the navbar) are generated
from the client-provided `logo.jpeg` with the background knocked out to
transparency. If a new logo file arrives, re-run the same background
removal rather than dropping the raw JPEG in; a flat JPEG background won't
blend with the page. The navbar's "Restore Estimation" text is set in
Poppins (bold/extra-bold) to match the logo's own lettering; the rest of
the site's headings use Source Serif 4.

## Wiring up the contact form & order form to your inbox

Both `src/components/ContactForm.jsx` (landing page) and
`src/pages/PlaceOrder.jsx` (Place Order page) validate with **Formik +
Yup**, and send email client-side via [EmailJS](https://www.emailjs.com):
no backend required. Free tier covers 200 emails/month.

The order form specifically asks for **scope notes** (typed directly, or
as an uploaded file/photo), **images**, and a **measurements file** (Step
3). At least one of Images or a link to photos is required before the
form can be submitted, validated on submit with an inline message if both
are missing.

1. Create a free EmailJS account.
2. **Email Services** -> add the inbox that should receive messages (Gmail,
   Outlook, or any SMTP) -> note the **Service ID**.
3. **Email Templates** -> create a template for the contact form (variables
   `from_name`, `from_email`, `message`) and, separately, one for the order
   form (variables `name`, `company`, `email`, `phone`, `address`,
   `lossType`, `tier`, `urgency`, `scopeNotesText`, `details`, `filesNote`,
   plus the file inputs `scope_notes_file`, `measurements_file`, and
   `images` for attachments). Note each **Template ID**.
4. **Account** -> **General** -> copy your **Public Key**.
5. Paste the three values into the constants at the top of
   `ContactForm.jsx` and `PlaceOrder.jsx` (`EMAILJS_SERVICE_ID`,
   `EMAILJS_TEMPLATE_ID` / `EMAILJS_ORDER_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`).

The order form uses EmailJS's `sendForm` (not `send`) so the scope notes,
measurements, and images file inputs travel as attachments automatically.
Attachment support and size limits depend on your EmailJS plan, check
their pricing page if a large scope file or photo set fails to send. The
contact form has no attachments and uses the simpler `emailjs.send` call.

Both forms already have a honeypot field for basic spam protection and show
inline sending / success / error states, and both show field-level
validation errors from Yup as the person types.

## Stock images

The landing-page carousel pulls placeholder photography from LoremFlickr by
keyword (water damage, blueprints, fire damage, office/documents); swap the
`img` URLs in `src/components/Carousel.jsx` for real photography whenever
it's ready, the component doesn't otherwise need to change.

## Deploying & connecting the domain

Squarespace's own builder can't host a custom React app like this one, so
the usual path is: deploy this app to a static host, then point the
restoreestimation.com domain at it from Squarespace's DNS settings.

1. **Deploy the build.** Push this project to GitHub, then connect the repo
   to a static host such as Vercel or Netlify (both have a free tier and
   auto-detect Vite). Build command `npm run build`, output directory
   `dist`. Once deployed you'll get a temporary URL like
   `restore-estimation.vercel.app`, confirm the site works there first.
2. **Point the domain at it.** In Squarespace, go to **Settings -> Domains
   -> restoreestimation.com -> DNS Settings**, and add the DNS records your
   host gives you (usually an `A` record for the root domain and a `CNAME`
   for `www`). Both Vercel and Netlify show you the exact records to add
   once you attach the domain on their end.
3. **Don't touch existing MX records** if this domain also receives email
   (e.g. an @restoreestimation.com inbox) through Squarespace or another
   provider, removing those would break mail delivery. Only add/change the
   A and CNAME records for the web address itself.
4. DNS changes can take anywhere from a few minutes to 24-48 hours to
   propagate.

## Structure

```
src/
  components/   Navbar, Footer, Carousel, ContactForm, BlueprintHero, ...
  pages/        Home, Services, Pricing, PlaceOrder
  index.css     design tokens (@theme) + global styles
```
