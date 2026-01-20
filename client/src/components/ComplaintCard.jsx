import React, { useState } from 'react';
import "../styles/ComplaintCard.css"
import { MoreVertical, CheckCircle, Clock, Trash2 } from 'lucide-react';

const ComplaintCard = ({ complaint, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const filePath = complaint.file_path.replace(/\\/g, '/')
  const imageUrl = `http://localhost:3000/${filePath}`
  console.log(imageUrl)
  return (
    <div className="complaint-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={complaint.subject} className="card-image" />
        <button 
          className="menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreVertical size={20} color="white" />
        </button>
        {showMenu && (
          <div className="dropdown-menu">
            <button 
              className="delete-option"
              onClick={() => {
                onDelete(complaint.id);
                setShowMenu(false);
              }}
            >
              <Trash2 size={16} />
              Delete Complaint
            </button>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{complaint.subject}</h3>
        <p className="card-description">{complaint.description}</p>
        <p className="card-address">{`${complaint.address}, ${complaint.city}, ${complaint.state}`}</p>
        <div className={`status-badge ${complaint.status}`}>
          {complaint.status === 'resolved' ? (
            <CheckCircle size={16} />
          ) : (
            <Clock size={16} />
          )}
          <span>{complaint.status === 'resolved' ? 'Resolved' : 'Pending'}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;