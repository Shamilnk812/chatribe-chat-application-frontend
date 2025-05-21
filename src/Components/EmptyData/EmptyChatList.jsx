import React from 'react'
import { HiUsers } from "react-icons/hi";

const EmptyChatList = () => {
    return (
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
    )
}

export default EmptyChatList
