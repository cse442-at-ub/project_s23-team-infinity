import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Loginin from './Login'
import Recovery from './Recovery'
import Verify from './Verify'
import Reset from './Reset';
import Home from './Home';
import SignUp from './SignUp';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function Login() {
    return (
	<Router>
	<div className="login-page">
    <Routes>
      <Route path="/CSE442-542/2023-Spring/cse-442ad/" element={<Loginin/>} />
      <Route path="/CSE442-542/2023-Spring/cse-442ad/recovery" element={<Recovery/>} />
      <Route path="/CSE442-542/2023-Spring/cse-442ad/verify" element={<Verify/>}/>``
      <Route path="/CSE442-542/2023-Spring/cse-442ad/reset"element={<Reset/>}/>
      <Route path="/CSE442-542/2023-Spring/cse-442ad/home" element={<Home/>}/>
      <Route path="/CSE442-542/2023-Spring/cse-442ad/signup" element={<SignUp/>}/>
    </Routes>
  </div>
    </Router>
  );
}

export default Login;