import { useState, useRef } from "react"

const ComplaintForm = () => {

  const [formFields, setFormFields] = useState({
    subject: '',
    description: '',
    location: ''
  })

  const [file, setFile] = useState(null)

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormFields({
      ...formFields,
      [name]:value
    }) 
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('subject', formFields.subject)
        formData.append('description', formFields.description)
        formData.append('location', formFields.location)
        formData.append('file', file)

        try{
          const res = await fetch("http://localhost:3000/upload-complaint", {
            method: "POST",
            body: formData
          })
          if (res.ok){
            console.log("image received");
          }
          else{
            console.log("image not received");
          }
        } catch(err){
          console.log(err.message)
        }
    }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" id="subject" onChange={handleInputChange}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" onChange={handleInputChange}></textarea>
            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" onChange={handleInputChange}/>
            <label htmlFor="image">Image</label>
            <input 
            type="file" 
            name="image" 
            accept="images/*"
            onChange={handleFileChange}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ComplaintForm