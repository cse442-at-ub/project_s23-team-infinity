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

function checkCookie() {
    var user=getCookie("username;SameSite=None");//need
        //if (user != "" && user != null) {
    setCookie("email", user, 30);//first arg sets name
      //  }
}
export default checkCookie
