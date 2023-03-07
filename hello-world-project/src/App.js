import { useState } from "react";
import $ from "jquery";
import './App.css';
import Loginin from './Login'
import Recovery from './Recovery'
import Verify from './Verify'
import Reset from './Reset';
import SetCookies from './SetCookies'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function Remember () {
  return (
    <Router>
      <div className="remember-me">
        <Routes>
          <Route path="/" element={<Loginin/>} />
          <Route path="/recovery" element={<Recovery/>} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/reset"element={<Reset/>}/>
          <Route path="/setcookies" element={<SetCookies/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default Remember;


