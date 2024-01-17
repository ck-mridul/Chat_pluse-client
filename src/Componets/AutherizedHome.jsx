import React, { useState } from 'react'
import { createRoom } from '../services/api/room'
import { useNavigate } from 'react-router-dom'
import axiosAuth from '../services/api/axios_config'


function AutherizedHome() {
    const history = []
    const navigate = useNavigate()
    const [input_id, setInput_id] = useState('');
    const [joinErr, setJoinErr] = useState('');
    
    const create_Room = async () => {
    
        const room_id = await createRoom();

        console.log(room_id)
        navigate(`/room/${room_id}`);
    }
    const joinClassroom =()=>{
        axiosAuth.post('joinroom/',{'room_id':input_id}).then((res)=>{
            navigate(`/room/${input_id}`)

        }).catch((err)=>{
            if (err.response.status === 404){
                console.log('wrong room ig')
            }
        })
    }
    
  return (
    <>
            <main className='flex bg-gray-600 flex-col md:flex-row items-center justify-center h-full gap-3.5 md:gap-0 p-3.5 md:p-0'>
                <div className={'h-full w-full flex justify-center items-center'}>
                    <div className={'w-[90%] md:w-1/2 flex flex-col gap-9'}>
                       
                        <div className={'w-full flex flex-col gap-2.5'}>
                            <div className={'w-full flex flex-row gap-2.5'}>
                                <input
                                    type={'text'}
                                    placeholder={'Enter room id'}
                                    className={'h-10 w-full focus:outline-0 mb-4 text-white bg-dark-primary text-wight p-3 rounded-md'}                                    // value={roomId}
                                    onChange={(e) => setInput_id(e.target.value)}
                                />
                                <button
                                    className="bg-slate-900 text-white ps-2 pe-2 h-10 rounded"
                                    onClick={joinClassroom}
                                >
                                    {/* {joining ? 'Joining...' : 'Join'}*/} Join 
                                </button>
                            </div>
                            <div>
                                <button
                                    className="bg-slate-900 text-white w-full p-2 rounded"
                                    onClick={create_Room}
                                >
                                    Create Room
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'h-full w-full flex justify-center items-center'}>
                    <div
                        className={'w-[90%] md:w-1/2 max-h-full bg-slate-900 flex flex-col shadow rounded-md p-3.5'}>
                        <h3 className={'font-semibold text-white border-b pb-2 mb-2'}>History</h3>
                        <div
                            className={'flex flex-col gap-2.5  overflow-y-auto'}
                            style={{maxHeight: 'calc(100vh - 200px)'}}
                        >
                            {
                                history.length ? history.map((room, index) => (
                                    <div key={index} className={'flex justify-between'}>
                                        <div className={'text-white'}>{room.title}</div>
                                        <div className={'flex flex-row gap-1.5'}>
                                            <span
                                                className={'text-black dark:text-white'}>{room.created_at.toLocaleDateString()}</span>
                                            {/*<span*/}
                                            {/*    className={'text-logo-green dark:text-dark-logo-green cursor-pointer'}>View</span>*/}
                                        </div>
                                    </div>
                                )) : <div className={'text-center italic text-white'}>No history</div>
                            }
                        </div>
                    </div>
                </div>

            </main>
           
    </>
  )
}

export default AutherizedHome