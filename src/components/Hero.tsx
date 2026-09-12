import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MicroLabel } from './MicroLabel'

export function Hero({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80])
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <div className="archive-grid pointer-events-none absolute inset-0 opacity-70" />
      <motion.div style={{ y }} className="relative px-4 pb-16 md:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <MicroLabel>OBJECT TYPE / DIGITAL</MicroLabel>
          <MicroLabel>LAST UPDATE / 10.09.26</MicroLabel>
          <MicroLabel>INDEX 0000</MicroLabel>
        </div>

        <h1 className="font-display font-semibold leading-[0.78] tracking-[-0.04em] text-void">
          <span className="block text-[18vw] md:text-[14vw]">SELECTED</span>
          <span className="block text-[18vw] md:text-[14vw]">WORKS</span>
          <span className="block text-[12vw] text-stone md:text-[8vw]">/ 2026</span>
        </h1>

        <div className="mt-10 grid max-w-3xl grid-cols-3 gap-4 border-t border-void/15 pt-6">
          {[
            ['18', 'PROJECTS'],
            ['07', 'EXPERIMENTS'],
            ['04', 'DIGITAL SYSTEMS'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-semibold leading-none md:text-6xl">{n}</div>
              <MicroLabel className="mt-2 block">{l}</MicroLabel>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative mx-4 mb-10 md:mx-8">
        <div className="h-px w-full bg-void/20" />
        <motion.div
          className="absolute top-0 left-0 h-px bg-void"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 2.4, ease: [0.2, 0.7, 0.15, 1], repeat: Infinity, repeatDelay: 1.2 }
          }
        />
        {!reduced && (
          <motion.div
            className="absolute top-0 h-px w-16 bg-void"
            style={{ left: line }}
          />
        )}
      </div>

      <a
        href="#archive"
        data-cursor="ENTER"
        className="absolute bottom-8 left-4 flex items-center gap-3 md:left-8"
      >
        <span className="font-mono text-[10px] tracking-[0.28em]">SCROLL TO EXPLORE</span>
        <span className="font-mono text-[10px]">↓</span>
      </a>

      <div className="pointer-events-none absolute -right-6 top-28 hidden select-none font-display text-[28vw] leading-none text-void/6 md:block">
        26
      </div>
    </section>
  )
}
