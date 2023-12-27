// import useWebSocket from "react-use-websocket";
// import { wsURL } from "../api/axios_config";
// import React, {createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'


// export const VideoCallContext = createContext({})

// function VideocallSocket({children,room_id,username}) {

// var webSocket;
// var mapPeers = useRef({});
// var localStream = useRef(new MediaStream());
// const remoteStream = useRef(new MediaStream());
// const isCalling = useRef(false)
// const [connection, setConnection] = useState([]);

// const configuration = useMemo(() => {
//     return {
//         iceServers: [
//             {
//                 urls: [
//                     'stun:stun.l.google.com:19302',
//                     'stun:stun1.l.google.com:19302',
//                     'stun:stun2.l.google.com:19302'
//                 ]
//             }
//         ]
//     };
// },[]);




// useEffect(
//     () => {
//         console.log('started')
//         // if (!localStream.current) {
//             navigator.mediaDevices.getUserMedia({
//                 "video": true,
//                 "audio": true
//             }).then(stream => {
                
//                 localStream.current = stream;
//                 console.log('stream added')
                
//             }).catch(err => {
//                 console.log(err);
//             })
//         // }
       
//     },[localStream])

// const endPoint = useMemo(
//     () => {
//         return wsURL+'/ws/videocall/'+room_id+'/';
//     },
//     [room_id]
// );




// const addLocalTracks = useCallback((peer)=>{
//     localStream.current.getTracks().forEach(track =>{
//         peer.addTrack(track, localStream.current);
//     });
//     return;
// },[localStream])



// const setOnTrack = useCallback((peer,peerUsername)=>{
//     remoteStream.current = new MediaStream();

//     peer.ontrack = (event) => {
//         remoteStream.current.addTrack(event.track);
//     }
//     console.log(mapPeers,'setontrack')
//     mapPeers.current[peerUsername][0].remoteStream = remoteStream.current;
// },[remoteStream,mapPeers])



// const sendSignal = useCallback((action,message)=>{
//     var jsonStr = JSON.stringify({
//         'peer': username,
//         'action':action,
//         'message':message,
//     });
//     webSocket.sendMessage(jsonStr);

//     },[username,webSocket])



   

// // ------------------------create offer----------------------------//
// const createOffer = useCallback((peerUsername,receiver_channel_name)=>{
//     var peer = new RTCPeerConnection(configuration);

//     addLocalTracks(peer);

//     mapPeers.current[peerUsername] = [peer];
//     setOnTrack(peer,peerUsername)
//     console.log(mapPeers,'creating offerrr')

//     peer.oniceconnectionstatechange = ()=>{
//         var iceConnectionState = peer.iceConnectionState;
//         setConnection([...connection,peerUsername])


//         if(iceConnectionState === "failed" || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
//             delete mapPeers.current[peerUsername];
//             if(iceConnectionState !== 'closed'){
//                 peer.close();
//             }
//             // removeVideo(remoteViedo);
//         }
//     }

//     peer.onicecandidate = (event)=>{
//         if(event.candidate){
//             console.log('New ice candidate :',JSON.stringify(peer.localDescription))
//             return;
//         }

//         sendSignal('new-offer',{
//             'sdp':peer.localDescription,
//             'receiver_channel_name': receiver_channel_name
//         })
//     }
   

//     peer.createOffer()
//         .then(offer => peer.setLocalDescription(offer))
//         .then(()=>{
//             console.log('Local description set successfully.')
//         });
// },[mapPeers,addLocalTracks,configuration,sendSignal,setOnTrack,connection])




// // -------------------------create Answer------------------------//
// const createAnswerer = useCallback((offer,peerUsername, receiver_channel_name)=>{
//     var peer = new RTCPeerConnection(configuration);

//     addLocalTracks(peer);

//     // var remoteViedo = createVideo(peerUsername);
//     setOnTrack(peer,peerUsername)

//     peer.oniceconnectionstatechange =()=>{
//         var iceConnectionState = peer.iceConnectionState;

//         if(iceConnectionState === "failed" || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
//             delete mapPeers.current[peerUsername];
//             if(iceConnectionState !== 'closed'){
//                 peer.close();
//             }
            
//         }
//     }
    
//     peer.onicecandidate = (event)=>{
//         if(event.candidate){
//             console.log('New ice candidate :',JSON.stringify(peer.localDescription))
//             return;
//         }

//         sendSignal('new-answer',{
//             'sdp':peer.localDescription,
//             'receiver_channel_name': receiver_channel_name
//         })
//     }
    
//     peer.setRemoteDescription(offer)
//         .then(()=>{
//             console.log('Remote discription set successfully for %s.',peerUsername);
//             return peer.createAnswer();
//         })
//         .then(answer =>{
//             console.log('ans created');
//             peer.setLocalDescription(answer);
//         })
// },[mapPeers,sendSignal,setOnTrack,addLocalTracks,configuration])




// const webSocketOnMessage = useCallback((event)=>{
//     var parsendData = JSON.parse(event.data);
//     var peerUsername = parsendData['peer']
//     var action = parsendData['action']

//     var receiver_channel_name = parsendData['message']['receiver_channel_name'];
//     if (action === 'new-peer'){
//         createOffer(peerUsername,receiver_channel_name);
//         return;
//     }

//     if(action === 'new-offer'){
//         var offer = parsendData['message']['sdp'];
//         createAnswerer(offer, peerUsername, receiver_channel_name);

//         return;
//     }
//     if(action === 'new-answer'){
//         var answer = parsendData['message']['sdp'];
//         console.log(mapPeers,'hhhhhhhhhhhhhhhhhhhhhhh')
//         var peer = mapPeers.current[peerUsername][0];

//         peer.setRemoteDescription(answer);

//         return;
//     }
// },[mapPeers,createAnswerer,createOffer])


// webSocket = useWebSocket(
//     endPoint,
//     {
//         "onOpen": () => {
//             if (!isCalling.current) {
//                 sendSignal('new-peer',{});
//                 isCalling.current = true;
//             }
//         },
//         "onClose": () => {
//             isCalling.current = false;
//         },
//         "onMessage": webSocketOnMessage
//     }
// );


// const data = useMemo(() => ({
//     localStream,
//     mapPeers,
//     remoteStream,
//     connection
// }), [localStream,
//     mapPeers,remoteStream,connection])
//   return (
//     <VideoCallContext.Provider value={data}>
//         {children}
//     </VideoCallContext.Provider>
//   )
// }

// export default VideocallSocket