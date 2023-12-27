import React from 'react'
import RoomComponent from '../Componets/RoomComponent'
import VideoCall from '../Componets/RoomComponets/LargeScreen/VideoCall'
import Navbar from '../Componets/Navbar'
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
      <VideoCall/>
    </div>
    </>
  )
}

export default RoomPage