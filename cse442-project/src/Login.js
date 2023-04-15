import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image1 from './images/Login1.png';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const Loginin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [cookie, setCookie] = useState('')

  useEffect = (() =>{
    const c = Cookies.get('remember')
    setCookie(c)
  },[])
 // This handle the Login button
const handleLogin =  () => {
    let Data = new FormData();
    Data.append('username', username);
    Data.append('password', password);
    Data.append('rememberMe', rememberMe);

    const url = '/CSE442-542/2023-Spring/cse-442ad/PHP/login.php'
    axios.post(url, Data).then(response=>
	alert(response.data)).catch(error=>alert(error));

};


    // Web page elements
  return (
    <div>
      <Title>
        {console.log(cookie)}
        CSE442-TeamInfinity
        <Button3>Contact us</Button3>
      </Title>
      <Rectangle />
      <StyledImg src={Image1} />
      <Login>Login</Login>
      <Description>Welcome! Please login.</Description>
      <Label1>Email/Username:</Label1>
      <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Label2>Password:</Label2>
      <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Description>
        <Checkbox onChange={(e) => setRememberMe(e.target.checked)} />
        <Label3>Remeber me</Label3>
        <Label4>
          <Link to="/CSE442-542/2023-Spring/cse-442ad/recovery">Forgot password?</Link>
        </Label4>
      </Description>
      <Button2 onClick={handleLogin}>
        <Label5>Login</Label5>
      </Button2>
      <Description2>
        Don't have an account?
        <Label6>
          <Link to="/CSE442-542/2023-Spring/cse-442ad/signup">Sign Up</Link>
        </Label6>
      </Description2>
    </div>
  );
};




const Title = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  font-family: Myanmar Khyay;
  line-height: auto;
  color: #000000;
`;

const Rectangle = styled.div`
  position:absolute;
  border-radius:14px;
  height: 1.5%;
  width: 100%;
  background-color: #acb9c5;
`;

const Login = styled.h1`
  font-size: 40px;
  margin-left:6.5%;
  text-align: left;
`;

const Description = styled.p`
  font-size: 15px;
  margin-top: 1%;
 margin-left:6.5%;
  text-align: left;
`;

const Description2 = styled.p` //Dont'have an account?
  font-size: 15px;
  margin-top: 1%;
 margin-left:11%;
  text-align: left;
`;

const Input = styled.input`
  padding: 0.5rem;
  width:30%;
  border-radius: 0.5rem;
  border: 1px solid gray;
  font-size: 20px;
  margin-bottom: 1.5%;
 margin-left:6.5%;
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.3);
  }
`;

const Label1 = styled.label`//Email//Username
  font-size: 20px;
  font-weight: bold;
  margin-top:4.2%;
  margin-bottom: 0.5%;
  display:flex;
 margin-left:6.5%;
`;

const Label2 = styled.label`//Password
  font-size: 20px;
  font-weight: bold;
  margin-top:1%;
  margin-bottom: 0.5%;
  display:flex;
 margin-left:6.5%;
`;

const Label3 = styled.label`//Remember me
  font-size: 15px;
  margin-right:20%;
 margin-top:0.2%;
 position: absolute;
`;
const Label4 = styled.label` //Forgot Password, not function currently.
  font-size: 15px;
  margin-left:21.5%;
  margin-top:0.2%;
 position: absolute;
  color: red;
`;

const Label5 = styled.label` //Login button
  font-size: 24px;
 position: relative;
`;

const Label6 = styled.label` //Sign up
  font-size: 14px;
  margin-left:6%;
  margin-top:0.1%;
 position: absolute;
  color: blue;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`//Check box
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.25rem;
  background-color:#d9d9d9;
  position: relative;
 
  &:checked {
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  background-color:#d9d9d9;
  &::after {
      content: "✔";
      position: absolute;
      font-size: 1.1rem;
      color: red;
    }
  }
`;

const Button2 = styled.button` //Login button
  margin-left:11%;
  margin-top:2.1%;
  background-color: #acb9c5;
  color: #fff;
  border: 1px solid #000000;
  border-radius: 10px;
  cursor: pointer;
  height: 42px;
  width: 316px;
  &:hover {
    background-color: gray;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const Button3 = styled.button` //Top right contact us
  background-color: gray;
  color: #fff;
  border: None;
  cursor: pointer;
  width: 22%;
  font-size:100%;
  position:absolute;
  right:0;
  &:hover {
    background-color: #acb9c5;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const StyledImg = styled.img` //right pitcure
  width: 50%;
  height: 91%;
  position: absolute;
  margin-top: 1.5%;
  left: 50%;
`;

export default Loginin;
