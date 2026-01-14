import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm"

const SignUp = () => {
    const navigate = useNavigate()
    const username_i = useRef(null)
    const pswd_i = useRef(null)

    useEffect(() => {
        const authUser = async () => {
            const res = await fetch("http://localhost:3000/redirect", {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.redirect){
                navigate("/user-dashboard")
            }
        }
        authUser()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/auth-signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_i.current.value,
                pswd: pswd_i.current.value
            })
        })
        if (res.ok){
            navigate("/user-dashboard")
        }
    }
  return (
    <div>
        <AuthForm 
        type="Sign Up"
        redirect="Log In"
        redirect_link="/login"
        redirect_text="Already have an account?"
        handleSubmit={handleSubmit}
        username_ref={username_i}
        pswd_ref={pswd_i}
        title="Congratulations"
        description="This is your first step to contribute to nature"
        />
    </div>
  )
}

export default SignUp