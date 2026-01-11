import AuthForm from "../components/AuthForm"

const LogIn = () => {

    const handleSubmit = () => {
        console.log('submit')
    }
  return (
    <div>
        <AuthForm 
        type="Log In"
        redirect="Sign Up"
        redirect_link="/signup"
        handleSubmit={handleSubmit}
        />
    </div>
  )
}

export default LogIn