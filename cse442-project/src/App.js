import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Loginin from './Login'
import Recovery from './Recovery'
import Verify from './Verify'
import Reset from './Reset';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function Login() {
    return (
	<Router>
	<div className="login-page">
    <Routes>
      <Route path="/" element={<Loginin/>} />
      <Route path="/recovery" element={<Recovery/>} />
      <Route path="/verify" element={<Verify/>}/>
      <Route path="/reset"element={<Reset/>}/>
    </Routes>
  </div>
    </Router>
  );
}

export default Login;