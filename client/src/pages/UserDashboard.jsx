import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, FileText, Clock, Settings, Plus } from 'lucide-react';
import '../styles/UserDashboard.css';

const UserDashboard = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authoriseUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/dashboard-info", {
          method: "GET",
          credentials: "include"
        })
        const data = await res.json()
        if (res.ok) {
          setIsLoading(false)
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

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const userName = "Alex";

  const statsData = [
    { title: "Roads Issue", count: 12, color: "#814300ff" },
    { title: "Wastage Issue", count: 8, color: "#22ff00ff" },
    { title: "Water Issue", count: 5, color: "#0084ffff" }
  ];

  const totalComplaints = statsData.reduce((sum, item) => sum + item.count, 0);

  const complaints = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&h=300&fit=crop",
      title: "Broken Road on Main Street",
      description: "Large pothole causing traffic issues and potential vehicle damage",
      status: "Pending"
    }
  ];

  const filteredComplaints =
    filter === 'All'
      ? complaints
      : complaints.filter(c => c.status === filter);

  if (isLoading) return (
    <LoadingSpinner />
  )

  return (
    <div className="dashboard-container">
      {/* Mobile Hamburger Toggle */}
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
            <button className="nav-button-expanded active">
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
            <button className="nav-button-expanded">
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
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <h2>Hey {userName},</h2>
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
              <h3 className="section-title">Past Complaints</h3>
            </div>
            <div className="complaints-grid">
              {filteredComplaints.map(complaint => (
                <div key={complaint.id} className="complaint-card">
                  <img
                    src={complaint.image}
                    alt={complaint.title}
                    className="complaint-image"
                  />
                  <div className="complaint-content">
                    <h4 className="complaint-title">{complaint.title}</h4>
                    <p className="complaint-description">
                      {complaint.description}
                    </p>
                    <span
                      className={`status-badge ${complaint.status.toLowerCase()}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='bottom-text'>
              <NavLink className='see-more'>See More...</NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;