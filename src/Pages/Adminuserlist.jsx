import React from 'react'
import AdminUserlist from '../Componets/AdminUserlist'
import Navbar from '../Componets/Navbar'
import SidePanle from '../Componets/Admin/SidePanle'
// import { useSelector } from 'react-redux'
// import { selectUser } from '../Redux/userSlice'
// import { useNavigate } from 'react-router-dom'



function Adminuserlist() {
    // const user = useSelector(selectUser)
    // const navigate = useNavigate()
    
  return (
    <div className='h-screen bg-gray-600'>
        <Navbar/>
        <div className='flex'>

        <SidePanle/>
        <AdminUserlist/>
        </div>
    </div>
  )
}

export default Adminuserlist