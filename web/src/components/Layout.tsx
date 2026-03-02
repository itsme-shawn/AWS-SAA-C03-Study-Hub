import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Trophy, Search, Sun, Moon,
  ChevronDown, ChevronRight, ChevronLeft, Menu, Flame, Bookmark, XCircle, Github, Database,
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
  'EC2': '🖥️',
  'Scalability & Database': '⚖️',
  'DNS & Architecture': '🌐',
  'Storage': '📦',
  'Integration & Serverless': '🔗',
  'Databases & Analytics': '🗄️',
  'Security & Monitoring': '🔒',
  'VPC & Migration': '🚀',
  'Exam Prep': '🎯',
}

export default function Layout({ children, data, theme, onToggleTheme, progress }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(Object.keys(data.groups)))
  const location = useLocation()
  const expandButtonTopClass = location.pathname === '/exam' ? 'top-20' : 'top-4'

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
      <div className="p-4 lg:p-5 border-b border-ink-200 dark:border-ink-600">
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Mobile close button (hamburger position) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 -ml-1 mr-1 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-500 dark:text-ink-300 shrink-0"
            aria-label="사이드바 닫기"
          >
            <Menu className="w-5 h-5" />
          </button>
          <NavLink to="/" className="flex items-center gap-3 min-w-0" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
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
          {/* Desktop collapse button */}
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg border border-ink-200 dark:border-ink-700 hover:border-amber-400 dark:hover:border-amber-500/60 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-ink-400 hover:text-amber-500 transition-all shrink-0 ml-auto"
            title="사이드바 접기"
            aria-label="사이드바 접기"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Nav links */}
      <nav className="p-3 space-y-1">
        {[
          { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/exam', icon: Trophy, label: 'Mock Exam' },
          { to: '/dumps', icon: Database, label: 'Dumps' },
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
        <NavLink to="/" className="ml-3 font-display font-bold text-sm flex-1">AWS SAA-C03</NavLink>
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
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-[60] w-[85vw] max-w-72 sm:w-72 bg-white dark:bg-ink-800 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-ink-800 border-r border-ink-200 dark:border-ink-600 z-30"
        style={{
          transform: sidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {sidebarContent}

        {/* Right-edge collapse affordance — hover to reveal, click to collapse */}
        <div
          onClick={() => setSidebarCollapsed(true)}
          title="사이드바 접기"
          className="group absolute right-0 inset-y-0 w-1.5 cursor-pointer"
        >
          <div className="w-full h-full group-hover:bg-amber-400/35 dark:group-hover:bg-amber-500/25 transition-colors duration-150 rounded-r-sm" />
        </div>
      </aside>

      {/* Desktop top-left expand button when sidebar is collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          aria-label="사이드바 펼치기"
          title="사이드바 펼치기"
          className={`hidden lg:flex fixed left-4 ${expandButtonTopClass} z-40 w-8 h-8 items-center justify-center rounded-lg bg-white/95 dark:bg-ink-800/95 border border-ink-200 dark:border-ink-600 shadow-lg shadow-ink-900/8 backdrop-blur text-ink-400 hover:text-amber-500 hover:border-amber-400 dark:hover:border-amber-500/60 transition-all`}
        >
          <span className="text-sm font-bold leading-none">{'>'}</span>
        </button>
      )}

      {/* Main content */}
      <main
        className={`min-h-screen pt-14 lg:pt-0 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-72'}`}
        style={{ transition: 'margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* max-width expands slightly when sidebar is hidden */}
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${sidebarCollapsed ? 'max-w-6xl' : 'max-w-5xl'}`}
          style={{ transition: 'max-width 0.28s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
