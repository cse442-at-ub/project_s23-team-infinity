
function deleteCookie(cname)
{
	//$.removeCookie('UNFCUCuser', { path: '/' });
	document.cookie = cname + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';//need to call delete cookie for when user logsout
		
}
export default deleteCookie