import React from 'react'
import Contactlist from '../Componets/RoomComponets/Home/Contactlist'
import Chat from '../Componets/RoomComponets/Home/Chat'
import Navbar from '../Componets/Navbar'
import { ChangeEffectProvider } from '../Componets/RoomComponets/Home/Context'

function Home1Page() {
  return (
    <>
        <Navbar/>
    <div className='flex '>
      <ChangeEffectProvider>
        <Contactlist/>
        <Chat/>
      </ChangeEffectProvider>
    </div>
    </>
  )
}

export default Home1Page