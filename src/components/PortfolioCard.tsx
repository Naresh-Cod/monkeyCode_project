import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Project } from '../types'
import { ImagePlate } from './ImagePlate'
import { CornerTicks, MicroLabel } from './MicroLabel'

const variants = {
  'slide-right': {
    hidden: { x: 80, opacity: 0 },
    show: { x: 0, opacity: 1 },
  },
  'reveal-bottom': {
    hidden: { y: 72, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  mask: {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    show: { clipPath: 'inset(0 0 0% 0)' },
  },
  'type-first': {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  'frame-expand': {
    hidden: { scale: 0.92, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  },
  'circle-crop': {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    show: { clipPath: 'circle(140% at 50% 50%)' },
  },
  split: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
}

function layoutClass(type: Project['cardType']) {
  switch (type) {
    case 'A':
      return 'col-span-full md:col-span-8'
    case 'B':
      return 'col-span-full md:col-span-4 md:row-span-2'
    case 'C':
      return 'col-span-full sm:col-span-6 md:col-span-4'
    case 'D':
      return 'col-span-full'
    case 'E':
      return 'col-span-full md:col-span-8'
    default:
      return 'col-span-full'
  }
}

export function PortfolioCard({
  project,
  reduced,
  onOpen,
}: {
  project: Project
  reduced: boolean
  onOpen: (p: Project) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.22 })
  const [hover, setHover] = useState(false)
  const v = variants[project.reveal]

  const metaVisible = hover || reduced

  return (
    <motion.article
      ref={ref}
      layout
      id={`project-${project.id}`}
      className={`${layoutClass(project.cardType)} relative`}
      initial={reduced ? false : v.hidden}
      animate={inView || reduced ? v.show : v.hidden}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.2, 0.7, 0.15, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 border border-void/15"
        style={{
          transform: hover ? 'translate(8px, 8px)' : 'translate(0,0)',
          transition: 'transform 420ms cubic-bezier(0.2,0.7,0.15,1)',
        }}
      />
      <button
        type="button"
        data-cursor="VIEW"
        onClick={() => onOpen(project)}
        className="relative block w-full overflow-hidden border border-void/25 bg-paper p-3 text-left md:p-4"
        style={{
          transform: hover ? 'translate(-4px, -4px)' : 'none',
          transition: 'transform 420ms cubic-bezier(0.2,0.7,0.15,1)',
        }}
      >
        <CornerTicks color={hover ? project.accent : 'rgba(17,17,16,0.45)'} />
        <div
          className="pointer-events-none absolute inset-1 border"
          style={{
            borderColor: hover ? project.accent : 'transparent',
            transform: hover ? 'scale(1)' : 'scale(0.98)',
            transition: 'border-color 420ms cubic-bezier(0.2,0.7,0.15,1), transform 420ms cubic-bezier(0.2,0.7,0.15,1)',
          }}
        />

        <div className="mb-3 flex items-center justify-between">
          <MicroLabel>PROJECT / {project.number}</MicroLabel>
          <MicroLabel>
            {project.frame} · {project.coordinates}
          </MicroLabel>
        </div>

        {project.cardType === 'E' ? (
          <SplitBody project={project} hover={hover} metaVisible={metaVisible} />
        ) : project.cardType === 'B' ? (
          <TallBody project={project} hover={hover} metaVisible={metaVisible} />
        ) : project.cardType === 'C' ? (
          <SmallBody project={project} hover={hover} metaVisible={metaVisible} />
        ) : project.cardType === 'D' ? (
          <WideBody project={project} hover={hover} metaVisible={metaVisible} />
        ) : (
          <WideBody project={project} hover={hover} metaVisible={metaVisible} compact />
        )}
      </button>
    </motion.article>
  )
}

function TitleBlock({
  project,
  hover,
}: {
  project: Project
  hover: boolean
}) {
  return (
    <div
      style={{
        transform: hover ? 'translateX(12px)' : 'none',
        transition: 'transform 420ms cubic-bezier(0.2,0.7,0.15,1)',
      }}
    >
      <h3 className="font-display font-semibold leading-[0.8] tracking-[-0.03em]">
        <span className="block text-5xl md:text-7xl">{project.name}</span>
        <span className="mt-1 block text-2xl text-stone md:text-3xl">{project.subtitle}</span>
      </h3>
      <div className="mt-3 flex gap-4 font-mono text-[10px] tracking-[0.18em] text-stone">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
    </div>
  )
}

function MetaStrip({ project, visible }: { project: Project; visible: boolean }) {
  return (
    <div
      className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 420ms cubic-bezier(0.2,0.7,0.15,1), transform 420ms cubic-bezier(0.2,0.7,0.15,1)',
      }}
    >
      <Mini k="CLIENT" v={project.client} />
      <Mini k="ROLE" v={project.role} />
      <Mini k="DURATION" v={project.duration} />
      <Mini k="STATUS" v={project.status} />
    </div>
  )
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <MicroLabel>{k}</MicroLabel>
      <div className="mt-0.5 text-[11px] tracking-wide text-ink">{v}</div>
    </div>
  )
}

