import React, { useContext, useState } from 'react';
import InAppLayout from '../layouts/InAppLayout';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card, TextField } from '@mui/material';

import useLongPress from "../utils/useLongPress";
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Circles, Rings } from 'react-loader-spinner';
import { GlobalContext } from '../context/context';


import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { UIContext } from '../context/ui_context';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height:"60%",
    p: 4,
    
  };


export default function RoomsScreen(){

    // const [rooms, setRooms] = useState([])
    const navigate = useNavigate()

    const globalContext = useContext(GlobalContext)
    const uiContext = useContext(UIContext)

    //modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [selectedRoom, setSelectedRoom] = useState(null)


    
    const onLongPress = (e)=>{
       setOpen(true)
       setSelectedRoom(e.target.innerText)
       console.log(e.target)
    }
    const onClickRoom = (e) =>{
        navigate({pathname:"/devices", search: createSearchParams({room_id: e._id, title: e.title}).toString()})
    }

    const longPressEvent = useLongPress(onLongPress, (e) => { }, { shouldPreventDefault: !true, delay: 500})


    const handleRoomDetailChangeSubmit = async () =>{
        //
        if(selectedRoom.length < 4) {
            return alert("Room name too short")
        }
        if(selectedRoom.length > 50){
            return alert("Room name too long")
        }
        await globalContext.editRoomDetailsAsync({ title: selectedRoom})
        setOpen(false)
        
    }





    if(!globalContext.rooms) 
    return (
        <InAppLayout>
            <div className='h-screen flex justify-center items-center'>
                <Rings
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
                            {globalContext.rooms?.map(room => 
                                <Grid item xs={6} {...longPressEvent}>
                                    <div onClick={(e) => onClickRoom(room)} className="">
                                        <Item><span className='text-white font-bold'>{room.title}</span></Item>
                                    </div>
                                </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <div className='flex flex-col'>
                                <div className='mb-4 text-xl' style={{color: uiContext.currentTheme.primary}}>Change room details: </div>
                                <TextField id="outlined-basic" label="" variant="outlined" value={selectedRoom} autoFocus={true} onChange={(e)=>{  setSelectedRoom(e.target.value) }}/>
                                
                                <div className='mt-10 flex justify-end'>
                                    <Button variant="text" style={{color: uiContext.currentTheme.secondary}} onClick={handleRoomDetailChangeSubmit}>Ok</Button>
                                    <Button variant="text" style={{color: uiContext.currentTheme.danger}} onClick={handleClose}>Cancel</Button>
                                </div>
                            </div>
                        </Box>
                    </Modal>  
                </div>
            </InAppLayout>
    )
}


const Item = ({children}) => (
    <Card style={{ height:"7rem", display:"flex", "justifyContent":"center", "alignItems":"center", backgroundColor:"#0ea5e9", textAlign:'center'}} className='rounded-sm'>
        {children}
    </Card>
)