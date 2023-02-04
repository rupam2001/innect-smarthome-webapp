import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { Home, Notifications, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function BottomTab(){
    const [value, setValue] = useState(0)
    const navigate = useNavigate()

    const onClickTab = (tabname) =>{
        
        switch (tabname) {
            case "Rooms":
                navigate("/rooms");
                
                break;
            case "Notifications":
                navigate("/notifications");
                break;
            case "Profile":
                navigate("/profile");
                break;
            default:
                break;
        }
    }

    return (
        <div className='bg-white  border-gray-400 border-t-2 fixed bottom-0 w-full'>
             <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue)
                }}
            >
                <BottomNavigationAction label="Rooms" icon={<Home/>} onClick={()=>onClickTab("Rooms")}/>
                <BottomNavigationAction label="Notifications" icon={<Notifications/>} onClick={()=>onClickTab("Notifications")} />
                <BottomNavigationAction label="Profile" icon={<AccountCircle/>} onClick={()=>onClickTab("Profile")}/>
            </BottomNavigation>
        </div>
    )
}