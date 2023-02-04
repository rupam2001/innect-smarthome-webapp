import React, { useEffect, useState } from "react";
// import { Alert } from "react-native";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
// import {
//   getAccessTokenAsync,
//   getDeviceIdAsync,
//   getWsTokenAsync,
// } from "../storage/authdata";

const SocketContext = React.createContext(null);

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
            getStates: true
          })
        );
      });
    }
  };
  useEffect(() => {
    init();
  }, [ws]);

  const handleClose = () => {
    // reconnect();
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
    if (onMessage) onMessage(data);
    const jsonData = JSON.parse(data);
    let oldMessagesQueue = [...messageQueue];
    oldMessagesQueue.push(jsonData);
    setMessageQueue(oldMessagesQueue);
  };

  const sendMessage = (msg) => {
    // console.log(ws);
    if (!ws) {
      reconnect();
    }
    try {
      ws.send(msg);
    } catch (error) {
      console.log(error);
    }
  };

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
