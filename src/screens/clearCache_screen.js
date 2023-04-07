import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoveAccessToken, RemoveWsToken } from '../utils/storage.';

export default function ClearCacheScreen(){
    const navigate = useNavigate()
    useEffect(()=>{

    },[])

    const clearWs = () =>{
        RemoveWsToken()
        navigate("/")
    }
    const clearAll = () =>{
        RemoveAccessToken()
        clearWs()
 
    }

    return <div className='flex flex-col'>
        <button className='m-2 border-2 border-red-600' onClick={clearWs}>clear wstoken</button>
        <button className='m-2 border-2 border-red-600' onClick={clearAll}>clear all</button>
    </div>
}