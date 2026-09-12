import { AnimatePresence, motion } from 'framer-motion'
import { MicroLabel } from './MicroLabel'

const EXPERIMENTS = [
  { code: 'X-11', title: 'TYPE AS SENSOR', note: 'Letterforms that thicken with scroll velocity.' },
  { code: 'X-14', title: 'SILENT GRID', note: 'Layout that withholds until dwell time exceeds 8s.' },
  { code: 'X-19', title: 'ACCESSION BOT', note: 'Overnight plating of studio dumps.' },
  { code: 'X-22', title: 'CROP PROTOCOL', note: 'Images that refuse zoom.' },
]

export function LabOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-void text-paper"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.48, ease: [0.2, 0.7, 0.15, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="absolute right-4 top-5 font-mono text-[10px] tracking-[0.28em] md:right-8"
          >
            CLOSE
          </button>
          <div className="px-6 py-24 md:px-12">
            <MicroLabel className="text-paper/50">CREATIVE LAB / ACTIVE</MicroLabel>
            <h2 className="mt-4 font-display text-6xl font-semibold leading-[0.82] md:text-[10vw]">
              EXPERIMENTS
              <br />
              IN PROGRESS
            </h2>
            <ul className="mt-16 border-t border-paper/20">
              {EXPERIMENTS.map((e) => (
                <li key={e.code} className="grid gap-2 border-b border-paper/20 py-6 md:grid-cols-[120px_1fr_2fr]">
                  <span className="font-mono text-[11px] text-paper/50">{e.code}</span>
                  <span className="font-display text-3xl font-semibold leading-none">{e.title}</span>
                  <span className="text-sm text-paper/70">{e.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
