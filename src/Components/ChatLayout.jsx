import React, { use, useContext, useEffect } from 'react';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import ChatUsersList from './ChatUsersList';
import ChatMessage from './ChatMessage';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import EmptyChatAreaContent from './EmptyChatAreaContent';
import { WS_URL } from '../Utils/Axios/AxiosInstance';
import { NotificatoinWebSocketContext } from '../Utils/Context/NotificationWebSocketContext';

const ChatLayout = () => {

  const [messages, setMessages] = useState([])
  const [ws, setWs] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const { chatUsersList, setChatUsersList } = useContext(NotificatoinWebSocketContext)
  const userId = localStorage.getItem('userId')
  const access = localStorage.getItem('access_token')

  
  const openChat = async (recipientUser, roomId) => {

    setSelectedUser(recipientUser)

    if (ws) {
      ws.close();
    }

    setupWebSocket(recipientUser.id, access)

    try {

      const response = await axiosInstance.get(`chat/get-messages/${userId}/${recipientUser.id}/`)
      console.log(response.data)
      const data = response.data
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }

    } catch (error) {
      console.error(' filed to fetch user messages ', error)
    }


  }



  const setupWebSocket = (chatWithUserId, access) => {
    if (ws) {
      ws.close();
    }

    console.log("chat with user id is :", chatWithUserId)
    const socketUrl = `${WS_URL}/chat/${chatWithUserId}/?token=${access}`;
    const newWs = new WebSocket(socketUrl);

    newWs.onopen = () => {
      console.log('Chat WebSocket connection opened');
    };



    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data])
      const { chat_room_id, content, user, receiver_id, timestamp } = data

      if (Number(user) === Number(userId)) {

        setChatUsersList(prevChatUsers => {
          const updatedChatUsers = prevChatUsers.map(chatUser => {
            if (chatUser && chatUser.id === chat_room_id) {
              chatUser.last_message_timestamp = timestamp;
              chatUser.last_message = content;
            }
            return chatUser
          })

          updatedChatUsers.sort((a, b) => {
            const aTimestamp = new Date(a.last_message_timestamp).getTime();
            const bTimestamp = new Date(b.last_message_timestamp).getTime();
            return bTimestamp - aTimestamp
          })
          return updatedChatUsers
        })
      }

    };

    newWs.onclose = () => {
      console.log('Chat WebSocket connection closed');
    };

    newWs.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    setWs(newWs);
  }



  const handleSendMessage = (message) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }
    sendMessage(message)
  }



  const sendMessage = (message) => {
    if (ws && message.trim() !== "") {
      ws.send(JSON.stringify({
        action: "chat_message",
        message: message,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);



  return (
    <div className="flex-1 overflow-y-auto p-6">

      <div className="flex h-full">
        {/* Chat List - 40% width */}
        <div className="w-2/5 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Messages</h3>
          </div>

          <div className="flex-1 overflow-y-auto">

            <ChatUsersList userId={userId} openChat={openChat} />

          </div>
        </div>

        {/* Chat Area - 60% width */}



        <div className="flex-1 flex flex-col">
          {/* Chat Header */}

          {selectedUser ? (
            <>
              <ChatArea selectedUser={selectedUser} messages={messages} userId={userId} />
              {/* Message Input */}
              <ChatInput handleSendMessage={handleSendMessage} />
            </>

          ) : (
            <EmptyChatAreaContent />
          )}

        </div>
      </div>
    </div>
  );
};

export default ChatLayout;