import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookmarkCheck, Inbox } from 'lucide-react'
import type { ContentData, StudyProgress } from '../types'

interface Props {
  data: ContentData
  progress: StudyProgress
}

export default function BookmarksPage({ data, progress }: Props) {
  const bookmarked = useMemo(() => {
    const items: { qId: string; title: string; link: string; questionText: string; questionNumber: number }[] = []

    for (const bId of progress.bookmarkedQuestions) {
      // bId format: "<scope>-qN", where scope is sectionId or "dump:<dumpId>"
      const lastDash = bId.lastIndexOf('-q')
      if (lastDash < 0) continue
      const scopeId = bId.substring(0, lastDash)
      const qIdPart = bId.substring(lastDash + 1) // "qN"

      if (scopeId.startsWith('dump:')) {
        const dumpId = scopeId.slice('dump:'.length)
        const dump = data.dumps.find(d => d.id === dumpId)
        if (!dump) continue
        const question = dump.questions.find(q => q.id === qIdPart)
        if (!question) continue
        items.push({
          qId: bId,
          title: `Dump · ${dump.title}`,
          link: `/dumps/${dump.id}`,
          questionText: question.text,
          questionNumber: question.number,
        })
        continue
      }

      const section = data.sections.find(s => s.id === scopeId)
      if (!section) continue
      const question = section.questions.find(q => q.id === qIdPart)
      if (!question) continue
      items.push({
        qId: bId,
        title: section.title,
        link: `/section/${section.id}?tab=quiz`,
        questionText: question.text,
        questionNumber: question.number,
      })
    }

    return items
  }, [data.sections, data.dumps, progress.bookmarkedQuestions])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-0">Bookmarks</h1>
        <p className="text-ink-400 dark:text-ink-300 mt-1">저장한 문제 {bookmarked.length}개</p>
      </motion.div>

      {bookmarked.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="w-12 h-12 mx-auto text-ink-300 dark:text-ink-500 mb-4" />
          <p className="text-ink-400 dark:text-ink-400">북마크한 문제가 없습니다</p>
          <p className="text-xs text-ink-300 mt-1">퀴즈에서 북마크 아이콘을 클릭해 저장하세요</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarked.map((item, i) => (
            <motion.div
              key={item.qId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={item.link}
                className="block bg-white dark:bg-ink-800 rounded-lg p-4 border border-ink-200 dark:border-ink-600 hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <BookmarkCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-ink-400 mb-1">{item.title} — Q{item.questionNumber}</div>
                    <p className="text-sm text-ink-700 dark:text-ink-200 line-clamp-2">{item.questionText}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
