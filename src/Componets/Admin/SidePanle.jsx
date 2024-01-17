import React from 'react'
import { useNavigate } from 'react-router-dom'

function SidePanle() {
    const navigate = useNavigate()
  return (
    <div className={'p-2 relative bg-slate-700 m-2 rounded gap-2 flex flex-col  w-64'}>
        <div className='p-3 bg-slate-800 h-14 text-center rounded-lg'>
        <span onClick={()=>navigate('/admin')} className='text-white '>Dashboard</span>
        </div>
        <div className='p-3 bg-slate-800 h-14 text-center rounded-lg'>
        <span onClick={()=>navigate('/user')} className='text-white '>Users</span>
        </div>
    </div>
  )
}

export default SidePanle