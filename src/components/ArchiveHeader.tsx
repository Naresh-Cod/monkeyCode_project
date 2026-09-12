import { motion } from 'framer-motion'
import { MicroLabel } from './MicroLabel'

export function ArchiveHeader({
  onIndex,
  onMenu,
  indexOpen,
}: {
  onIndex: () => void
  onMenu: () => void
  indexOpen: boolean
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-4 py-4 text-paper md:px-8">
        <a href="#top" className="group flex items-baseline gap-3" data-cursor="ENTER">
          <span className="font-display text-xl font-semibold tracking-[0.08em] md:text-2xl">
            ARCHIVE / 26
          </span>
          <MicroLabel className="hidden text-paper/60 sm:inline">STATUS / ONLINE</MicroLabel>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <span className="font-mono text-[10px] tracking-[0.28em] text-paper">
            [ CREATIVE LAB ]
          </span>
        </div>

        <nav className="flex items-center gap-5">
          <button
            type="button"
            onClick={onIndex}
            data-cursor="OPEN"
            className="font-mono text-[10px] tracking-[0.28em] text-paper"
            aria-expanded={indexOpen}
          >
            {indexOpen ? 'CLOSE' : 'INDEX'}
          </button>
          <button
            type="button"
            onClick={onMenu}
            data-cursor="OPEN"
            className="font-mono text-[10px] tracking-[0.28em] text-paper"
          >
            MENU
          </button>
        </nav>
      </div>
      <motion.div
        className="mx-4 h-px bg-paper/80 md:mx-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.7, 0.15, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </header>
  )
}
