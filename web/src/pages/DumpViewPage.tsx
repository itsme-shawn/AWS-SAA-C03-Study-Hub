import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Database } from 'lucide-react'
import QuizEngine, { type QuizEngineHandle } from '../components/QuizEngine'
import ScrollJumpButtons from '../components/ScrollJumpButtons'
import type { ContentData, QuizResult, StudyProgress } from '../types'

interface Props {
  data: ContentData
  progress: StudyProgress
  onDumpQuizComplete: (result: QuizResult) => void
  onWrongAnswer: (sectionId: string, questionId: string, userAnswer: string) => void
  onToggleBookmark: (qId: string) => void
}

export default function DumpViewPage({ data, progress, onDumpQuizComplete, onWrongAnswer, onToggleBookmark }: Props) {
  const { dumpId } = useParams<{ dumpId: string }>()
  const dump = data.dumps.find(d => d.id === dumpId)
  const sourceUrl = dump?.source && /^https?:\/\//i.test(dump.source) ? dump.source : null
  const quizEngineRef = useRef<QuizEngineHandle>(null)
  const [quizModeActive, setQuizModeActive] = useState(false)

  if (!dump) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-ink-400">Dump not found</p>
        <Link
          to="/dumps"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-ink-100 dark:bg-ink-700 hover:bg-ink-200 dark:hover:bg-ink-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> 덤프 목록으로
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <Link to="/dumps" className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-amber-500 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Dumps
        </Link>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-1">
            <Database className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xl sm:text-3xl text-ink-900 dark:text-ink-0 leading-snug">
              {dump.title}
            </h1>
            <p className="text-sm text-ink-400 dark:text-ink-300 mt-1">
              {dump.questions.length} questions
            </p>
            {dump.source && (
              sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-500 hover:text-sky-400 transition-colors break-all"
                >
                  {dump.source}
                </a>
              ) : (
                <div className="text-xs text-ink-400 dark:text-ink-300 break-all">{dump.source}</div>
              )
            )}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <div className="flex items-center justify-end mb-3">
          {quizModeActive && (
            <button
              onClick={() => quizEngineRef.current?.changeMode()}
              className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-ink-200 dark:border-ink-600 text-ink-400 dark:text-ink-400 hover:border-amber-500 hover:text-amber-500 transition-colors whitespace-nowrap"
            >
              모드 변경
            </button>
          )}
        </div>
        <QuizEngine
          key={`dump-${dump.id}`}
          ref={quizEngineRef}
          questions={dump.questions}
          sectionId={`dump:${dump.id}`}
          onComplete={onDumpQuizComplete}
          onWrongAnswer={(qId, userAnswer) => onWrongAnswer(`dump:${dump.id}`, qId, userAnswer)}
          bookmarkedIds={progress.bookmarkedQuestions}
          onToggleBookmark={onToggleBookmark}
          enableReviewMode={true}
          onModeActive={setQuizModeActive}
        />
      </motion.div>

      <ScrollJumpButtons />
    </div>
  )
}
