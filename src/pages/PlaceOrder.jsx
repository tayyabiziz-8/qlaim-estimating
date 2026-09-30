import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import emailjs from '@emailjs/browser'
import SectionLabel from '../components/SectionLabel'
import ConsentCheckbox, { PolicyLink } from '../components/ConsentCheckbox'
import { SITE } from '../siteConfig'

// Reuses the same EmailJS project as the contact form, set these once.
// See README.md. Note: sending file attachments (scope notes, images,
// measurements) depends on your EmailJS plan's attachment limits, check
// their pricing page if large files fail to send.
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_ORDER_TEMPLATE_ID = 'YOUR_ORDER_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const lossTypes = ['Water damage', 'Fire & smoke', 'Roof damage', 'Mold remediation', 'Reconstruction takeoff', 'Estimate review / audit', 'Other']
const tiers = ['Minor Loss ($85)', 'Total Loss ($220)', 'Roof Damage ($150)', 'Large Loss (quoted)', 'Not sure yet']
const urgency = ['Standard (48 hrs)', 'Rush, same day (+$60)']

const inputClass =
  'mt-2 w-full border border-line bg-paper px-3 py-2.5 text-ink-heading outline-none transition-colors focus:border-brass'

const fileInputClass =
  'mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink-body outline-none transition-colors focus:border-brass ' +
  'file:mr-4 file:cursor-pointer file:border-0 file:bg-brass file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-paper hover:file:bg-ink-heading'

const legendClass = 'mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass'

// Data minimisation: only what is needed to confirm the order, write the
// estimate, and deliver it. Phone and company were removed on purpose, and
// nothing here asks for policy numbers, IDs, or payment details.
const validationSchema = Yup.object({
  name: Yup.string().trim().required('Please enter your name'),
  email: Yup.string().trim().email('Enter a valid email address').required('Please enter your email'),
  address: Yup.string().trim().required('Please enter the property address'),
  lossType: Yup.string().required(),
  tier: Yup.string().required(),
  urgency: Yup.string().required(),
  scopeNotesText: Yup.string(),
  details: Yup.string(),
  filesNote: Yup.string(),
  consent: Yup.boolean().oneOf([true], 'Please accept the terms to place your order'),
  website: Yup.string(), // honeypot, must stay empty
})

const checklist = [
  { title: 'Photos', body: 'Upload images, or share a link (Encircle, Matterport, shared drive). One of the two is required.' },
  { title: 'Scope notes', body: 'Type them in, upload a file, or snap a photo of handwritten notes.' },
  { title: 'Measurements', body: 'A sketch export, laser scan, or room list if you have one.' },
]

