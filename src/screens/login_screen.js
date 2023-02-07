import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import Logo from "../components/logo"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ValidateEmail, ValidatePassword } from '../utils/validations';
import { GlobalContext } from '../context/context';

export default function LoginScreen(){
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const [isDisableLoginBtn, setIsDisableLoginBtn] = useState(true)

    const globalContext = useContext(GlobalContext);


    const navigate = useNavigate()

    useEffect(()=>{
        setIsDisableLoginBtn(!(ValidateEmail(email) && ValidatePassword(password)))        
    },[email, password])

    const onClickLogin = async () =>{
        /**
         * 
         * handle login here
         * get the authentication token
         * store it in the localstorage
         */
        await globalContext.loginAsync(email, password);
    }
    useEffect(()=>{
        if(globalContext.isLoggedIn){
            navigate("/rooms")
        }
    },[globalContext.isLoggedIn])



    


    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen bg-blue-400 p-4'>
            <div className='text-4xl text-white mt-20'>
                <Logo/>
            </div>
            <div className='flex-1 w-full flex flex-col mt-32 h-full px-8 text-white'>
                <TextField id="standard-basic" label="Email" variant="standard" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                <TextField id="standard-basic" label="password" variant="standard" onChange={e=>setPassword(e.target.value)}/>
                <div className='w-full flex justify-center mt-4'>
                    <Button variant="outlined" disabled={isDisableLoginBtn} onClick={onClickLogin}>Login</Button>
                </div>
            </div>
        </div>
    )
}