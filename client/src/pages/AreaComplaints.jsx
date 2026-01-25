import { useState, useEffect } from "react"
import ComplaintCard from "../components/ComplaintCard"
import "../styles/AreaComplaints.css"
import {useNavigate} from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner.jsx"

const AreaComplaints = () => {

  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    const getAreaComplaints = async () => {
      const res = await fetch("http://localhost:3000/api/get-area-complaints", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok){
        setComplaints([...data.complaints])
      }
    }

    getAreaComplaints()
  }, [])

  const handleStatusChange = async (complaint_id, initialStatus) => {
    const res = await fetch("http://localhost:3000/api/update-complaint-status", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        complaint_id, newStatus: (initialStatus==='pending' ? 'resolved' : 'pending')
      })
    })
    const data = await res.json()
    setComplaints(
      complaints.map(item => (
        item.complaint_id === data.complaintId ? {...item, status: data.updatedStatus}
        : item
      ))
    )
  }

  if (!complaints.length){
    return (
      <LoadingSpinner />
    )
  }
  return(
    <div>
      <div className="area-complaints-header">
        <h1>All Complaints</h1>
        <button onClick={() => {navigate("/officer-dashboard")}}>Back to Dashboard</button>
      </div>
      <div className="cards-container">
        {
          complaints.map(item => (
            <ComplaintCard 
            complaint={item}
            officer={true}
            handleStatusChange={handleStatusChange}
            />
          ))
        }
      </div>
    </div>
  )
}

export default AreaComplaints