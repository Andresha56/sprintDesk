import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = { authenticated: boolean }

export function ProtectedRoute({ authenticated }: ProtectedRouteProps) {
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />
}
