/**
 * Mobile / tablet only (lg:hidden).
 * Desktop uses the inline sticky sidebar in SectionView.
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlignLeft, ChevronDown } from 'lucide-react'
import type { TocItem } from '../utils/toc'

interface Props {
  items: TocItem[]
  activeId: string
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 28, behavior: 'smooth' })
}

export default function TableOfContents({ items, activeId }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  if (items.length === 0) return null

  const activeIndex = items.findIndex(it => it.id === activeId)

  return (
    /* Mobile / tablet only */
    <div
      ref={containerRef}
      className="lg:hidden fixed top-[68px] right-4 z-30 flex flex-col items-end"
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="목차 열기"
        className={[
          'flex items-center gap-2 h-8 pl-3 pr-2.5 rounded-full',
          'border text-xs font-semibold shadow-md shadow-ink-900/8 dark:shadow-black/25',
          'transition-all duration-200',
          open
            ? 'bg-amber-500 border-amber-500 text-white shadow-amber-500/25'
            : 'bg-white dark:bg-ink-800 border-ink-200 dark:border-ink-600 text-ink-600 dark:text-ink-200',
        ].join(' ')}
      >
        <AlignLeft className="w-3.5 h-3.5 shrink-0" />
        <span className="tracking-wide">목차</span>
        {activeIndex >= 0 && (
          <span className={`tabular-nums text-[10px] font-bold ${open ? 'text-white/75' : 'text-ink-300 dark:text-ink-500'}`}>
            {activeIndex + 1}/{items.length}
          </span>
        )}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3 shrink-0" />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.7 }}
            className="mt-2 w-[220px] max-h-[68vh] overflow-y-auto bg-white/90 dark:bg-ink-800/90 backdrop-blur-lg border border-ink-200 dark:border-ink-600 rounded-xl shadow-xl shadow-ink-900/10 dark:shadow-black/40 py-3"
          >
            {activeIndex >= 0 && (
              <div className="px-4 mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-ink-300 dark:text-ink-500">진행률</span>
                  <span className="text-[10px] font-bold text-amber-500 tabular-nums">
                    {Math.round(((activeIndex + 1) / items.length) * 100)}%
                  </span>
                </div>
                <div className="h-[3px] bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    initial={false}
                    animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
            <nav className="px-2">
              {items.map((item, i) => {
                const isActive = activeId === item.id
                return (
                  <button
                    key={i}
                    onClick={() => scrollTo(item.id)}
                    className={[
                      'w-full text-left rounded-lg py-[5px] leading-snug',
                      'transition-all duration-150 flex items-center gap-2',
                      item.level === 1 ? 'px-2 text-[12px] font-semibold'
                        : item.level === 2 ? 'pl-5 pr-2 text-[11.5px] font-medium'
                        : 'pl-8 pr-2 text-[11px] font-normal',
                      isActive
                        ? 'text-amber-500 dark:text-amber-400 bg-amber-500/8 dark:bg-amber-500/10'
                        : 'text-ink-400 dark:text-ink-300 hover:text-ink-800 dark:hover:text-ink-100 hover:bg-ink-50 dark:hover:bg-ink-700/50',
                    ].join(' ')}
                  >
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-200 ${isActive ? 'bg-amber-500' : 'bg-transparent'}`} />
                    <span className="truncate">{item.text}</span>
                  </button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
