import React, { useContext } from 'react';
import { Radio } from 'react-loader-spinner';
import Logo from "../components/logo"
import { SocketContext } from '../context/socket_context';
import { UIContext } from '../context/ui_context';
export default function AppBar(){
    const uiContext = useContext(UIContext)
    const socketContext = useContext(SocketContext)
    return (
        <div className='h-14 w-full  p-2 flex items-center fixed top-0 z-10  border-b-2 border-b-sky-400' style={{backgroundColor: uiContext.currentTheme.primary}}>
            <div className='text-2xl text-sky-400 flex-1 '>
                <Logo/>
            </div>

            {!socketContext.ws?.OPEN && 
                <Radio
                visible={true}
                height="35"
                width="35"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass="radio-wrapper"
              />
            }

        </div>
    )
}