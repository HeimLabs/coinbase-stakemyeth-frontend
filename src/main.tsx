import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './layouts/RootLayout.tsx'

import Home from './pages/Home'
import Rewards from './pages/Rewards'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { WagmiProvider } from 'wagmi'
import { wagmiAdapter } from './config/reown.config.ts'
import { GlobalProvider } from './contexts/global.context.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/rewards', element: <Rewards /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <SkeletonTheme>
            <RouterProvider router={router} />
            <ToastContainer stacked={true} />
          </SkeletonTheme>
        </GlobalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