function WideBody({
  project,
  hover,
  metaVisible,
  compact = false,
}: {
  project: Project
  hover: boolean
  metaVisible: boolean
  compact?: boolean
}) {
  return (
    <div className={`grid gap-4 ${compact ? 'md:grid-cols-[1.35fr_1fr]' : 'md:grid-cols-[1.6fr_1fr]'}`}>
      <ImagePlate
        project={project}
        hover={hover}
        className={compact ? 'aspect-[16/9] w-full' : 'aspect-[21/9] w-full'}
      />
      <div className="flex flex-col justify-between">
        <TitleBlock project={project} hover={hover} />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink">{project.description}</p>
        <MetaStrip project={project} visible={metaVisible} />
        <span className="mt-5 font-mono text-[10px] tracking-[0.22em]">VIEW PROJECT →</span>
      </div>
    </div>
  )
}

function TallBody({
  project,
  hover,
  metaVisible,
}: {
  project: Project
  hover: boolean
  metaVisible: boolean
}) {
  return (
    <div className="flex h-full min-h-[520px] flex-col">
      <ImagePlate project={project} hover={hover} className="aspect-[3/4] w-full flex-1" />
      <div className="mt-4">
        <TitleBlock project={project} hover={hover} />
        <p className="mt-3 text-sm leading-relaxed text-ink">{project.description}</p>
        <MetaStrip project={project} visible={metaVisible} />
        <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.22em]">VIEW PROJECT →</span>
      </div>
    </div>
  )
}

function SmallBody({
  project,
  hover,
  metaVisible,
}: {
  project: Project
  hover: boolean
  metaVisible: boolean
}) {
  return (
    <div>
      <ImagePlate project={project} hover={hover} className="aspect-square w-full" />
      <div className="mt-4">
        <TitleBlock project={project} hover={hover} />
        <p className="mt-3 text-sm leading-relaxed text-ink">{project.description}</p>
        <MetaStrip project={project} visible={metaVisible} />
        <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.22em]">VIEW PROJECT →</span>
      </div>
    </div>
  )
}

function SplitBody({
  project,
  hover,
  metaVisible,
}: {
  project: Project
  hover: boolean
  metaVisible: boolean
}) {
  return (
    <div className="grid items-stretch gap-0 md:grid-cols-2">
      <div className="border-void/15 md:border-r md:pr-4">
        <ImagePlate project={project} hover={hover} className="aspect-[4/5] w-full" />
      </div>
      <div className="flex flex-col justify-between pt-4 md:pl-6 md:pt-0">
        <TitleBlock project={project} hover={hover} />
        <p className="mt-6 text-sm leading-relaxed text-ink">{project.description}</p>
        <MetaStrip project={project} visible={metaVisible} />
        <span className="mt-6 font-mono text-[10px] tracking-[0.22em]">VIEW PROJECT →</span>
      </div>
    </div>
  )
}
