import { createBrowserRouter } from 'react-router-dom'

import { RegisterPoint } from './pages/point'

export const router = createBrowserRouter([
  {
    path: '/login',
  },

  {
    path: '/',
    element: <RegisterPoint />,
  },
])
