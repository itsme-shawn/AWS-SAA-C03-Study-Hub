import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ScrollJumpButtons() {
  const [isScrollable, setIsScrollable] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const updateState = () => {
      const top = window.scrollY || document.documentElement.scrollTop
      const viewport = window.innerHeight
      const height = document.documentElement.scrollHeight
      setIsScrollable(height > viewport + 40)
      setAtTop(top < 16)
      setAtBottom(top + viewport >= height - 16)
    }

    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)

    return () => {
      window.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [])

  if (!isScrollable) return null

  const scrollToTop = () => {
    if (atTop) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    if (atBottom) return
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-30 flex flex-col gap-2">
      <button
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        className={`w-10 h-10 rounded-full border border-ink-200 dark:border-ink-600 bg-white/90 dark:bg-ink-800/90 backdrop-blur shadow-lg flex items-center justify-center transition-all ${
          atTop
            ? 'opacity-40 text-ink-300 dark:text-ink-500'
            : 'hover:border-amber-400 dark:hover:border-amber-500/60 hover:text-amber-500 text-ink-500 dark:text-ink-300'
        }`}
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <button
        onClick={scrollToBottom}
        aria-label="맨 아래로 이동"
        className={`w-10 h-10 rounded-full border border-ink-200 dark:border-ink-600 bg-white/90 dark:bg-ink-800/90 backdrop-blur shadow-lg flex items-center justify-center transition-all ${
          atBottom
            ? 'opacity-40 text-ink-300 dark:text-ink-500'
            : 'hover:border-amber-400 dark:hover:border-amber-500/60 hover:text-amber-500 text-ink-500 dark:text-ink-300'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  )
}
