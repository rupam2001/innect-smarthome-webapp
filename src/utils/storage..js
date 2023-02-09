export function SetAccessToken(token){
    localStorage.setItem("access_token", token);
}
export function GetAccessToken(){
    return localStorage.getItem("access_token");
}




let ws_token = null
//volatile 
export function SetWsToken(token){
    sessionStorage.setItem("ws_token", token);
    ws_token = token
}
export function GetWsToken(){
    return ws_token;
    return sessionStorage.getItem("ws_token");
}