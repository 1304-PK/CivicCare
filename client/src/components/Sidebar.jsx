import { useState } from "react"
import { Menu, X, LayoutDashboard, FileText, Clock, Settings, Plus } from 'lucide-react';
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css"

const Sidebar = () => {

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const navigate = useNavigate()

  const handleLogOut = async () => {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      credentials: "include"
    })
    if (res.ok){
      navigate("/login")
    }
  }

    return (
        <div className="sidebar">
            <button
        className="hamburger-toggle"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isMobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-content">
          <div className="logo-section">
            <h1 className="logo">CivicCare</h1>
          </div>

          <nav className="nav-menu">
            <button className="nav-button-collapsed active">
              <LayoutDashboard size={20} />
            </button>
            <button className="nav-button-expanded active" onClick={() => {navigate("/user-dashboard")}}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>

            <button className="nav-button-collapsed">
              <FileText size={20} />
            </button>
            <button className="nav-button-expanded" onClick={() => {navigate("/complaint-form")}}>
              <FileText size={20} />
              <span>New Complaint</span>
            </button>

            <button className="nav-button-collapsed">
              <Clock size={20} />
            </button>
            <button className="nav-button-expanded" onClick={() => {navigate("/past-complaints")}}>
              <Clock size={20} />
              <span>Past Complaints</span>
            </button>

            <button className="nav-button-collapsed">
              <Settings size={20} />
            </button>
            <button className="nav-button-expanded">
              <Settings size={20} />
              <span>Settings</span>
            </button>

            <button className="nav-button-collapsed">
              <TbLogout2 size={20}/>
            </button>
            <button className="nav-button-expanded sidebar-log-out-btn" onClick={handleLogOut}>
              <TbLogout2 size={20} />
              <span>Log Out</span>
            </button>
          </nav>
            
        </div>
      </aside>
        </div>
    )
}

export default Sidebar