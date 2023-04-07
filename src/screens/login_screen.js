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
    const [hasError, setHasError] = useState(null)

    const [isDisableLoginBtn, setIsDisableLoginBtn] = useState(true)

    const globalContext = useContext(GlobalContext);


    const navigate = useNavigate()

    useEffect(()=>{
        setIsDisableLoginBtn(!(ValidateEmail(email) && ValidatePassword(password)))  
        setHasError(null)      
    },[email, password])

    const onClickLogin = async () =>{
        const { success, msg } = await globalContext.loginAsync(email, password);
        if(!success){
            setHasError(msg)
        }
    }
    useEffect(()=>{
        if(globalContext.isLoggedIn){
            navigate("/rooms")
        }
    },[globalContext.isLoggedIn])




    


    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen bg-blue-400 p-4'>
            <div className='text-4xl text-white mt-24 text-center w-full flex justify-center items-center mr-4'>
                <Logo/>
            </div>
            <div className='flex-1 w-full flex flex-col mt-24 h-full px-8 text-white'>
                <TextField id="standard-basic"  label="Email" type={"email"} variant="standard" error={hasError != null}  onChange={(e)=>{
                    setEmail(e.target.value)
                   
                }} />
                <TextField id="standard-basic" label="password" type={"password"} error={hasError != null}   variant="standard" onChange={e=>setPassword(e.target.value)}/>
                <div className='w-full flex justify-center mt-4'>
                    <Button variant="outlined" style={{color:"white" }}  disabled={isDisableLoginBtn} onClick={onClickLogin}>Login</Button>
                </div>
            </div>
        </div>
    )
}