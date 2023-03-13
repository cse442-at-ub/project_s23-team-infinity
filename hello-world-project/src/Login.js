import React, { useState } from 'react';
import styled from 'styled-components';
import Image1 from './images/Login1.png';
import setCookie from './SetCookies'
import { useCookies } from 'react-cookie'
import checkCookie from './CheckCookie';
import getCookie from './GetCookieData';

import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';




const Title = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  font-family: Myanmar Khyay;
  line-height: auto;
  color: #000000;
  margin-top:1px;
`;

const Rectangle = styled.div`
  border-radius: 10px;
  height: 14px;
  width: 100%;
  background-color: #acb9c5;
  margin-top:-1px;
`;

const Login = styled.h1`
  font-size: 40px;
  margin-top: 6rem;
  margin-left:6rem;
  text-align: left;
`;

const Description = styled.p`
  font-size: 15px;
  margin-top: 1px;
 margin-left:6rem;
  text-align: left;
`;

const Description2 = styled.p` //Dont'have an account?
  font-size: 15px;
  margin-top: 1px;
 margin-left:10rem;
  text-align: left;
`;

const Input = styled.input`
  padding: 0.5rem;
  width:30%;
  border-radius: 0.5rem;
  border: 1px solid gray;
  font-size: 20px;
  margin-bottom: 1rem;
 margin-left:6rem;
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.3);
  }
`;

const Label1 = styled.label`//Email//Username
  font-size: 20px;
  font-weight: bold;
  margin-top:4rem;
  margin-bottom: 0.5rem;
  display:flex;
 margin-left:6rem;
`;

const Label2 = styled.label`//Password
  font-size: 20px;
  font-weight: bold;
  margin-top:1rem;
  margin-bottom: 0.5rem;
  display:flex;
 margin-left:6rem;
`;

const Label3 = styled.label`//Remember me
  font-size: 15px;
  margin-right:20px;
 margin-top:4px;
 position: absolute;
`;
const Label4 = styled.label` //Forgot Password, not function currently.
  font-size: 15px;
  margin-left:320px;
  margin-top:4px;
 position: absolute;
  color: red;
`;

const Label5 = styled.label` //Login button
  font-size: 24px;
 position: relative;
`;

const Label6 = styled.label` //Sign up
  font-size: 14px;
  margin-left:11px;
  margin-top:1px;
 position: absolute;
  color: blue;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`//Check box   - for the Remember me button
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.25rem;
  background-color:#d9d9d9;
  position: relative;
 
  &:checked {           //what box should look like when checked
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  background-color:#d9d9d9;
  &::after {
      content: "✔";            //add check
      position: absolute;
      font-size: 1.1rem;
      color: red;
    }
  }
`;

const Button2 = styled.button` //Login button
  margin-left:10rem;
  margin-top:2rem;
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
  margin-left:72%;
  background-color: #acb9c5;
  color: #fff;
  border: None;
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size:25px;
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

const StyledImg = styled.img` //right pitcure
  width: 50%;
  height: 93%;
  position: absolute;
  top: 53.2%;
  left: 74.5%;
  transform: translate(-50%, -50%);
`;

const Loginin = () => {
    const[user,setUser] = useState({email:'',password:''})

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
        console.log(user)
    }

    const submitForm=(e)=>{
      e.preventDefault();
      const sendData = {
        email:user.email,
        password:user.password
      }
      setCookie(user.email, user.password);
    }

    
    return (
      <form onSubmit={submitForm}>
	    <div>
        <Title>CSE442-TeamInfinity
          
        </Title>
        <Button3>
              Contact us
        </Button3>

        <Rectangle />

        <Login>Login</Login>

        <Description>
          Welcome! Please login.
        </Description>

        <Label1>Email/Username:</Label1>
        <Input type="email" name="email" onChange={handleChange} value={user.email}></Input>

        <Label2>Password:</Label2>
        <Input type="password" name="password" onChange={handleChange} value={user.password}></Input>

        <Description>
          <Checkbox />
            <Label3 >Remeber me </Label3>
             
            <Label4>
            <Link to ="/recovery" style={{color:'red'}}>Forgot password?</Link>
            </Label4>
        </Description>

        <Button2>
          <Label5 type="submit" name="login">login</Label5>
        </Button2>

        <Description2>
        Don't have an account?
        <Label6> Sign Up</Label6>
        </Description2>

        <StyledImg src={Image1} />
      
	    </div>
      </form>

  )
}

export default Loginin;