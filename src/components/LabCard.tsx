import { motion } from 'framer-motion'
import { CornerTicks, MicroLabel } from './MicroLabel'

export function LabCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="ENTER"
      className="relative col-span-full w-full overflow-hidden border border-void bg-void p-6 text-left text-paper md:p-10"
    >
      <CornerTicks color="#f3f0e8" />
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <MicroLabel className="text-paper/50">LAB / UNFINISHED</MicroLabel>
          <h3 className="mt-4 font-display text-6xl font-semibold leading-[0.82] md:text-[8vw]">
            EXPERIMENT
            <br />
            IN PROGRESS
          </h3>
        </div>
        <div className="min-w-[180px]">
          <MicroLabel className="text-paper/50">PROCESSING...</MicroLabel>
          <div className="mt-4 h-px w-full bg-paper/20">
            <motion.div
              className="h-px bg-paper"
              initial={{ width: '0%' }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.6, ease: [0.2, 0.7, 0.15, 1] }}
            />
          </div>
          <div className="mt-3 font-display text-6xl font-semibold leading-none">72%</div>
          <MicroLabel className="mt-3 block text-paper/50">OBJECT TYPE / PROTOTYPE</MicroLabel>
        </div>
      </div>
    </button>
  )
}
