import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useAppStateContext } from '../Utils/Context/AppStateContext';
import { FormatLastSeen } from '../Utils/Helpers/FomatLastSeen';
import { getAvatarColor } from '../Utils/Helpers/GetAvatarColor';



const ChatUserItem = ({ chat, userId, openChat, selectedChatId }) => {
  const { onlineUsers } = useAppStateContext();
  const isCurrentUser = chat.user1.id === Number(userId);
  const unreadCount = isCurrentUser ? chat.unread_count_user1 : chat.unread_count_user2
  const displayUser = !isCurrentUser ? chat.user1 : chat.user2;
  const isOnline = onlineUsers.includes(displayUser.id.toString())
  const avatarColor = getAvatarColor(displayUser.username || displayUser.id.toString());
  const firstLetter = displayUser.username ? displayUser.username.charAt(0).toUpperCase() : 'U';
  const isSelected = chat.id === selectedChatId;

  
  

  return (
    <div
      className={`flex items-center p-4 border-b border-gray-200 cursor-pointer  ${
        isSelected 
          ? 'bg-indigo-50 hover:bg-indigo-100' 
          : 'hover:bg-gray-50'
      }`}
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
           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${avatarColor}`}>
            {firstLetter}
          </div>
        )}

        {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
         )} 

      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{displayUser.username.charAt(0).toUpperCase() + displayUser.username.slice(1)}</h4>
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



