import *as React from "react";
import { useState } from 'react';

function setCookie(){
    var u = document.getElementById('username').value
    var p = document.getElementById('password').value

    document.cookie = "myusername"+u+";path=http://localhost:3000/"
    document.cookie = "myusername"+p+";path=http://localhost:3000/"
};
export default setCookie
