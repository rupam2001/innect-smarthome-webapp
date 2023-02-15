import React, { useContext, useEffect, useState } from "react";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
import { GetWsToken } from "../utils/storage.";
import { GlobalContext } from "./context";


const SocketContext = React.createContext(null);

// const GetWsToken() = "wstoken123"

export default function SocketContextProvider({ children }) {
  const [ws, setWs] = useState(null);
  const [messageQueue, setMessageQueue] = useState([]);
  const [onMessage, setOnMessage] = useState(null);
  const [sendMsgQueue, setSendMsgQueue] = useState([]);
  const [wsStatus, setWsStatus] = useState(false)

  const globalContext = useContext(GlobalContext);

  const establishSocketConn = () =>{
    setWs(new WebSocket(SOKETENDPOINT));
  }

  const init = () => {
    console.log(globalContext.isLoggedIn, globalContext.isWsTokenAvailable, "init()")
    if(!globalContext.isLoggedIn) return;
    if(!globalContext.isWsTokenAvailable) return;

    if (ws && ws.OPEN && !ws.CONNECTING) {
      ws.addEventListener("close", handleClose);
      ws.addEventListener("error", handleError);
      ws.addEventListener("message", handleOnMessage);
      ws.addEventListener("open", async () => {
        //get the initial states of all the devices
        sendMessage(
          JSON.stringify({
            app_init: true,
            wstoken: GetWsToken()
          })
        );
      });
    }
  };
  useEffect(() => {
    if(!globalContext.isLoggedIn) return;
    if(!globalContext.isWsTokenAvailable) return;
    if(!ws){
      establishSocketConn();
    }
    init();

  }, [ws, globalContext.isWsTokenAvailable, globalContext.isLoggedIn]);
  


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
    sendMessage(JSON.stringify({getStates: true, wstoken: GetWsToken()}))
  }

  const sendMessage = (msg) => {
    // console.log(ws);
    msg = JSON.parse(msg)
    msg = {...msg, wstoken: GetWsToken()}
    msg = JSON.stringify(msg)
    if (!ws) {
      reconnect();
    }
    try {
      ws.send(msg);
      console.log("message sent", msg)
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
