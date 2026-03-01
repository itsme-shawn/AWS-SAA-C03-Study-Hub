import { useState, useCallback } from 'react'
import { loadProgress, saveProgress } from '../utils/storage'
import type { StudyProgress, QuizResult, WrongAnswer } from '../types'

export function useProgress() {
  const [progress, setProgress] = useState<StudyProgress>(loadProgress)

  const refresh = useCallback(() => {
    setProgress(loadProgress())
  }, [])

  const markComplete = useCallback((sectionId: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        completedSections: prev.completedSections.includes(sectionId)
          ? prev.completedSections.filter(id => id !== sectionId)
          : [...prev.completedSections, sectionId],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const setComplete = useCallback((sectionId: string) => {
    setProgress(prev => {
      if (prev.completedSections.includes(sectionId)) return prev
      const next = { ...prev, completedSections: [...prev.completedSections, sectionId] }
      saveProgress(next)
      return next
    })
  }, [])

  const addQuizResult = useCallback((result: QuizResult) => {
    setProgress(prev => {
      const next = { ...prev, quizResults: [...prev.quizResults, result] }
      saveProgress(next)
      return next
    })
  }, [])

  const addExamResult = useCallback((result: QuizResult) => {
    setProgress(prev => {
      const next = { ...prev, examResults: [...prev.examResults, result] }
      saveProgress(next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((qId: string) => {
    setProgress(prev => {
      const idx = prev.bookmarkedQuestions.indexOf(qId)
      const next = {
        ...prev,
        bookmarkedQuestions: idx >= 0
          ? prev.bookmarkedQuestions.filter(id => id !== qId)
          : [...prev.bookmarkedQuestions, qId],
      }
      saveProgress(next)
      return next
    })
  }, [])

  // Upsert wrong answers: deduplicates by sectionId+questionId, keeps latest
  const addWrongAnswers = useCallback((items: WrongAnswer[]) => {
    setProgress(prev => {
      const map = new Map(prev.wrongAnswers.map(w => [`${w.sectionId}::${w.questionId}`, w]))
      for (const item of items) {
        map.set(`${item.sectionId}::${item.questionId}`, item)
      }
      const next = { ...prev, wrongAnswers: [...map.values()] }
      saveProgress(next)
      return next
    })
  }, [])

  const removeWrongAnswer = useCallback((sectionId: string, questionId: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        wrongAnswers: prev.wrongAnswers.filter(
          w => !(w.sectionId === sectionId && w.questionId === questionId)
        ),
      }
      saveProgress(next)
      return next
    })
  }, [])

  const clearWrongAnswers = useCallback((sectionId?: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        wrongAnswers: sectionId
          ? prev.wrongAnswers.filter(w => w.sectionId !== sectionId)
          : [],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const resetSection = useCallback((sectionId: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        quizResults: prev.quizResults.filter(r => r.sectionId !== sectionId),
        wrongAnswers: prev.wrongAnswers.filter(w => w.sectionId !== sectionId),
      }
      saveProgress(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    const empty: StudyProgress = {
      completedSections: [],
      quizResults: [],
      examResults: [],
      bookmarkedQuestions: [],
      wrongAnswers: [],
    }
    saveProgress(empty)
    setProgress(empty)
  }, [])

  return {
    progress, refresh, markComplete, setComplete,
    addQuizResult, addExamResult,
    toggleBookmark, resetSection, resetAll,
    addWrongAnswers, removeWrongAnswer, clearWrongAnswers,
  }
}
