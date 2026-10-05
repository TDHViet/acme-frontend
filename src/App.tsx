import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { GuestRoute, ProtectedRoute } from "@/components/layout/route-guards"
import { Skeleton } from "@/components/ui/skeleton"

// Route-level code splitting keeps recharts/sidebar code out of the auth bundle.
const SignInPage = lazy(() => import("@/pages/sign-in"))
const SignUpPage = lazy(() => import("@/pages/sign-up"))
const DashboardLayout = lazy(() => import("@/components/layout/dashboard-layout"))
const DashboardPage = lazy(() => import("@/pages/dashboard"))

function PageFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Skeleton className="h-64 w-full max-w-sm" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/auth/sign-in" element={<SignInPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
