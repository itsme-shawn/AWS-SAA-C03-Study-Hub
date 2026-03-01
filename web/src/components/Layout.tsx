import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Trophy, Search, Sun, Moon,
  ChevronDown, ChevronRight, Menu, X, Flame, Bookmark, XCircle, Github,
} from 'lucide-react'
import type { ContentData } from '../types'
import type { StudyProgress } from '../types'

interface LayoutProps {
  children: React.ReactNode
  data: ContentData
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  progress: StudyProgress
}

const GROUP_ICONS: Record<string, string> = {
  'Foundations': '🏗️',
  'Compute': '🖥️',
  'Load Balancing & Scaling': '⚖️',
  'Databases': '🗄️',
  'DNS & Networking': '🌐',
  'Architecture': '🏛️',
  'Storage': '📦',
  'Content Delivery': '🚀',
  'Integration': '🔗',
  'Containers & Serverless': '🐳',
  'Analytics & ML': '📊',
  'Monitoring & Security': '🔒',
  'Migration & DR': '🔄',
  'Exam Prep': '🎯',
}

export default function Layout({ children, data, theme, onToggleTheme, progress }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(Object.keys(data.groups)))
  const location = useLocation()

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(group) ? next.delete(group) : next.add(group)
      return next
    })
  }

  const completedSet = new Set(progress.completedSections)
  const bestScores = new Map<string, number>()
  for (const r of progress.quizResults) {
    const pct = Math.round((r.score / r.total) * 100)
    const prev = bestScores.get(r.sectionId) ?? 0
    if (pct > prev) bestScores.set(r.sectionId, pct)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-ink-200 dark:border-ink-600">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base text-ink-900 dark:text-ink-0 tracking-tight leading-tight">
              AWS SAA-C03
            </h1>
            <p className="text-[10px] font-medium text-ink-400 dark:text-ink-300 tracking-widest uppercase">
              Study Hub
            </p>
          </div>
        </NavLink>
      </div>

      {/* Nav links */}
      <nav className="p-3 space-y-1">
        {[
          { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/exam', icon: Trophy, label: 'Mock Exam' },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 hover:text-ink-800 dark:hover:text-ink-100'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
        {/* Bookmarks — shows count badge */}
        <NavLink
          to="/bookmarks"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 hover:text-ink-800 dark:hover:text-ink-100'
            }`
          }
        >
          <Bookmark className="w-4 h-4" />
          <span className="flex-1">Bookmarks</span>
          {progress.bookmarkedQuestions.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 min-w-[20px] text-center">
              {progress.bookmarkedQuestions.length}
            </span>
          )}
        </NavLink>
        {[
          { to: '/search', icon: Search, label: 'Search' },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 hover:text-ink-800 dark:hover:text-ink-100'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
        {/* Wrong answers — shows count badge */}
        <NavLink
          to="/wrong-answers"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 hover:text-ink-800 dark:hover:text-ink-100'
            }`
          }
        >
          <XCircle className="w-4 h-4" />
          <span className="flex-1">틀린 문제</span>
          {progress.wrongAnswers.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 min-w-[20px] text-center">
              {progress.wrongAnswers.length}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Section groups */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="text-[10px] font-bold text-ink-400 dark:text-ink-400 tracking-widest uppercase px-3 pt-4 pb-2">
          Sections
        </div>
        {Object.entries(data.groups).map(([group, sectionIds]) => (
          <div key={group} className="mb-1">
            <button
              onClick={() => toggleGroup(group)}
              className="flex items-center w-full gap-2 px-3 py-2 text-xs font-semibold text-ink-500 dark:text-ink-300 hover:text-ink-800 dark:hover:text-ink-100 rounded-md transition-colors"
            >
              <span>{GROUP_ICONS[group] || '📄'}</span>
              <span className="flex-1 text-left truncate">{group}</span>
              {expandedGroups.has(group) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            <AnimatePresence>
              {expandedGroups.has(group) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {sectionIds.map(id => {
                    const section = data.sections.find(s => s.id === id)
                    if (!section) return null
                    const isActive = location.pathname.includes(id)
                    const isCompleted = completedSet.has(id)
                    const best = bestScores.get(id)
                    return (
                      <NavLink
                        key={id}
                        to={`/section/${id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 pl-8 pr-3 py-1.5 text-xs rounded-md transition-all ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                            : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : 'bg-ink-200/50 dark:bg-ink-600 text-ink-400 dark:text-ink-300'
                        }`}>
                          {String(section.number).padStart(2, '0')}
                        </span>
                        <span className="truncate flex-1">{section.title}</span>
                      </NavLink>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-ink-200 dark:border-ink-600 space-y-1">
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <a
          href="https://github.com/itsme-shawn/AWS-SAA-C03-Study-Hub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 rounded-lg transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-ink-25 dark:bg-ink-900 text-ink-800 dark:text-ink-100 transition-colors duration-300">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white/80 dark:bg-ink-800/80 backdrop-blur-xl border-b border-ink-200 dark:border-ink-600 flex items-center px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700">
          <Menu className="w-5 h-5" />
        </button>
        <span className="ml-3 font-display font-bold text-sm flex-1">AWS SAA-C03</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-500 dark:text-ink-300 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="https://github.com/itsme-shawn/AWS-SAA-C03-Study-Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-500 dark:text-ink-300 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-ink-800 shadow-2xl"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-ink-800 border-r border-ink-200 dark:border-ink-600 z-30">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 min-h-screen pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
