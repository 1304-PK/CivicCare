import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import MessagePopup from "../components/MessagePopup"

const SignUp = () => {
    const navigate = useNavigate()

    const [errDialog, setErrDialog] = useState({})
    const [errMsg, setErrMsg] = useState(null)
    const [username, setUsername] = useState("")
    const [pswd, setPswd] = useState("")

    useEffect(() => {
        const authUser = async () => {
            try{const res = await fetch("http://localhost:3000/redirect", {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.redirect){
                navigate("/user-dashboard")
            }} catch(err){
                console.log("Redirect check failed", err)
            }
        }
        authUser()
    }, [])

    const validateInput = () => {
        if (!username?.trim()){
            setErrMsg("Username cannot be empty")
            return 0;
        }
        else if (username?.length<6){
            setErrMsg("Username cannot be less than 6 characters")
            return 0;
        }

        if (!pswd?.trim){
            setErrMsg("Password cannot be empty")
            return 0;
        }
        else if (pswd?.length<6){
            setErrMsg("Password cannot be less than 6 characters")
            return 0;
        }
        return 1;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const validInput = validateInput()
        if (!validInput){
            return
        }
        try {const res = await fetch("http://localhost:3000/auth-signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, pswd
            })
        })
        const data = await res.json()
        
        if (res.status===409){
            setErrDialog({
                visibility: true,
                iconType: "error",
                title: "Username exists already",
                message: "Log In instead",
                btnText: "Close",
                handlePopupBtnClick: () => {
                    setErrDialog({})
                }
            })
        }

        if (res.ok){
            navigate("/user-dashboard")
        }} catch(err){
            console.log("Error in authenticating form", err)
        }
    }
  return (
    <>
    <div>
        <AuthForm 
        type="Sign Up"
        redirect="Log In"
        redirect_link="/login"
        redirect_text="Already have an account?"
        handleSubmit={handleSubmit}
        onUsernameChange={(e) => {setUsername(e.target.value)}}
        username_val={username}
        onPswdChange={(e) => {setPswd(e.target.value)}}
        pswd_val={pswd}
        title="Congratulations"
        description="This is your first step to contribute to nature"
        errMsg={errMsg}
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

export default SignUp