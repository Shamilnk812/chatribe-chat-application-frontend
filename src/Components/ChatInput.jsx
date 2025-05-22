import React, { useState, useRef, useEffect } from 'react'
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';



const ChatInput = ({ handleSendMessage }) => {

    const [newMessage, setNewMessage] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    const handleSent = () => {
        if (newMessage.trim() !== '') {
            handleSendMessage(newMessage)
            setNewMessage('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSent()
        }
    }

    const onEmojiClick = (emojiObject) => {
        setNewMessage(prevMessage => prevMessage + emojiObject.emoji)
        inputRef.current.focus();
    }

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showEmojiPicker && !event.target.closest('.emoji-picker-container')) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);

    

    return (
        <div className="relative p-4 border-t border-gray-200 bg-white">
            {showEmojiPicker && (
                <div className="absolute bottom-full left-2 mb-2 z-10 emoji-picker-container">
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={300}
                        height={350}
                    />
                </div>
            )}
            <div className="flex items-center">
                <button className="p-2 text-gray-500 hover:text-gray-700 mr-2">
                    <FiPaperclip className="w-5 h-5" />
                </button>
                <button
                    onClick={toggleEmojiPicker}
                    className="p-2 text-gray-500 hover:text-gray-700 mr-2"
                >
                    <FiSmile className="w-5 h-5" />
                </button>

                <input
                    type="text"
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyPress={handleKeyPress}
                />

                <button
                    onClick={handleSent}
                    disabled={!newMessage.trim()}
                    className={`ml-2 py-2 px-3 rounded-md transition-colors duration-200 ${newMessage.trim()
                            ? 'bg-indigo-500 text-white hover:bg-indigo-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <FiSend className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
