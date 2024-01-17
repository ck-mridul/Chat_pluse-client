import React from 'react'

function Dashboard() {
  return (
    <div className='flex h-96 w-full bg-gray-700  mt-5 me-4 rounded-lg shadow'>

        <div className='m-5 h-20 rounded-lg bg-gray-800' >
            <span className='text-white m-3'>Tota User</span>
            <span className='flex text-2xl ms-8 mt-3 text-white'>6</span>
        </div>
        {/* <div className='m-5 h-20 rounded-lg bg-gray-800' >
            <span className='text-white m-3'>Total meeting</span>
            <span className='flex text-2xl ms-8 mt-3 text-white'>6</span>
        </div> */}
        
    </div>
  )
}

export default Dashboard