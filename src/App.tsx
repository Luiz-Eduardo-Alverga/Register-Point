import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { router } from './routes/routes'

export function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}
