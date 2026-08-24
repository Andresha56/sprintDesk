import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthenticatedRoute } from './AuthenticatedRoute'
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout'
import { LoginPage } from '../features/auth/LoginPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { BoardPage } from '../features/board/BoardPage'
import { AnalyticsPage } from '../features/analytics/AnalyticsPage'

export function AppRouter() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('sprintdesk-auth') === 'true')
  const [dark, setDark] = useState(() => localStorage.getItem('sprintdesk-theme') === 'dark')
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const login = () => { localStorage.setItem('sprintdesk-auth', 'true'); setAuthenticated(true) }
  const logout = () => { localStorage.removeItem('sprintdesk-auth'); setAuthenticated(false) }

  return <BrowserRouter><Routes>
    <Route path="/login" element={<LoginPage onLogin={login} />} />
    <Route element={<AuthenticatedRoute authenticated={authenticated} />}>
      <Route element={<AuthenticatedLayout onLogout={logout} dark={dark} setDark={(value) => { setDark(value); localStorage.setItem('sprintdesk-theme', value ? 'dark' : 'light') }} />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></BrowserRouter>
}
