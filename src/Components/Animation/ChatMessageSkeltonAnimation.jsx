
import React from 'react'

const ChatMessageSkeltonAnimation = () => {
    return (
        <>
            <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 animate-pulse h-16 w-3/4"></div>
            </div>
            <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-300 animate-pulse h-12 w-2/3"></div>
            </div>
            <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-300 animate-pulse h-12 w-2/3"></div>
            </div>
            <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 animate-pulse h-14 w-1/2"></div>
            </div>
            <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 animate-pulse h-14 w-1/2"></div>
            </div>
        </>
    )
}

export default ChatMessageSkeltonAnimation
