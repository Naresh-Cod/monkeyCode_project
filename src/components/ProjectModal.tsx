import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import { ImagePlate } from './ImagePlate'
import { MicroLabel } from './MicroLabel'
import { ProjectTimeline } from './ProjectTimeline'

export function ProjectModal({
  project,
  onClose,
  reduced,
}: {
  project: Project | null
  onClose: () => void
  reduced: boolean
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-paper"
          initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(50% 50% 50% 50%)' }}
          transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.2, 0.7, 0.15, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            data-cursor="CLOSE"
            className="fixed right-4 top-5 z-10 font-mono text-[10px] tracking-[0.28em] mix-blend-difference text-paper md:right-8"
          >
            CLOSE
          </button>

          <div className="grid min-h-full lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[46vh] lg:min-h-full">
              <ImagePlate project={project} className="absolute inset-0 h-full w-full" large hover />
              <div className="absolute inset-0 bg-void/25" />
              <div className="absolute bottom-8 left-6 text-paper md:left-10">
                <MicroLabel className="text-paper/70">PROJECT / {project.number}</MicroLabel>
                <h2 className="mt-2 font-display text-[18vw] font-semibold leading-[0.8] lg:text-[8vw]">
                  {project.name}
                </h2>
                <div className="mt-2 font-display text-3xl text-paper/70">{project.subtitle}</div>
              </div>
            </div>

            <div className="px-6 py-16 md:px-10">
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-void/15 pb-6">
                <Meta k="CATEGORY" v={project.category} />
                <Meta k="YEAR" v={project.year} />
                <Meta k="ROLE" v={project.role} />
                <Meta k="STATUS" v={project.status} />
              </div>

              <Detail k="OVERVIEW" v={project.overview} />
              <Detail k="OBJECTIVE" v={project.objective} />
              <Detail k="PROCESS" v={project.process} />
              <div className="border-b border-void/10 py-6">
                <MicroLabel>TECHNOLOGY</MicroLabel>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.technology.map((t) => (
                    <span key={t} className="border border-void/20 px-2 py-1 font-mono text-[10px] tracking-[0.16em]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Detail k="RESULT" v={project.result} />
              <ProjectTimeline project={project} reduced={reduced} />

              <a
                href="#contact"
                onClick={onClose}
                data-cursor="ENTER"
                className="mt-12 inline-flex items-center gap-3 border border-void px-5 py-3 font-mono text-[10px] tracking-[0.24em]"
              >
                ENTER PROJECT
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <MicroLabel>{k}</MicroLabel>
      <div className="mt-1 font-display text-xl font-semibold leading-none">{v}</div>
    </div>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-void/10 py-6">
      <MicroLabel>{k}</MicroLabel>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink">{v}</p>
    </div>
  )
}
