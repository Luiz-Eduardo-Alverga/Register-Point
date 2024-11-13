import { createBrowserRouter } from 'react-router-dom'

import Login from '@/pages/login/page'
import { RegisterPoint } from '@/pages/point'

import ProtectedRoute from './protected-routes'
import PublicRoute from './public-routes'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />,
      </PublicRoute>
    ),
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RegisterPoint />
      </ProtectedRoute>
    ),
  },
])
