import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowBack } from "react-icons/io";
import { getAvatarColor } from '../Utils/Helpers/GetAvatarColor';
import { useAppStateContext } from '../Utils/Context/AppStateContext';
import ChatMessageSkeltonAnimation from './Animation/ChatMessageSkeltonAnimation';


const ChatArea = ({ selectedUser, messages, userId, showChatArea, handleCloseChatArea, messagesLoading }) => {


    const chatArea = useRef(null)
    const { onlineUsers } = useAppStateContext()
    const avatarColor = getAvatarColor(selectedUser.username)
    const firstLetter = selectedUser.username ? selectedUser.username.charAt(0).toUpperCase() : 'U';
    const isOnline = onlineUsers.includes(selectedUser.id.toString())



    useEffect(() => {
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>

            <div className="p-3 border-b border-gray-200 flex items-center">
                {showChatArea && (

                    <button
                        className="p-2 mr-3 rounded-full hover:bg-gray-200 transition-colors duration-200 text-gray-700"
                        onClick={handleCloseChatArea}>
                        <IoMdArrowBack size={18} />
                    </button>
                )}
                <div className="relative mr-3">
                    {selectedUser.profile_picture ? (
                        <img
                            src={selectedUser.profile_picture}
                            alt={selectedUser.username}
                            className="w-full h-full rounded-full object-cover border"
                        />
                    ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${avatarColor}`}>
                            {firstLetter}
                        </div>
                    )}
                    {/* {isOnline && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            )} */}
                </div>
                <div>
                    <h3 className="font-medium">{selectedUser.username}</h3>
                    <p className={`text-xs ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </div>
            </div>



            <div ref={chatArea} className="flex-1 overflow-y-auto p-4 bg-gray-50">

                <div className="space-y-4">
                    {messagesLoading ? (
                        <ChatMessageSkeltonAnimation/>
                    ) : (
                        Array.isArray(messages) && messages
                            .slice()
                            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                            .map((msg, index) => (
                                <ChatMessage
                                    key={index}
                                    text={msg.content}
                                    sender={msg.user}
                                    userId={userId}
                                    timestamp={msg.timestamp}
                                    seen={msg.seen}
                                />
                            ))
                    )}



                </div>
            </div>
        </>
    )
}

export default ChatArea
