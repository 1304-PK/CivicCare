import { use, useRef } from "react"

const ComplaintForm = () => {

    const subject_ref = useRef(null)
    const desc_ref = useRef(null)
    const location_ref = useRef(null)
    const image_ref = useRef(null)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(image_ref.current.files)
            
    }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" id="subject" ref={subject_ref}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" ref={desc_ref}></textarea>
            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" ref={location_ref}/>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" accept="images/*" ref={image_ref}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ComplaintForm