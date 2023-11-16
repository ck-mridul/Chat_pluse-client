import React from 'react'
import AdminUserlist from '../Componets/AdminUserlist'
import Navbar from '../Componets/Navbar'
// import { useSelector } from 'react-redux'
// import { selectUser } from '../Redux/userSlice'
// import { useNavigate } from 'react-router-dom'



function Adminuserlist() {
    // const user = useSelector(selectUser)
    // const navigate = useNavigate()
    
  return (
    <div>
        <Navbar/>
        <AdminUserlist/>
    </div>
  )
}

export default Adminuserlist