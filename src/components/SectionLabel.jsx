export default function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-brass">
      <span className="h-px w-8 bg-brass/60" />
      {children}
    </div>
  )
}
