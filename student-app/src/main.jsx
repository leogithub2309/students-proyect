import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPages.jsx';
import StudentStatus from './components/StudentVerify.jsx';
import QrScanner from './components/QrReader.jsx';
import Dashboard from './components/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
   {
    path: "/register",
    element: <RegisterPage />,
  },
   {
    path: "/qrScanner",
    element: <QrScanner />,
  },
  {
    path: '/student/:cedula',
    element:  <StudentStatus />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
