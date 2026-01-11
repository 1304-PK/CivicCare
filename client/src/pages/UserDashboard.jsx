import { useEffect, useState } from "react"

const UserDashboard = (props) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const authoriseUser = async () => {
      const res = await fetch("http://localhost:3000/auth-user", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      setUser(data.username)
    }

    authoriseUser()
  }, [])

  return (
    <div>
        Hello {user || "User"}
        <button>New Complaints</button>
    </div>
  )
}

export default UserDashboard