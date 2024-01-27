import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {IoSend} from "react-icons/io5";
import { wsURL } from '../../../../services/api/axios_config';
import {UserCircleIcon } from '@heroicons/react/24/outline'


function Chat() {
    const room_id = localStorage.getItem('thread_id');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);
    const token = localStorage.getItem('accessToken')


    const user = JSON.parse(localStorage.getItem('user'))
    const endPoint = useMemo(
    () => {
        return `${wsURL}/ws/chat/${room_id}/?token=${token}`;
    },
    [room_id]

);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


const chatSocket = useMemo(()=> new WebSocket(endPoint),[endPoint])

const sendMessage = useCallback((e)=>{
    e.preventDefault()
    if(!message) return
    
    const jsonStr = JSON.stringify({
        message,
        user:user
    })
    chatSocket.send(jsonStr)
    setMessage('')
},[chatSocket,message,user])

chatSocket.onmessage = (message)=>{
    const msg = JSON.parse(message.data)
    
    setMessages((pre)=>{
        return [...pre,msg]
    })
    console.log(message,msg)
}




  
  return (
   
       
    <div className={'p-2 relative bg-slate-900 m-2 rounded gap-2 flex flex-col h-80 w-64'}>
            <div className={'w-full gap-2 flex h-min flex-col'}>
                <h3 className={'font-semibold text-white'}>Messages</h3>
                <hr width={'100%'} className={'border'}/>
            </div>
            <div className={'overflow-y-scroll overflow-x-hidden h-[calc(100vh-540px)] md:h-[calc(100vh-455px)] w-full'} >
                <div className={'flex flex-col gap-2'}>
                    {
                        messages.map((message, index) => (
                            <div
                                key={index}
                                ref={index === messages.length - 1 ? lastMessageRef : null}
                                className={`flex flex-col gap-1 w-full ${message.user.id === user.id ? 'items-end' : 'items-start'}`}
                            >
                                {message.user.id === user.id ? 
                                <span className={'font-thin text-white'}>You</span> :
                                <span className={'font-thin text-white'}>{message.user.name}</span>}
                                <div
                                    className={`flex w-full items-center gap-2 ${message.user.id === user.id ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {message.user.image ? <img
                                        src={message.user.image}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    /> :
                                    <UserCircleIcon className="w-8 h-8 text-gray-400"/>
                                    }
                                    <div className={'flex flex-col'}>
                                        <span
                                            className={
                                                `px-2 py-1 w-full h-max overflow-x-hidden rounded ${
                                                    message.user.id === user.id ? 
                                                        ' bg-black text-white' : ' bg-dark-logo-green text-white'
                                                }`
                                            }
                                        >
                                            {message.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <form className={'w-full h-min relative'} onSubmit={sendMessage}>
                <input
                    type={'text'}
                    placeholder={'Type a message'}
                    className={'w-full rounded shadow h-full p-2 bg-secondary dark:bg-dark-secondary focus:outline-0 text-black dark:text-white'}
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                />
                <button
                    type={'submit'}
                    className={'text-logo-yellow dark:text-dark-logo-yellow absolute right-0 h-full p-1'}
                    
                >
                    <IoSend/>
                </button>
            </form>
        </div>
       
  );
}

export default Chat;
