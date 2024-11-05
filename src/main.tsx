import './global.css'
import '@fontsource-variable/jetbrains-mono/index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider';
import NotFoundPage from '@/pages/not-found-page';
import TablesLayout from '@/layouts/TablesLayout';
import RootLayout from '@/layouts/RootLayout';
import ProductsPage from '@/pages/tables/ProductsPage';
import LoginPage from '@/pages/LoginPage';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/AuthProvider';

// paths with no trailing slash are considered as relative to the current path
// in the other hand, paths with trailing slash are considered as absolute

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "tables",
        element: <TablesLayout />,
        children: [
          { path: "", element: <Navigate to="/tables/products" replace /> },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "orders",
            element: <div>Orders</div>,
          },
          {
            path: "customers",
            element: <div>Customers</div>,
          },
          {
            path: "users",
            element: <div>Users</div>,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
