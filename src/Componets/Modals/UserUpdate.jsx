import React, { useState } from 'react';
import { userProfileUpdate } from '../../services/api/auth';


const Modal = ({ isOpen, onClose, user }) => {
  
  const [name, setName] = useState(user.name);
  const [img, setImg] = useState();

  if (!isOpen) return null;

  const handleSubmit =()=>{
    const formData = new FormData();
    formData.append('name',name)
    if(img)formData.append('image',img)
    userProfileUpdate(formData).then((res)=>{
        console.log(res)
        onClose()

    })
    .catch((e)=>{
      console.log(e)
    })
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
          <label htmlFor="img" className="block mb-1">
            Profile Photo:
            </label>
            {img && <div className='w-20 h-20 m-2'><img src={URL.createObjectURL(img)} alt="User Profile" /></div>}
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
