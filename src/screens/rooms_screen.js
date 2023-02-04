import React, { useEffect, useState } from 'react';
import { DUMMY_ROOMS } from '../data/dummy_data';
import InAppLayout from '../layouts/InAppLayout';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

import useLongPress from "../utils/useLongPress";
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';


export default function RoomsScreen(){

    const [rooms, setRooms] = useState([])
    const navigate = useNavigate()


    
    const onLongPress = ()=>{
       
    }
    const onClickRoom = (e) =>{
       
        navigate({pathname:"/devices", search: createSearchParams({room_id: e._id, title: e.title}).toString()})
    }

    const longPressEvent = useLongPress(onLongPress, (e) => { }, { shouldPreventDefault: !true, delay: 500})

    const getRoomsAsync = async () =>{
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve(DUMMY_ROOMS)
            }, 1000);
        })
    }


    useEffect(()=>{
        setup();
    },[])

    const setup = async () =>{
        setRooms(await getRoomsAsync());
    }

    if(rooms.length == 0) 
    return (
        <InAppLayout>
            <div className='h-screen flex justify-center items-center'>
                <Circles
                    height="70"
                    width="70"
                    color="#0ea5e9"
                    ariaLabel="circles-loading"
                    wrapperStyle={{ marginBottom:"4rem"}}
                    wrapperClass=""
                    visible={true}
                    
                    />
            </div>
        </InAppLayout>
        )
    

    return (
            <InAppLayout>
                <div className='m-2 overflow-auto pb-32' >
                    <div className='font-bold text-green-500'>Your Rooms:</div>
                    <Box sx={{ width: '100%', marginTop:"1rem" }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {rooms.map(room => 
                                <Grid item xs={6} {...longPressEvent}>
                                    <div onClick={(e) => onClickRoom(room)}>
                                        <Item>{room.title}</Item>
                                    </div>
                                </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                            
                </div>
            </InAppLayout>
    )
}

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Item = ({children}) => (
    <Card style={{ height:"7rem", display:"flex", "justifyContent":"center", "alignItems":"center"}}>
        {children}
    </Card>
)