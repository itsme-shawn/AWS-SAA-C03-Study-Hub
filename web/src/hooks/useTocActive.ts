import { useState, useEffect } from 'react'
import type { TocItem } from '../utils/toc'

/**
 * Returns the first element with the given id that is actually visible
 * (offsetParent !== null). This is needed because SectionView renders
 * MarkdownRenderer twice — once for mobile (lg:hidden) and once for desktop
 * (hidden lg:flex) — producing duplicate IDs in the DOM. The hidden copy's
 * elements return all-zero getBoundingClientRect(), which would break both
 * scroll-to and active detection.
 */
function getVisibleEl(id: string): HTMLElement | null {
  const nodes = document.querySelectorAll(`[id="${id}"]`)
  for (const node of nodes) {
    if ((node as HTMLElement).offsetParent !== null) return node as HTMLElement
  }
  return null
}

export function useTocActive(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) { setActiveId(''); return }

    const TOP_OFFSET = 80 // px — heading at/above this line counts as "passed"

    const calcActive = (): string => {
      let result = ''
      for (const item of items) {
        const el = getVisibleEl(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= TOP_OFFSET) {
          result = item.id
        }
      }
      return result || items[0].id
    }

    const onScroll = () => setActiveId(calcActive())

    const timer = setTimeout(() => setActiveId(calcActive()), 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [items])

  return activeId
}
