import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logo';
export default function SpalshScreen(){
    //@TODO autoauth

    const navigator = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            navigator("/login");
        }, 2000);
    },[])
    
    return (
    <div className='flex justify-center items-center w-full min-h-screen bg-blue-400'>
        <div className='text-4xl text-white'>
            <Logo/>
        </div>
    </div>
    )
}