export default function PlaceOrder() {
  const [status, setStatus] = useState('idle')
  const [attachmentError, setAttachmentError] = useState('')
  const formRef = useRef(null)
  const consentAtRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      lossType: lossTypes[0],
      tier: tiers[0],
      urgency: urgency[0],
      scopeNotesText: '',
      details: '',
      filesNote: '',
      consent: false,
      website: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.website) return // honeypot

      // At least one of Images or a Link must be provided before ordering.
      const imagesInput = formRef.current?.querySelector('input[name="images"]')
      const hasImages = imagesInput && imagesInput.files && imagesInput.files.length > 0
      const hasLink = values.filesNote.trim().length > 0
      if (!hasImages && !hasLink) {
        setAttachmentError('Please attach at least one image, or add a link to your photos, before submitting.')
        document.getElementById('images')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
      setAttachmentError('')

      // Record when the terms were accepted, sent along with the order.
      if (consentAtRef.current) consentAtRef.current.value = new Date().toISOString()

      setStatus('sending')
      try {
        // sendForm reads every named field straight from the DOM, so the
        // scope-notes / images / measurements <input type="file"> fields
        // are picked up and attached automatically.
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_ORDER_TEMPLATE_ID, formRef.current, {
          publicKey: EMAILJS_PUBLIC_KEY,
        })
        setStatus('sent')
        formik.resetForm()
        formRef.current?.reset()
      } catch (err) {
        console.error(err)
        setStatus('error')
      }
    },
  })

  if (status === 'sent') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brass">Order received</p>
        <h1 className="mt-4 font-display text-3xl text-ink-heading">We're on it.</h1>
        <p className="mt-4 text-ink-body">
          An estimator will confirm your order by email within one business
          hour and reach out if anything's missing.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-site px-6 py-10 md:px-10 md:py-14 xl:px-16">
      <SectionLabel>Work order</SectionLabel>
      <h1 className="font-display text-3xl text-ink-heading md:text-4xl">Place an order</h1>
      <p className="mt-4 max-w-2xl text-ink-body">
        Tell us about the property and send your scope notes, photos, and
        measurements. We only ask for what we need to write the estimate.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-16">
        {/* Side panel: checklist and data note. Above the form on phones, beside it on large screens. */}
        <aside className="lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="border border-line bg-paper-alt p-5 sm:p-6">
            <h2 className="font-display text-lg text-ink-heading">Have these ready</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {checklist.map((c) => (
                <div key={c.title} className="border-l-2 border-brass pl-3">
                  <dt className="font-medium text-ink-heading">{c.title}</dt>
                  <dd className="mt-1 leading-relaxed text-ink-dim">{c.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-dim">
              <p>
                <span className="font-medium text-ink-heading">Leave out</span> homeowner
                ID numbers, policy numbers, and payment details. We don't need
                them, and we delete them if they arrive.
              </p>
              <p className="mt-3">
                Standard turnaround is 48 hours. You pay when the estimate is
                delivered. See <Link to="/pricing" className="text-brass underline underline-offset-4 hover:text-ink-heading">pricing</Link>.
              </p>
            </div>
          </div>
        </aside>

        <form ref={formRef} onSubmit={formik.handleSubmit} className="min-w-0 space-y-10 lg:order-1" noValidate>
          <input
            type="text"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          <input ref={consentAtRef} type="hidden" name="consent_at" defaultValue="" />

          <fieldset className="grid gap-6 sm:grid-cols-2">
            <legend className={`${legendClass} sm:col-span-2`}>1. Contact</legend>
            <Field label="Full name" name="name" formik={formik} required autoComplete="name" />
            <Field label="Email" name="email" type="email" formik={formik} required autoComplete="email" />
          </fieldset>

          <fieldset className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <legend className={`${legendClass} sm:col-span-2 xl:col-span-3`}>2. Property and order</legend>
            <Field
              label="Property address"
              name="address"
              formik={formik}
              required
              className="sm:col-span-2 xl:col-span-3"
              hint="Printed on the estimate and used to apply your area's price list."
            />
            <SelectField label="Loss type" name="lossType" formik={formik} options={lossTypes} />
            <SelectField label="Tier" name="tier" formik={formik} options={tiers} />
            <SelectField label="Turnaround" name="urgency" formik={formik} options={urgency} className="sm:col-span-2 xl:col-span-1" />
          </fieldset>

          <fieldset className="grid gap-6 sm:grid-cols-2">
            <legend className={`${legendClass} sm:col-span-2`}>3. Scope notes, images and measurements</legend>

            <div className="sm:col-span-2">
              <label htmlFor="scopeNotesText" className="block text-sm font-medium text-ink-heading">
                Scope notes
              </label>
              <textarea
                id="scopeNotesText"
                name="scopeNotesText"
                rows={5}
                value={formik.values.scopeNotesText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Type your scope notes here, or attach a file or photo of them below."
                className={`${inputClass} resize-y`}
              />
            </div>

            <FileField
              label="Scope notes file or photo (optional)"
              name="scope_notes_file"
              accept=".pdf,.doc,.docx,.txt,image/*"
              hint="PDF, Word doc, text file, or a photo of your notes."
            />
            <FileField
              label="Measurements file (optional)"
              name="measurements_file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
              hint="Room measurements, sketch export, or laser-scan file."
            />

            <FileField
              label="Images"
              name="images"
              accept="image/*"
              multiple
              hint="Photos of the affected areas. You can select several."
            />
            <Field
              label="Or a link to your photos"
              name="filesNote"
              formik={formik}
              type="url"
              placeholder="Encircle, Matterport, or shared drive link"
              hint="Images or a link: one of the two is required."
            />
            {attachmentError && (
              <p className="text-sm text-red-700 sm:col-span-2" role="alert">{attachmentError}</p>
            )}
          </fieldset>

          <fieldset>
            <legend className={legendClass}>4. Notes for the estimator</legend>
            <label htmlFor="details" className="sr-only">Notes for the estimator</label>
            <textarea
              id="details"
              name="details"
              rows={4}
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Anything else the estimator should know before starting (optional)."
              className={`${inputClass} resize-y`}
            />
          </fieldset>

          <fieldset className="border-t border-line pt-8">
            <legend className="sr-only">5. Agreement</legend>
            <ConsentCheckbox formik={formik}>
              I agree to the <PolicyLink to="/terms">Terms and Conditions</PolicyLink> and{' '}
              <PolicyLink to="/refund-policy">Refund Policy</PolicyLink>, and I have read the{' '}
              <PolicyLink to="/privacy">Privacy Policy</PolicyLink>. I have permission to share
              the property details and photos in this order.
            </ConsentCheckbox>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brass px-8 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-heading disabled:opacity-50 sm:w-auto"
              >
                {status === 'sending' ? 'Submitting…' : 'Submit order'}
              </button>
              <p className="text-xs text-ink-dim">Nothing is charged until the estimate is delivered.</p>
            </div>

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-700" role="alert">
                The order did not send. Please try again, or email the details to {SITE.email}.
              </p>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, formik, type = 'text', required, className = '', hint, placeholder, autoComplete }) {
  const error = formik.touched[name] && formik.errors[name]
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-ink-heading">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-ink-dim">{hint}</p>}
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  )
}

function SelectField({ label, name, formik, options, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-ink-heading">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function FileField({ label, name, accept, multiple, hint, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-ink-heading">
        {label}
      </label>
      <input id={name} name={name} type="file" accept={accept} multiple={multiple} className={fileInputClass} />
      {hint && <p className="mt-1.5 text-xs text-ink-dim">{hint}</p>}
    </div>
  )
}
