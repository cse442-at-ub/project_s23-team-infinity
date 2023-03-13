import *as React from "react";
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import cookie from "react-cookie";


//function setCookie(){
     //var u = document.getElementById('username').value
    // var p = document.getElementById('password').value

    // document.cookie = "myusername"+u+";path=http://localhost:3001/"
    // document.cookie = "myusername"+p+";path=http://localhost:3000/"
    //document.cookie = "myusername;max-age=6;"//works
    //document.cookie = "mypassword;max-age=604800;"//works

//    // const cookies  = new Cookies();
//     cookies.set(document.getElementById('username'.value))
//     console.log(cookies.get('myCat'))

   // const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])


    // const response = await getOauthResponse(values); - gives an error

    // let expires = new Date()
    // expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
    // setCookie('access_token', response.data.access_token, { path: '/',  expires})
    // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})

    //const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
    // async function onSubmit(values){
    //     const response = await getOauthResponse(values)
    //     let expires = new Date()
    //     expires.setTime(expires.getTime() + (response.data.expires_in *1000))
    //     setCookie('access_token', response.data.access_token, {path: '/', expires})
    //     setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
    // }

    // const setCookie = () => {
    //   let d = new Date();
    //   d.setTime(d.getTime() + (60*1000));
    //   const cookie  = new Cookies();
    //   cookie.set("onboarded", true, {path: "/", expires: d});
    //   console.log(cookie)
    // }//doesnt work

    //  createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    //     let date = new Date();
    //     date.setTime(date.getTime()+(hourToExpire*60*60*1000));
    //     document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toGMTString();
    // }
    // const [cookies, setCookie] = useCookies(["user"]);

    // function handleCookie() {
    //   setCookie("user", "gowtham", {
    //     path: "/"
    //   });
    // }
    // return (
    //   <div className="App">
    //     <h1>React cookies</h1>
    //     <button onClick={handleCookie}>Set Cookie</button>
    //   </div>
    // );
   // document.cookie = "username=document.getElementById('username'.value); expires=Thur, 9 Mar 2023 14:14:00 EST; SameSite=None; Secure";
    //document.cookie = "remember=here; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
   // var u = document.getElementById('user.email').value
    //document.cookie = "username: "+u

    //var p = document.getElementById('password').values
        //document.cookie = "myusername;max-age=6;"//works
   //// document.cookie = "password=mypassword;expires=T, 09 Mar 2023 14:46:00 EST; SameSite=None; Secure";//partially worksworks
   function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //var expires = "expires=" + d.toGMTString();//maxage="in seconds" - probs need this as it's a bit more flexible
    var expires = "Max-Age=3600";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
//}

export default setCookie;
