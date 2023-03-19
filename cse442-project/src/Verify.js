import * as React from "react";
import { useState } from 'react';
import "./css/Verify.css";
import rectangle from "./images/rectangle.svg";
import image from "./images/email.png";
import axios from 'axios';
import {BrowserRouter as Router, Routes,Route,Link, useNavigate } from 'react-router-dom';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props.dataPostId)
  }
}
const Verify = () => {
  const[code,setCode] = useState('')
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (code.length === 0){
      alert("Please enter your code")
      const userApp = document.getElementById('token')
      ReactDom.render(<UserContainer {...userApp.dataset}/>, userApp)
    }else{
      const url = "/CSE442-542/2023-Spring/cse-442ad/PHP/emailedcodecheck.php" //change the path here to the php file location
      let Data = new FormData();
      Data.append('code', code)
      axios.post(url, Data)
      .then(response=>alert(response.data))
      .catch(error=> alert(error));
      navigate('/CSE442-542/2023-Spring/cse-442ad/reset')
    }
  }
  return (
    <div className="verify-page">
      <div className="flex-container-verify">
        <span className="cse-442-team-infinity-verify">CSE442-Team Infinity</span>
        <div className="sign_in_verify">
        <Link to ="/CSE442-542/2023-Spring/cse-442ad/" style={{textDecoration: 'none',color:'white'}}className="sign-in-verify">Sign in</Link>
        </div>
      </div>
      <img className="rectangle-verify" src={rectangle} />
      <img className="image-verify" src={image} />
      <span className="enter-the-6-digits-c">
        Enter the 6-digits code we sent you your email to reset password
      </span>
      <input className="code" type="text" name="code" onChange={(e) => setCode(e.target.value)} />
      <input type="button" className="submit" value="Verify" onClick={handleSubmit} />
    </div>
  );
};

export default Verify;
