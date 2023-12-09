import Chat from "./RoomComponets/SmallScreen/Chat/Chat";

import React from 'react'
import UsersList from "./RoomComponets/SmallScreen/UsersList";

function RoomComponent() {
  return (
    <div >
      <UsersList/>
        <Chat/>
    </div>
  )
}

export default RoomComponent