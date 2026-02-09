// Gradient fade transition between sections with different backgrounds
// Eliminates hard visual cuts between light ↔ dark sections

interface SectionTransitionProps {
  from?: string
  to?: string
  height?: string
  className?: string
}

export function SectionTransition({
  from = 'transparent',
  to = 'transparent',
  height = '6rem',
  className = '',
}: SectionTransitionProps) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
      aria-hidden="true"
    />
  )
}
