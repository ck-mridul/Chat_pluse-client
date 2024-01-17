import React from 'react'
import RoomComponent from '../Componets/RoomComponent'
import VideoCall from '../Componets/RoomComponets/LargeScreen/VideoCall'
import Navbar from '../Componets/Navbar'


function RoomPage() {

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