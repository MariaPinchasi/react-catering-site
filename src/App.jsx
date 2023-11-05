import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  Home,
  About,
  Casual,
  Elegant,
  Login,
  NotFound,
  EditDish,
  AddDish,
  Register
} from './pages';

import SharedLayout from './components/SharedLayout';

const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'casual',
        element: <Casual />,
      },
      {
        path: 'dishes',
        children: [
          {
            path: ':dishId/edit',
            element: <EditDish />,
          }
        ]
      },
      {
        path: 'elegant',
        element: <Elegant />,
      },
      {
        path: 'add',
        element: <AddDish />,
      },
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Register',
        element: <Register />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

