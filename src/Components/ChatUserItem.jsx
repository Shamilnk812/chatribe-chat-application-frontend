import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useAppStateContext } from '../Utils/Context/AppStateContext';
import { FormatLastSeen } from '../Utils/Helpers/FomatLastSeen';



const ChatUserItem = ({ chat, userId, openChat }) => {
  const { onlineUsers } = useAppStateContext();
  const isCurrentUser = chat.user1.id === Number(userId);
  const unreadCount = isCurrentUser ? chat.unread_count_user1 : chat.unread_count_user2
  const displayUser = !isCurrentUser ? chat.user1 : chat.user2;
  const isOnline = onlineUsers.includes(displayUser.id.toString())
  
  

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

        {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
         )} 

      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{displayUser.username}</h4>
          <span className="text-xs text-gray-500">{FormatLastSeen(chat.last_message_timestamp)}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {chat.last_message.length > 30
          ? `${chat.last_message.slice(0, 30)}...`
          : chat.last_message}</p>
      </div>
      

      {unreadCount > 0 && (
        <div className="ml-2 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount}
        </div>
      )

      }




    </div>


  )
}

export default ChatUserItem



