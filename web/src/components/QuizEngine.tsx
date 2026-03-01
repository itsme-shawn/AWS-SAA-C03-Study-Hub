import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, RotateCcw, Trophy, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Question, QuizResult } from '../types'
import MarkdownRenderer from './MarkdownRenderer'
import { loadDraftSession, saveDraftSession, clearDraftSession } from '../utils/storage'

interface Props {
  questions: Question[]
  sectionId: string
  onComplete: (result: QuizResult) => void
  onWrongAnswer?: (questionId: string, userAnswer: string) => void
  bookmarkedIds: string[]
  onToggleBookmark: (id: string) => void
  showTimer?: boolean
  timeLimit?: number // seconds
}

type Mode = 'all' | 'one-by-one' | 'instant'

export default function QuizEngine({ questions, sectionId, onComplete, onWrongAnswer, bookmarkedIds, onToggleBookmark, showTimer, timeLimit }: Props) {
  // Load persisted draft (if any) to restore in-progress session
  const [draft] = useState(() => loadDraftSession(sectionId))

  const [mode, setMode] = useState<Mode | null>(draft?.mode as Mode ?? null)
  const [answers, setAnswers] = useState<Record<string, string>>(draft?.answers ?? {})
  const [submitted, setSubmitted] = useState(draft?.submitted ?? false)
  const [currentIdx, setCurrentIdx] = useState(draft?.currentIdx ?? 0)
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set(draft?.checkedQuestions ?? []))
  const [timeLeft, setTimeLeft] = useState(timeLimit ?? 0)

  // Persist in-progress state whenever it changes
  useEffect(() => {
    if (mode === null) {
      clearDraftSession(sectionId)
      return
    }
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
      const s = questions.filter(q => answers[q.id] === q.answer).length
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
    return questions.filter(q => answers[q.id] === q.answer).length
  }, [submitted, questions, answers])

  const handleSelect = (qId: string, label: string) => {
    if (submitted) return
    if (mode === 'instant' && checkedQuestions.has(qId)) return
    setAnswers(prev => ({ ...prev, [qId]: label }))
  }

  const handleCheckQuestion = (qId: string) => {
    setCheckedQuestions(prev => new Set(prev).add(qId))
    const q = questions.find(q => q.id === qId)
    if (q && answers[qId] && answers[qId] !== q.answer) {
      onWrongAnswer?.(qId, answers[qId])
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const s = questions.filter(q => answers[q.id] === q.answer).length
    onComplete({
      sectionId,
      score: s,
      total: questions.length,
      answers,
      timestamp: new Date().toISOString(),
    })
  }

  const handleReset = () => {
    clearDraftSession(sectionId)
    setAnswers({})
    setSubmitted(false)
    setCurrentIdx(0)
    setCheckedQuestions(new Set())
    setMode(null)
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
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h3 className="font-display font-bold text-2xl mb-2 text-ink-900 dark:text-ink-0">
            Ready to Test?
          </h3>
          <p className="text-ink-400 dark:text-ink-300 text-sm">
            {questions.length} questions available
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => setMode('all')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-amber-500 dark:hover:border-amber-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">All at Once</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">모든 문제를 한 번에 보고 풀기</p>
          </button>
          <button
            onClick={() => setMode('one-by-one')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-amber-500 dark:hover:border-amber-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">One by One</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">한 문제씩 순서대로 풀기</p>
          </button>
          <button
            onClick={() => setMode('instant')}
            className="p-6 rounded-xl border-2 border-ink-200 dark:border-ink-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group text-left"
          >
            <div className="font-display font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">Instant Check</div>
            <p className="text-xs text-ink-400 dark:text-ink-300">한 문제씩 풀고 바로 정답 확인</p>
          </button>
        </div>
      </div>
    )
  }

  // Score display after submission
  if (submitted && mode === 'one-by-one' && currentIdx >= questions.length) {
    return (
      <ScoreCard score={score} total={questions.length} percentage={percentage} onReset={handleReset} onReview={() => setCurrentIdx(0)} />
    )
  }

  // Instant check mode - score display
  if (mode === 'instant' && checkedQuestions.size === questions.length && currentIdx >= questions.length) {
    const instantScore = questions.filter(q => answers[q.id] === q.answer).length
    const instantPct = questions.length > 0 ? Math.round((instantScore / questions.length) * 100) : 0
    return (
      <ScoreCard score={instantScore} total={questions.length} percentage={instantPct} onReset={handleReset} onReview={() => setCurrentIdx(0)} />
    )
  }

  // Instant check mode
  if (mode === 'instant') {
    const q = questions[currentIdx]
    if (!q) return null
    const isAnswered = q.id in answers
    const isChecked = checkedQuestions.has(q.id)
    const globalQId = `${sectionId}-${q.id}`


    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(checkedQuestions.size / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-ink-400 dark:text-ink-300 w-16 text-right">
            {checkedQuestions.size}/{questions.length}
          </span>
        </div>

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
                    : qChecked && answers[qq.id] === qq.answer
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : qChecked && answers[qq.id] !== qq.answer
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
        />

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          {!isChecked && isAnswered ? (
            <button
              onClick={() => handleCheckQuestion(q.id)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              Check Answer
            </button>
          ) : isChecked && currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="flex items-center gap-1 px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : isChecked && currentIdx === questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(questions.length)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              View Score
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // One-by-one mode
  if (mode === 'one-by-one') {
    const q = questions[currentIdx]
    if (!q) return null
    const isAnswered = q.id in answers
    const isCorrect = answers[q.id] === q.answer
    const globalQId = `${sectionId}-${q.id}`

    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + (submitted ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-ink-400 dark:text-ink-300 w-16 text-right">
            {currentIdx + 1}/{questions.length}
          </span>
          {showTimer && (
            <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${timeLeft < 300 ? 'text-rose-500 bg-rose-500/10' : 'text-ink-400'}`}>
              {formatTime(timeLeft)}
            </span>
          )}
        </div>

        {/* Question navigation dots */}
        <div className="flex flex-wrap gap-1.5">
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                i === currentIdx
                  ? 'bg-amber-500 text-white scale-110'
                  : submitted && answers[qq.id] === qq.answer
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : submitted && answers[qq.id] && answers[qq.id] !== qq.answer
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
          submitted={submitted}
          onSelect={(label) => handleSelect(q.id, label)}
          isBookmarked={bookmarkedIds.includes(globalQId)}
          onToggleBookmark={() => onToggleBookmark(globalQId)}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          {!submitted && currentIdx === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40 transition-all shadow-lg shadow-amber-500/20"
            >
              Submit ({answeredCount}/{questions.length})
            </button>
          ) : submitted && currentIdx === questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(questions.length)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
            >
              View Score
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // All-at-once mode
  return (
    <div className="space-y-8">
      {showTimer && (
        <div className={`text-center font-mono text-lg font-bold ${timeLeft < 300 ? 'text-rose-500' : 'text-ink-400'}`}>
          {formatTime(timeLeft)}
        </div>
      )}

      {submitted && (
        <ScoreCard score={score} total={questions.length} percentage={percentage} onReset={handleReset} />
      )}

      {questions.map((q) => {
        const globalQId = `${sectionId}-${q.id}`
        return (
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[q.id]}
            submitted={submitted}
            onSelect={(label) => handleSelect(q.id, label)}
            isBookmarked={bookmarkedIds.includes(globalQId)}
            onToggleBookmark={() => onToggleBookmark(globalQId)}
          />
        )
      })}

      {!submitted && (
        <div className="sticky bottom-4 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="px-8 py-3 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40 transition-all shadow-xl shadow-amber-500/25"
          >
            Submit Answers ({answeredCount}/{questions.length})
          </button>
        </div>
      )}

      {submitted && (
        <div className="flex justify-center pt-4">
          <button onClick={handleReset} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}
    </div>
  )
}

function QuestionCard({
  question: q, selected, submitted, onSelect, isBookmarked, onToggleBookmark,
}: {
  question: Question
  selected?: string
  submitted: boolean
  onSelect: (label: string) => void
  isBookmarked: boolean
  onToggleBookmark: () => void
}) {
  const isCorrect = selected === q.answer

  return (
    <motion.div
      layout
      className={`rounded-xl border-2 p-6 transition-all ${
        submitted && selected
          ? isCorrect
            ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/5'
            : 'border-rose-500/50 bg-rose-50 dark:bg-rose-500/5'
          : 'border-ink-200 dark:border-ink-600 bg-white dark:bg-ink-800'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h4 className="font-display font-semibold text-base text-ink-900 dark:text-ink-0 leading-relaxed">
          <span className="text-amber-500 mr-2">Q{q.number}.</span>
          {q.text}
        </h4>
        <div className="flex gap-1 shrink-0">
          <button onClick={onToggleBookmark} className={`p-1.5 rounded-md transition-colors ${isBookmarked ? 'text-amber-500' : 'text-ink-300 hover:text-ink-500'}`}>
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt) => {
          const isSelected = selected === opt.label
          const isAnswer = q.answer === opt.label
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
                  <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> Incorrect — Answer: {q.answer}</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ScoreCard({ score, total, percentage, onReset, onReview }: {
  score: number; total: number; percentage: number; onReset: () => void; onReview?: () => void
}) {
  const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 72 ? 'B' : percentage >= 60 ? 'C' : 'F'
  const passed = percentage >= 72

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`rounded-2xl p-8 text-center border-2 ${
        passed ? 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5' : 'border-rose-500/30 bg-rose-50 dark:bg-rose-500/5'
      }`}
    >
      <Trophy className={`w-12 h-12 mx-auto mb-4 ${passed ? 'text-emerald-500' : 'text-rose-500'}`} />
      <div className="font-display font-bold text-5xl mb-2">{percentage}%</div>
      <div className="text-lg font-semibold mb-1">
        Grade: <span className={passed ? 'text-emerald-500' : 'text-rose-500'}>{grade}</span>
      </div>
      <p className="text-sm text-ink-400 dark:text-ink-300 mb-6">{score}/{total} correct — {passed ? 'PASS (72% required)' : 'FAIL (72% required)'}</p>
      <div className="flex justify-center gap-3">
        {onReview && (
          <button onClick={onReview} className="px-5 py-2.5 rounded-lg text-sm font-medium border border-ink-200 dark:border-ink-600 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors">
            Review Answers
          </button>
        )}
        <button onClick={onReset} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </motion.div>
  )
}
