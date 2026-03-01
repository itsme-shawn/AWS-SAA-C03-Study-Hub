import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, HelpCircle, CheckCircle, ChevronLeft, ChevronRight, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import QuizEngine from '../components/QuizEngine'
import type { ContentData, StudyProgress, QuizResult } from '../types'
import { clearDraftSession } from '../utils/storage'

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
  const [tab, setTab] = useState<'notes' | 'quiz'>(
    searchParams.get('tab') === 'quiz' ? 'quiz' : 'notes'
  )

  const section = data.sections.find(s => s.id === sectionId)
  const sectionIdx = data.sections.findIndex(s => s.id === sectionId)
  const prevSection = sectionIdx > 0 ? data.sections[sectionIdx - 1] : null
  const nextSection = sectionIdx < data.sections.length - 1 ? data.sections[sectionIdx + 1] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [sectionId, tab])

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-400 mb-2">
          <Link to="/" className="hover:text-amber-500 transition-colors">Dashboard</Link>
          <span>/</span>
          <span>Section {section.number}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 dark:text-ink-0">
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
      <div className="flex items-center gap-3">
      <div className="flex gap-1 bg-ink-100 dark:bg-ink-700 p-1 rounded-lg w-fit">
        <button
          onClick={() => handleTabChange('notes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
            tab === 'notes'
              ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-0 shadow-sm'
              : 'text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-ink-100'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 개념 노트
        </button>
        <button
          onClick={() => handleTabChange('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
            tab === 'quiz'
              ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-0 shadow-sm'
              : 'text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-ink-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> 연습문제
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
            tab === 'quiz'
              ? 'bg-amber-500/15 text-amber-500'
              : 'bg-amber-500 text-white'
          }`}>
            {section.questions.length}
          </span>
        </button>
      </div>
      {/* Reset button — only in quiz tab */}
      {tab === 'quiz' && (
        <div className="flex items-center gap-2">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> 초기화
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-500 font-medium">초기화할까요?</span>
              <button
                onClick={() => { clearDraftSession(section.id); setShowResetConfirm(false); setQuizKey(k => k + 1) }}
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
          <div className="space-y-6">
            <div className="bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-600 p-6 sm:p-8">
              <MarkdownRenderer content={section.noteContent} />
            </div>

            {/* Quiz CTA */}
            {section.questions.length > 0 && (
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
            )}
          </div>
        ) : (
          <QuizEngine
            key={quizKey}
            questions={section.questions}
            sectionId={section.id}
            onComplete={onQuizComplete}
            onWrongAnswer={(qId, userAnswer) => onWrongAnswer(section.id, qId, userAnswer)}
            bookmarkedIds={progress.bookmarkedQuestions}
            onToggleBookmark={onToggleBookmark}
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
    </div>
  )
}
