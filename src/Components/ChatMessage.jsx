import React from 'react'

const ChatMessage = ({ text, sender, userId, timestamp, seen }) => {

    const senderId = typeof sender === 'object' ? sender?.id : sender;
    const isSender = senderId === Number(userId);


    console.log('seddddd',sender)
    console.log('messgwe sender',isSender)

    return (
        <div
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isSender? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}`}
                >
                <p>{text}</p>
                <p className={`text-xs mt-1 ${isSender ? 'text-indigo-200' : 'text-gray-500'}`}>
                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}

                </p>
                {isSender && (
                        <span className={`ml-2 text-xs ${seen ? 'text-white' : 'text-gray-600'}`}>
                            {seen ? '✓✓' : '✓'}
                        </span>
                    )}
            </div>
        </div>
    )
}

export default ChatMessage
