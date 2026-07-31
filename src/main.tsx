import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Admin from './Admin.tsx'
import Login from './Login.tsx'
import RouteError from './components/RouteError.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { Toaster } from './components/ui/sonner'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouteError />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
    errorElement: <RouteError />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster />
    </ErrorBoundary>
  </StrictMode>,
)
