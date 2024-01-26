import React, { useState } from 'react';
import { userProfileUpdate } from '../../services/api/auth';
import {  toast } from 'react-toastify';


const Modal = ({ isOpen, onClose, user }) => {
  
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [usernameErr, setUsernameErr] = useState();
  const [img, setImg] = useState();

  if (!isOpen) return null;



  const errorNotification = (err_msg) => {
    toast.error(err_msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
    });
  };


  const handleSubmit =()=>{
    const formData = new FormData();
    const name_obj = name.trim()
    if(usernameErr)return
    if (name_obj === ''){
      errorNotification('name filed can not empty!')
    }
    formData.append('name',name_obj)
    formData.append('username',username)
    if(img)formData.append('image',img)

    userProfileUpdate(formData).then((res)=>{
        console.log(res)
        onClose()

    })
    .catch((e)=>{
      console.log(e)
      if (e.response.status === 406){
        errorNotification(e.response.data.error)
      }
    })
  }

  const handleUsername = (e)=>{
    const username = e.target.value.trim()
    setUsername(username)
    if(username.trim() === ''){
      setUsernameErr()
      return
    }
    if(!username[0].match(/[a-zA-Z]/)){
      console.log('errjhj')
      setUsernameErr('Invalid username!')
    }else if(username.length < 3) setUsernameErr('username have min 3 letter')
    else setUsernameErr()
  }

  return (
    
    <div className="fixed z-10  inset-0 overflow-y-auto">
      <div className="flex items-center  justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="z-50 bg-slate-900 p-4 flex flex-col items-center  justify-center rounded shadow-lg w-80">
          <h1 className="text-lg text-white font-semibold mb-4">Update User</h1>
         
          <input placeholder='Name' name="name" type="text" 
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'} 
          value={name} onChange={(e)=>{setName(e.target.value)}} required/>

          <input placeholder='username' name="username" type="text" 
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'} 
          value={username} onChange={handleUsername} required/>
            <p className='text-red-500'>{usernameErr}</p>
            {img &&<>
          <label htmlFor="img" className="block text-white mb-1 cla">
            Profile Photo:
            </label>
             <div className='w-20 overflow-hidden h-20 m-2'><img src={URL.createObjectURL(img)} alt="User Profile" /></div></>}
          <input id='img' accept="image/*" onChange={(e)=>{setImg(e.target.files[0])}} className={'text-white mb-4 p-3'} 
          type='file'/>
          
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
