import type { Project } from '../types'

function hash(n: string) {
  return n.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

export function ImagePlate({
  project,
  className = '',
  hover = false,
  large = false,
}: {
  project: Project
  className?: string
  hover?: boolean
  large?: boolean
}) {
  const h = hash(project.number)
  const rotate = (h % 18) - 9
  const offset = (h % 24) - 12

  return (
    <div className={`relative overflow-hidden bg-char ${className}`}>
      <div
        className="absolute inset-0 transition-[filter,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.15,1)]"
        style={{
          filter: hover ? 'grayscale(0.7) contrast(1.05)' : 'grayscale(0.15)',
          transform: hover ? `scale(1.02) translate3d(${offset / 6}px, 0, 0)` : 'scale(1)',
        }}
      >
        <div className="absolute inset-0 bg-char" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              linear-gradient(180deg, rgba(243,240,232,0.06) 0%, transparent 28%),
              repeating-linear-gradient(
                ${90 + rotate}deg,
                transparent 0 18px,
                rgba(243,240,232,0.04) 18px 19px
              )
            `,
          }}
        />
        <div
          className="absolute"
          style={{
            top: `${12 + (h % 10)}%`,
            left: `${8 + (h % 16)}%`,
            width: large ? '58%' : '64%',
            height: large ? '62%' : '54%',
            background: project.accent,
            mixBlendMode: 'screen',
            opacity: hover ? 0.9 : 0.72,
            clipPath:
              project.cardType === 'B'
                ? 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)'
                : project.cardType === 'C'
                  ? 'circle(46% at 50% 50%)'
                  : 'polygon(0 0, 100% 6%, 94% 100%, 0 92%)',
            transform: `rotate(${rotate / 3}deg)`,
            transition: 'opacity 420ms cubic-bezier(0.2,0.7,0.15,1)',
          }}
        />
        <div
          className="absolute border border-paper/30"
          style={{
            top: `${20 + (h % 8)}%`,
            right: `${10 + (h % 12)}%`,
            width: large ? '28%' : '32%',
            height: large ? '40%' : '36%',
            transform: `translate3d(0, ${offset}px, 0)`,
          }}
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-paper/70">
          <span className="font-mono text-[9px] tracking-[0.2em]">{project.frame}</span>
          <span className="font-mono text-[9px] tracking-[0.2em]">{project.coordinates}</span>
        </div>
        <div className="absolute left-4 top-4 font-display text-[11vw] leading-none text-paper/8 md:text-[5vw]">
          {project.number}
        </div>
      </div>
      <div
        className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
        style={{
          background: project.accent,
          opacity: hover ? 0.22 : 0,
        }}
      />
    </div>
  )
}
