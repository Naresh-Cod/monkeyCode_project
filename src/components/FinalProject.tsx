import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project } from '../types'
import { ImagePlate } from './ImagePlate'
import { MicroLabel } from './MicroLabel'

export function FinalProject({
  project,
  reduced,
  onOpen,
}: {
  project: Project
  reduced: boolean
  onOpen: (p: Project) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const clip = useTransform(scrollYProgress, [0.1, 0.55], ['inset(20% 20% 20% 20%)', 'inset(0% 0% 0% 0%)'])
  const y = useTransform(scrollYProgress, [0, 1], [40, -20])

  return (
    <section ref={ref} id={`project-${project.id}`} className="relative px-4 py-24 md:px-8">
      <MicroLabel>PROJECT / {project.number}</MicroLabel>
      <motion.h2
        style={{ y: reduced ? 0 : y }}
        className="mt-4 font-display text-[16vw] font-semibold leading-[0.78] tracking-[-0.05em] md:text-[12vw]"
      >
        THE NEXT
        <br />
        THING
      </motion.h2>
      <motion.button
        type="button"
        data-cursor="VIEW"
        onClick={() => onOpen(project)}
        className="relative mt-10 block w-full overflow-hidden"
        style={{ clipPath: reduced ? 'none' : clip }}
      >
        <ImagePlate project={project} className="aspect-[16/8] w-full md:aspect-[21/8]" large />
      </motion.button>
      <div className="mt-10 flex flex-col gap-2">
        <p className="font-display text-3xl font-semibold md:text-5xl">
          YOU'VE REACHED THE END OF THE ARCHIVE.
        </p>
        <p className="font-display text-3xl font-semibold text-stone md:text-5xl">OR HAVE YOU?</p>
      </div>
    </section>
  )
}
