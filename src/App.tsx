import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthSignIn from './pages/AuthSignIn'
import AuthSignUp from './pages/AuthSignUp'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<AuthSignIn />} />
        <Route path="/auth/sign-up" element={<AuthSignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
          success: {
            iconTheme: {
              primary: 'var(--green-600)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--red-600)',
              secondary: 'white',
            },
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
