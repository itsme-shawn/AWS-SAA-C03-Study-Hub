import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Trophy, Target, TrendingUp, ArrowRight, Clock, Zap, Trash2, History } from 'lucide-react'
import type { ContentData, StudyProgress } from '../types'

interface Props {
  data: ContentData
  progress: StudyProgress
  onResetAll: () => void
}

export default function Dashboard({ data, progress, onResetAll }: Props) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const totalSections = data.sections.length
  const completedSections = progress.completedSections.length
  const sectionPercent = Math.round((completedSections / totalSections) * 100)

  const quizzesTaken = progress.quizResults.length
  const avgScore = quizzesTaken > 0
    ? Math.round(progress.quizResults.reduce((s, r) => s + (r.score / r.total) * 100, 0) / quizzesTaken)
    : 0

  const examsTaken = progress.examResults.length
  const bestExam = examsTaken > 0
    ? Math.max(...progress.examResults.map(r => Math.round((r.score / r.total) * 100)))
    : null

  // Best scores per section
  const bestScores = new Map<string, number>()
  for (const r of progress.quizResults) {
    const pct = Math.round((r.score / r.total) * 100)
    const prev = bestScores.get(r.sectionId) ?? 0
    if (pct > prev) bestScores.set(r.sectionId, pct)
  }

  // Weak sections (below 72%)
  const weakSections = data.sections.filter(s => {
    const best = bestScores.get(s.id)
    return best != null && best < 72
  })

  // Untouched sections
  const untouchedSections = data.sections.filter(s =>
    !progress.completedSections.includes(s.id) && !bestScores.has(s.id)
  )

  const stats = [
    { label: '학습 진도', value: `${completedSections}/${totalSections}`, sub: `${sectionPercent}%`, icon: BookOpen, color: 'text-sky-400' },
    { label: '퀴즈 횟수', value: `${quizzesTaken}`, sub: `평균 ${avgScore}%`, icon: Target, color: 'text-amber-400' },
    { label: '모의고사', value: bestExam != null ? `${bestExam}%` : '--', sub: `${examsTaken}회 응시`, icon: Trophy, color: 'text-emerald-400' },
    { label: '전체 문제', value: `${data.totalQuestions}`, sub: '30개 섹션', icon: Zap, color: 'text-rose-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl text-ink-900 dark:text-ink-0"
        >
          Dashboard
        </motion.h1>
        <p className="text-ink-400 dark:text-ink-300 mt-1">AWS Solutions Architect Associate 시험 준비 현황</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-ink-800 rounded-xl p-5 border border-ink-200 dark:border-ink-600"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <div className="font-display font-bold text-2xl text-ink-900 dark:text-ink-0">{stat.value}</div>
            <div className="text-xs text-ink-400 dark:text-ink-300 mt-0.5">{stat.sub}</div>
            <div className="text-[10px] font-medium text-ink-400 dark:text-ink-400 mt-1 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div className="bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-ink-900 dark:text-ink-0">전체 학습 진도</h2>
          <span className="text-sm font-mono font-bold text-amber-500">{sectionPercent}%</span>
        </div>
        <div className="h-3 bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${sectionPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-ink-400 dark:text-ink-300 mt-2">
          {completedSections}개 섹션 학습 완료, {totalSections - completedSections}개 남음
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/exam"
          className="group bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white hover:shadow-xl hover:shadow-amber-500/20 transition-all"
        >
          <Trophy className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-display font-bold text-lg">모의고사 시작</h3>
          <p className="text-sm opacity-80 mt-1">65문제 / 130분 — 실전과 동일한 조건</p>
          <ArrowRight className="w-5 h-5 mt-3 opacity-60 group-hover:translate-x-1 transition-transform" />
        </Link>
        {untouchedSections.length > 0 && (
          <Link
            to={`/section/${untouchedSections[0].id}`}
            className="group bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600 hover:border-sky-400 dark:hover:border-sky-400 transition-all"
          >
            <BookOpen className="w-8 h-8 mb-3 text-sky-400" />
            <h3 className="font-display font-bold text-lg text-ink-900 dark:text-ink-0">다음 학습</h3>
            <p className="text-sm text-ink-400 dark:text-ink-300 mt-1">
              Section {untouchedSections[0].number}: {untouchedSections[0].title}
            </p>
            <ArrowRight className="w-5 h-5 mt-3 text-ink-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Weak sections */}
      {weakSections.length > 0 && (
        <div className="bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-ink-900 dark:text-ink-0">
            <TrendingUp className="w-5 h-5 text-rose-400" /> 보강이 필요한 섹션
          </h2>
          <div className="space-y-3">
            {weakSections.slice(0, 5).map(s => {
              const best = bestScores.get(s.id) ?? 0
              return (
                <Link key={s.id} to={`/section/${s.id}?tab=quiz`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 font-mono text-xs font-bold">
                    {best}%
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium group-hover:text-amber-500 transition-colors">{s.title}</div>
                    <div className="h-1.5 mt-1 bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden w-32">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${best}%` }} />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-amber-500 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Quiz History */}
      {progress.quizResults.length > 0 && (
        <div className="bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-ink-900 dark:text-ink-0">
            <History className="w-5 h-5 text-amber-400" /> 연습문제 풀이 기록
          </h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {progress.quizResults.slice().reverse().map((r, i) => {
              const pct = Math.round((r.score / r.total) * 100)
              const passed = pct >= 72
              const section = data.sections.find(s => s.id === r.sectionId)
              return (
                <Link
                  key={`${r.timestamp}-${i}`}
                  to={`/section/${r.sectionId}?tab=quiz`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors group"
                >
                  <span className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center font-bold shrink-0 ${
                    passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    <span className="text-sm">{pct}%</span>
                    <span className="text-[8px] font-medium">{passed ? 'PASS' : 'FAIL'}</span>
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate group-hover:text-amber-500 transition-colors">
                      {section ? section.title : r.sectionId}
                    </div>
                    <div className="text-xs text-ink-400 dark:text-ink-300">
                      {r.score}/{r.total} correct
                    </div>
                  </div>
                  <div className="text-[10px] text-ink-400 dark:text-ink-400 shrink-0">
                    {new Date(r.timestamp).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Section grid */}
      <div>
        <h2 className="font-display font-bold text-lg mb-4 text-ink-900 dark:text-ink-0">전체 섹션</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.sections.map((s, i) => {
            const isComplete = progress.completedSections.includes(s.id)
            const best = bestScores.get(s.id)
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Link
                  to={`/section/${s.id}`}
                  className="block bg-white dark:bg-ink-800 rounded-lg p-4 border border-ink-200 dark:border-ink-600 hover:border-amber-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isComplete
                        ? 'bg-emerald-500/15 text-emerald-500'
                        : 'bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-300'
                    }`}>
                      {String(s.number).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-amber-500 transition-colors">{s.title}</div>
                      <div className="text-[10px] text-ink-400 dark:text-ink-400">{s.questions.length} questions</div>
                    </div>
                    {best != null && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        best >= 80 ? 'bg-emerald-500/15 text-emerald-500'
                        : best >= 60 ? 'bg-amber-500/15 text-amber-500'
                        : 'bg-rose-500/15 text-rose-500'
                      }`}>{best}%</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="bg-white dark:bg-ink-800 rounded-xl p-6 border border-ink-200 dark:border-ink-600">
        <h2 className="font-display font-bold text-lg mb-2 text-ink-900 dark:text-ink-0">데이터 관리</h2>
        <p className="text-xs text-ink-400 dark:text-ink-300 mb-4">학습 진도, 퀴즈 점수, 모의고사 기록, 북마크를 모두 초기화합니다.</p>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-500 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> 전체 초기화
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-rose-500">정말 초기화하시겠습니까?</span>
            <button
              onClick={() => { onResetAll(); setShowResetConfirm(false) }}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
            >
              초기화
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
