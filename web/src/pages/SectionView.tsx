import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, HelpCircle, CheckCircle, ChevronLeft, ChevronRight, Trash2, ArrowRight, AlignLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import QuizEngine, { type QuizEngineHandle } from '../components/QuizEngine'
import TableOfContents from '../components/TableOfContents'
import ScrollJumpButtons from '../components/ScrollJumpButtons'
import type { ContentData, StudyProgress, QuizResult } from '../types'
import { clearDraftSession } from '../utils/storage'
import { parseHeadings } from '../utils/toc'
import { useTocActive } from '../hooks/useTocActive'

interface Props {
  data: ContentData
  progress: StudyProgress
  onMarkComplete: (id: string) => void
  onQuizComplete: (result: QuizResult) => void
  onWrongAnswer: (sectionId: string, questionId: string, userAnswer: string) => void
  onToggleBookmark: (qId: string) => void
  onResetSection: (sectionId: string) => void
}

export default function SectionView({ data, progress, onMarkComplete, onQuizComplete, onWrongAnswer, onToggleBookmark, onResetSection }: Props) {
  const { sectionId } = useParams<{ sectionId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [quizKey, setQuizKey] = useState(0)
  const [quizModeActive, setQuizModeActive] = useState(false)
  const quizEngineRef = useRef<QuizEngineHandle>(null)
  const [tab, setTab] = useState<'notes' | 'quiz'>(
    searchParams.get('tab') === 'quiz' ? 'quiz' : 'notes'
  )

  const section = data.sections.find(s => s.id === sectionId)
  const sectionIdx = data.sections.findIndex(s => s.id === sectionId)
  const prevSection = sectionIdx > 0 ? data.sections[sectionIdx - 1] : null
  const nextSection = sectionIdx < data.sections.length - 1 ? data.sections[sectionIdx + 1] : null

  const tocItems = useMemo(
    () => (section && tab === 'notes' ? parseHeadings(section.noteContent) : []),
    [section, tab]
  )

  // Single observer shared by both mobile dropdown and desktop sidebar
  const activeId = useTocActive(tocItems)
  const activeIndex = tocItems.findIndex(it => it.id === activeId)

  // Desktop TOC collapse state
  const [tocOpen, setTocOpen] = useState(true)

  useEffect(() => { window.scrollTo(0, 0) }, [sectionId, tab])
  useEffect(() => {
    const t = searchParams.get('tab')
    if (t === 'quiz') setTab('quiz')
  }, [searchParams])

  if (!section) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-400">Section not found</p>
      </div>
    )
  }

  const isComplete = progress.completedSections.includes(section.id)

  const handleTabChange = (t: 'notes' | 'quiz') => {
    setTab(t)
    setSearchParams(t === 'quiz' ? { tab: 'quiz' } : {})
  }

  const scrollToHeading = (id: string) => {
    // querySelectorAll + offsetParent check: skip the display:none copy (mobile
    // layout rendered alongside desktop layout with identical heading IDs).
    const nodes = document.querySelectorAll(`[id="${id}"]`)
    let el: HTMLElement | null = null
    for (const node of nodes) {
      if ((node as HTMLElement).offsetParent !== null) { el = node as HTMLElement; break }
    }
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 28, behavior: 'smooth' })
  }

  const QuizCtaButton = () => (
    <button
      onClick={() => handleTabChange('quiz')}
      className="w-full group bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-left text-white hover:shadow-xl hover:shadow-amber-500/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 opacity-80" />
            <span className="font-display font-bold text-lg">연습문제 풀러 가기</span>
          </div>
          <p className="text-sm opacity-80">
            이 섹션의 {section.questions.length}문제를 풀고 이해도를 확인하세요
          </p>
        </div>
        <ArrowRight className="w-6 h-6 opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
      </div>
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Mobile / tablet floating TOC */}
      <TableOfContents items={tocItems} activeId={activeId} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-400 mb-2">
          <Link to="/" className="hover:text-amber-500 transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Section {section.number}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xl sm:text-3xl text-ink-900 dark:text-ink-0 leading-snug">
              <span className="text-amber-500 mr-2">{String(section.number).padStart(2, '0')}</span>
              {section.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-ink-400">{section.questions.length} questions</span>
            </div>
          </div>
          <button
            onClick={() => onMarkComplete(section.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              isComplete
                ? 'bg-emerald-500/10 text-emerald-500 hover:bg-rose-500/10 hover:text-rose-500'
                : 'bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-300 hover:bg-emerald-500/10 hover:text-emerald-500'
            }`}
          >
            <CheckCircle className="w-4 h-4" /> 학습 완료
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex gap-1 bg-ink-100 dark:bg-ink-700 p-1 rounded-lg w-fit">
          <button
            onClick={() => handleTabChange('notes')}
            className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              tab === 'notes'
                ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-0 shadow-sm'
                : 'text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-ink-100'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" /> 개념 노트
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              tab === 'quiz'
                ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-0 shadow-sm'
                : 'text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-ink-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> 연습문제
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              tab === 'quiz' ? 'bg-amber-500/15 text-amber-500' : 'bg-amber-500 text-white'
            }`}>
              {section.questions.length}
            </span>
          </button>
        </div>

        {tab === 'quiz' && (
          <div className="flex items-center gap-2">
            {quizModeActive && (
              <button
                onClick={() => quizEngineRef.current?.changeMode()}
                className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-ink-200 dark:border-ink-600 text-ink-400 dark:text-ink-400 hover:border-amber-500 hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                모드 변경
              </button>
            )}
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-rose-500 border border-rose-500/30 hover:bg-rose-500/10 transition-colors whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" /> 초기화
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-500 font-medium">초기화할까요?</span>
                <button
                  onClick={() => { clearDraftSession(section.id); onResetSection(section.id); setShowResetConfirm(false); setQuizKey(k => k + 1) }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
                >
                  취소
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        key={`${sectionId}-${tab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tab === 'notes' ? (
          <>
            {/* ── Mobile / tablet: single column ─────────────────────── */}
            <div className="lg:hidden space-y-6">
              <div className="bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-600 p-6 sm:p-8">
                <MarkdownRenderer content={section.noteContent} />
              </div>
              {section.questions.length > 0 && <QuizCtaButton />}
            </div>

            {/* ── Desktop: flex 2-col (content + sticky TOC aside) ────── */}
            <div className="hidden lg:flex lg:gap-6 lg:items-start">

              {/* Content column */}
              <div className="flex-1 min-w-0 space-y-6">
                <div className="bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-600 p-6 sm:p-8">
                  <MarkdownRenderer content={section.noteContent} />
                </div>
                {section.questions.length > 0 && <QuizCtaButton />}
              </div>

              {/* ── Sticky TOC aside (desktop only) ─────────────────── */}
              {tocItems.length > 0 && (
                <motion.aside
                  initial={{ width: tocOpen ? 220 : 40 }}
                  animate={{ width: tocOpen ? 220 : 40 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="shrink-0 self-start sticky top-8 overflow-hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {tocOpen ? (
                      /* ── Expanded panel ──────────────────────────── */
                      <motion.div
                        key="toc-expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="w-[220px]"
                      >
                        <div className="rounded-xl border border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-800 overflow-hidden">
                          {/* Header */}
                          <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100 dark:border-ink-700">
                            <div className="flex items-center gap-2">
                              <AlignLeft className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-xs font-bold text-ink-700 dark:text-ink-200">목차</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {activeIndex >= 0 && (
                                <span className="text-[10px] font-semibold tabular-nums text-ink-300 dark:text-ink-500">
                                  {activeIndex + 1}<span className="opacity-45"> / {tocItems.length}</span>
                                </span>
                              )}
                              <button
                                onClick={() => setTocOpen(false)}
                                aria-label="목차 접기"
                                className="p-1 rounded-md hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-400 hover:text-ink-700 dark:hover:text-ink-100 transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div className="h-[2px] bg-ink-100 dark:bg-ink-700">
                            <motion.div
                              className="h-full bg-amber-500"
                              initial={false}
                              animate={{ width: activeIndex >= 0 ? `${((activeIndex + 1) / tocItems.length) * 100}%` : '0%' }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                          </div>
                          {/* Items */}
                          <nav className="px-2 py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {tocItems.map((item, i) => {
                              const isActive = activeId === item.id
                              return (
                                <button
                                  key={i}
                                  onClick={() => scrollToHeading(item.id)}
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
                        </div>
                      </motion.div>
                    ) : (
                      /* ── Collapsed strip ─────────────────────────── */
                      <motion.div
                        key="toc-collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="w-10"
                      >
                        <button
                          onClick={() => setTocOpen(true)}
                          aria-label="목차 펼치기"
                          className="w-full flex flex-col items-center py-3 gap-2.5 rounded-xl border border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-800 hover:border-amber-400 dark:hover:border-amber-500/60 transition-colors"
                        >
                          <AlignLeft className="w-3.5 h-3.5 text-amber-500" />
                          {activeIndex >= 0 && (
                            <span className="text-[10px] font-bold text-ink-400 dark:text-ink-400 tabular-nums leading-none">
                              {activeIndex + 1}
                            </span>
                          )}
                          <ChevronLeft className="w-3 h-3 text-ink-400 dark:text-ink-500" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.aside>
              )}
            </div>
          </>
        ) : (
          <QuizEngine
            key={quizKey}
            ref={quizEngineRef}
            questions={section.questions}
            sectionId={section.id}
            onComplete={onQuizComplete}
            onWrongAnswer={(qId, userAnswer) => onWrongAnswer(section.id, qId, userAnswer)}
            bookmarkedIds={progress.bookmarkedQuestions}
            onToggleBookmark={onToggleBookmark}
            onResetSection={() => onResetSection(section.id)}
            onModeActive={setQuizModeActive}
            enableReviewMode={true}
          />
        )}
      </motion.div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-ink-200 dark:border-ink-600">
        {prevSection ? (
          <Link
            to={`/section/${prevSection.id}`}
            className="flex items-center gap-2 text-sm text-ink-400 dark:text-ink-300 hover:text-amber-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider">Prev</div>
              <div className="font-medium">{prevSection.title}</div>
            </div>
          </Link>
        ) : <div />}
        {nextSection ? (
          <Link
            to={`/section/${nextSection.id}`}
            className="flex items-center gap-2 text-sm text-ink-400 dark:text-ink-300 hover:text-amber-500 transition-colors"
          >
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider">Next</div>
              <div className="font-medium">{nextSection.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>

      <ScrollJumpButtons />
    </div>
  )
}
