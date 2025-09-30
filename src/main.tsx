import { createRoot } from 'react-dom/client'
import './styles/global.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import AppLayout from './lauout';
import UserPage from './pages/user.page';
import HomePage from './pages/home.page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }, {
        path: "/users",
        element: <UserPage />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
