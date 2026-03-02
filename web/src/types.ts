export interface QuestionOption {
  label: string
  text: string
}

export interface NoteLink {
  label: string  // e.g. "NAT Gateway"
  url: string    // e.g. "/section/25-vpc#nat-gateway"
}

export interface Question {
  id: string
  number: number
  text: string
  options: QuestionOption[]
  answer: string // e.g. "A" or "A,C"
  explanation: string
  keyConcept: string
  noteLinks?: NoteLink[]
}

export interface Section {
  id: string
  number: number
  title: string
  noteContent: string
  questions: Question[]
}

export interface DumpSet {
  id: string
  title: string
  source?: string
  questions: Question[]
}

export interface ContentData {
  sections: Section[]
  dumps: DumpSet[]
  groups: Record<string, string[]>
  totalQuestions: number
  totalDumpQuestions: number
  generatedAt: string
}

export interface QuizResult {
  sectionId: string
  score: number
  total: number
  answers: Record<string, string>
  timestamp: string
}

export interface WrongAnswer {
  questionId: string   // question.id within the section
  sectionId: string
  userAnswer: string   // what the user picked
  timestamp: string
}

export interface StudyProgress {
  completedSections: string[]
  quizResults: QuizResult[]
  examResults: QuizResult[]
  bookmarkedQuestions: string[]
  wrongAnswers: WrongAnswer[]
}
