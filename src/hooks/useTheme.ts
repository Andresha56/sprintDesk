import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('sprintdesk-theme') === 'dark')
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const toggleTheme = () => { const next = !dark; setDark(next); localStorage.setItem('sprintdesk-theme', next ? 'dark' : 'light') }
  return { dark, toggleTheme }
}
