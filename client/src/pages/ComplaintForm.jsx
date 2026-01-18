import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/ComplaintForm.css';

export default function ComplaintForm() {

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    subject: '',
    description: '',
    address: '',
    state: '',
    city: ''
  })

  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authoriseUser = async () => { 
      const res = await fetch("http://localhost:3000/api/get-complaint-form", {
        method: "GET",
        credentials: "include"   
      })
      if (res.ok){
        setIsLoading(false)
      }
      else{
        navigate("/signup")
      }
    }

    authoriseUser()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
        const formData = new FormData()
        formData.append('subject', formFields.subject)
        formData.append('description', formFields.description)
        formData.append('state', formFields.state)
        formData.append('city', formFields.city)
        formData.append('address', formFields.address)
        formData.append('file', file)

        try{
          const res = await fetch("http://localhost:3000/upload-complaint", {
            method: "POST",
            credentials: "include",
            body: formData
          })
          if (res.ok){
            console.log("image received");
            navigate("/user-dashboard")
          }
          else{
            console.log("image not received");
          }
        } catch(err){
          console.log(err.message)
        }
    }

  if (isLoading){
    return(
      <LoadingSpinner />
    )
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="form-header">
          <h1>RAISE AN ISSUE</h1>
        </div>
        
        <div className="complaint-form">
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formFields.subject}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
              rows="5"
            ></textarea>
          </div>

          <div className="location-section">
            <h3 className="section-heading">Location</h3>
            
            <div className="form-field">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                // value={formFields.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="state-city-row">
              <div className="form-field">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formFields.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formFields.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="upload-section">
            <p className="upload-label">Upload an Image</p>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="image" className="file-upload-label">
                <span className="browse-button">Browse</span>
                <span className="file-text">
                  {file ? file.name : 'No file selected'}
                </span>
              </label>
            </div>
          </div>

          <div className="submit-section">
            <button type="button" onClick={handleSubmit} className="submit-btn">
              SUBMIT
            </button>
          </div>
          <div className="complaint-form-bottom-text-div">
            <NavLink className="bottom-text" to="/user-dashboard">Go back to Dashboard...</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
