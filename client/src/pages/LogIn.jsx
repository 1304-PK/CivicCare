import AuthForm from "../components/AuthForm"
import { useRef, useEffect, useState } from "react"
import MessagePopup from "../components/MessagePopup"
import { useNavigate } from "react-router-dom"

const LogIn = () => {

    const navigate = useNavigate()

    const [role, setRole] = useState('citizen')
    const [errDialog, setErrDialog] = useState({})
    const [username, setUsername] = useState("")
    const [pswd, setPswd] = useState("")

    useEffect(() => {
        const authUser = async () => {
            const res = await fetch("http://localhost:3000/redirect", {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.redirect) {
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
            body: JSON.stringify({
                role, username, pswd
            })
        })
        const data = await res.json()
        if (res.status === 401) {
            setErrDialog({
                visibility: true,
                iconType: "error",
                title: "Invalid Credentials",
                message: "Enter correct details",
                btnText: "Close",
                handlePopupBtnClick: () => {
                    setErrDialog({})
                }
            })
        }
        if (res.ok) {
            if (data.role === 'citizen') {
                navigate("/user-dashboard")
            }
            else if (data.role === 'officer') {
                navigate("/officer-dashboard")
            }
        }
    }

    const getRole = (role) => {
        setRole(role)
    }

    return (
        <>
            <div className="login-form-container">
                <AuthForm
                    type="Log In"
                    redirect="Sign Up"
                    redirect_link="/signup"
                    redirect_text="Don't have an account?"
                    handleSubmit={handleSubmit}
                    onUsernameChange={(e) => { setUsername(e.target.value) }}
                    username_val={username}
                    onPswdChange={(e) => { setPswd(e.target.value) }}
                    pswd_val={pswd}
                    loginPage={true}
                    getRole={getRole}
                />
            </div>
            {
                errDialog.visibility && <MessagePopup
                    props={errDialog}
                />
            }
        </>
    )
}

export default LogIn