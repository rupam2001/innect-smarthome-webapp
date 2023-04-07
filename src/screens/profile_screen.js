import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import InAppLayout from '../layouts/InAppLayout';
import Avatar from '@mui/material/Avatar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Help, Logout, Settings } from '@mui/icons-material';
import { RemoveAccessToken, RemoveWsToken } from '../utils/storage.';
import { useNavigate } from 'react-router-dom';

export default function ProfileScreen(){
    const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()
    const init = async () =>{
        await globalContext.fetchUserDataAsync();
    }
    useEffect(()=>{
        init()
    },[])

    if(!globalContext.userData){
        return <InAppLayout>

        </InAppLayout>
    }

    const handleLogout = () =>{
        RemoveAccessToken()
        RemoveWsToken()
        navigate("/")
        window.location.reload()
    }


    return (
        <InAppLayout>
            <div className='p-4 flex flex-col items-center justify-center pt-20 w-full '>
            <Avatar sx={{bgcolor: "orange", height: 64, width: 64, fontSize:"x-large"}} >{globalContext.userData.name[0]}</Avatar>
                <div className='font-bold my-2 text-xl'> 
                    {globalContext.userData.name}
                </div>
                <div className='font-bold text-gray-400'> 
                    {globalContext.userData.email}
                </div>
                <div className='font-bold text-green-500'> 
                    {globalContext.userData.phone}
                </div>


                <div className='w-full mt-4' >
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Help />
                                </ListItemIcon>
                                <ListItemText primary="Help" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="About us" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>

            </div>
        </InAppLayout>
    )
}