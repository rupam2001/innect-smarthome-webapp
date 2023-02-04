import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InAppLayout from '../layouts/InAppLayout';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from "react-router-dom";
import { DUMMY_ROOMS } from '../data/dummy_data';
import { FormControlLabel, Switch } from '@mui/material';
import IOSSwitch from '../components/switch';
import { IsDeviceOnline } from '../utils/helpers';
import { CircleRounded } from '@mui/icons-material';


export default function DevicesScreen(){
    const [searchParams] = useSearchParams();
    const [roomId, setRoomId] = useState(searchParams.get("room_id"))
    const [roomTitle, setRoomTitle] = useState(searchParams.get("title"))
    const [roomData, setRoomData] = useState(null)


    const getRoomDataAsync = async () =>{
        return new Promise(resolve => resolve(DUMMY_ROOMS.find(v => v._id == roomId)))
    }

    useEffect(()=>{
        setup();
    },[])
    const setup = async() =>{
        setRoomData(await getRoomDataAsync())
    }

    


    return (
        <InAppLayout>
            <div className='m-2 text-green-500'>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link to={"/rooms"} >
                    <span className='text-green-500'>
                        {roomTitle}
                    </span>
                </Link>
                <Typography color="text.primary">Devices:</Typography>
             </Breadcrumbs>
            </div>
            <div className='m-2'>
                { roomData && roomData.devices.map(device => (
                    <div className='m-2'>
                        <div className='my-2 flex items-center'>
                            <div className='font-bold'>Device {device._id}:</div>
                            <div className='mx-2 font-bold'>
                                { IsDeviceOnline() && <CircleRounded style={{fontSize:"small", color:"#22c55e"}} />}
                                { !IsDeviceOnline() && <CircleRounded style={{fontSize:"small", color:"#e11d48"}} />}
                            </div>

                        </div>
                        <hr/>
                        {
                            device.switches.map(s => (
                                <div className='flex w-full justify-between my-4 items-center'>
                                    <div className='text-xl'>{s.title}</div>
                                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </InAppLayout>
    )
}