import React from 'react'
import { FaUserCircle } from 'react-icons/fa';


const ChatUserItem = ({ chat, userId, openChat }) => {

  const isCurrentUser = chat.user1.id === Number(userId);

  console.log(isCurrentUser)
  const displayUser = !isCurrentUser ? chat.user1 : chat.user2;

  return (
    <div
      className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
      onClick={() => openChat(displayUser, chat.id)}
    >
      <div className="relative mr-3">
        {displayUser.profile_picture ? (
          <img
            src={displayUser.profile_picture}
            alt={displayUser.username}
            className="w-full h-full rounded-full object-cover border"
          />
        ) : (
          <FaUserCircle className=" text-gray-400" />
        )}

      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{displayUser.username}</h4>

        </div>

      </div>


    </div>
  )
}

export default ChatUserItem
