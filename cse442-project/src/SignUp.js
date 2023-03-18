import React, {useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //This is a valid email address form
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

    // Control the submission
    
const handleSignUp = async (e) => {
  e.preventDefault();

  // if the email is not in the right form
  if (!validateEmail(email)) {
    setError('Please enter a valid email address.');
    alert('Please enter a valid email address.');
    return;
  }

  try {
    // Connect to signup php file here
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('retypepassword', confirmPassword);
    formData.append('s', '1'); // Match the php 's' field to the FormData

    const response = await axios.post('/CSE442-542/2023-Spring/cse-442ad/PHP/register.php', formData);

    // Check if the response contains any of the error messages
    const errorMessages = [
      'Please Enter an Email',
      'Please Enter a buffalo.edu email',
      'Please Enter a Username',
      'Please Enter a Password',
      'Please Reenter your Password',
      'Account Already Exists With This Email',
      'Username Already Taken',
      'Password Does Not Match',
    ];
    let errorMessage = '';
    errorMessages.forEach((message) => {
      if (response.data.includes(message)) {
        errorMessage = message;
      }
    });

    if (!errorMessage) {
      navigate('/home');
    } else {
      setError(errorMessage);
      alert(errorMessage);
    }
  } catch (err) {
    setError('An error occurred while signing up. Please try again.');
    alert('An error occurred while signing up. Please try again.');
  }
};


    return (
	<div>
	   <Title>CSE442-TeamInfinity
              <Button3>
		    Contact us
	      </Button3>
	    </Title>
	    <Rectangle />
	    <form onSubmit={handleSignUp}>
	    <CR>Create an account</CR>
	    <Input type="text"
	           placeholder = "Enter your username"
	           value={username}
	           onChange={(e) => setUsername(e.target.value)}
	    />
	    <h1></h1>
	    <Input type="text"
	           placeholder = "Enter your email"
	           value={email}
	           onChange={(e) => setEmail(e.target.value)}
	    />
	     <h1></h1>
	    <Input type="text"
	           placeholder = "Enter your password"
	           value={password}
	           onChange={(e) => setPassword(e.target.value)}
	    />
	     <h1></h1>
	    <Input type="text"
	           placeholder = "Confirm Password"
	           value={confirmPassword}
	           onChange={(e) => setConfirmPassword(e.target.value)}
	    />
	    <h1></h1>
	    <Button2 type = "submit">
		<Label5>Sign up</Label5>
	    </Button2>
		</form>
	    <Description2>
		Already have an account?
		<Label6>
		    <Link to="/">Login</Link>
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
