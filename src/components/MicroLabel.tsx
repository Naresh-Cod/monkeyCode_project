export function MicroLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-mono text-[9px] uppercase tracking-[0.22em] text-stone ${className}`}
    >
      {children}
    </span>
  )
}

export function CornerTicks({ color = 'currentColor' }: { color?: string }) {
  return (
    <>
      <span
        className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute -right-px -top-px h-2.5 w-2.5 border-r border-t"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r"
        style={{ borderColor: color }}
      />
    </>
  )
}
