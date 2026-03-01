import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, ArrowRight } from 'lucide-react'
import type { ContentData } from '../types'

interface Props {
  data: ContentData
}

interface SearchResult {
  sectionId: string
  sectionTitle: string
  sectionNumber: number
  snippet: string
  type: 'note' | 'question'
}

export default function SearchPage({ data }: Props) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (query.length < 2) return []

    const q = query.toLowerCase()
    const matches: SearchResult[] = []

    for (const section of data.sections) {
      // Search notes
      const lines = section.noteContent.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(q)) {
          const start = Math.max(0, i - 1)
          const end = Math.min(lines.length, i + 2)
          const snippet = lines.slice(start, end).join('\n').substring(0, 200)
          matches.push({
            sectionId: section.id,
            sectionTitle: section.title,
            sectionNumber: section.number,
            snippet,
            type: 'note',
          })
          break // one match per section for notes
        }
      }

      // Search questions
      for (const q2 of section.questions) {
        const fullText = `${q2.text} ${q2.options.map(o => o.text).join(' ')} ${q2.explanation} ${q2.keyConcept}`
        if (fullText.toLowerCase().includes(q)) {
          matches.push({
            sectionId: section.id,
            sectionTitle: section.title,
            sectionNumber: section.number,
            snippet: q2.text.substring(0, 150),
            type: 'question',
          })
        }
      }
    }

    return matches.slice(0, 30)
  }, [query, data])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-0">Search</h1>
        <p className="text-ink-400 dark:text-ink-300 mt-1">전체 노트와 문제에서 검색</p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="키워드를 입력하세요... (예: VPC, Lambda, S3 Lifecycle)"
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-base transition-all"
          autoFocus
        />
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-ink-400">2글자 이상 입력해주세요</p>
      )}

      {query.length >= 2 && (
        <div className="text-sm text-ink-400">
          {results.length}개 결과
        </div>
      )}

      <div className="space-y-3">
        {results.map((r, i) => (
          <motion.div
            key={`${r.sectionId}-${r.type}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Link
              to={`/section/${r.sectionId}${r.type === 'question' ? '?tab=quiz' : ''}`}
              className="block bg-white dark:bg-ink-800 rounded-lg p-4 border border-ink-200 dark:border-ink-600 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  r.type === 'note'
                    ? 'bg-sky-500/10 text-sky-500'
                    : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {r.type === 'note' ? <BookOpen className="w-3 h-3 inline" /> : 'Q'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-ink-400 mb-1">
                    Section {r.sectionNumber}: {r.sectionTitle}
                  </div>
                  <p className="text-sm text-ink-700 dark:text-ink-200 line-clamp-2">
                    {highlightMatch(r.snippet, query)}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-300 shrink-0 mt-1 group-hover:text-amber-500 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-amber-200 dark:bg-amber-500/30 text-inherit rounded px-0.5">{part}</mark>
      : part
  )
}
