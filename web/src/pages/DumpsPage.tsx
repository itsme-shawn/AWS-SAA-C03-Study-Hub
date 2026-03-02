import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Database, ArrowRight, FileText } from 'lucide-react'
import type { ContentData } from '../types'

interface Props {
  data: ContentData
}

export default function DumpsPage({ data }: Props) {
  const dumps = [...data.dumps].sort((a, b) => a.title.localeCompare(b.title))
  const totalQuestions = data.totalDumpQuestions

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-0">Dumps</h1>
        <p className="text-ink-400 dark:text-ink-300 mt-1">
          덤프 세트 {dumps.length}개 · 총 {totalQuestions}문제
        </p>
      </motion.div>

      {dumps.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="w-12 h-12 mx-auto text-ink-300 dark:text-ink-500 mb-4" />
          <p className="text-ink-400 dark:text-ink-400">practice/dumps 에 파싱 가능한 파일이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dumps.map((dump, i) => (
            <motion.div
              key={dump.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/dumps/${dump.id}`}
                className="block bg-white dark:bg-ink-800 rounded-xl p-5 border border-ink-200 dark:border-ink-600 hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-0 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {dump.title}
                    </h3>
                    <div className="text-xs text-ink-400 dark:text-ink-300 mt-1">
                      {dump.questions.length} questions
                    </div>
                    {dump.source && (
                      <div className="text-[11px] text-ink-300 dark:text-ink-400 mt-1 line-clamp-1">
                        {dump.source}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-amber-500 transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
