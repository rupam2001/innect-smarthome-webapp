import React, { useContext, useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { Home, Notifications, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UIContext } from '../context/ui_context';


export default function BottomTab(){
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    const uiContext = useContext(UIContext)

    const onClickTab = (tabname) =>{
        
        switch (tabname) {
            case "Rooms":
                navigate("/rooms");
                uiContext.setCurrentTab(0)
                setValue(0)
                break;
            case "Notifications":
                navigate("/notifications");
                uiContext.setCurrentTab(1)

                setValue(1)
                break;
            case "Profile":
                navigate("/profile");
                uiContext.setCurrentTab(2)

                setValue(2)
                break;
            default:
                break;
        }
    }
    useEffect(()=>{
        console.log(value, 'value')
    },[value])
    

    return (
        <div className='bg-white  border-gray-400 border-t-2 fixed bottom-0 w-full'>
             <BottomNavigation
                showLabels
                value={uiContext.currentTab}
                onChange={(event, newValue) => {
                // setValue(newValue)
                }}
                
            >
                <BottomNavigationAction label="Rooms" icon={<Home/>} onClick={()=>onClickTab("Rooms")}/>
                {/* <BottomNavigationAction label="Notifications" icon={<Notifications/>} onClick={()=>onClickTab("Notifications")} /> */}
                <BottomNavigationAction label="Profile" icon={<AccountCircle/>} onClick={()=>onClickTab("Profile")}/>
            </BottomNavigation>
        </div>
    )
}