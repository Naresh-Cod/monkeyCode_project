import { AnimatePresence, motion } from 'framer-motion'
import { MicroLabel } from './MicroLabel'

const LINKS = [
  { href: '#top', label: 'INTRODUCTION' },
  { href: '#archive', label: 'ARCHIVE' },
  { href: '#statement', label: 'STATEMENT' },
  { href: '#lab', label: 'LAB' },
  { href: '#contact', label: 'CONVERSATION' },
]

export function MenuOverlay({
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
          className="fixed inset-0 z-[60] flex items-center bg-char text-paper"
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0 0 0%)' }}
          exit={{ clipPath: 'inset(0 0 0 100%)' }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.15, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="absolute right-4 top-5 font-mono text-[10px] tracking-[0.28em] md:right-8"
          >
            CLOSE
          </button>
          <nav className="px-8 md:px-16">
            <MicroLabel className="text-paper/50">NAVIGATION / 26</MicroLabel>
            <ul className="mt-8 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    data-cursor="OPEN"
                    className="font-display text-6xl font-semibold leading-[0.9] md:text-8xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
