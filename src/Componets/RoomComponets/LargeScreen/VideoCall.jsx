import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';




export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


export default function App() {
      const roomID = useParams()
      const user = JSON.parse(localStorage.getItem('user'))
      const userName = user.name
      const userID = user.id
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 467351366;
      const serverSecret = "1df8cdebd2a39f923e36f971dbf2df4f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID.room_id,  userID.toString(),  userName);


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        showPreJoinView: false,
        showTextChat: false,
        maxUsers: 3,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });


  };

  return (
    <div
      className="myCallContainer h-64"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}