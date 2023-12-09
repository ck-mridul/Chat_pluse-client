import React, { useContext, useEffect, useRef } from 'react'
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import { VideoCallContext } from '../../../services/webSocket/VideocallSocket';



function VideoCall() {

    const {localStream,mapPeers} = useContext(VideoCallContext)
    const videoRef = useRef(null);
  
    useEffect(() => {
        if (videoRef.current && localStream) {
          videoRef.current.srcObject = localStream.current;
          
    
        }
        if(mapPeers.current){
            console.log(mapPeers.current,'blablga')
          }

      }, [localStream,mapPeers]);

    
  return (
    <div
    className={'w-3/4 ml-auto m-2  flex overflow gap-2 p-2 bg-dark-secondary shadow rounded'}
>
  {/* <div className='w-64 h-40 bg-slate-900 p-1'>

  </div> */}
{Object.keys(mapPeers.current).map((peerUsername) => {
    
        const remotePeer = mapPeers.current[peerUsername][0];
    
      
        return (
          <div className='w-64 h-40 bg-slate-900 p-1' key={peerUsername}>
          <p className='bg-slate-8000 text-white'>{peerUsername}</p>
            <video
              autoPlay
              playsInline
              controls={false}
              ref={(videoRef) => {
                if (videoRef && remotePeer && remotePeer.remoteStream) {
                  videoRef.srcObject = remotePeer.remoteStream;
                }
              }}
              style={{ width: '100%', height: '80%' }}
            ></video>
          </div>
        );
    
        
      })}

    
    <div className={'flex flex-row mt-auto justify-start gap-1.5'}>
        <button
            className={'p-0.5 rounded-full'}
            // onClick={() => scrollVideo('left')}
        >
            <BsArrowLeftCircle
                className={'w-5 h-5 cursor-pointer fill-logo-green dark:fill-dark-logo-green'}
            />
        </button>
        <button
            className={'p-0.5 rounded-full'}
            // onClick={() => scrollVideo('right')}
        >
            <BsArrowRightCircle
                className={`w-5 h-5 cursor-pointer fill-logo-green dark:fill-dark-logo-green`}
            />
        </button>
    </div>
</div>
  )
}

export default VideoCall