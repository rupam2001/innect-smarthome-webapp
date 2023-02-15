import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InAppLayout from '../layouts/InAppLayout';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from "react-router-dom";
import { DUMMY_ROOMS } from '../data/dummy_data';
import { FormControlLabel, Switch } from '@mui/material';
import IOSSwitch from '../components/switch';
import { getDeviceIDForUI, IsDeviceOnline } from '../utils/helpers';
import { CircleRounded, PlayArrow } from '@mui/icons-material';
import { GlobalContext } from '../context/context';
import { SocketContext } from '../context/socket_context';


export default function DevicesScreen(){
    const [searchParams] = useSearchParams();
    const [roomId, setRoomId] = useState(searchParams.get("room_id"))
    const [roomTitle, setRoomTitle] = useState(searchParams.get("title"))
    const [roomData, setRoomData] = useState(null)
    const [devicesFromSocket, setDevicesFromSocket] = useState([])

    const globalContext = useContext(GlobalContext);
    const socketContext = useContext(SocketContext);

    const processSwitchStates = () =>{
        const {messageQueue} = socketContext;
        if(!messageQueue) return;

        let _dFS = [...devicesFromSocket]
        let msgQ_removeIndices = []
        messageQueue.forEach((mq, m_index) =>{
            if(mq.updateState || mq.init){
                //push or if exist delete, then push
                let i = devicesFromSocket.findIndex(d => d.device_id == mq.device_id)      
                if(i != -1){
                    _dFS[i] = mq;
                }else{    
                    _dFS.push(mq);
                }
                msgQ_removeIndices.push(m_index);
            }
            
        })
        setDevicesFromSocket(_dFS);
        console.log(_dFS, "socket data");  
    
   }
   useEffect(()=>{
        processSwitchStates();

   },[socketContext.messageQueue])



    const getRoomDataAsync = async () =>{
        return new Promise(resolve => resolve(globalContext.rooms?.find(v => v._id == roomId)))
    }

    useEffect(()=>{
        setup();
    },[globalContext.rooms])
    const setup = async() =>{
        setRoomData(await getRoomDataAsync())
    }

    
    const getSwitchState = (device, s) =>{
        
        const d = devicesFromSocket.find(each_dFS => {
            return device._id == each_dFS.device_id;
        })
        
        console.log(d, "switch state", devicesFromSocket, device._id, s.id, d?.states[s.id])
        if(d) return d.states[s.id]
        console.log("yes")
        return false
    }
    const handleSwitchToggle = (e, device, s) =>{
        const {sendMessage} = socketContext;
        sendMessage(JSON.stringify({is_command: true, device_id: device._id, command: s.id}))
    }
    const getDeviceStatus = (device) =>{
        const d = devicesFromSocket.findIndex(each_dFS => {
            return device._id == each_dFS.device_id;
        })
        return d != -1;
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
            <div className='m-2 mb-24'>
                { roomData && roomData.devices.map(device => (
                    <div className='m-2 '>
                        <div className='my-2 flex items-center'>
                            <div className='font-bold'> 
                                <span>
                                    Device {getDeviceIDForUI(device)}:
                                </span>
                            </div>
                            <div className='mx-2 font-bold'>
                                { getDeviceStatus(device)&& <CircleRounded style={{fontSize:"small", color:"#22c55e"}} />}
                                { !getDeviceStatus(device)&& <CircleRounded style={{fontSize:"small", color:"#e11d48"}} />}
                            </div>
                        </div>
                        <hr className='bg-sky-400'/>
                        {
                            device.switches.map(s => (
                                <div className='flex w-full justify-between my-4 items-center' key={s._id}>
                                    <div className='text-xl text-sky-400 font-bold'>{s.title}</div>
                                    <IOSSwitch sx={{ m: 1 }} checked={getSwitchState(device, s)} onChange={(e) => handleSwitchToggle(e, device, s)} />
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </InAppLayout>
    )
}