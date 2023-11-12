import React from 'react'
import Navbar from '../Componets/Navbar'
import AutherizedHome from '../Componets/AutherizedHome'
import HomeOut from '../Componets/HomeOut'
import {useSelector} from 'react-redux'
import {selectUser} from '../Redux/userSlice'

function HomePage() {
  const user = useSelector(selectUser)
  return (

    <div className={'w-screen min-h-screen md:h-screen  flex flex-col'}>
        {user ? 
        <>
        <Navbar />
        <AutherizedHome />
        </>
         :<HomeOut/>}
    </div>


  )
}

export default HomePage