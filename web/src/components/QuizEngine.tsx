import { useState, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, RotateCcw, Trophy, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Question, QuizResult } from '../types'
import MarkdownRenderer from './MarkdownRenderer'
import { useNotePopup } from '../contexts/notePopup'
import { loadDraftSession, saveDraftSession, clearDraftSession } from '../utils/storage'
import {
  formatAnswerLabels,
  isCorrectAnswer,
  isMultiAnswer,
  parseAnswerLabels,
  toggleSelectedLabel,
} from '../utils/answers'

interface Props {
  questions: Question[]
  sectionId: string
  onComplete: (result: QuizResult) => void
  onWrongAnswer?: (questionId: string, userAnswer: string) => void
  bookmarkedIds: string[]
  onToggleBookmark: (id: string) => void
  showTimer?: boolean
  timeLimit?: number // seconds
  onResetSection?: () => void
  onModeActive?: (active: boolean) => void
  enableReviewMode?: boolean
  showBookmark?: boolean
}

export interface QuizEngineHandle {
  changeMode: () => void
}

type Mode = 'all' | 'one-by-one' | 'instant' | 'answer-first'

const QuizEngine = forwardRef<QuizEngineHandle, Props>(function QuizEngine(
  { questions, sectionId, onComplete, onWrongAnswer, bookmarkedIds, onToggleBookmark, showTimer, timeLimit, onResetSection, onModeActive, enableReviewMode = false, showBookmark = true }: Props,
  ref
) {
  // Load persisted draft (if any) to restore in-progress session
  const [draft] = useState(() => loadDraftSession(sectionId))
  const resolveMode = (raw?: string | null): Mode | null => {
    if (raw === 'all' || raw === 'one-by-one' || raw === 'instant') return raw
    if (enableReviewMode && raw === 'answer-first') return raw
    return null
  }

  const [mode, setMode] = useState<Mode | null>(() => resolveMode(draft?.mode))
  const [answers, setAnswers] = useState<Record<string, string>>(draft?.answers ?? {})
  const [submitted, setSubmitted] = useState(draft?.submitted ?? false)
  const [currentIdx, setCurrentIdx] = useState(draft?.currentIdx ?? 0)
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set(draft?.checkedQuestions ?? []))
  const [retryingQuestion, setRetryingQuestion] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(timeLimit ?? 0)

  // Persist in-progress state whenever it changes
  useEffect(() => {
    if (mode === null) return  // 모드 변경 중에는 draft 유지 (handleReset에서만 명시적 삭제)
    saveDraftSession(sectionId, {
      mode,
      answers,
      submitted,
      currentIdx,
      checkedQuestions: [...checkedQuestions],
      flagged: [],
    })
  }, [sectionId, mode, answers, submitted, currentIdx, checkedQuestions])

  // Instant check: fire onComplete once all questions have been checked
  useEffect(() => {
    if (mode === 'instant' && checkedQuestions.size === questions.length && questions.length > 0 && !submitted) {
      const s = questions.filter(q => isCorrectAnswer(answers[q.id], q.answer)).length
      setSubmitted(true)
      onComplete({
        sectionId,
        score: s,
        total: questions.length,
        answers,
        timestamp: new Date().toISOString(),
      })
    }
  }, [mode, checkedQuestions, questions, submitted, answers, sectionId, onComplete])

  // Timer
  useState(() => {
    if (!showTimer || !timeLimit) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  })

  const score = useMemo(() => {
    if (!submitted) return 0
    return questions.filter(q => isCorrectAnswer(answers[q.id], q.answer)).length
  }, [submitted, questions, answers])

  const handleRetryQuestion = (qId: string) => {
    setAnswers(prev => { const next = { ...prev }; delete next[qId]; return next })
    if (mode === 'instant') {
      setCheckedQuestions(prev => { const next = new Set(prev); next.delete(qId); return next })
    }
    setRetryingQuestion(qId)
    const idx = questions.findIndex(q => q.id === qId)
    if (idx >= 0) setCurrentIdx(idx)
  }

  const handleConfirmRetry = () => {
    if (!retryingQuestion) return
    const qId = retryingQuestion
    setRetryingQuestion(null)
    if (mode === 'instant') {
      setCheckedQuestions(prev => new Set(prev).add(qId))
    }
    const newAnswers = { ...answers }
    const newScore = questions.filter(q => isCorrectAnswer(newAnswers[q.id], q.answer)).length
    const q = questions.find(q => q.id === qId)
    if (q && newAnswers[qId] && !isCorrectAnswer(newAnswers[qId], q.answer)) {
      onWrongAnswer?.(qId, newAnswers[qId])
    }
    onComplete({ sectionId, score: newScore, total: questions.length, answers: newAnswers, timestamp: new Date().toISOString() })
  }

  const handleSelect = (qId: string, label: string) => {
    if (mode === 'answer-first') return
    if (mode === 'instant') {
      if (checkedQuestions.has(qId)) return
    } else {
      if (submitted && qId !== retryingQuestion) return
    }
    const q = questions.find(question => question.id === qId)
    const multiple = q ? isMultiAnswer(q.answer) : false

    setAnswers(prev => {
      const nextValue = toggleSelectedLabel(prev[qId], label, multiple)
      if (!nextValue) {
        const next = { ...prev }
        delete next[qId]
        return next
      }
      return { ...prev, [qId]: nextValue }
    })
  }

  const handleCheckQuestion = (qId: string) => {
    const newChecked = new Set(checkedQuestions).add(qId)
    setCheckedQuestions(newChecked)
    const q = questions.find(q => q.id === qId)
    if (q && answers[qId] && !isCorrectAnswer(answers[qId], q.answer)) {
      onWrongAnswer?.(qId, answers[qId])
    }
    // 재진입 후 마지막 문제 재확인 시 (submitted=true라 useEffect가 안 터짐) 직접 점수 재계산
    if (submitted && newChecked.size === questions.length) {
      const newAnswers = { ...answers }
      const newScore = questions.filter(q => isCorrectAnswer(newAnswers[q.id], q.answer)).length
      onComplete({ sectionId, score: newScore, total: questions.length, answers: newAnswers, timestamp: new Date().toISOString() })
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const s = questions.filter(q => isCorrectAnswer(answers[q.id], q.answer)).length
    onComplete({
      sectionId,
      score: s,
      total: questions.length,
      answers,
      timestamp: new Date().toISOString(),
    })
  }

  const handleChangeMode = () => {
    setMode(null)
    setSubmitted(false)
    setCurrentIdx(0)
    setRetryingQuestion(null)
    // answers, checkedQuestions 유지
  }

  useImperativeHandle(ref, () => ({ changeMode: handleChangeMode }))

  // 모드 활성 상태를 부모에 알림
  useEffect(() => {
    onModeActive?.(mode !== null)
  }, [mode, onModeActive])

  const handleSelectMode = (newMode: Mode) => {
    if (newMode === 'answer-first' && !enableReviewMode) return
    setMode(newMode)
    setCurrentIdx(0)
    setRetryingQuestion(null)
    // 실제로 제출된 문제만 채점 상태로 복원 (선지 선택만으로는 채점 안 됨)
    if (newMode === 'instant') {
      // checkedQuestions는 실제 제출된 문제만 포함하므로 그대로 유지
      setSubmitted(checkedQuestions.size === questions.length && questions.length > 0)
    } else if (newMode === 'answer-first') {
      setSubmitted(false)
    } else {
      // all / one-by-one: 모든 문제를 답했을 때만 submitted=true
      setSubmitted(Object.keys(answers).length === questions.length && questions.length > 0)
    }
  }

  const handleReset = () => {
    clearDraftSession(sectionId)
    setAnswers({})
    setSubmitted(false)
    setCurrentIdx(0)
    setCheckedQuestions(new Set())
    setRetryingQuestion(null)
    setMode(null)
    onResetSection?.()
  }

  const answeredCount = Object.keys(answers).length
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  // Mode selection
  if (mode === null) {
    const existingAnswerCount = Object.keys(answers).length
    const existingCheckedCount = checkedQuestions.size
    const hasProgress = existingAnswerCount > 0 || existingCheckedCount > 0
    return (
      <div className="space-y-6">
        <div className="text-center py-6">
          <h3 className="font-display font-bold text-2xl mb-2 text-ink-900 dark:text-ink-0">
            {hasProgress ? '모드 선택' : 'Ready to Test?'}
          </h3>
          {!hasProgress && (
            <p className="text-ink-400 dark:text-ink-300 text-sm">{questions.length} questions available</p>
          )}
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${enableReviewMode ? 'lg:grid-cols-4 max-w-4xl' : 'lg:grid-cols-3 max-w-2xl'} gap-4 mx-auto`}>
          <button
            onClick={() => handleSelectMode('all')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-amber-500 dark:hover:border-amber-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">All at Once</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">모든 문제를 한 번에 보고 풀기</p>
          </button>
          <button
            onClick={() => handleSelectMode('one-by-one')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-amber-500 dark:hover:border-amber-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">One by One</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">한 문제씩 순서대로 풀기</p>
          </button>
          <button
            onClick={() => handleSelectMode('instant')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">Instant Check</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">한 문제씩 풀고 바로 정답 확인</p>
          </button>
          {enableReviewMode && (
            <button
              onClick={() => handleSelectMode('answer-first')}
              className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-sky-500 dark:hover:border-sky-500 transition-all group text-left"
            >
              <div className="font-display font-bold text-lg mb-1 group-hover:text-sky-500 transition-colors">Answer First</div>
              <p className="text-xs text-ink-400 dark:text-ink-300">정답과 해설을 바로 보며 복습</p>
            </button>
          )}
        </div>
      </div>
    )
  }

  // Score display after submission
  if (submitted && mode === 'one-by-one' && currentIdx >= questions.length) {
    return (
      <ScoreCard score={score} total={questions.length} percentage={percentage} onReview={() => setCurrentIdx(0)} />
    )
  }

  // Instant check mode - score display
  if (mode === 'instant' && checkedQuestions.size === questions.length && currentIdx >= questions.length) {
    const instantScore = questions.filter(q => isCorrectAnswer(answers[q.id], q.answer)).length
    const instantPct = questions.length > 0 ? Math.round((instantScore / questions.length) * 100) : 0
    return (
      <ScoreCard score={instantScore} total={questions.length} percentage={instantPct} onReview={() => setCurrentIdx(0)} />
    )
  }

  // Instant check mode
  if (mode === 'instant') {
    const q = questions[currentIdx]
    if (!q) return null
    const isChecked = checkedQuestions.has(q.id)
    const globalQId = `${sectionId}-${q.id}`


    return (
      <div className="space-y-6">
        {submitted ? (
          <ScoreBar mode="instant" score={score} total={questions.length} percentage={percentage} />
        ) : checkedQuestions.size < questions.length ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(checkedQuestions.size / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-ink-400 dark:text-ink-300 shrink-0">
              {checkedQuestions.size}/{questions.length}
            </span>
          </div>
        ) : null}

        {/* Question navigation dots */}
        <div className="flex flex-wrap gap-1.5">
          {questions.map((qq, i) => {
            const qChecked = checkedQuestions.has(qq.id)
            return (
              <button
                key={qq.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                  i === currentIdx
                    ? 'bg-amber-500 text-white scale-110'
                    : qChecked && isCorrectAnswer(answers[qq.id], qq.answer)
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : qChecked && !isCorrectAnswer(answers[qq.id], qq.answer)
                    ? 'bg-rose-500/20 text-rose-500'
                    : qq.id in answers
                    ? 'bg-ink-200 dark:bg-ink-600 text-ink-600 dark:text-ink-200'
                    : 'bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-400'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        <QuestionCard
          question={q}
          selected={answers[q.id]}
          submitted={isChecked}
          onSelect={(label) => handleSelect(q.id, label)}
          isBookmarked={bookmarkedIds.includes(globalQId)}
          onToggleBookmark={() => onToggleBookmark(globalQId)}
          onRetry={isChecked ? () => handleRetryQuestion(q.id) : undefined}
          showBookmark={showBookmark}
        />

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 이전 문제
          </button>

          {answers[q.id] && !isChecked ? (
            <button
              onClick={retryingQuestion === q.id ? handleConfirmRetry : () => handleCheckQuestion(q.id)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle className="w-4 h-4" /> 제출하기
            </button>
          ) : currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="flex items-center gap-1 px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              다음 문제 <ChevronRight className="w-4 h-4" />
            </button>
          ) : checkedQuestions.size === questions.length ? (
            <button
              onClick={() => setCurrentIdx(questions.length)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              결과 보기
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }

  // Answer-first mode (review)
  if (mode === 'answer-first') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 px-4 py-3 text-xs text-sky-600 dark:text-sky-300">
          정답과 해설이 즉시 표시되는 복습 모드입니다. 이 모드는 점수를 저장하지 않습니다.
        </div>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => {
                document.getElementById(`review-q-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="w-7 h-7 rounded-md text-[10px] font-bold transition-all bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500/25"
            >
              {i + 1}
            </button>
          ))}
        </div>

        {questions.map((q) => {
          const globalQId = `${sectionId}-${q.id}`
          return (
            <div key={q.id} id={`review-q-${q.id}`} className="scroll-mt-4">
              <QuestionCard
                question={q}
                selected={q.answer}
                submitted={true}
                onSelect={() => undefined}
                isBookmarked={bookmarkedIds.includes(globalQId)}
                onToggleBookmark={() => onToggleBookmark(globalQId)}
                showBookmark={showBookmark}
              />
            </div>
          )
        })}
      </div>
    )
  }

  // One-by-one mode
  if (mode === 'one-by-one') {
    const q = questions[currentIdx]
    if (!q) return null
    const globalQId = `${sectionId}-${q.id}`

    return (
      <div className="space-y-6">
        {submitted ? (
          <ScoreBar mode="one-by-one" score={score} total={questions.length} percentage={percentage} />
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-ink-400 dark:text-ink-300 shrink-0">
              {answeredCount}/{questions.length}
            </span>
            {showTimer && (
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${timeLeft < 300 ? 'text-rose-500 bg-rose-500/10' : 'text-ink-400'}`}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        )}

        {/* Question navigation dots */}
        <div className="flex flex-wrap gap-1.5">
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                i === currentIdx
                  ? 'bg-amber-500 text-white scale-110'
                  : submitted && isCorrectAnswer(answers[qq.id], qq.answer)
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : submitted && !isCorrectAnswer(answers[qq.id], qq.answer)
                  ? 'bg-rose-500/20 text-rose-500'
                  : qq.id in answers
                  ? 'bg-ink-200 dark:bg-ink-600 text-ink-600 dark:text-ink-200'
                  : 'bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <QuestionCard
          question={q}
          selected={answers[q.id]}
          submitted={submitted && retryingQuestion !== q.id}
          onSelect={(label) => handleSelect(q.id, label)}
          isBookmarked={bookmarkedIds.includes(globalQId)}
          onToggleBookmark={() => onToggleBookmark(globalQId)}
          onRetry={submitted && retryingQuestion !== q.id ? () => handleRetryQuestion(q.id) : undefined}
          showBookmark={showBookmark}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 이전 문제
          </button>

          {retryingQuestion === q.id && answers[q.id] ? (
            <button
              onClick={handleConfirmRetry}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle className="w-4 h-4" /> 제출하기
            </button>
          ) : currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="flex items-center gap-1 px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              다음 문제 <ChevronRight className="w-4 h-4" />
            </button>
          ) : submitted && !retryingQuestion ? (
            <button
              onClick={() => setCurrentIdx(questions.length)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              결과 보기
            </button>
          ) : !submitted ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40 transition-all shadow-lg shadow-amber-500/20"
            >
              제출하기 ({answeredCount}/{questions.length})
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }

  // All-at-once mode
  return (
    <div className="space-y-8">
      {submitted ? (
        <ScoreBar mode="all" score={score} total={questions.length} percentage={percentage} />
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-ink-400 dark:text-ink-300 shrink-0">
            {answeredCount}/{questions.length}
          </span>
          {showTimer && (
            <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${timeLeft < 300 ? 'text-rose-500 bg-rose-500/10' : 'text-ink-400'}`}>
              {formatTime(timeLeft)}
            </span>
          )}
        </div>
      )}

      {/* Question navigation dots */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, i) => {
          const isAnswered = q.id in answers
          const isChecked = submitted
          return (
            <button
              key={q.id}
              onClick={() => {
                document.getElementById(`all-q-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                isChecked && isCorrectAnswer(answers[q.id], q.answer)
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : isChecked && !isCorrectAnswer(answers[q.id], q.answer)
                  ? 'bg-rose-500/20 text-rose-500'
                  : isAnswered
                  ? 'bg-ink-200 dark:bg-ink-600 text-ink-600 dark:text-ink-200'
                  : 'bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-400'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {questions.map((q) => {
        const globalQId = `${sectionId}-${q.id}`
        return (
          <div key={q.id} id={`all-q-${q.id}`} className="scroll-mt-4">
            <QuestionCard
              question={q}
              selected={answers[q.id]}
              submitted={submitted && retryingQuestion !== q.id}
              onSelect={(label) => handleSelect(q.id, label)}
              isBookmarked={bookmarkedIds.includes(globalQId)}
              onToggleBookmark={() => onToggleBookmark(globalQId)}
              onRetry={submitted && retryingQuestion !== q.id ? () => handleRetryQuestion(q.id) : undefined}
              onConfirmRetry={retryingQuestion === q.id ? handleConfirmRetry : undefined}
              showBookmark={showBookmark}
            />
          </div>
        )
      })}

      {!submitted && (
        <div className="sticky bottom-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/25"
          >
            제출하기 ({answeredCount}/{questions.length})
          </button>
        </div>
      )}

    </div>
  )
})

export default QuizEngine

function QuestionCard({
  question: q, selected, submitted, onSelect, isBookmarked, onToggleBookmark, onRetry, onConfirmRetry, showBookmark = true,
}: {
  question: Question
  selected?: string
  submitted: boolean
  onSelect: (label: string) => void
  isBookmarked: boolean
  onToggleBookmark: () => void
  onRetry?: () => void
  onConfirmRetry?: () => void
  showBookmark?: boolean
}) {
  const notePopup = useNotePopup()
  const selectedLabels = parseAnswerLabels(selected)
  const answerLabels = parseAnswerLabels(q.answer)
  const isCorrect = isCorrectAnswer(selected, q.answer)

  return (
    <motion.div
      layout
      data-question-card
      className={`rounded-xl border-2 p-6 transition-all ${
        submitted
          ? isCorrect
            ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/5'
            : 'border-rose-500/50 bg-rose-50 dark:bg-rose-500/5'
          : 'border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-800'
      }`}
    >
      {/* Header */}
      {onRetry && (
        <div className="mb-3">
          <button
            onClick={onRetry}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> 다시 풀기
          </button>
        </div>
      )}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h4 className="font-display font-semibold text-base text-ink-900 dark:text-ink-0 leading-relaxed">
          <span className="text-amber-500 mr-2">Q{q.number}.</span>
          {q.text}
        </h4>
        {showBookmark && (
          <div className="flex gap-1 shrink-0">
            <button onClick={onToggleBookmark} className={`p-1.5 rounded-md transition-colors ${isBookmarked ? 'text-amber-500' : 'text-ink-300 hover:text-ink-500'}`}>
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt) => {
          const isSelected = selectedLabels.includes(opt.label)
          const isAnswer = answerLabels.includes(opt.label)
          let style = 'border-ink-200 dark:border-ink-600 hover:border-ink-400 dark:hover:border-ink-400 bg-ink-25 dark:bg-ink-700/50'
          if (!submitted && isSelected) {
            style = 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 ring-1 ring-amber-500'
          }
          if (submitted && isAnswer) {
            style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
          }
          if (submitted && isSelected && !isAnswer) {
            style = 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
          }

          return (
            <button
              key={opt.label}
              onClick={() => onSelect(opt.label)}
              disabled={submitted}
              className={`w-full text-left flex items-start gap-3 p-3.5 rounded-lg border-2 transition-all ${style}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                submitted && isAnswer ? 'bg-emerald-500 text-white'
                : submitted && isSelected && !isAnswer ? 'bg-rose-500 text-white'
                : isSelected ? 'bg-amber-500 text-white'
                : 'bg-ink-200 dark:bg-ink-600 text-ink-500 dark:text-ink-300'
              }`}>
                {submitted && isAnswer ? <CheckCircle className="w-4 h-4" /> :
                 submitted && isSelected && !isAnswer ? <XCircle className="w-4 h-4" /> :
                 opt.label}
              </span>
              <span className="text-sm leading-relaxed pt-0.5">{opt.text}</span>
            </button>
          )
        })}
      </div>

      {/* Retry confirm button */}
      {onConfirmRetry && selected && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirmRetry}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <CheckCircle className="w-4 h-4" /> 제출하기
          </button>
        </div>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-ink-200 dark:border-ink-600 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold">
                {isCorrect ? (
                  <span className="text-emerald-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Correct!</span>
                ) : (
                  <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> Incorrect — Answer: {formatAnswerLabels(q.answer)}</span>
                )}
              </div>
              {q.explanation && (
                <div className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed [&_.prose]:text-sm [&_table]:text-xs [&_blockquote]:text-sm [&_blockquote]:my-2 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_.prose]:max-w-none">
                  <MarkdownRenderer content={q.explanation} />
                </div>
              )}
              {q.keyConcept && (
                <span className="inline-block text-[10px] font-bold px-2 py-1 rounded-full bg-sky-500/10 text-sky-500 uppercase tracking-wider">
                  {q.keyConcept}
                </span>
              )}
              {q.noteLinks && q.noteLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-ink-400 dark:text-ink-400 uppercase tracking-wider shrink-0">관련 노트</span>
                  {q.noteLinks.map(link => {
                    const urlMatch = link.url.match(/^\/section\/([^#]+)#?(.*)$/)
                    const sectionId = urlMatch?.[1] ?? ''
                    const headingId = urlMatch?.[2] ?? ''
                    return (
                      <button
                        key={link.url}
                        onClick={(e) => notePopup?.open(sectionId, headingId, e.currentTarget.getBoundingClientRect())}
                        className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors border border-amber-500/20"
                      >
                        <span>📖</span> {link.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const MODE_LABELS: Record<Mode, string> = {
  'all': 'All at Once',
  'one-by-one': 'One by One',
  'instant': 'Instant Check',
  'answer-first': 'Answer First',
}

function ScoreBar({ mode, score, total, percentage }: {
  mode: Mode; score: number; total: number; percentage: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-600"
    >
      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-300 tracking-wider uppercase shrink-0">
        {MODE_LABELS[mode]}
      </span>
      <div className="flex-1" />
      <span className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0">{percentage}%</span>
      <span className="text-sm text-ink-400 dark:text-ink-300 font-mono">{score} / {total}</span>
    </motion.div>
  )
}

function ScoreCard({ score, total, percentage, onReview }: {
  score: number; total: number; percentage: number; onReview?: () => void
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-2xl p-8 text-center border-2 border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-800"
    >
      <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-500" />
      <div className="font-display font-bold text-5xl mb-2">{percentage}%</div>
      <p className="text-sm text-ink-400 dark:text-ink-300 mb-6">{score} / {total}</p>
      <div className="flex justify-center gap-3">
        {onReview && (
          <button onClick={onReview} className="px-5 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
            Review Answers
          </button>
        )}
      </div>
    </motion.div>
  )
}
