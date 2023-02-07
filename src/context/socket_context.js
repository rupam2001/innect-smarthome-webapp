import React, { useEffect, useState } from "react";
// import { Alert } from "react-native";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
// import {
//   getAccessTokenAsync,
//   getDeviceIdAsync,
//   getWsTokenAsync,
// } from "../storage/authdata";

const SocketContext = React.createContext(null);

const test_wstoken = "wstoken123"

export default function SocketContextProvider({ children, isLoggedIn }) {
  const [ws, setWs] = useState(new WebSocket(SOKETENDPOINT));
  const [messageQueue, setMessageQueue] = useState([]);
  const [onMessage, setOnMessage] = useState(null);
  const [sendMsgQueue, setSendMsgQueue] = useState([]);

  const init = () => {
    if (ws && ws.OPEN && !ws.CONNECTING) {
      ws.addEventListener("close", handleClose);
      ws.addEventListener("error", handleError);
      ws.addEventListener("message", handleOnMessage);
      ws.addEventListener("open", async () => {
        //get the initial states of all the devices
        sendMessage(
          JSON.stringify({
            app_init: true,
            wstoken: test_wstoken
          })
        );
      });
    }
  };
  useEffect(() => {
    init();
  }, [ws]);

  const handleClose = () => {
    reconnect();
  };

  const handleError = (event) => {
    // console.error(event);
    console.log("error, reconnecting...", event);
    reconnect();
  };
  const reconnect = () => {
    setWs(new WebSocket(SOKETENDPOINT));
    init();
  };

  const handleOnMessage = ({ data }) => {
    // if (onMessage) onMessage(data);
    onIncommingMessage(data)
    const jsonData = JSON.parse(data);

    // let oldMessagesQueue = [...messageQueue];
    // oldMessagesQueue.push(jsonData);
    // setMessageQueue(oldMessagesQueue);
    console.log(jsonData, "handleOnMessage")
  };

  const onIncommingMessage = (msg) =>{
    const jsonData = JSON.parse(msg);
    const {init_success, updateState} = jsonData;
    if(init_success){
        //ask for getStates
        getStates();
        console.log("getStates send")
        return
    }
    if(updateState){
        let oldMessagesQueue = [...messageQueue];
        oldMessagesQueue.push(jsonData);
        setMessageQueue(oldMessagesQueue);
        console.log(messageQueue, jsonData, "messagequeus, jsondata")
        return;
    }
    


  }


  const getStates = () =>{
    sendMessage(JSON.stringify({getStates: true, wstoken: test_wstoken}))
  }

  const sendMessage = (msg) => {
    // console.log(ws);
    msg = JSON.parse(msg)
    msg = {...msg, wstoken: test_wstoken}
    msg = JSON.stringify(msg)
    if (!ws) {
      reconnect();
    }
    try {
      ws.send(msg);
      console.log("message sent")
    } catch (error) {
      console.log(error);
    }
  };

  const toogleSwitch = (msg) =>{

  }


  return (
    <SocketContext.Provider
      value={{
        messageQueue,
        setMessageQueue,
        sendMessage,
        setOnMessage,
        ws,
        reconnect,
        init,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext };
