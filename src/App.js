import React, { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SpalshScreen from "./screens/spalsh_screen";
import LoginScreen from "./screens/login_screen";
import RoomsScreen from "./screens/rooms_screen";
import DevicesScreen from "./screens/devices_screen";
import SocketContextProvider from "./context/socket_context";
import NotificationScreen from "./screens/notification_screen";
import ProfileScreen from "./screens/profile_screen";
import { GlobalContext } from "./context/context";
import ClearCacheScreen from "./screens/clearCache_screen";
import WifiScreen from "./screens/wifi_screen";

function App() {
  const globalContext = useContext(GlobalContext);

  if (!globalContext.isLoggedIn)
    return (
      <div className="">
        <Routes>
          <Route path="/" element={<SpalshScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    );

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SpalshScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/rooms" element={<RoomsScreen />} />
        <Route path="/devices" element={<DevicesScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/clear_cache" element={<ClearCacheScreen />} />
        <Route path="/wifi" element={<WifiScreen />} />
      </Routes>
    </div>
  );
}

const AuthProtectedRoute = ({ children }) => {
  const globalContext = useContext(GlobalContext);
  if (globalContext.isLoggedIn) return children;
  return <></>;
};

export default App;
