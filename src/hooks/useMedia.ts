import { useEffect, useState } from 'react'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export function useReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)')
}

export function useFinePointer() {
  return useMedia('(hover: hover) and (pointer: fine)')
}
