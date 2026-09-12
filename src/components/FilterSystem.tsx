import { motion } from 'framer-motion'
import { FILTERS } from '../data/projects'
import type { Category } from '../types'
import { MicroLabel } from './MicroLabel'

export function FilterSystem({
  active,
  onChange,
}: {
  active: Category
  onChange: (c: Category) => void
}) {
  return (
    <div className="sticky top-[52px] z-30 border-y border-void/10 bg-paper/92 px-4 py-3 backdrop-blur-sm md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <MicroLabel>FILTER / COLLECTION</MicroLabel>
        <MicroLabel>SYSTEM / STABLE</MicroLabel>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {FILTERS.map((f) => {
          const on = f === active
          return (
            <button
              key={f}
              type="button"
              onClick={() => onChange(f)}
              data-cursor="OPEN"
              className="relative font-mono text-[10px] tracking-[0.22em]"
            >
              <span className={on ? 'text-void' : 'text-stone'}>{f}</span>
              {on && (
                <motion.span
                  layoutId="filter-line"
                  className="absolute -bottom-1 left-0 h-px w-full bg-void"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
