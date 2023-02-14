import React, { useEffect, useState } from "react";
import { ENDPOINT, SOKETENDPOINT } from "../constants";
import { GetAccessToken, GetWsToken, SetAccessToken, SetWsToken } from "../utils/storage.";


const UIContext = React.createContext(null);


export default function UIContextProvider({ children}) {
  const themes = {
    light:{primary: "#1e40af", secondary:"#16a34a", minor:"#52525b", text1:"white", text2:"#171717", danger:"red"},
    dark:{primary:"#171717", secondary:"#16a34a", minor:"#52525b", text1: "white", text2:"#a8a29e", danger:"red"}
  }
  const [currentTheme, setCurrentTheme] = useState(themes.light)
  const [currentTab, setCurrentTab] = useState(0)



  return (
    <UIContext.Provider
      value={{
       currentTheme,
       currentTab,
       setCurrentTab
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export { UIContext };
