import React from 'react'
import Navbar from '../Componets/Navbar'
import AutherizedHome from '../Componets/AutherizedHome'
import {useSelector} from 'react-redux'
import {selectUser} from '../Redux/userSlice'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  return (

    <div className={'w-screen min-h-screen md:h-screen  flex flex-col'}>
        {user ? 
        <>
        <Navbar />
        <AutherizedHome />
        </>
         :navigate('/login')}
    </div>


  )
}

export default HomePage