import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import { ImagePlate } from './ImagePlate'
import { CornerTicks, MicroLabel } from './MicroLabel'

export function ExpandableCard({
  project,
  open,
  onClose,
  reduced,
}: {
  project: Project
  open: boolean
  onClose: () => void
  reduced: boolean
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="expanded"
          className="fixed inset-3 z-[65] overflow-hidden bg-void md:inset-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.42 }}
        >
          <ImagePlate project={project} className="absolute inset-0 h-full w-full" large hover />
          <div className="absolute inset-0 bg-void/45" />
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.28em] text-paper"
          >
            CLOSE
          </button>
          <div className="relative flex h-full flex-col justify-end p-6 text-paper md:p-12">
            <MicroLabel className="text-paper/70">PROJECT / {project.number}</MicroLabel>
            <h2 className="mt-2 font-display text-[18vw] font-semibold leading-[0.78] md:text-[10vw]">
              {project.name}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/80">{project.overview}</p>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
              <Field k="ROLE" v={project.role} />
              <Field k="TECHNOLOGY" v={project.technology[0]} />
              <Field k="YEAR" v={project.year} />
              <Field k="STATUS" v={project.status} />
            </div>
            <button
              type="button"
              data-cursor="ENTER"
              onClick={onClose}
              className="mt-10 w-fit border border-paper px-5 py-3 font-mono text-[10px] tracking-[0.24em]"
            >
              [ ENTER PROJECT ]
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <MicroLabel className="text-paper/55">{k}</MicroLabel>
      <div className="mt-1 font-display text-lg font-semibold leading-none">{v}</div>
    </div>
  )
}

export function ExpandableTrigger({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="VIEW"
      className="group relative block w-full border border-void/20 bg-paper p-3 text-left md:p-4"
      style={{ boxShadow: `8px 8px 0 0 ${project.accent}` }}
    >
      <CornerTicks />
      <div className="mb-3 flex items-center justify-between">
        <MicroLabel>PROJECT / {project.number}</MicroLabel>
        <MicroLabel>EXPANDABLE / ACTIVE</MicroLabel>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <ImagePlate project={project} className="aspect-[16/8] w-full" />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-display text-6xl font-semibold leading-[0.8] md:text-7xl">{project.name}</h3>
            <div className="mt-2 font-display text-2xl text-stone">{project.subtitle}</div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink">{project.description}</p>
          <span className="mt-6 font-mono text-[10px] tracking-[0.22em]">CLICK TO EXPAND →</span>
        </div>
      </div>
    </button>
  )
}
