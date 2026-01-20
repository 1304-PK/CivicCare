import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import "../styles/AuthForm.css";
import carousel1 from "../assets/carousel-1.webp"
import carousel2 from "../assets/carousel-2.jpg"
import carousel3 from "../assets/carousel-3.png"

const AuthForm = (props) => {
  return (
    <div className="container">
      <div
        className="leftSection"
      >
        <form className="formWrapper" onSubmit={props.handleSubmit}>
          <h1 className="formHeading">{props.type}</h1>

          <div className="signupForm">
            <div className="formGroup">
              <label className="label" htmlFor="name">Name</label>
              <input type="text" name="username" ref={props.username_ref} id="username" className='input' required/>
            </div>

            <div className="formGroup">
              <label className="label" htmlFor="password">Password</label>
              <input type="password" ref={props.pswd_ref} name="password" id="password" className='input' required/>
            </div>

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
          </div>
          <h2 className="rightHeading">Fix the issues in your locality</h2>
        </div>
      </div>
    </div>
  );
}

export default AuthForm
