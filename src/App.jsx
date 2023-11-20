import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import {
  Home,
  About,
  Login,
  NotFound,
  EditDish,
  AddDish,
  Register,
  CreateOccasion,
  MyOccasions,
  Message
} from './pages';

import SharedLayout from './components/SharedLayout';
import Occasion from './components/Occasion';
import ProtectedRoute from './components/ProtectedRoute';

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
        path: ':menuId',
        element: <Occasion />,
      },
      {
        path: ':menuId/dishes',
        children: [
          {
            path: ':dishId/edit',
            element: <ProtectedRoute> <EditDish /> </ProtectedRoute>,
          }
        ]
      },
      {
        path: 'createOccasion',
        element: <CreateOccasion />,
      },
      {
        path: 'myOccasions',
        element: <MyOccasions />,
      },
      {
        path: ':menuId/add',
        element: <ProtectedRoute><AddDish /> </ProtectedRoute>,
      },
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Register',
        element: <Register />,
      },
      {
        path: 'Message',
        element: <Message />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
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

