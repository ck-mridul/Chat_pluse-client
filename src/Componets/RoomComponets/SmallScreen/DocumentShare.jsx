import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {IoSend} from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import { GoMoveToBottom } from "react-icons/go";
import axiosAuth,{ wsURL, baseURL} from '../../../services/api/axios_config';


function UsersList() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [documents, setDocuments] = useState([]);
    const room_id = localStorage.getItem('thread_id');
    const lastMessageRef = useRef(null);
    const [doc, setDoc] = useState();
    const token = localStorage.getItem('accessToken')


    const endPoint = useMemo(
        () => {
            return `${wsURL}/ws/doc/${room_id}/?token=${token}`;
        },
        [room_id]

    );

    const docSocket = useMemo(()=> new WebSocket(endPoint),[endPoint])

    const handleFileChange = (e) => {
        setDoc(e.target.files[0])
        
        };

     const saveFile = () =>{
        if(!doc) return

        let formData = new FormData();
        formData.append("pdf", doc)
        formData.append("name", doc.name)
        formData.append("room_id",room_id)
        formData.append("size",doc.size)
        formData.append("user_name", user.name)
        formData.append("user_id", user.id)

        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        }

        console.log('form',formData)
        axiosAuth.post( 'chat/document/', formData, axiosConfig).then(()=>{
                console.log('File Uploaded Successfully')
                setDoc()
            }
        ).catch(error =>{
            console.log(error)
        })
    }

        
    
    docSocket.onmessage = useCallback((e)=>{
        console.log(e,'jjjjjj')
        setDocuments(JSON.parse(e.data))
        console.log(documents)

    },[documents])
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        }, [documents]);

    const handleDownload = async (path,name) => {
        const pdfURL = baseURL+'/media/'+path;
        const response = await fetch(pdfURL)
        const blob = await response.blob()
        const pdfBlobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = pdfBlobUrl
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(pdfBlobUrl);
    };


  return (
    <div className={'p-2 relative bg-slate-900 m-2 rounded gap-2 flex flex-col h-80 w-64'}>
            <div className={'w-full gap-2 flex h-min flex-col'}>
                <h3 className={'font-semibold text-white'}>Documents</h3>
                <hr width={'100%'} className={'border'}/>
            </div>

            <div className={'overflow-y-scroll overflow-x-hidden h-[calc(100vh-540px)] md:h-[calc(100vh-455px)] w-full'} >
                <div className={'flex flex-col gap-2'}>
                    { documents &&

                        documents.map((doc, index) => (
                            
                            <div>
                            <div ref={index === documents.length - 1 ? lastMessageRef : null}
                            className="h-20 w-44 ms-2 flex flex-col p-2 bg-slate-700 rounded">
                                <span className='text-white overflow-hidden'>{doc.name}</span>
                                <span className='text-white text-xs mt-2 italic text-slate-300'>{(doc.size/1000000).toPrecision(2)} MB</span>
                                {/* <div className='rounded-sm bg-gray-300 '></div> */}
                                <GoMoveToBottom onClick={()=>{handleDownload(doc.pdf,doc.name)}} className='ml-auto text-slate-300 font-bold cursor-pointer'/>
                                 </div>
                                  <sapan className='text-white ms-4 text-xs'>{user.id == doc.user_id ? 'You' : doc.user_name}</sapan>
                                  </div>
                                 
                        ))
                    }
                </div>
            </div>
            <form className={'w-full h-min relative'}>
            <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-16 rounded cursor-pointer flex items-center">
                <FaPlus className="mr-2 " />
                
                <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
                <button
                    type={'button'}
                    className={'text-logo-yellow dark:text-dark-logo-yellow absolute right-0 h-full p-1'}
                    onClick={saveFile}
                    
                >
                    <IoSend/>
                </button>
            </form>
        </div>
  )
}

export default UsersList