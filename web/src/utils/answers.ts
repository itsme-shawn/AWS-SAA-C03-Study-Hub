import type { QuestionOption } from '../types'

export function parseAnswerLabels(value?: string): string[] {
  const raw = (value ?? '').toUpperCase().trim()
  if (!raw) return []

  const labels: string[] = []
  const tokenRegex = /(?:^|[^A-Z])([A-Z])(?=[^A-Z]|$)/g
  let match: RegExpExecArray | null
  while ((match = tokenRegex.exec(raw)) !== null) {
    labels.push(match[1])
  }

  // Fallback for compact forms like "AC"
  if (labels.length === 0 && /^[A-Z]+$/.test(raw)) {
    labels.push(...raw.split(''))
  }

  return [...new Set(labels)]
}

export function normalizeAnswer(value?: string): string {
  return parseAnswerLabels(value).sort().join(',')
}

export function formatAnswerLabels(value?: string): string {
  return parseAnswerLabels(value).join(', ')
}

export function isCorrectAnswer(userAnswer: string | undefined, correctAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)
}

export function isMultiAnswer(correctAnswer: string): boolean {
  return parseAnswerLabels(correctAnswer).length > 1
}

export function toggleSelectedLabel(current: string | undefined, label: string, multiple: boolean): string | undefined {
  if (!multiple) {
    return normalizeAnswer(current) === label ? undefined : label
  }

  const set = new Set(parseAnswerLabels(current))
  if (set.has(label)) set.delete(label)
  else set.add(label)
  if (set.size === 0) return undefined
  return [...set].sort().join(',')
}

export function labelsToText(labelsValue: string | undefined, options: QuestionOption[]): string {
  const labels = parseAnswerLabels(labelsValue)
  if (labels.length === 0) return '—'
  return labels
    .map(label => options.find(o => o.label === label)?.text ?? '')
    .filter(Boolean)
    .join(' / ') || '—'
}
