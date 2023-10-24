import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  Home,
  About,
  Casual,
  Elegant,
  Contact,
  NotFound,
  EditDish,
  AddDish
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
        path: 'contact',
        element: <Contact />,
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

