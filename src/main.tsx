import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/home-page';
import { ThemeProvider } from '@/components/theme-provider';
import NotFoundPage from '@/pages/not-found-page';
import TablesLayout from '@/layouts/TablesLayout';
import RootLayout from '@/layouts/RootLayout';
import ProductsPage from '@/pages/tables/ProductsPage';

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
        element: <HomePage />,
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
