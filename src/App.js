import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import SpalshScreen from './screens/spalsh_screen';
import LoginScreen from "./screens/login_screen"
import RoomsScreen from './screens/rooms_screen';
import DevicesScreen from './screens/devices_screen';
import { SocketContext } from './context/socket_context';
import NotificationScreen from './screens/notification_screen';
import ProfileScreen from './screens/profile_screen';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <SpalshScreen/> } />
        <Route path="/login" element={ <LoginScreen/> } />
        <Route path="/rooms" element={ <RoomsScreen/> } />
        <Route path="/devices" element={ <DevicesScreen/> } />
        <Route path='notifications' element={<NotificationScreen/>}/>
        <Route path='profile' element={<ProfileScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
