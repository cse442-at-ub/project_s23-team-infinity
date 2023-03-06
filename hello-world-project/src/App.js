import { useState } from "react";
import $ from "jquery";
import "./App.css";

function Remember () {
  return (
    <Router>
      <div className="remember-me">
        <Routes>
          <Route path="/setcookies" element={<SetCookies/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default Login;


