import React from 'react';
import { IoClose,IoSend } from "react-icons/io5";


const MediaPreviewModal = ({ media, onClose,sendMedia }) => {
    console.log(media.type,'media')
  return (
    <div className="fixed h-full w-full bg-stone-300">
        <div className='w-full h-10 flex item-center '>
            <IoClose onClick={onClose} className='w-10 h-10 m-5 '/>
            
        </div>
        
        <p className='justify-center flex me-64'>{media.name}</p>
      <div className="flex item-center me-64 justify-center">
        <div className='w-64 mt-20 overflow-hidden max-h-72'>
        { media.type.startsWith('image')? (
          <img src={URL.createObjectURL(media)} alt="Media Preview" />
        ) : media.type.startsWith('video') ? (
          <video controls>
            <source src={URL.createObjectURL(media)} type={media.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Unsupported media type</p>
        )}
        </div>
      </div>
      
      <div className='justify-center flex me-64'>
      <div className=' items-center mt-16 rounded-full w-10 h-10 bg-green-500 justify-center flex'>
      <IoSend onClick={sendMedia} />
      </div>
      </div>
      
    </div>
  );
};

export default MediaPreviewModal;