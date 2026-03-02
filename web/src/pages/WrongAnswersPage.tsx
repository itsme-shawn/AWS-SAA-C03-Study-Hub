import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XCircle, CheckCircle, Trash2, ChevronDown, ChevronRight,
  AlertTriangle, ArrowRight, RotateCcw,
} from 'lucide-react'
import type { ContentData, StudyProgress } from '../types'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { formatAnswerLabels, labelsToText, parseAnswerLabels } from '../utils/answers'

interface Props {
  data: ContentData
  progress: StudyProgress
  onRemove: (sectionId: string, questionId: string) => void
  onClearSection: (sectionId?: string) => void
}

export default function WrongAnswersPage({ data, progress, onRemove, onClearSection }: Props) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())
  const [confirmClear, setConfirmClear] = useState<string | null>(null) // sectionId or 'all'

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleQuestion = (key: string) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  // Group wrong answers by section and dump
  const grouped = [
    ...data.sections
      .map(section => {
        const wrongs = progress.wrongAnswers.filter(w => w.sectionId === section.id)
        return {
          id: section.id,
          title: section.title,
          route: `/section/${section.id}?tab=quiz`,
          badge: String(section.number).padStart(2, '0'),
          kind: 'section' as const,
          questions: section.questions,
          wrongs,
        }
      })
      .filter(group => group.wrongs.length > 0),
    ...data.dumps
      .map(dump => {
        const sectionId = `dump:${dump.id}`
        const wrongs = progress.wrongAnswers.filter(w => w.sectionId === sectionId)
        return {
          id: sectionId,
          title: `Dump · ${dump.title}`,
          route: `/dumps/${dump.id}`,
          badge: 'D',
          kind: 'dump' as const,
          questions: dump.questions,
          wrongs,
        }
      })
      .filter(group => group.wrongs.length > 0),
  ]

  const totalCount = grouped.reduce((acc, group) => acc + group.wrongs.length, 0)

  const handleClearConfirm = () => {
    if (!confirmClear) return
    if (confirmClear === 'all') {
      onClearSection(undefined)
    } else {
      onClearSection(confirmClear)
    }
    setConfirmClear(null)
  }

  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0 mb-2">
          틀린 문제 없음
        </h2>
        <p className="text-ink-400 dark:text-ink-300 text-sm mb-6">
          퀴즈를 풀면 틀린 문제가 여기에 자동으로 저장됩니다.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
        >
          대시보드로 이동 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 dark:text-ink-0">
              <span className="text-rose-500 mr-2">✕</span>틀린 문제
            </h1>
            <p className="text-ink-400 dark:text-ink-300 text-sm mt-1">
              {grouped.length}개 세트 · 총 {totalCount}문제
              <span className="ml-2 text-[11px]">— 풀 때마다 자동 갱신</span>
            </p>
          </div>
          {/* Clear all button */}
          {confirmClear === 'all' ? (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-medium text-rose-500">전체 삭제?</span>
              <button
                onClick={handleClearConfirm}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                확인
              </button>
              <button
                onClick={() => setConfirmClear(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear('all')}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 전체 초기화
            </button>
          )}
        </div>

        {/* Summary bar */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {grouped.slice(0, 4).map(group => (
            <button
              key={group.id}
              onClick={() => {
                setExpandedSections(prev => new Set([...prev, group.id]))
                setTimeout(() => {
                  document.getElementById(`section-${group.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 50)
              }}
              className="bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-600 hover:border-rose-400 dark:hover:border-rose-400 rounded-xl p-3 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-500 text-[10px] font-bold flex items-center justify-center">
                  {group.badge}
                </span>
                <span className="text-[11px] font-bold text-rose-500">{group.wrongs.length}문제</span>
              </div>
              <p className="text-xs text-ink-500 dark:text-ink-300 truncate group-hover:text-ink-800 dark:group-hover:text-ink-100 transition-colors">
                {group.title}
              </p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Section groups */}
      <div className="space-y-3">
        {grouped.map((group, groupIdx) => (
          <motion.div
            key={group.id}
            id={`section-${group.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.04 }}
            className="bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-600 overflow-hidden"
          >
            {/* Section header */}
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-ink-50 dark:hover:bg-ink-700/50 transition-colors select-none"
              onClick={() => toggleSection(group.id)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center justify-center shrink-0">
                  {group.badge}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-sm text-ink-900 dark:text-ink-0 truncate">
                    {group.title}
                  </h3>
                  <p className="text-[11px] text-ink-400 dark:text-ink-300">
                    {group.wrongs.length}개의 틀린 문제
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Per-section clear */}
                {confirmClear === group.id ? (
                  <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={handleClearConfirm}
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => setConfirmClear(null)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); setConfirmClear(group.id) }}
                    className="p-1.5 rounded-md text-ink-300 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title={group.kind === 'dump' ? '이 덤프 틀린 문제 전체 삭제' : '이 섹션 틀린 문제 전체 삭제'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <Link
                  to={group.route}
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 rounded-md text-ink-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                  title={group.kind === 'dump' ? '이 덤프 다시 풀기' : '이 섹션 퀴즈 다시 풀기'}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {expandedSections.has(group.id)
                  ? <ChevronDown className="w-4 h-4 text-ink-400" />
                  : <ChevronRight className="w-4 h-4 text-ink-400" />
                }
              </div>
            </div>

            {/* Questions list */}
            <AnimatePresence>
              {expandedSections.has(group.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-100 dark:border-ink-700 divide-y divide-ink-100 dark:divide-ink-700">
                    {group.wrongs.map(wrong => {
                      const question = group.questions.find(q => q.id === wrong.questionId)
                      if (!question) return null
                      const qKey = `${group.id}::${wrong.questionId}`
                      const isExpanded = expandedQuestions.has(qKey)
                      const correctLabels = parseAnswerLabels(question.answer)
                      const wrongLabels = parseAnswerLabels(wrong.userAnswer)
                      const correctLabelText = formatAnswerLabels(question.answer)
                      const wrongLabelText = formatAnswerLabels(wrong.userAnswer)
                      const correctOptionText = labelsToText(question.answer, question.options)
                      const wrongOptionText = labelsToText(wrong.userAnswer, question.options)

                      return (
                        <div key={qKey} className="px-5 py-4">
                          {/* Question row */}
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                              <XCircle className="w-4 h-4 text-rose-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <button
                                className="text-sm font-medium text-ink-800 dark:text-ink-100 text-left leading-relaxed hover:text-amber-600 dark:hover:text-amber-400 transition-colors w-full"
                                onClick={() => toggleQuestion(qKey)}
                              >
                                <span className="text-amber-500 mr-1.5 font-bold">Q{question.number}.</span>
                                {question.text}
                              </button>

                              {/* Answer summary (always visible) */}
                              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-medium">
                                  <XCircle className="w-3 h-3" />
                                  내 답: {wrongLabelText || '—'} {wrongOptionText}
                                </span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                                  <CheckCircle className="w-3 h-3" />
                                  정답: {correctLabelText || '—'} {correctOptionText}
                                </span>
                              </div>

                              {/* Expandable explanation */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-3 pt-3 border-t border-ink-100 dark:border-ink-700">
                                      {/* All options */}
                                      <div className="space-y-1.5 mb-3">
                                        {question.options.map(opt => {
                                          const isCorrect = correctLabels.includes(opt.label)
                                          const isWrong = wrongLabels.includes(opt.label)
                                          return (
                                            <div
                                              key={opt.label}
                                              className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs border ${
                                                isCorrect
                                                  ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
                                                  : isWrong
                                                  ? 'border-rose-500/40 bg-rose-50 dark:bg-rose-500/5 text-rose-600 dark:text-rose-400'
                                                  : 'border-ink-100 dark:border-ink-700 text-ink-500 dark:text-ink-400'
                                              }`}
                                            >
                                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px] ${
                                                isCorrect ? 'bg-emerald-500 text-white'
                                                : isWrong ? 'bg-rose-500 text-white'
                                                : 'bg-ink-200 dark:bg-ink-600 text-ink-500'
                                              }`}>
                                                {isCorrect ? <CheckCircle className="w-3 h-3" /> : isWrong ? <XCircle className="w-3 h-3" /> : opt.label}
                                              </span>
                                              <span className="leading-relaxed">{opt.text}</span>
                                            </div>
                                          )
                                        })}
                                      </div>

                                      {/* Explanation */}
                                      {question.explanation && (
                                        <div className="mt-2 p-3 rounded-lg bg-sky-500/5 border border-sky-500/20">
                                          <div className="text-[11px] font-bold text-sky-500 uppercase tracking-wider mb-1.5">해설</div>
                                          <div className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed [&_.prose]:text-xs [&_.prose]:max-w-none [&_table]:text-[11px] [&_blockquote]:text-xs [&_blockquote]:my-1 [&_h1]:text-sm [&_h2]:text-xs [&_h3]:text-xs">
                                            <MarkdownRenderer content={question.explanation} />
                                          </div>
                                        </div>
                                      )}
                                      {question.keyConcept && (
                                        <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 uppercase tracking-wider">
                                          {question.keyConcept}
                                        </span>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Toggle explanation button */}
                              <button
                                onClick={() => toggleQuestion(qKey)}
                                className="mt-2 text-[11px] font-medium text-ink-400 hover:text-amber-500 transition-colors"
                              >
                                {isExpanded ? '해설 접기 ▲' : '해설 보기 ▼'}
                              </button>
                            </div>

                            {/* Delete button */}
                            <button
                              onClick={() => onRemove(group.id, wrong.questionId)}
                              className="shrink-0 p-1.5 rounded-md text-ink-300 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title="목록에서 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed summary */}
            {!expandedSections.has(group.id) && (
              <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                {group.wrongs.map(wrong => {
                  const question = group.questions.find(q => q.id === wrong.questionId)
                  if (!question) return null
                  return (
                    <span
                      key={wrong.questionId}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500"
                    >
                      Q{question.number}
                    </span>
                  )
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom hint */}
      <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-400 pt-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        같은 문제를 나중에 맞히더라도 자동으로 삭제되지 않습니다. 직접 삭제하거나, 틀린 문제 목록 초기화를 이용하세요.
      </div>
    </div>
  )
}
