import { useState, useEffect } from 'react'
import { getThemePreference, setThemePreference } from '../utils/storage'

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getThemePreference)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    setThemePreference(theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return { theme, toggle }
}
