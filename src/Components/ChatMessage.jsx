import React from 'react'
import { motion } from 'framer-motion';


const ChatMessage = ({ text, sender, userId, timestamp, seen }) => {

    const senderId = typeof sender === 'object' ? sender?.id : sender;
    const isSender = senderId === Number(userId);
    


    return (
        <motion.div
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isSender ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}`}
            >
                <p>{text}</p>
                <p className={`text-xs mt-1 flex items-center justify-between ${isSender ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}


                    {isSender && (
                        <span className="ml-2">
                            {seen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-green-300" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            )}
                        </span>
                    )}
                </p>


            </div>
        </motion.div>
    )
}



export default ChatMessage
