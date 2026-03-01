import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface Props {
  content: string
}

const components: Components = {
  pre({ children }) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-ink-200 dark:border-ink-600 p-4 text-sm leading-relaxed bg-ink-50 dark:bg-ink-950 text-ink-800 dark:text-ink-100">
        {children}
      </pre>
    )
  },
  code({ className, children, ...props }) {
    const isBlock = className?.includes('language-')
    if (isBlock || (typeof children === 'string' && children.includes('\n'))) {
      return (
        <code className="font-mono text-[0.8rem] text-ink-800 dark:text-ink-100" {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[0.85em] font-mono font-medium" {...props}>
        {children}
      </code>
    )
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto rounded-lg border border-ink-200 dark:border-ink-600 my-4">
        <table className="min-w-full text-sm">{children}</table>
      </div>
    )
  },
  thead({ children }) {
    return <thead className="bg-ink-100 dark:bg-ink-700">{children}</thead>
  },
  th({ children }) {
    return <th className="px-4 py-2.5 text-left font-semibold text-ink-700 dark:text-ink-100 text-xs uppercase tracking-wider">{children}</th>
  },
  td({ children }) {
    return <td className="px-4 py-2.5 border-t border-ink-100 dark:border-ink-600">{children}</td>
  },
  h1({ children }) {
    return <h1 className="font-display font-bold text-3xl mt-8 mb-4 text-ink-900 dark:text-ink-0">{children}</h1>
  },
  h2({ children }) {
    return <h2 className="font-display font-bold text-xl mt-8 mb-3 text-ink-900 dark:text-ink-0 pb-2 border-b border-ink-200 dark:border-ink-600">{children}</h2>
  },
  h3({ children }) {
    return <h3 className="font-display font-semibold text-lg mt-6 mb-2 text-ink-800 dark:text-ink-50">{children}</h3>
  },
  strong({ children }) {
    return <strong className="font-bold text-ink-900 dark:text-ink-0">{children}</strong>
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-amber-500 pl-4 py-1 my-4 bg-amber-50 dark:bg-amber-500/5 rounded-r-lg text-ink-600 dark:text-ink-200">
        {children}
      </blockquote>
    )
  },
  hr() {
    return <hr className="my-8 border-ink-200 dark:border-ink-600" />
  },
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
