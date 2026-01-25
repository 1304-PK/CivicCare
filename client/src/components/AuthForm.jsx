import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import "../styles/AuthForm.css";
import carousel1 from "../assets/carousel-1.webp"
import carousel2 from "../assets/carousel-2.jpg"
import carousel3 from "../assets/carousel-3.png"
import carousel4 from "../assets/carousel-4.jpg"
import carousel5 from "../assets/carousel-5.jpg"
import carousel6 from "../assets/carousel-6.jpg"

const AuthForm = (props) => {

  const [activeRole, setActiveRole] = useState('citizen')

  return (
    <div className="container">
      <div
        className="leftSection"
      >
        <form className="formWrapper" onSubmit={props.handleSubmit}>
          <h1 className="formHeading">{props.type}</h1>

          {props.loginPage 
          &&
          <div className="select-role">
            <button className={activeRole==='citizen'?'active-role':''}
            type='button'
            onClick={() => {
              setActiveRole('citizen')
              props.getRole('citizen')
            }}
            >Citizen</button>
            <button className={activeRole==='officer' ? 'active-role' : ''}
            type='button'
            onClick={() => {
              setActiveRole('officer')
              props.getRole('officer')
            }}
            >Officer</button>
          </div>
          }

          <div className="signupForm">
            <div className="formGroup">
              <label className="label" htmlFor="name">Name</label>
              <input type="text" name="username" onChange={props.onUsernameChange} value={props.username_val} id="username" className='input'/>
            </div>

            <div className="formGroup">
              <label className="label" htmlFor="password">Password</label>
              <input type="password" onChange={props.onPswdChange} value={props.pswd_val} name="password" id="password" className='input'/>
            </div>

            {
              props.errMsg
              &&
              <p className='auth-form-err-msg'>{props.errMsg}</p>
            }

            <button className="signupButton" type='submit'>
              {props.type}
            </button>
          </div>

          <p className="loginText">
            {props.redirect_text}{" "}
            <NavLink to={props.redirect_link} className="loginLink">{props.redirect}</NavLink>
          </p>
        </form>
      </div>

      <div className="rightSection">
        <div className="rightContent">
          <div className='carousel-container'>
            <div className="carousel">
              <div className="carousel-track-down">
                <div className="carousel-card">
                  <img src={carousel1} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel2} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel3} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel1} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel2} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel3} alt="" />
                </div>
              </div>
            </div>

            <div className="carousel">
              <div className="carousel-track-up">
                <div className="carousel-card">
                  <img src={carousel4} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel5} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel6} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel4} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel5} alt="" />
                </div>
                <div className="carousel-card">
                  <img src={carousel6} alt="" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="rightHeading">Fix the issues in your locality</h2>
        </div>
      </div>
    </div>
  );
}

export default AuthForm
