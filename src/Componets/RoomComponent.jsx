import Chat from "./RoomComponets/SmallScreen/Chat/Chat";

import React from 'react'
import DocumentShare from "./RoomComponets/SmallScreen/DocumentShare";

function RoomComponent() {
  return (
    <div >
      <DocumentShare/>
        <Chat/>
    </div>
  )
}

export default RoomComponent