import * as React from "react";
import { useState } from 'react';
import "./css/Reset.css";
import rectangle from "./images/rectangle.svg";
import num from "./images/num.png";
import axios from 'axios';
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Reset = () => {
  const[newpassword,setNewPassowrd] = useState('')
  const[confirmed,setConfirmedPassword] = useState('')
  const[username_email,setUsername] = useState('')
  const navigate = useNavigate();

  const handleSubmit = () =>{
    if (newpassword !== confirmed){
      alert("Please enter the same password")
    }else if(username_email.length === 0){
      alert("Please enter your username/email")
    }else{
      const url = "http://localhost/PHP/server.php" //change the path here to the php file location
      let Data = new FormData();
      Data.append('newpassword', newpassword);
      Data.append('username/email', username_email);
      axios.post(url, Data).then(response=> 
        alert(response.data)).catch(error=> alert(error));
      navigate('/')

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
      <span className="password-reset">Username/Email</span>
      <input className="rectangle-1-reset" type="text" name="username/email" onChange={(e) => setUsername(e.target.value)}/>
      <span className="password-reset">Password</span>
      <input className="rectangle-1-reset" type="text" name="new_password" onChange={(e) => setNewPassowrd(e.target.value)}/>
      <span className="confirm-reset">Confirm Password</span>
      <input className="rectangle-20-reset" type="text" name="confirm_password" onChange={(e) => setConfirmedPassword(e.target.value)}/>
      <input type="button" className="rectangle-2-reset" value="Reset" onClick={handleSubmit}/>
    </div>
  );
};
export default Reset;
