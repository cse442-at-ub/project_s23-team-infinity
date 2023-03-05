import * as React from "react";
import "./css/Verify.css";
import rectangle from "./images/rectangle.svg";
import image from "./images/email.png";
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Verify = () => {
  return (
    <div className="verify-page">
      <div className="flex-container-verify">
        <span className="cse-442-team-infinity-verify">CSE442-Team Infinity</span>
        <div className="sign_in_verify">
        <Link to ="/" style={{textDecoration: 'none',color:'white'}}className="sign-in-verify">Sign in</Link>
        </div>
      </div>
      <img className="rectangle-verify" src={rectangle} />
      <img className="image-verify" src={image} />
      <span className="enter-the-6-digits-c">
        Enter the 6-digits code we sent you your email to reset password
      </span>
      <input className="code" type="text" />
      <Link to ="/Reset" style={{textDecoration: 'none',color:'white'}}className="submit">Verify</Link>
    </div>
  );
};

export default Verify;
