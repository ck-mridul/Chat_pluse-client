import React, { useState } from 'react';
import {IoSend} from "react-icons/io5";

function Chat() {
  const [message, setMessage] = useState();
  let messages = []
  return (
   
       
    <div className={'p-2 relative bg-slate-900 m-2 rounded gap-2 flex flex-col w-64'}>
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
                                className={`flex flex-col gap-1 w-full ${message.sender.isSelf ? 'items-end' : 'items-start'}`}
                            >
                                <span className={'font-thin'}>{message.sender.name}</span>
                                <div
                                    className={`flex w-full items-center gap-2 ${message.sender.isSelf? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <img
                                        src={message.sender.profilePicture}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    />
                                    <div className={'flex flex-col'}>
                                        <span
                                            className={
                                                `px-2 py-1 w-full h-max overflow-x-hidden rounded ${
                                                    message.sender.isSelf ? 
                                                        ' bg-white dark:bg-black text-black dark:text-white' : ' bg-logo-green dark:bg-dark-logo-green text-white'
                                                }`
                                            }
                                        >
                                            {message.text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <form className={'w-full h-min relative'}>
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
                    // onClick={sendMessage}
                >
                    <IoSend/>
                </button>
            </form>
        </div>
       
  );
}

export default Chat;
