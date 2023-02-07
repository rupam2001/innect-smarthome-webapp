import React, { useEffect, useState } from "react";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
import { GetAccessToken, SetAccessToken, SetWsToken } from "../utils/storage.";


const GlobalContext = React.createContext(null);


export default function GlobalContextProvider({ children}) {
    

  const [devices, setDevices] = useState(null);
  const [rooms, setRooms] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const fetchDevicesAsync = async () =>{
    const accessToken = GetAccessToken();
    // if(!accessToken) return;
    try {
        const res = await fetch(ENDPOINT + "/get_devices", {
            method:"POST", 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({accessToken:"<DUMMY>"})
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
    fetchDevicesAsync();
  },[])

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
    if(!isLoggedIn) return;
    try {
        const res = await fetch(ENDPOINT + "/get_wstoken", {
            method:"POST", 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({accessToken: GetAccessToken()})
        }).then(r => r.json());
        if(res.success){
            SetWsToken(res.wstoken)
        }
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    fetchWsTokenAsync();
  }, [isLoggedIn])


  return (
    <GlobalContext.Provider
      value={{
       rooms,
       devices,
       loginAsync,
       isLoggedIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
