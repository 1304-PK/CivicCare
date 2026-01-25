import { createBrowserRouter } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserDashboard from './pages/UserDashboard'
import ComplaintForm from './pages/ComplaintForm'
import PastComplaints from './pages/PastComplaints'
import OfficerDashboard from './pages/OfficerDashboard'
import AreaComplaints from './pages/AreaComplaints'

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
  },
  {
    path: "/officer-dashboard",
    element: <OfficerDashboard />
  },
  {
    path: "/area-complaints",
    element: <AreaComplaints />
  }
])

export default router