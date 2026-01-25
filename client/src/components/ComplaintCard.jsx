import React, { useState } from 'react';
import "../styles/ComplaintCard.css"
import { MoreVertical, CheckCircle, Clock, Trash2 } from 'lucide-react';
import capitalize from "../utils/capitalize.js"

const ComplaintCard = ({ complaint, onDelete, officer, citizen, handleStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const filePath = complaint.file_path.replace(/\\/g, '/')
  const imageUrl = `http://localhost:3000/${filePath}`

  return (
    <div className="complaint-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={capitalize(complaint.subject)} className="card-image" />
        {citizen && 
        <>
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
        </>
        }
      </div>
      <div className="card-content">
        <h3 className="card-title">{capitalize(complaint.subject)}</h3>
        <p className="card-description">{capitalize(complaint.description)}</p>
        <p className="card-address">{`${capitalize(complaint.address)}, ${capitalize(complaint.city)}, ${capitalize(complaint.state)}`}</p>
        <button className={`status-badge ${complaint.status}`}
        onClick={officer ? 
          () => {handleStatusChange(complaint.complaint_id, complaint.status)}
          : () => {}}
          style={officer && {cursor: "pointer"}}
        >
          {complaint.status === 'resolved' ? (
            <CheckCircle size={16} />
          ) : (
            <Clock size={16} />
          )}
          {capitalize(complaint.status)}
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;