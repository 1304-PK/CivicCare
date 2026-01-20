import React, { useState, useEffect, use } from 'react';
import Sidebar from '../components/SideBar';
import ComplaintCard from '../components/ComplaintCard';
import '../styles/PastComplaints.css';

export default function PastComplaints() {

  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    const getComplaints = async () => {
      try{
        const res = await fetch("http://localhost:3000/get-complaints", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok){
        console.log(data)
        setComplaints(data)
      }
      else{
        console.log("not ok")
      }
    } catch(err){
      console.log("errMsg: " + err.message)
    }
    }
    getComplaints()
  }, [])

  const handleDelete = (id) => {
    setComplaints(complaints.filter(c => c.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar/>

      <header className="header">
        <h1 className="header-title">PAST COMPLAINTS</h1>
      </header>
      <div className="cards-container">
        {complaints.map(complaint => {
          console.log(complaint)
          return(
          <ComplaintCard 
            key={complaint.complaint_id} 
            complaint={complaint} 
            onDelete={handleDelete}
          />
        )})}
      </div>
    </div>
  );
}