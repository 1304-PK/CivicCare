import { useState, useEffect} from "react"
import {State, City} from "country-state-city"

const ComplaintForm = () => {

  const [formFields, setFormFields] = useState({
    subject: '',
    description: '',
    state: '',
    city: '',
    address: ''
  })

  const [file, setFile] = useState(null)

  const indianStates = State.getAllStates()
  useEffect(() => {
    console.log(indianStates)
  }, [])
  

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

            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" onChange={handleInputChange}/>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onChange={handleInputChange}/>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" onChange={handleInputChange}/>
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