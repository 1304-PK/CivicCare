import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, TrendingUp, ArrowUpRight, FileText } from 'lucide-react';
import { TbLogout2 } from 'react-icons/tb';
import OfficerStatCard from '../components/OfficerStatCard';
import { FaExclamationCircle, FaCheckCircle  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import '../styles/OfficerDashboard.css';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import {useNavigate} from "react-router-dom"
import timeAgo from "../utils/timeAgo.js"
import capitalize from '../utils/capitalize.js';

const OfficerDashboard = () => {
  
  const navigate = useNavigate()

  const [dashboardInfo, setDashboardInfo] = useState({})

  useEffect(() => {
    const getOfficerDashboardInfo = async () => {
      const res = await fetch("http://localhost:3000/api/officer-dashboard-info", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok){
        setDashboardInfo({...data})
      }
    }

    getOfficerDashboardInfo()
  }, [])

  const handleLogout = async () => {
    console.log("fuckyou")
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      credentials: "include"
    })
    if (res.ok){
      navigate("/login")
    }
  }

  if (!dashboardInfo.location){
    return(
      <LoadingSpinner />
    )
  }

  return (
    <div className="officer-dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="page-title">Officer Dashboard</h1>
          <p className="page-subtitle">
            <FaLocationDot /> {`${capitalize(dashboardInfo.location.city)}, ${capitalize(dashboardInfo.location.state)}`}
          </p>
        </div>
        <div className="header-right">
          <button className="export-btn">
            <FileText size={18} />
            Export Report
          </button>
          <button 
          className='officer-logout-btn'
          onClick={handleLogout}
          >
            <TbLogout2 size={18} />
            Log Out
          </button>
        </div>
      </header>

      <div className="stats-grid">
            <OfficerStatCard 
            iconType={<FaExclamationCircle  size={18}/>}
            statValue={dashboardInfo.stats.totalComplaints}
            statLabel={"Total Complaints"}
            statFillWidth={100}
            statColor={"#ff6b35"}
            />

            <OfficerStatCard 
            iconType={<FaCheckCircle  size={18}/>}
            statValue={dashboardInfo.stats.resolvedComplaints}
            statLabel={"Resolved Complaints"}
            statFillWidth={(dashboardInfo.stats.resolvedComplaints/dashboardInfo.stats.totalComplaints)*100}
            statColor={"#00d9a5"}
            />

            <OfficerStatCard 
            iconType={<MdAccessTimeFilled  size={18}/>}
            statValue={dashboardInfo.stats.pendingComplaints}
            statLabel={"Pending Complaints"}
            statFillWidth={(dashboardInfo.stats.pendingComplaints/dashboardInfo.stats.totalComplaints)*100}
            statColor={"#ffb800"}
            />
      </div>

      <div className="activity-section">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <button
            className="view-all-btn"
            onClick={() => {navigate("/area-complaints")}}
          >
            View All Complaints
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="activity-list">
          {console.log(dashboardInfo)}
          {
          dashboardInfo.recentComplaints.map((complaint) => (
            <div key={complaint.complaint_id} className="activity-item">
              <div className="activity-content">
                <div className="activity-action">{capitalize(complaint.subject)}</div>
                <div className="activity-meta">
                  <span className="activity-category">{
                    <><FaLocationDot /> {capitalize(complaint.address)}, {capitalize(complaint.city)}, {capitalize(complaint.state)} </>
                    }</span>
                  <span className="activity-separator">•</span>
                  <span className="activity-time">{capitalize(timeAgo(complaint.created_at))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
