import React from 'react'
import RoomComponent from '../Componets/RoomComponent'
import VideoCall from '../Componets/RoomComponets/LargeScreen/VideoCall'
import Navbar from '../Componets/Navbar'
import VideocallSocket from '../services/webSocket/VideocallSocket'
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice'
import { useParams } from 'react-router-dom'


function RoomPage() {
  const user = useSelector(selectUser)
  const room_id = useParams()

  return (
    <>
    <Navbar/>
    <div className='flex '>
      <RoomComponent/>
    <VideocallSocket room_id={room_id.room_id} username={user.name}>
      <VideoCall/>
      </VideocallSocket>
    </div>
    </>
  )
}

export default RoomPage