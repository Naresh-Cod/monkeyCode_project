import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ChapterLine({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  return (
    <div ref={ref} className="relative my-10 flex h-10 items-center px-4 md:my-16 md:px-8">
      <div className="h-px w-full bg-void/15" />
      <motion.div
        className="absolute left-1/2 h-px -translate-x-1/2 bg-void"
        initial={{ width: '8%' }}
        animate={inView && !reduced ? { width: ['8%', '100%', '8%'] } : { width: '100%' }}
        transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.2, 0.7, 0.15, 1] }}
      />
      <motion.div
        className="absolute left-1/2 h-2 -translate-x-1/2 bg-void"
        initial={{ width: 0 }}
        animate={inView && !reduced ? { width: ['0%', '100%', '0%'] } : { width: 0 }}
        transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.2, 0.7, 0.15, 1] }}
      />
    </div>
  )
}
