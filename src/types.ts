export type Category = 'ALL' | 'WEB' | 'AI' | 'BRANDING' | '3D' | 'EXPERIMENTAL' | 'AUTOMATION'

export type CardType = 'A' | 'B' | 'C' | 'D' | 'E'

export type RevealType =
  | 'slide-right'
  | 'reveal-bottom'
  | 'mask'
  | 'type-first'
  | 'frame-expand'
  | 'circle-crop'
  | 'split'

export interface Project {
  id: string
  number: string
  name: string
  subtitle: string
  category: Exclude<Category, 'ALL'>
  year: string
  description: string
  client: string
  role: string
  duration: string
  status: string
  accent: string
  cardType: CardType
  reveal: RevealType
  coordinates: string
  frame: string
  overview: string
  objective: string
  process: string
  technology: string[]
  result: string
  timeline: {
    idea: string
    research: string
    design: string
    build: string
    launch: string
  }
  expandable?: boolean
  featured?: boolean
  final?: boolean
}

export interface CursorState {
  x: number
  y: number
  label: '' | 'VIEW' | 'OPEN' | 'ENTER' | 'CLOSE'
  visible: boolean
}
