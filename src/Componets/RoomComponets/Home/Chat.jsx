import React, { useEffect, useMemo, useState, useRef } from 'react'
import { IoVideocamOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { useSelector } from 'react-redux';
import axiosAuth, { baseURL } from '../../../services/api/axios_config';
import { wsURL } from '../../../services/api/axios_config';
import chat_img from '../../../assets/logo/chat_img.webp'
import Dropdown from './Dropdown';
import { MdCall,MdCallEnd } from "react-icons/md";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; 
import MediaPreviewModal from '../../Modals/sendMedias';
import { IoSend } from "react-icons/io5";




function Chat() {
  const peer = useSelector((state) => state.peer.peer);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [call, setCall] = useState();
  const [media, setMedia] = useState();
  const lastMessageRef = useRef(null);
  
  const user = JSON.parse(localStorage.getItem('user'))
  const Tid = peer.Tid
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')
 
  const webSocket = useMemo(() => new WebSocket(wsURL+`/ws/peerchat/${user.id}/?token=${token}`), []);

  useEffect(() => {
    if(Tid){
      axiosAuth.post('/peerchat/getallmsg/',{Tid}).then((res)=>{
        setMessages(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    
  }, [peer,Tid]);

  useEffect(() => {
    if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [messages]);


const declineNotification = () => {
    toast.error('Call Rejected!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
    });
  };

  const handleSendMsg = (e)=>{
    e.preventDefault()
    const data = JSON.stringify({
      message:msg,
      sent_by:user.id,
      send_to:peer.userId,
      thread_id:Tid
    })
    webSocket.send(data)
    setMsg('')

  }

  const sendMedia = ()=>{ 
    let formData = new FormData
    let media_type
    if(media.type.startsWith('image')){
      media_type = 'image'
    }else if(media.type.startsWith('video')){
      media_type = 'video'
    }else{
      media_type = 'other'
    }
    
    formData.append('media',media)
    console.log(formData, 'media-',media)
    const data = JSON.stringify({
      media : formData, 
      sent_by:user.id,
      send_to:peer.userId,
      thread_id:Tid,
      media_type:media_type
    })
    webSocket.send(data)
    setMedia()
  }

  const handleVideoCall = ()=>{
    const data = JSON.stringify({
      videocall : 'call',
      sent_by:user.id,
      sent_by_name:user.name,
      send_to:peer.userId,
      thread_id:Tid
    })
    webSocket.send(data)
  }


  const handleDecline = ()=>{
    const data = JSON.stringify({
      videocall : 'decline',
      sent_by:user.id,
      send_to:call.user_by_id,
    }) 
    webSocket.send(data)
    setCall()
  }

  const handleAnswer = ()=>{
    const data = JSON.stringify({
      videocall : 'answer',
      sent_by:user.id,
      send_to:call.user_by_id,
      thread_id:call.thread_id
    })
    webSocket.send(data)
    localStorage.setItem('thread_id',call.thread_id)
    navigate('/videocall')
  }



  webSocket.onmessage = (message)=>{
    const msg = JSON.parse(message.data)
     if(msg.type === 'call'){
       setCall(msg) 
       return 
     }
     else if(msg.type === 'decline'){
       declineNotification()
      return 
     }
     else if(msg.type === 'answer'){
      localStorage.setItem('thread_id',msg.thread_id)
      navigate('/videocall')
     return 
    }
     
    setMessages(prevMessages => [...prevMessages, msg]);

}


  if (peer.Tid) {

    return (
      <>

{call && <div class="bg-white  p-4 rounded-md shadow-md items-center flex gap-4 justify-center fixed top-4 right-4 shadow-xl ">
          <p className='text-stone-800 text-lg font-medium'>Call from {call.user_by_name}</p>
          <div onClick={handleAnswer} className='rounded-full w-10  h-10 bg-green-500 items-center flex  justify-center cursor-pointer'>
          <MdCall className='text-white'/>
          </div>
 
          <div onClick={handleDecline} className='rounded-full w-10  h-10 bg-red-500 items-center flex  justify-center cursor-pointer'>
          <MdCallEnd className='text-white'/>
          </div>
      </div>}
    <div className=" w-full bg-slate-300 flex flex-col ">
      <div className='w-full bg-white items-center flex h-16 border'>
        <div className='rounded-full border overflow-hidden ms-2 h-12 w-12 '>
        {peer.image ?<img 
                        src={baseURL+peer.image}
                        alt=""
                        /> : <FaUserCircle className='text-stone-400' size={45}/>}
        </div> 
        <div className='borde ms-10 gap-0 flex-col w-auto h-10'>
        <h3 className=' tracking-wide text-slate-600 font-medium text-xl font-sans'>{peer.name}</h3>
        <p className='text-slate-400 text-sm  font-sans'>{peer.email}</p>
        </div>
        <div className='me-4 gap-5 flex ml-auto'>
        <IoVideocamOutline className='text-slate-500 cursor-pointer' size={30} onClick={handleVideoCall} />
        <Dropdown threadId={Tid} />
        </div>
      </div>
      
      {media && (<MediaPreviewModal media={media} onClose={()=>setMedia()} sendMedia={sendMedia}/>)}
      <div className=' overflow-y-auto h-[470px] w-full p-5'>
        <div className='p-5 ms-5 overflow-y-  me-5 flex-col flex'>
          {messages.map((message,index)=>(
            <div
            key={index} 
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`m-3  w-96 ${message.userId == user.id ? 'ml-auto' : ''} flex`}
              >
            <div className={`rounded-lg  p-3 px-5 ${message.userId == user.id ? 'ml-auto bg-sky-500' : 'bg-blue-300'} text-xl text-stone-800 max-w-64 overflow-auto break-all inline-block`}>
              {message.message}
            </div>
            {/* <div className='text-sm mt-1  text-slate-600 inline-block'>
              Extra Text
            </div> */}
          </div>
          
          
          
          
          ))}

        </div>
        
      </div>
          

        <form onSubmit={handleSendMsg}>
      <div className='mt-auto items-center ps-5 pe-5 flex justify-center ' >
          <div className='rounded-full items-center flex  justify-center  bg-white w-full h-14 mb-3'>
            <input type="text" placeholder='Message' value={msg} onChange={e=>setMsg(e.target.value)} className={' w-11/12    focus:outline-0  rounded-md'}/>
            {/* <label htmlFor="fileInput">
            <input id="fileInput" onChange={(e)=>setMedia(e.target.files[0])} accept="image/*, video/*" type="file" className='hidden' />
            <GrAttachment className='cursor-pointer' size={20}/>
            </label> */}
            <button type='submit'><IoSend className='text-stone-700' size={22}/></button>
          </div>

      </div>
        </form>

    </div>

    
 </>
  )
}else{
            return ( 
            <>
              {call && <div class="bg-white  p-4 rounded-md shadow-md items-center flex gap-4 justify-center fixed top-4 right-4 shadow-xl ">
                  <p className='text-stone-800 text-lg font-medium'>Call from {call.user_by_name}</p>
                  <div onClick={handleAnswer} className='rounded-full w-10  h-10 bg-green-500 items-center flex  justify-center cursor-pointer'>
                  <MdCall className='text-white'/>
                  </div>
        
                  <div onClick={handleDecline} className='rounded-full w-10  h-10 bg-red-500 items-center flex  justify-center cursor-pointer'>
                  <MdCallEnd className='text-white'/>
                  </div>
                  </div>}
             
              <div className=" w-full bg-slate-300 items-center justify-center flex flex-col">
                <div className='w-64 h-64'>
                  <img src={chat_img} alt="" />
                </div>
                  <h3 className='text-slate-700 text-4xl font-bold'>Web Connect</h3>
              </div>
              </>
            )
          }
}

export default Chat