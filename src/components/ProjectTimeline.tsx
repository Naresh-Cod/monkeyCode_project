import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project } from '../types'
import { MicroLabel } from './MicroLabel'

const STAGES = ['IDEA', 'RESEARCH', 'DESIGN', 'BUILD', 'LAUNCH'] as const

export function ProjectTimeline({
  project,
  reduced,
}: {
  project: Project
  reduced: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 40%'],
  })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="mt-10">
      <MicroLabel>PROCESS / TIMELINE</MicroLabel>
      <div className="relative mt-6">
        <div className="hidden h-px bg-void/15 md:block" />
        <motion.div
          className="absolute top-0 left-0 hidden h-px bg-void md:block"
          style={{ width: reduced ? '100%' : width }}
        />
        <div className="mt-0 grid gap-8 md:grid-cols-5 md:gap-4">
          {STAGES.map((stage, i) => {
            const key = stage.toLowerCase() as keyof Project['timeline']
            return (
              <motion.div
                key={stage}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.2, 0.7, 0.15, 1] }}
                className="relative"
              >
                <div className="mb-3 hidden h-2 w-px bg-void md:block" />
                <div className="font-display text-2xl font-semibold leading-none">{stage}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink">{project.timeline[key]}</p>
                {i < STAGES.length - 1 && (
                  <div className="mt-3 font-mono text-[10px] text-stone md:hidden">↓</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
