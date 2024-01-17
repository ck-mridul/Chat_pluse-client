import React from 'react'
import SidePanle from '../Componets/Admin/SidePanle'
import Navbar from '../Componets/Navbar'
import Dashboard from '../Componets/Admin/Dashboard'

function DashboardPage() {
  return (
    <div className='h-screen bg-gray-600'>
        <Navbar/>
        <div className='flex'>
        <SidePanle/>
        <Dashboard/>
        </div>
    </div>
  )
}

export default DashboardPage
