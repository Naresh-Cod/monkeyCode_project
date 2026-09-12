import { useEffect, useRef, useState } from 'react'
import type { CursorState } from '../types'
import { useFinePointer } from './useMedia'

export function useCursor() {
  const fine = useFinePointer()
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    visible: false,
  })
  const labelRef = useRef<CursorState['label']>('')

  useEffect(() => {
    if (!fine) return

    const move = (e: PointerEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        visible: true,
        label: labelRef.current,
      }))
    }
    const leave = () => setCursor((prev) => ({ ...prev, visible: false }))

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [fine])

  const setLabel = (label: CursorState['label']) => {
    labelRef.current = label
    setCursor((prev) => ({ ...prev, label }))
  }

  return { cursor, setLabel, fine }
}
