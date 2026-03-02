export interface TocItem {
  level: number
  text: string
  id: string
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')    // strip markdown syntax chars
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim()
}

// Extract the markdown content of a single heading section (heading + body until next same-or-higher heading)
export function extractSection(content: string, headingId: string): string {
  const lines = content.split('\n')
  let inSection = false
  let sectionLevel = 0
  const result: string[] = []

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const id = generateHeadingId(match[2])
      if (!inSection && id === headingId) {
        inSection = true
        sectionLevel = level
        result.push(line)
      } else if (inSection) {
        if (level <= sectionLevel) break
        result.push(line)
      }
    } else if (inSection) {
      result.push(line)
    }
  }

  return result.join('\n').trim()
}

export function parseHeadings(content: string): TocItem[] {
  const lines = content.split('\n')
  const items: TocItem[] = []
  const idCounts: Record<string, number> = {}

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/[`*_~[\]()]/g, '').trim()
      const baseId = generateHeadingId(match[2])
      const count = idCounts[baseId] ?? 0
      const id = count === 0 ? baseId : `${baseId}-${count}`
      idCounts[baseId] = count + 1
      items.push({ level, text, id })
    }
  }

  return items
}
