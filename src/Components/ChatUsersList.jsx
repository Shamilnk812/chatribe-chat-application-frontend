import React from 'react'
import ChatUserItem from './ChatUserItem'
import { useState, useEffect } from 'react'
import axiosInstance from '../Utils/Axios/AxiosInstance'
import { HiUsers } from "react-icons/hi";


const ChatUsersList = ({ userId, openChat }) => {

  const [chatUsersList, setChatUsersList] = useState([])

  const fetchChatUsersList = async () => {
    try {
      const response = await axiosInstance.get(`chat/get-chat-users/${userId}`)
      setChatUsersList(response.data)
    } catch (error) {
      console.error('failded ot fetch chat user list', error)
    }
  }

  useEffect(() => {
    fetchChatUsersList()
  }, [userId])



  return (
    <div className="flex-1 overflow-y-auto">


      {chatUsersList.length > 0 ? (
        chatUsersList.map((chat, index) => (
          <ChatUserItem
            chat={chat}
            key={index}
            userId={userId}
            openChat={openChat}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-8 mt-4  text-center">
        <div className="text-gray-400 mb-4 text-4xl">
          <HiUsers />
        </div>

        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No recent conversations
        </h3>

        <p className="text-gray-500 mb-6 max-w-md">
          Your chat history with connections will appear here when you start messaging.
        </p>
      </div>
      )}


    </div>
  )
}

export default ChatUsersList
