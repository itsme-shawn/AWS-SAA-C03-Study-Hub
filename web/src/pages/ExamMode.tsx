import { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Clock, AlertTriangle, ArrowRight } from 'lucide-react'
import QuizEngine from '../components/QuizEngine'
import type { ContentData, StudyProgress, QuizResult, Question } from '../types'

interface Props {
  data: ContentData
  progress: StudyProgress
  onExamComplete: (result: QuizResult) => void
  onToggleBookmark: (qId: string) => void
}

export default function ExamMode({ data, progress, onExamComplete, onToggleBookmark }: Props) {
  const [started, setStarted] = useState(false)
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [timeLeft, setTimeLeft] = useState(130 * 60) // 130 minutes
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [finished, setFinished] = useState(false)

  // Select 65 random questions weighted by section
  const generateExam = () => {
    const allQuestions: (Question & { _sectionId: string })[] = []
    for (const s of data.sections) {
      for (const q of s.questions) {
        allQuestions.push({ ...q, _sectionId: s.id, id: `${s.id}-${q.id}` })
      }
    }

    // Shuffle and pick 65
    const shuffled = allQuestions.sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(65, shuffled.length))

    // Renumber
    return selected.map((q, i) => ({
      ...q,
      number: i + 1,
      id: q.id,
    }))
  }

  const startExam = () => {
    setExamQuestions(generateExam())
    setStarted(true)
    setFinished(false)
    setTimeLeft(130 * 60)
  }

  useEffect(() => {
    if (!started || finished) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [started, finished])

  const handleComplete = (result: QuizResult) => {
    setFinished(true)
    if (timerRef.current) clearInterval(timerRef.current)
    onExamComplete({ ...result, sectionId: 'exam' })
  }

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      : `${m}:${String(sec).padStart(2, '0')}`
  }

  // Past exam results
  const pastExams = progress.examResults.slice().reverse().slice(0, 5)

  if (!started) {
    return (
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-0">Mock Exam</h1>
          <p className="text-ink-400 dark:text-ink-300 mt-1">실전과 동일한 조건의 모의고사</p>
        </motion.div>

        {/* Exam info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-ink-800 rounded-xl p-8 border border-ink-200 dark:border-ink-600"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0">65</div>
              <div className="text-xs text-ink-400">문제 수</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-sky-500" />
              </div>
              <div className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0">130분</div>
              <div className="text-xs text-ink-400">제한 시간</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0">72%</div>
              <div className="text-xs text-ink-400">합격 기준 (720/1000)</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startExam}
              className="px-10 py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl hover:shadow-amber-500/25 transition-all"
            >
              시험 시작 <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
            <p className="text-xs text-ink-400 mt-3">전체 {data.totalQuestions}문제 중 랜덤 65문제 출제</p>
          </div>
        </motion.div>

        {/* Past results */}
        {pastExams.length > 0 && (
          <div className="bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600">
            <h2 className="font-display font-bold text-lg mb-4 text-ink-900 dark:text-ink-0">이전 시험 기록</h2>
            <div className="space-y-3">
              {pastExams.map((r, i) => {
                const pct = Math.round((r.score / r.total) * 100)
                const passed = pct >= 72
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center font-bold ${
                      passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      <span className="text-lg">{pct}%</span>
                      <span className="text-[9px] font-medium">{passed ? 'PASS' : 'FAIL'}</span>
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{r.score}/{r.total} correct</div>
                      <div className="text-xs text-ink-400">{new Date(r.timestamp).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Exam in progress
  return (
    <div className="space-y-6">
      {/* Timer header */}
      <div className="sticky top-0 z-10 bg-ink-25/80 dark:bg-ink-900/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-ink-200 dark:border-ink-600">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-lg text-ink-900 dark:text-ink-0">Mock Exam</h2>
          <div className={`font-mono text-lg font-bold px-4 py-1.5 rounded-lg ${
            timeLeft < 5 * 60 ? 'text-rose-500 bg-rose-500/10 animate-pulse' :
            timeLeft < 15 * 60 ? 'text-amber-500 bg-amber-500/10' :
            'text-ink-500 dark:text-ink-300 bg-ink-100 dark:bg-ink-700'
          }`}>
            <Clock className="inline w-4 h-4 mr-1.5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <QuizEngine
        questions={examQuestions}
        sectionId="exam"
        onComplete={handleComplete}
        bookmarkedIds={progress.bookmarkedQuestions}
        onToggleBookmark={onToggleBookmark}
        showTimer={false}
      />
    </div>
  )
}
