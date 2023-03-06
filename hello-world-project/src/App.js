import { useState } from "react";
import $ from "jquery";
import "./App.css";
import Loginin from './Login'
import SetCookies from './SetCookies'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function Remember () {
  return (
    <Router>
      <div className="remember-me">
        <Routes>
          <Route path="/" element={<Loginin/>} />
          <Route path="/setcookies" element={<SetCookies/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default Remember;


