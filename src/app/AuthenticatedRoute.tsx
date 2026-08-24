import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function AuthenticatedRoute({ authenticated }: { authenticated: boolean }) {
  const location = useLocation()
  return authenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
