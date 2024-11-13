import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { getCookieValue } from '@/utils/get-cookie-value'

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = getCookieValue('token')

  if (token) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default PublicRoute
