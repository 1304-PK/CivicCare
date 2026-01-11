import AuthForm from "../components/AuthForm"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LogIn = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/auth-login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username_i.current.value,
                pswd: pswd_i.current.value
            })
        })
        const data = await res.json()
        if (data.user){
            navigate("/user-dashboard")
        }
    }
    return (
        <div>
            <AuthForm
                type="Log In"
                redirect="Sign Up"
                redirect_link="/signup"
                handleSubmit={handleSubmit}
                username_ref={username_i}
                pswd_ref={pswd_i}
            />
        </div>
    )
}

export default LogIn