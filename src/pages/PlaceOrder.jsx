import { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import emailjs from '@emailjs/browser'
import SectionLabel from '../components/SectionLabel'

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

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Please enter your name'),
  company: Yup.string(),
  email: Yup.string().trim().email('Enter a valid email address').required('Please enter your email'),
  phone: Yup.string(),
  address: Yup.string().trim().required('Please enter the property address'),
  lossType: Yup.string().required(),
  tier: Yup.string().required(),
  urgency: Yup.string().required(),
  scopeNotesText: Yup.string(),
  details: Yup.string(),
  filesNote: Yup.string(),
  website: Yup.string(), // honeypot, must stay empty
})

export default function PlaceOrder() {
  const [status, setStatus] = useState('idle')
  const [attachmentError, setAttachmentError] = useState('')
  const formRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      lossType: lossTypes[0],
      tier: tiers[0],
      urgency: urgency[0],
      scopeNotesText: '',
      details: '',
      filesNote: '',
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
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
      <SectionLabel>Work order</SectionLabel>
      <h1 className="font-display text-3xl text-ink-heading md:text-4xl">Place an order</h1>
      <p className="mt-4 max-w-xl text-ink-body">
        Fill in the details below, including your scope notes, photos, and
        measurements.
      </p>

      <form ref={formRef} onSubmit={formik.handleSubmit} className="mt-8 space-y-8" noValidate>
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

        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass sm:col-span-2">
            1. Contact
          </legend>
          <Field label="Full name" name="name" formik={formik} required />
          <Field label="Company" name="company" formik={formik} />
          <Field label="Email" name="email" type="email" formik={formik} required />
          <Field label="Phone" name="phone" type="tel" formik={formik} />
        </fieldset>

        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass sm:col-span-2">
            2. Property &amp; loss
          </legend>
          <Field label="Property address" name="address" formik={formik} required className="sm:col-span-2" />
          <SelectField label="Loss type" name="lossType" formik={formik} options={lossTypes} />
          <SelectField label="Tier" name="tier" formik={formik} options={tiers} />
        </fieldset>

        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass sm:col-span-2">
            3. Scope notes, images &amp; measurements
          </legend>

          <div className="sm:col-span-2">
            <label htmlFor="scopeNotesText" className="block text-sm font-medium text-ink-heading">
              Scope notes
            </label>
            <textarea
              id="scopeNotesText"
              name="scopeNotesText"
              rows={4}
              value={formik.values.scopeNotesText}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type your scope notes here, or attach a file or photo of them below."
              className={`${inputClass} resize-none`}
            />
            <p className="mt-1.5 text-xs text-ink-dim">
              Type your notes directly, upload a written scope file, or take
              a photo of handwritten notes, whichever is easiest.
            </p>
          </div>

          <FileField
            label="Scope notes file or photo (optional)"
            name="scope_notes_file"
            accept=".pdf,.doc,.docx,.txt,image/*"
            hint="PDF, Word doc, text file, or a photo of your scope notes."
          />
          <FileField
            label="Measurements file"
            name="measurements_file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
            hint="Room measurements, sketch export, or laser-scan file."
          />

          <div className="sm:col-span-2">
            <FileField
              label="Images"
              name="images"
              accept="image/*"
              multiple
              hint="Photos of the affected area(s). Select multiple."
            />
          </div>

          <Field
            label="Or a link to your photos (Encircle, Matterport, shared drive)"
            name="filesNote"
            formik={formik}
            className="sm:col-span-2"
          />
          <p className="text-xs text-ink-dim sm:col-span-2">
            Please attach at least one image above, or add a link to your
            photos. One of the two is required before you can submit.
          </p>
          {attachmentError && (
            <p className="text-sm text-red-700 sm:col-span-2">{attachmentError}</p>
          )}
        </fieldset>

        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass sm:col-span-2">
            4. Delivery
          </legend>
          <SelectField label="Urgency" name="urgency" formik={formik} options={urgency} />
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brass">
            5. Notes
          </legend>
          <label htmlFor="details" className="sr-only">Additional details</label>
          <textarea
            id="details"
            name="details"
            rows={5}
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Anything else the estimator should know before starting."
            className={`${inputClass} resize-none`}
          />
        </fieldset>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-brass px-8 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-heading disabled:opacity-50"
        >
          {status === 'sending' ? 'Submitting…' : 'Submit order'}
        </button>

        {status === 'error' && (
          <p className="text-sm text-red-700">
            Something went wrong. Please email us directly at estimates@restoreestimation.com.
          </p>
        )}
      </form>
    </div>
  )
}

function Field({ label, name, formik, type = 'text', required, className = '' }) {
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
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputClass}
      />
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  )
}

function SelectField({ label, name, formik, options }) {
  return (
    <div>
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
