import getCookie from "./GetCookieData";
import setCookie from "./SetCookies";

// function checkCookie() {
//     var user=getCookie("username");//need
//     if (user != "") {//dont need this conditional
//         alert("Welcome again " + user);//dont need
//     } else {
//         user = prompt("Please enter your email:","");//dont need this prompt
//         if (user != "" && user != null) {
//             setCookie("username", user, 30);
//         }
//     }
// }

function checkCookie() {//mess around with combining this and the other 2 functions
    var user=getCookie("username");//need
        //if (user != "" && user != null) {
    setCookie("email", user, 30);//first arg sets name
      //  }
            // function checkCookie() {
            // var user=getCookie("username");
            // var uname=document.login.uname.value;
            // if (user == uname) {
            //     alert("Welcome again " + user);
            //     var myWindow = window.open("", "_self");
            //     myWindow.document.write("<p>Welcome to LTI</p>");
            // } else {
            //     if (user != "" && user != null) {
            //     setCookie();
            //     validation();
            //     }
            // }
            
}
export default checkCookie
