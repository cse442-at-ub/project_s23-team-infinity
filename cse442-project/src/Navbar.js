import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from 'react-icons/io';
import axios from 'axios';

const Navbar = (usertoken) => {
  let navigate = useNavigate();
  const logout = () => {
    const url = '/CSE442-542/2023-Spring/cse-442ad/PHP/logout.php'
    let Data = new FormData();
    Data.append('usertoken', usertoken);
    axios.post(url, Data).then(response=> 
    alert(response.data)).catch(error=> alert(error));
    localStorage.removeItem('remembercookie');
    navigate("/CSE442-542/2023-Spring/cse-442ad/");
  }
  return (
    <div id="navbarOwnMain">
      <table className="navbartable">
        <tr>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <CgProfile
              className="navbarIcon">
            </CgProfile>
            <span>username</span>
            <IoMdLogOut className="navbarIcon_setting" onClick={()=>logout()}>
            </IoMdLogOut>      
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Navbar;