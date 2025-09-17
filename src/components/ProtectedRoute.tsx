import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { getToken } from "../lib/utils"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = getToken()
  if (!token) return <Navigate to="/auth/sign-in" replace />
  return <>{children}</>
}


