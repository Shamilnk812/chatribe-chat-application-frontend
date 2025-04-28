import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { FaUserCircle } from 'react-icons/fa';


const ChatArea = ({selectedUser, messages, userId}) => {


    const chatArea = useRef(null)
    
    useEffect(() => {
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <>

            <div className="p-4 border-b border-gray-200 flex items-center">
                <div className="relative mr-3">
                    {selectedUser.profile_picture ? (
                        <img
                            src={selectedUser.profile_picture}
                            alt={selectedUser.username}
                            className="w-full h-full rounded-full object-cover border"
                        />
                    ) : (
                        <FaUserCircle className=" text-gray-400" />
                    )}
                    {/* {activeChat.online && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            )} */}
                </div>
                <div>
                    <h3 className="font-medium">{selectedUser.username}</h3>
                    <p className="text-xs text-gray-500">
                        {/* {activeChat.online ? 'Online' : 'Offline'} */}
                    </p>
                </div>
            </div>



            <div ref={chatArea}  className="flex-1 overflow-y-auto p-4 bg-gray-50">

                <div className="space-y-4">
                    {Array.isArray(messages) && messages
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
                        ))}


                </div>
            </div>
        </>
    )
}

export default ChatArea
