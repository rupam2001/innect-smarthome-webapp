import React from 'react';
import Logo from "../components/logo"
export default function AppBar(){
    return (
        <div className='h-14 w-full bg-blue-400 p-2 flex items-center text-2xl text-white fixed top-0 z-10'>
            <Logo/>
        </div>
    )
}