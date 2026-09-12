import { motion } from 'framer-motion'
import type { CursorState } from '../types'

export function CursorInteraction({ cursor, reduced }: { cursor: CursorState; reduced: boolean }) {
  if (!cursor.visible) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[90] mix-blend-difference"
      animate={{
        x: cursor.x,
        y: cursor.y,
      }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'tween', duration: 0.12, ease: [0.2, 0.7, 0.15, 1] }
      }
      style={{ top: 0, left: 0 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        {cursor.label ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-paper bg-void">
            <span className="font-mono text-[8px] tracking-[0.18em] text-paper">
              {cursor.label}
            </span>
          </div>
        ) : (
          <div className="h-2.5 w-2.5 rounded-full bg-paper" />
        )}
      </div>
    </motion.div>
  )
}
