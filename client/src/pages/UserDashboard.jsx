import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate, NavLink } from 'react-router-dom';
import Sidebar from '../components/SideBar';
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
        const res = await fetch("http://localhost:3000/api/dashboard-info", {
          method: "GET",
          credentials: "include"
        })
        const data = await res.json()
        if (res.ok) {
          console.log(data.complaint, data.username)
          setIsLoading(false)
          setUsername(data.username)
          data.complaint && setLatestComplaint(data.complaint)
        }
        else {
          navigate("/login")
        }
      } catch (err) {
        console.log("Error: " + err.message)
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
          <section className="stats-section">
            <h3 className="section-title">Your Impact</h3>
            <div className="stats-container">
              <div className="stats">
                <div className="stats-list">
                  {statsData.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-info">
                        <span className="stat-title">{stat.title}</span>
                        <span
                          className="stat-count"
                          style={{ backgroundColor: stat.color }}
                        >
                          {stat.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-container">
                  <svg viewBox="0 0 200 200" className="doughnut-chart">
                    {(() => {
                      let currentAngle = 0;
                      return statsData.map((stat, index) => {
                        const percentage = stat.count / totalComplaints;
                        const angle = percentage * 360;
                        const startAngle = currentAngle;
                        currentAngle += angle;
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (currentAngle - 90) * Math.PI / 180;
                        const x1 = 100 + 70 * Math.cos(startRad);
                        const y1 = 100 + 70 * Math.sin(startRad);
                        const x2 = 100 + 70 * Math.cos(endRad);
                        const y2 = 100 + 70 * Math.sin(endRad);
                        const largeArc = angle > 180 ? 1 : 0;
                        return (
                          <path
                            key={index}
                            d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={stat.color}
                          />
                        );
                      });
                    })()}
                    <circle cx="100" cy="100" r="45" fill="#f8fdf5" />
                    <text x="100" y="110" textAnchor="middle" className="chart-total">
                      {totalComplaints}
                    </text>
                  </svg>
                </div>
              </div>
              <div className="stats">
                <div className="stats-list">
                  {statsData.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-info">
                        <span className="stat-title">{stat.title}</span>
                        <span
                          className="stat-count"
                          style={{ backgroundColor: stat.color }}
                        >
                          {stat.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-container">
                  <svg viewBox="0 0 200 200" className="doughnut-chart">
                    {(() => {
                      let currentAngle = 0;
                      return statsData.map((stat, index) => {
                        const percentage = stat.count / totalComplaints;
                        const angle = percentage * 360;
                        const startAngle = currentAngle;
                        currentAngle += angle;
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (currentAngle - 90) * Math.PI / 180;
                        const x1 = 100 + 70 * Math.cos(startRad);
                        const y1 = 100 + 70 * Math.sin(startRad);
                        const x2 = 100 + 70 * Math.cos(endRad);
                        const y2 = 100 + 70 * Math.sin(endRad);
                        const largeArc = angle > 180 ? 1 : 0;
                        return (
                          <path
                            key={index}
                            d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={stat.color}
                          />
                        );
                      });
                    })()}
                    <circle cx="100" cy="100" r="45" fill="#f8fdf5" />
                    <text x="100" y="110" textAnchor="middle" className="chart-total">
                      {totalComplaints}
                    </text>
                  </svg>
                </div>
              </div>
            </div>

          </section>
          {/* Complaints Section */}
          <section className="complaints-section">
            <div className="complaints-header">
              <h3 className="section-title">Latest Complaint</h3>
            </div>
            {latestComplaint && 
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
            </div>}

          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;