import * as React from "react";
import "./css/Recovery.css";
import rectangle from "./images/rectangle.svg";
import image from "./images/key.png";
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Recovery = () => {
  return (
    <div className="forgot-password-page">
      <div className="flex-container-r">
        <span className="cse-442-team-infinity-r">CSE442-Team Infinity</span>
        <div className="sign_in_r">
          <Link to ="/" style={{textDecoration: 'none',color:'white'}}className="sign-in-r">Sign in</Link>
        </div>
      </div>
      <img className="rectangle-recovery" src={rectangle} />
      <img className="image-recovery" src={image} />
      <span className="forgot-password">Forgot Password?</span>
      <span className="email">Email</span>
      <input className="rectangle-recovery-1" type="text" />
        <Link to ="/Verify" className="reset_password" style={{textDecoration: 'none',color:'white'}}>
        Reset Password
        </Link>
      <div className="flex-container-recovery-1">
        <Link to ="/" className="dont-have-an-account">Don’t have an account? Sign up</Link>
      </div>
    </div>
  );
};

export default Recovery;