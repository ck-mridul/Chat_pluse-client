import React from 'react'
import useWebSocket from 'react-use-websocket';
import { wsURL } from "../api/axios_config";

function ChatSocket({children,room_id}) {
    var chatSocket


    const endPoint = useMemo(
        () => {
            return `${wsURL}/ws/chat/${room_id}/`;
        },
        [room_id]
    );


    const chatOnMessage = (message)=>{
        console.log(message)
    }

    const sendMessage = (message)=>{
        chatSocket.sendMessage(JSON.stringify(message))
    }
    chatSocket = useWebSocket(
    endPoint,
        {
            
            "onMessage": chatOnMessage
        }
    );
        chatSocket.m
    
  return (
    <div>ChatSocket</div>
  )
}

export default ChatSocket