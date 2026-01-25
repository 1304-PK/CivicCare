import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate, NavLink } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import { FaWpforms } from "react-icons/fa";
import { Menu, X, LayoutDashboard, FileText, Clock, Settings, Plus } from 'lucide-react';
import '../styles/UserDashboard.css';

const UserDashboard = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [latestComplaint, setLatestComplaint] = useState(null)

  useEffect(() => {
    const authoriseUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user-dashboard-info", {
          method: "GET",
          credentials: "include"
        })
        const data = await res.json()
        if (res.ok) {
          setIsLoading(false)
          setUsername(data.username[0].toUpperCase() + data.username.slice(1))
          data.complaint && setLatestComplaint(data.complaint)
        }
        else {
          navigate("/login")
        }
      } catch (err) {
        navigate("/login")
      }
    }

    authoriseUser()
  }, [])

  const statsData = [
    { title: "Roads Issue", count: 12, color: "#814300ff" },
    { title: "Wastage Issue", count: 8, color: "#22ff00ff" },
    { title: "Water Issue", count: 5, color: "#0084ffff" }
  ];

  const totalComplaints = statsData.reduce((sum, item) => sum + item.count, 0);

  if (isLoading) return (
    <LoadingSpinner />
  )
  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <h2>Hey {username || "User"},</h2>
            <p>Ready to make a change?</p>
          </div>
          <button className="new-complaint-btn"
            onClick={() => { navigate("/complaint-form") }}>
            New Complaint
            <Plus size={20} />
          </button>
        </section>

        {/* Stats Section */}
        <div className='bottom-section'>
          <section className="complaints-section">
            <div className="complaints-header">
              <h3 className="section-title">Latest Complaint</h3>
            </div>
            {latestComplaint ? 
              <div className="complaints-grid">

              <div className="dashboard-complaint-card">
                <img
                  src={'http://localhost:3000/' + latestComplaint.file_path.replace(/\\/, '/')}
                  alt={latestComplaint.subject}
                  className="complaint-image"
                />
                <div className="complaint-content">
                  <h4 className="complaint-title">{latestComplaint.subject}</h4>
                  <p className="complaint-description">
                    {latestComplaint.description}
                  </p>
                  <span
                    className={`status-badge ${latestComplaint.status.toLowerCase()}`}
                  >
                    {latestComplaint.status}
                  </span>
                </div>
              </div>
              <div className='bottom-text'>
                <NavLink className='see-more' to="/past-complaints">See More...</NavLink>
              </div>
            </div>
          :
          <div className='no-latest-complaint'>
            <FaWpforms size={60}/>
            <p>No Complaints</p>
            <p>Press New Complaint to submit one!</p>
          </div>  
          }

          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;