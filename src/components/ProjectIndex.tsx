import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '../types'
import { ImagePlate } from './ImagePlate'
import { MicroLabel } from './MicroLabel'

export function ProjectIndex({
  open,
  projects,
  onClose,
  onSelect,
}: {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect: (id: string) => void
}) {
  const [hover, setHover] = useState<Project | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-paper"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.48, ease: [0.2, 0.7, 0.15, 1] }}
        >
          <div className="flex h-full flex-col pt-20 md:flex-row">
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 md:px-8">
              <div className="mb-6 flex items-end justify-between border-b border-void/15 pb-3">
                <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">INDEX</h2>
                <MicroLabel>{String(projects.length).padStart(2, '0')} OBJECTS</MicroLabel>
              </div>
              <ul>
                {projects.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      data-cursor="OPEN"
                      onMouseEnter={() => setHover(p)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => onSelect(p.id)}
                      className="group grid w-full grid-cols-[48px_1fr_auto] items-baseline gap-3 border-b border-void/10 py-3 text-left md:grid-cols-[72px_1fr_140px_80px]"
                    >
                      <span className="font-mono text-[11px] text-stone">{p.number}</span>
                      <span className="font-display text-2xl font-semibold leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-3 md:text-4xl">
                        {p.name}
                      </span>
                      <span className="hidden font-mono text-[10px] tracking-[0.18em] text-stone md:block">
                        {p.category}
                      </span>
                      <span className="font-mono text-[10px] text-stone">{p.year}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="hidden w-[36%] border-l border-void/10 p-8 md:block">
              <MicroLabel>PREVIEW</MicroLabel>
              <div className="mt-4 aspect-[4/5] w-full">
                {hover ? (
                  <ImagePlate project={hover} className="h-full w-full" hover />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-void/15">
                    <MicroLabel>HOVER A ROW</MicroLabel>
                  </div>
                )}
              </div>
              {hover && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink">{hover.description}</p>
              )}
            </aside>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="absolute right-4 top-5 font-mono text-[10px] tracking-[0.28em] md:right-8"
          >
            CLOSE
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
