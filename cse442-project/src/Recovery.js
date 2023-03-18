import * as React from "react";
import { useState } from 'react';
import "./css/Recovery.css";
import rectangle from "./images/rectangle.svg";
import image from "./images/key.png";
import axios from 'axios';
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Recovery = () => {
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (email.length === 0){
      alert("Empty email!")
    }else{
      const url = "/CSE442-542/2023-Spring/cse-442ad/PHP/passrecov.php" //change the path here to the php file location
      let Data = new FormData();
      Data.append('email', email)
      axios.post(url, Data)
      .then(response=>alert(response.data))
      .catch(error=> alert(error));
    }
  }
return (

    <div className="forgot-password-page">
      <div className="flex-container-r">
        <span className="cse-442-team-infinity-r">CSE442-Team Infinity</span>
        <div className="sign_in_r">
          <Link to ="/CSE442-542/2023-Spring/cse-442ad/" style={{textDecoration: 'none',color:'white'}}className="sign-in-r">Sign in</Link>
        </div>
      </div>
      <img className="rectangle-recovery" src={rectangle} />
      <img className="image-recovery" src={image} />
      <span className="forgot-password">Forgot Password?</span>
      <span className="email">Email</span>
      <input className="rectangle-recovery-1" name="email" type="text" onChange={(e) => setEmail(e.target.value)}/>
        <input type="button" className="reset_password" value="Reset Password" onClick={handleSubmit}/>
      <div className="flex-container-recovery-1">
        <Link to ="/CSE442-542/2023-Spring/cse-442ad/" className="dont-have-an-account">Don’t have an account? Sign up</Link>
      </div>
    </div>
  );
};

export default Recovery;