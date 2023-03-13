
// function getcookiedata(){
//     console.log(document.cookie)
// }
function getCookie(cname) {
    //var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    //var ca = decodedCookie.split(';');
    // for(var i = 0; i < ca.length; i++) {
    //     var c = c+ca[i];//changed
    //     while (ca == ' ') {
    //         c = c.substring(1);
    //     }
    //     if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //     }
    // }
        var begin = decodedCookie.indexOf('=');
        var end = decodedCookie.indexOf(';')
        return decodedCookie.substring(begin, end)
    
    // return "";
}
export default getCookie