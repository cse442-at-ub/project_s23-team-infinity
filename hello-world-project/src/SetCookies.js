import *as React from "react";
import { useState } from 'react';
import Cookies from 'universal-cookie';

function setCookie(){
    // var u = document.getElementById('username').value
    // var p = document.getElementById('password').value

    // document.cookie = "myusername"+u+";path=http://localhost:3001/"
    // document.cookie = "myusername"+p+";path=http://localhost:3000/"
    document.cookie = "myusername;max-age=604800;"//works
    document.cookie = "mypassword;max-age=604800;"//works


};
export default setCookie
