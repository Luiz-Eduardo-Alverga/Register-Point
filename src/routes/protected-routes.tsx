import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { getCookieValue } from '@/utils/get-cookie-value'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getCookieValue('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
