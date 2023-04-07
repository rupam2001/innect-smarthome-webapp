import React from 'react';
import logo from '../logo.png'
export default function Logo({imgStyle}){
    return <div className='flex justify-center items-center'>
            <img src={logo} className=""  style={imgStyle ? imgStyle : {width: "60%"}}/>
    </div>
}