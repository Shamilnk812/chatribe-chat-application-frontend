import React, { useContext } from 'react'
import ChatUserItem from './ChatUserItem'
import { useState, useEffect } from 'react'
import { fetchChatUserList } from '../Utils/Api/FetchChatUsers';
import { NotificatoinWebSocketContext } from '../Utils/Context/NotificationWebSocketContext';
import ChatUserListSkeleton from './Animation/ChatUserListSkeltonAnimation';
import EmptyChatList from './EmptyData/EmptyChatList';



const ChatUsersList = ({ userId, openChat }) => {

  const { chatUsersList, setChatUsersList } = useContext(NotificatoinWebSocketContext)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responseData = await fetchChatUserList(userId)
      if (Array.isArray(responseData)) {
        setChatUsersList(responseData)
      } else {
        setChatUsersList([])
      }
      setLoading(false);
    }

    fetchData();
  }, [userId])




  return (
    <div className="flex-1 overflow-y-auto">


      {loading ? (
        <>
          {
            [...Array(6)].map((_, index) => (
              <ChatUserListSkeleton key={index} />
            ))
          }

        </>
      ) :

        chatUsersList.length > 0 ? (
          chatUsersList.map((chat, index) => (
            <ChatUserItem
              chat={chat}
              key={index}
              userId={userId}
              openChat={openChat}
            />
          ))
        ) : (
         <EmptyChatList/>
        )}


    </div>
  )
}

export default ChatUsersList


