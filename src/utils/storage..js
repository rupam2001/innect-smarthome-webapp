export function SetAccessToken(token) {
  localStorage.setItem("access_token", token);
}
export function GetAccessToken() {
  return localStorage.getItem("access_token");
}
export function RemoveAccessToken() {
  localStorage.removeItem("access_token");
}

let ws_token = null;
//volatile
export function SetWsToken(token) {
  sessionStorage.setItem("ws_token", token);
  // ws_token = token
}
export function GetWsToken() {
  // return ws_token;
  return sessionStorage.getItem("ws_token");
}

export function RemoveWsToken() {
  sessionStorage.removeItem("ws_token");
}

export function StoreNetwork({ ssid, password }) {
  let networks = localStorage.getItem("networks");
  if (!networks) {
    networks = "{}";
  }
  networks = JSON.parse(networks);
  networks[ssid] = password;
  localStorage.setItem("networks", JSON.stringify(networks));
}
export function GetNetworks() {
  let networks = localStorage.getItem("networks");
  if (!networks) {
    networks = "{}";
  }
  networks = JSON.parse(networks);
  return networks;
}
