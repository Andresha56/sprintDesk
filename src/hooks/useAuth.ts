import { useState } from 'react'

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('sprintdesk-auth') === 'true')
  const login = () => { localStorage.setItem('sprintdesk-auth', 'true'); setAuthenticated(true) }
  const logout = () => { localStorage.removeItem('sprintdesk-auth'); setAuthenticated(false) }
  return { authenticated, login, logout }
}
