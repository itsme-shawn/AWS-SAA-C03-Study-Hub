import type { StudyProgress, QuizResult } from '../types'

const STORAGE_KEY = 'aws-saa-study-progress'

const defaultProgress: StudyProgress = {
  completedSections: [],
  quizResults: [],
  examResults: [],
  bookmarkedQuestions: [],
  wrongAnswers: [],
}

export function loadProgress(): StudyProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultProgress }
    return { ...defaultProgress, ...JSON.parse(raw) }
  } catch {
    return { ...defaultProgress }
  }
}

export function saveProgress(progress: StudyProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function markSectionComplete(sectionId: string): void {
  const p = loadProgress()
  if (!p.completedSections.includes(sectionId)) {
    p.completedSections.push(sectionId)
    saveProgress(p)
  }
}

export function saveQuizResult(result: QuizResult): void {
  const p = loadProgress()
  p.quizResults.push(result)
  saveProgress(p)
}

export function saveExamResult(result: QuizResult): void {
  const p = loadProgress()
  p.examResults.push(result)
  saveProgress(p)
}

export function toggleBookmark(questionId: string): void {
  const p = loadProgress()
  const idx = p.bookmarkedQuestions.indexOf(questionId)
  if (idx >= 0) {
    p.bookmarkedQuestions.splice(idx, 1)
  } else {
    p.bookmarkedQuestions.push(questionId)
  }
  saveProgress(p)
}

export function getBestScore(sectionId: string): number | null {
  const p = loadProgress()
  const results = p.quizResults.filter(r => r.sectionId === sectionId)
  if (results.length === 0) return null
  return Math.max(...results.map(r => Math.round((r.score / r.total) * 100)))
}

// --- Draft quiz session (in-progress state) ---

export interface QuizDraft {
  mode: string
  answers: Record<string, string>
  submitted: boolean
  currentIdx: number
  checkedQuestions: string[]
  flagged: string[]
}

export function loadDraftSession(sectionId: string): QuizDraft | null {
  try {
    const raw = localStorage.getItem(`aws-saa-draft-${sectionId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDraftSession(sectionId: string, draft: QuizDraft): void {
  localStorage.setItem(`aws-saa-draft-${sectionId}`, JSON.stringify(draft))
}

export function clearDraftSession(sectionId: string): void {
  localStorage.removeItem(`aws-saa-draft-${sectionId}`)
}

export function getThemePreference(): 'dark' | 'light' {
  try {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  } catch {
    return 'dark'
  }
}

export function setThemePreference(theme: 'dark' | 'light'): void {
  localStorage.setItem('theme', theme)
}
