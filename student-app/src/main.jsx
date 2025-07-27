import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPages.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
   {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
