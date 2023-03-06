//Sign Up Page
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function SignUp(){
    return (
	<div>
	   <Title>CSE442-TeamInfinity
              <Button3>
		    Contact us
	      </Button3>
	    </Title>
	    <Rectangle />
	    <CR>Create an account</CR>
	    <Input type="text"
	           placeholder = "Enter your username"/>
	    <h1></h1>
	    <Input type="text"
	           placeholder = "Enter your email"/>
	     <h1></h1>
	    <Input type="text"
	           placeholder = "Enter your password"/>
	     <h1></h1>
	     <Input type="text"
	            placeholder = "Confirm Password"/>
	    <h1></h1>
	    <Button2>
		<Label5>Sign up</Label5>
	    </Button2>
	    <Description2>
		Already have an account?
		<Label6>
		    <Link to="/signin">Login</Link>
		</Label6>
	    </Description2>
	    

        </div>
    );
}

export default SignUp;


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

const CR = styled.h1` //Create an account
  font-size: 40px;
  margin-top: 11%;
  text-align: center;
`;

const Button2 = styled.button` //Sign Up button
  margin: auto;
  display:block;
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
  margin-left:55%;
  background-color: #acb9c5;
  color: #fff;
  border: None;
  cursor: pointer;
  height: 3.5%;
  width: 22%;
  font-size:100%;
  position:absolute;

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

const Input = styled.input` //Input box
  padding: 0.5rem;
  width:30%;
  border-radius: 0.5rem;
  border: 1px solid gray;
  font-size: 20px;
  margin: auto;
 display: block;

  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.3);
  }
`;

const Label5 = styled.label` //Login button
  font-size: 24px;
 position: relative;
`;

const Description2 = styled.p` //Already have an account?
  font-size: 15px;
  margin-top: 1%;
 margin-left:35%;
  text-align: left;
`;

const Label6 = styled.label` //login text
  font-size: 14px;
  margin-left:6%;
  margin-top:0.1%;
 position: absolute;
  color: blue;
`;
