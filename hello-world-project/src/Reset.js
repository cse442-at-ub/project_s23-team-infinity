import * as React from "react";
import { useState } from 'react';
import "./css/Reset.css";
import rectangle from "./images/rectangle.svg";
import num from "./images/num.png";
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Reset = () => {
  const[user,setUser] = useState({new_password:'',confirm_password:''})

  const handleChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value});
      console.log(user)
  }

  const submitForm=(e)=>{
    e.preventDefault();
    const sendData = {
      new_password:user.new_password,
      confirm_password:user.confirm_password
    }
  }
  return (
    <div className="reset-password">
      <div className="flex-container-reset">
        <span className="cse-442-team-infinity-reset">CSE442-Team Infinity</span>
        <div className="rectangle-19-reset">
        <Link to ="/" style={{textDecoration: 'none',color:'white'}}className="sign-in-reset">Sign in</Link>
        </div>
      </div>
      <img className="rectangle-8-reset" src={rectangle} />
      <img className="num-3728048-200-1" src={num} />
      <span className="reset-your-new-passw">Reset your new password</span>
      <span className="password-reset">Password</span>
      <input className="rectangle-1-reset" type="text" name="new_password" onChange={handleChange} value={user.new_password}/>
      <span className="confirm-reset">Confirm Password</span>
      <input className="rectangle-20-reset" type="text" name="confirm_password" onChange={handleChange} value={user.confirm_password}/>
      <Link to="/" style={{textDecoration: 'none',color:'white'}}className="rectangle-2-reset">Reset</Link>
    </div>
  );
};
export default Reset;