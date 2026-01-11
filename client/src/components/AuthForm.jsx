import { NavLink } from "react-router-dom"

const AuthForm = (props) => {
  return (
    <div>
        <form onSubmit={props.handleSubmit}>
            <h1>{props.type}</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" ref={props.username_ref} id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" ref={props.pswd_ref} name="password" id="password"/>
            <button type="submit">{props.type}</button>
            <NavLink to={props.redirect_link}>{props.redirect}</NavLink>
        </form>
    </div>
  )
}

export default AuthForm