import { Navigate, Outlet, useLocation } from "react-router-dom"
import { isTokenExpired } from "@/lib/token"
import { useAppSelector } from "@/store"

function useIsAuthenticated() {
  const token = useAppSelector((s) => s.auth.token)
  return !!token && !isTokenExpired(token)
}

export function ProtectedRoute() {
  const location = useLocation()
  if (!useIsAuthenticated()) return <Navigate to="/auth/sign-in" replace state={{ from: location }} />
  return <Outlet />
}

export function GuestRoute() {
  if (useIsAuthenticated()) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
