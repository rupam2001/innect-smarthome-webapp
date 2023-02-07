export function SetAccessToken(token){
    localStorage.setItem("access_token", token);
}
export function GetAccessToken(){
    return localStorage.getItem("access_token");
}

export function SetWsToken(token){
    localStorage.setItem("ws_token", token);
}
export function GetWsToken(){
    return localStorage.getItem("ws_token");
}