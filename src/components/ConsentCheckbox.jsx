/**
 * Required agreement checkbox shared by the contact and order forms.
 * Links open in a new tab so nobody loses a half-filled form by reading a policy.
 */
export default function ConsentCheckbox({ formik, name = 'consent', children }) {
  const error = formik.touched[name] && formik.errors[name]
  return (
    <div>
      <label htmlFor={name} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-body">
        <input
          id={name}
          name={name}
          type="checkbox"
          value="Yes"
          checked={formik.values[name]}
          onChange={(e) => formik.setFieldValue(name, e.target.checked)}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#8f6035]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 pl-7 text-sm text-red-700">{error}</p>
      )}
    </div>
  )
}

export function PolicyLink({ to, children }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brass underline underline-offset-4 hover:text-ink-heading"
    >
      {children}
    </a>
  )
}
