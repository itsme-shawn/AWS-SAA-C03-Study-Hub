import { useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import SectionView from './pages/SectionView'
import ExamMode from './pages/ExamMode'
import SearchPage from './pages/SearchPage'
import BookmarksPage from './pages/BookmarksPage'
import WrongAnswersPage from './pages/WrongAnswersPage'
import DumpsPage from './pages/DumpsPage'
import DumpViewPage from './pages/DumpViewPage'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'
import contentData from './data/content.json'
import type { ContentData, QuizResult } from './types'
import { isCorrectAnswer } from './utils/answers'

const data = contentData as ContentData

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const {
    progress, markComplete, setComplete,
    addQuizResult, addExamResult,
    toggleBookmark, resetSection, resetAll,
    addWrongAnswers, removeWrongAnswer, clearWrongAnswers,
  } = useProgress()

  // Instant Check: record a wrong answer immediately when a question is checked
  const handleWrongAnswer = useCallback((sectionId: string, questionId: string, userAnswer: string) => {
    addWrongAnswers([{ questionId, sectionId, userAnswer, timestamp: new Date().toISOString() }])
  }, [addWrongAnswers])

  // After a section quiz completes, save result, auto-mark complete, and collect wrong answers
  const handleQuizComplete = useCallback((result: QuizResult) => {
    addQuizResult(result)
    setComplete(result.sectionId)
    const section = data.sections.find(s => s.id === result.sectionId)
    if (!section) return
    const now = result.timestamp
    const wrongs = section.questions
      .filter(q => result.answers[q.id] && !isCorrectAnswer(result.answers[q.id], q.answer))
      .map(q => ({
        questionId: q.id,
        sectionId: result.sectionId,
        userAnswer: result.answers[q.id],
        timestamp: now,
      }))
    if (wrongs.length > 0) addWrongAnswers(wrongs)
  }, [addQuizResult, addWrongAnswers])

  // Dump quiz complete: collect wrong answers (no section-complete tracking)
  const handleDumpQuizComplete = useCallback((result: QuizResult) => {
    if (!result.sectionId.startsWith('dump:')) return
    const dumpId = result.sectionId.slice('dump:'.length)
    const dump = data.dumps.find(d => d.id === dumpId)
    if (!dump) return
    const now = result.timestamp
    const wrongs = dump.questions
      .filter(q => result.answers[q.id] && !isCorrectAnswer(result.answers[q.id], q.answer))
      .map(q => ({
        questionId: q.id,
        sectionId: result.sectionId,
        userAnswer: result.answers[q.id],
        timestamp: now,
      }))
    if (wrongs.length > 0) addWrongAnswers(wrongs)
  }, [addWrongAnswers])

  return (
    <Layout data={data} theme={theme} onToggleTheme={toggleTheme} progress={progress}>
      <Routes>
        <Route path="/" element={<Dashboard data={data} progress={progress} onResetAll={resetAll} />} />
        <Route
          path="/section/:sectionId"
          element={
            <SectionView
              data={data}
              progress={progress}
              onMarkComplete={markComplete}
              onQuizComplete={handleQuizComplete}
              onWrongAnswer={handleWrongAnswer}
              onToggleBookmark={toggleBookmark}
              onResetSection={resetSection}
            />
          }
        />
        <Route
          path="/exam"
          element={
            <ExamMode
              data={data}
              progress={progress}
              onExamComplete={addExamResult}
              onToggleBookmark={toggleBookmark}
            />
          }
        />
        <Route path="/dumps" element={<DumpsPage data={data} />} />
        <Route
          path="/dumps/:dumpId"
          element={
            <DumpViewPage
              data={data}
              progress={progress}
              onDumpQuizComplete={handleDumpQuizComplete}
              onWrongAnswer={handleWrongAnswer}
              onToggleBookmark={toggleBookmark}
            />
          }
        />
        <Route path="/search" element={<SearchPage data={data} />} />
        <Route path="/bookmarks" element={<BookmarksPage data={data} progress={progress} />} />
        <Route
          path="/wrong-answers"
          element={
            <WrongAnswersPage
              data={data}
              progress={progress}
              onRemove={removeWrongAnswer}
              onClearSection={clearWrongAnswers}
            />
          }
        />
      </Routes>
    </Layout>
  )
}
