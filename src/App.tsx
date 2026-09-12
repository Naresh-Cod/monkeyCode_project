import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArchiveHeader } from './components/ArchiveHeader'
import { ChapterLine } from './components/ChapterLine'
import { Contact } from './components/Contact'
import { CursorInteraction } from './components/CursorInteraction'
import { ExpandableCard, ExpandableTrigger } from './components/ExpandableCard'
import { FilterSystem } from './components/FilterSystem'
import { FinalProject } from './components/FinalProject'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LabCard } from './components/LabCard'
import { LabOverlay } from './components/LabOverlay'
import { MenuOverlay } from './components/MenuOverlay'
import { PortfolioCard } from './components/PortfolioCard'
import { ProjectIndex } from './components/ProjectIndex'
import { ProjectModal } from './components/ProjectModal'
import { Statement } from './components/Statement'
import { projects } from './data/projects'
import { useCursor } from './hooks/useCursor'
import { useReducedMotion } from './hooks/useMedia'
import type { Category, Project } from './types'

export default function App() {
  const reduced = useReducedMotion()
  const { cursor, setLabel, fine } = useCursor()
  const [filter, setFilter] = useState<Category>('ALL')
  const [indexOpen, setIndexOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [labOpen, setLabOpen] = useState(false)
  const [lumenOpen, setLumenOpen] = useState(false)
  const [active, setActive] = useState<Project | null>(null)

  const regular = useMemo(
    () => projects.filter((p) => !p.final),
    [],
  )
  const final = projects.find((p) => p.final)!
  const lumen = projects.find((p) => p.expandable)!

  const visible = useMemo(() => {
    if (filter === 'ALL') return regular
    return regular.filter((p) => p.category === filter)
  }, [filter, regular])

  const first = visible.slice(0, 4)
  const rest = visible.slice(4)

  const openProject = useCallback((p: Project) => {
    if (p.expandable) {
      setLumenOpen(true)
      return
    }
    setActive(p)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setIndexOpen(false)
    const p = projects.find((x) => x.id === id)
    if (p?.expandable) {
      setTimeout(() => setLumenOpen(true), 420)
      return
    }
    requestAnimationFrame(() => {
      document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    })
  }, [reduced])

  useEffect(() => {
    const locked = indexOpen || menuOpen || labOpen || lumenOpen || !!active
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [indexOpen, menuOpen, labOpen, lumenOpen, active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setIndexOpen(false)
      setMenuOpen(false)
      setLabOpen(false)
      setLumenOpen(false)
      setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!fine) return
    const enter = (e: Event) => {
      const t = e.target as HTMLElement | null
      const node = t?.closest?.('[data-cursor]') as HTMLElement | null
      const v = node?.dataset.cursor
      if (v === 'VIEW' || v === 'OPEN' || v === 'ENTER' || v === 'CLOSE') setLabel(v)
    }
    const leave = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.('[data-cursor]')) setLabel('')
    }
    document.addEventListener('pointerover', enter)
    document.addEventListener('pointerout', leave)
    return () => {
      document.removeEventListener('pointerover', enter)
      document.removeEventListener('pointerout', leave)
    }
  }, [fine, setLabel])

  return (
    <LayoutGroup>
      <div className="grain" />
      {fine && <CursorInteraction cursor={cursor} reduced={reduced} />}

      <ArchiveHeader
        indexOpen={indexOpen}
        onIndex={() => {
          setMenuOpen(false)
          setIndexOpen((v) => !v)
        }}
        onMenu={() => {
          setIndexOpen(false)
          setMenuOpen((v) => !v)
        }}
      />

      <Hero reduced={reduced} />

      <div id="archive">
        <FilterSystem active={filter} onChange={setFilter} />
      </div>

      <section className="px-4 py-10 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">PLATES</h2>
          <span className="font-mono text-[10px] tracking-[0.22em] text-stone">
            {String(visible.length).padStart(2, '0')} / {String(regular.length).padStart(2, '0')}
          </span>
        </div>

        <div className="grid grid-cols-12 items-start gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {first.map((p) =>
              p.expandable ? (
                <motion.div
                  key={p.id}
                  id={`project-${p.id}`}
                  layout
                  className="col-span-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.7, 0.15, 1] }}
                >
                  <ExpandableTrigger project={p} onOpen={() => setLumenOpen(true)} />
                </motion.div>
              ) : (
                <PortfolioCard key={p.id} project={p} reduced={reduced} onOpen={openProject} />
              ),
            )}

            {filter === 'ALL' && (
              <motion.div
                key="lab"
                id="lab"
                layout
                className="col-span-full my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LabCard onOpen={() => setLabOpen(true)} />
              </motion.div>
            )}

            {rest.map((p) =>
              p.expandable ? (
                <motion.div
                  key={p.id}
                  id={`project-${p.id}`}
                  layout
                  className="col-span-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.7, 0.15, 1] }}
                >
                  <ExpandableTrigger project={p} onOpen={() => setLumenOpen(true)} />
                </motion.div>
              ) : (
                <PortfolioCard key={p.id} project={p} reduced={reduced} onOpen={openProject} />
              ),
            )}
          </AnimatePresence>
        </div>
      </section>

      <div id="statement">
        <ChapterLine reduced={reduced} />
        <Statement reduced={reduced} />
      </div>

      <ChapterLine reduced={reduced} />
      <FinalProject project={final} reduced={reduced} onOpen={openProject} />

      <Contact />
      <Footer />

      <ProjectIndex
        open={indexOpen}
        projects={projects}
        onClose={() => setIndexOpen(false)}
        onSelect={scrollTo}
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <LabOverlay open={labOpen} onClose={() => setLabOpen(false)} />
      <ProjectModal project={active} onClose={() => setActive(null)} reduced={reduced} />
      <ExpandableCard
        project={lumen}
        open={lumenOpen}
        onClose={() => setLumenOpen(false)}
        reduced={reduced}
      />
    </LayoutGroup>
  )
}
