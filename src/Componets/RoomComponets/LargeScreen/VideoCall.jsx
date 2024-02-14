import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';




export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


export default function App() {
  const navigate = useNavigate();
  
  const roomID = localStorage.getItem('thread_id');
  var zp;

useEffect(() => {
  
  return () => {
    zp.hangUp()
    zp.destroy()
  };
}, [zp]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user.name;
  const userID = user.id;

  const myMeeting = async (element) => {
    try {
    // generate Kit Token
    const appID = 1126242936;
    const serverSecret = "fc448e6302b96d23d521e84be51e347b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID.toString(),
      userName
    );

    // Create instance object from Kit Token.
    zp = ZegoUIKitPrebuilt.create(kitToken);
    
    
    // start the call
    
    zp.joinRoom({
      container: element,
      showPreJoinView: false,
      showTextChat: false,
      maxUsers: 2,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  } catch (error) {
      console.log(error);
      navigate('/'); 
    }
  };

  return (
    <div
      className="myCallContainer h-64"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
