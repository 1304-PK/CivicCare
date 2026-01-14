import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import "../styles/AuthForm.css";
import polka from "..//assets/polka.webp";

const AuthForm = (props) => {
  return (
    <div className="container">
      <div
        className="leftSection"
        // style={{ backgroundImage: `url(${polka})` }}
      >
        <div className="formWrapper">
          <h1 className="formHeading">{props.type}</h1>

          <div className="signupForm">
            <div className="formGroup">
              <label className="label" htmlFor="name">Name</label>
              <input type="text" name="username" ref={props.username_ref} id="username" className='input'/>
            </div>

            <div className="formGroup">
              <label className="label" htmlFor="password">Password</label>
              <input type="password" ref={props.pswd_ref} name="password" id="password" className='input'/>
            </div>

            <button className="signupButton" onClick={props.handleSubmit}>
              {props.type}
            </button>
          </div>

          <p className="loginText">
            {props.redirect_text}{" "}
            <NavLink to={props.redirect_link} className="loginLink">{props.redirect}</NavLink>
          </p>
        </div>
      </div>

      <div className="rightSection">
        <div className="rightContent">
          <h2 className="rightHeading">Welcome to Nature Connect</h2>
          <p className="rightDescription">
            Join our community of nature enthusiasts and eco-conscious individuals. 
            Discover sustainable living tips, connect with like-minded people, and 
            make a positive impact on our planet. Start your journey towards a 
            greener lifestyle today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm
