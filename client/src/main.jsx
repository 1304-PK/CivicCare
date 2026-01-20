import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserDashboard from './pages/UserDashboard'
import ComplaintForm from './pages/ComplaintForm'
import PastComplaints from './pages/PastComplaints'
import Sidebar from './components/SideBar'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path:"/signup",
    element: <SignUp />
  },
  {
    path:"/login",
    element: <LogIn />
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />
  },
  {
    path: "/complaint-form",
    element: <ComplaintForm />
  },
  {
    path: "/past-complaints",
    element: <PastComplaints />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
