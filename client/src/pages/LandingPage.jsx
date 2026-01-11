import { useNavigate, NavLink } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => {navigate("/signup")}}>
            Get Started
        </button>
    </div>
  )
}

export default LandingPage