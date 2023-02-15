import React, { useEffect, useState } from "react";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
import { GetAccessToken, GetWsToken, SetAccessToken, SetWsToken } from "../utils/storage.";


const GlobalContext = React.createContext(null);


export default function GlobalContextProvider({ children}) {
    

  const [devices, setDevices] = useState(null);
  const [rooms, setRooms] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isWsTokenAvailable, setIsWsTokenAvailable] = useState(false)

  const [userData, setUserData] = useState(null)

  const fetchDevicesAsync = async () =>{
    const accessToken = GetAccessToken();
    // if(!accessToken) return;
    try {
        const res = await fetch(ENDPOINT + "/get_devices", {
            method:"POST", 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({accessToken: GetAccessToken()})
        }).then(r => r.json());

        setDevices(res)
        console.log(res, "fetchDevicesAsync")
    } catch (error) {
        alert("Failed to get Devices:(")
        console.log(error)
    }
  }
  const groupDevicesByRoom = () =>{
    let _rooms = [];
    for(let i = 0; i < devices.length; i++){
        const room = {
            title: devices[i]['room_id']['title'],
            _id: devices[i]['room_id']['_id'],
            devices:[
                ...devices.filter(d => d['room_id']['_id'] === devices[i]['room_id']['_id'])
            ]
        }
        if(_rooms.findIndex(r => r._id === room._id) == -1){
            _rooms.push(room)
        }
    }
    setRooms(_rooms)
    console.log(_rooms, "rooms");
  }

  useEffect(()=>{
    (async () =>{
        if(isLoggedIn){
            await fetchDevicesAsync();
            await fetchWsTokenAsync();
        }
    })()
  },[isLoggedIn])

  useEffect(()=>{
    if(devices)
        groupDevicesByRoom();
  },[devices])

  const loginAsync = async (email, password) =>{
    try {
        const res = await fetch(ENDPOINT + "/login", {
            method:"POST", 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({email, password})
        }).then(r => r.json());
        if(res.success){
            setIsLoggedIn(true);
            SetAccessToken(res.accessToken);
        }
    } catch (error) {
        alert("login failed")
    }
  }
  const autoAuthAsync = async () =>{
    if(GetAccessToken()){
        setIsLoggedIn(true);
    }
  }
  useEffect(()=>{
    autoAuthAsync()
  },[])

  const fetchWsTokenAsync = async () => {
    if(GetWsToken() != undefined){
        setIsWsTokenAvailable(true)
        return;
    };

    try {
        const res = await fetch(ENDPOINT + "/get_wstoken", {
            method:"POST", 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({accessToken: GetAccessToken()})
        }).then(r => r.json());
        if(res.success){
            SetWsToken(res.wstoken)  //volatile
            setIsWsTokenAvailable(true)
        }
    } catch (error) {
        alert("unable to get wstokens")
    }
  }
  
  const editRoomDetailsAsync = async (data) => {
    try {
      const res = await fetch(ENDPOINT + "/room/edit", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: GetAccessToken(), ...data})
      }).then(r => r.json())

      if(res.success){
        await fetchDevicesAsync();
      }
    } catch (error) {
      console.log(error)
      alert("Unable to edit")
    }
  }

  const fetchUserDataAsync = async (forced) => {
    if(!forced && userData) return;
    try {
      const res = await fetch(ENDPOINT + "/get_user_data", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: GetAccessToken()})
      }).then(r => r.json())
      setUserData(res)
    } catch (error) {
      console.log(error)
      alert("Unable to edit")
    }
  }

  return (
    <GlobalContext.Provider
      value={{
       rooms,
       devices,
       loginAsync,
       isLoggedIn,
       isWsTokenAvailable,
       editRoomDetailsAsync,
       fetchUserDataAsync,
       userData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
