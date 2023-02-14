import React, { useContext } from 'react';
import Logo from "../components/logo"
import { UIContext } from '../context/ui_context';
export default function AppBar(){
    const uiContext = useContext(UIContext)
    return (
        <div className='h-14 w-full  p-2 flex items-center text-2xl text-white fixed top-0 z-10' style={{backgroundColor: uiContext.currentTheme.primary}}>
            <Logo/>
        </div>
    )
}