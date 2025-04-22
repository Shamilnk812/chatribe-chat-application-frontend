import React, { useState } from 'react'
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';



const ChatInput = ({handleSendMessage}) => {

    const [newMessage, setNewMessage] = useState('')

    const handleSent = ()=> {
        handleSendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
                <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                    {/* <FiPaperclip className="w-5 h-5" /> */}
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                    {/* <FiSmile className="w-5 h-5" /> */}
                </button>

                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />

                <button
                    onClick={handleSent}
                    className="ml-2 p-2 text-indigo-600 hover:text-indigo-800"
                >
                    <FiSend className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
