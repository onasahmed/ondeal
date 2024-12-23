import Main from './layout/Main'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './shared/ErrorPage'
import About from './pages/About'
import PrivateRoute from './shared/PrivateRoute'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/about',
          element: (
            <PrivateRoute>
              <About></About>
            </PrivateRoute>
          )
        },
        {
          path: '/cart',
          element: <Cart></Cart>
        },
        {
          path: '/products/:id',
          element: <ProductDetails></ProductDetails>,
          errorElement: <ErrorPage></ErrorPage>
        }
      ]
    },

    {
      path: '/signup',
      element: <SignUp></SignUp>,
      errorElement: <ErrorPage></ErrorPage>
    },
    {
      path: '/login',
      element: <Login></Login>,
      errorElement: <ErrorPage></ErrorPage>
    },
    {
      path: '/forgot-password',
      element: <ResetPassword></ResetPassword>,
      errorElement: <ErrorPage></ErrorPage>
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)
