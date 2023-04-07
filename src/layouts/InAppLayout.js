import React from 'react';
import AppBar from '../components/appbar';
import BottomTab from '../components/bottomTab';
import SocketContextProvider, { SocketContext } from '../context/socket_context';
export default function InAppLayout({children}){


    return (
        
                <div>
                    <AppBar/>
                    <div className='h-14'></div>
                    <div style={{}}>
                        {children}
                    </div>
                    <BottomTab/>
                </div>
      
            
    )
}