import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Statement({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40])
  const x2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const sx1 = useSpring(x1, { stiffness: 90, damping: 22 })
  const sx2 = useSpring(x2, { stiffness: 90, damping: 22 })

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-28 md:px-8 md:py-40">
      <div className="mb-8 font-mono text-[10px] tracking-[0.28em] text-stone">STATEMENT / 01</div>
      <motion.h2
        style={{ x: sx1 }}
        className="font-display text-[12vw] font-semibold leading-[0.82] tracking-[-0.04em] md:text-[9vw]"
      >
        WE DON'T COLLECT
        <br />
        PROJECTS.
      </motion.h2>
      <motion.p
        style={{ x: sx2 }}
        className="mt-6 font-display text-[10vw] font-semibold leading-[0.82] tracking-[-0.04em] text-stone md:text-[7vw]"
      >
        WE COLLECT IDEAS.
      </motion.p>
      <div className="mt-12 h-px w-full bg-void/20" />
    </section>
  )
}
