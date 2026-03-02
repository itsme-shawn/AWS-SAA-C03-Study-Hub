import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NotePopupContext } from '../contexts/notePopup'
import MarkdownRenderer from './MarkdownRenderer'
import { extractSection, parseHeadings } from '../utils/toc'
import type { Section } from '../types'

const GAP = 4
const MAX_HEIGHT = 400

interface PopupState {
  sectionId: string
  headingId: string
  docTop: number
  docLeft: number
  width: number
}

export function NotePopupProvider({ sections, children }: { sections: Section[], children: React.ReactNode }) {
  const [popup, setPopup] = useState<PopupState | null>(null)

  const open = (sectionId: string, headingId: string, anchor: DOMRect, containerRect?: DOMRect) => {
    if (popup?.sectionId === sectionId && popup?.headingId === headingId) {
      setPopup(null)
      return
    }
    const INSET = 20
    const rect = containerRect ?? anchor
    setPopup({
      sectionId,
      headingId,
      docTop: anchor.bottom + window.scrollY + GAP,
      docLeft: rect.left + window.scrollX + INSET,
      width: rect.width - INSET * 2,
    })
  }
  const close = () => setPopup(null)

  const section = popup ? sections.find(s => s.id === popup.sectionId) : null
  const extracted = section ? extractSection(section.noteContent, popup!.headingId) : ''
  const headingText = section
    ? (parseHeadings(section.noteContent).find(i => i.id === popup!.headingId)?.text ?? popup!.headingId)
    : ''

  return (
    <NotePopupContext.Provider value={{ open }}>
      {children}

      {createPortal(
        <AnimatePresence>
          {popup && (
            <>
              <div className="fixed inset-0 z-40" onClick={close} />

              <motion.div
                key={`${popup.sectionId}-${popup.headingId}`}
                initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
                transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  top: popup.docTop,
                  left: popup.docLeft,
                  width: popup.width,
                  maxHeight: MAX_HEIGHT,
                  zIndex: 50,
                  transformOrigin: 'top center',
                }}
                className="flex flex-col rounded-lg overflow-hidden
                  border border-ink-200 dark:border-ink-600
                  bg-white dark:bg-ink-900
                  shadow-lg shadow-black/8 dark:shadow-black/30"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Amber accent bar */}
                <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-500/40 shrink-0" />

                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-2.5 shrink-0 border-b border-ink-100 dark:border-ink-700/60">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span className="text-[11px] text-ink-400 dark:text-ink-500 shrink-0">
                      {section?.title}
                    </span>
                    <span className="text-[11px] text-ink-300 dark:text-ink-600 shrink-0">›</span>
                    <span className="text-[11px] font-semibold text-ink-700 dark:text-ink-200 truncate">
                      {headingText}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      to={`/section/${popup.sectionId}#${popup.headingId}`}
                      onClick={close}
                      className="text-[11px] font-medium text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap"
                    >
                      전체 보기 →
                    </Link>
                    <button
                      onClick={close}
                      className="ml-1 p-1 rounded text-ink-300 hover:text-ink-600 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
                  {extracted
                    ? <MarkdownRenderer content={extracted} />
                    : <p className="text-sm text-ink-400">해당 섹션을 찾을 수 없습니다.</p>
                  }
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </NotePopupContext.Provider>
  )
}
