import *as React from "react";
import { useState } from 'react';
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

function setCookie(){
    var u = document.getElementById('username').value
    var p = document.getElementById('password').value

    document.cookie = "myusername"+u+";path=http://localhost:3000/"
    document.cookie = "myusername"+p+";path=http://localhost:3000/"
}