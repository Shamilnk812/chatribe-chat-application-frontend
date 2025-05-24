import React from 'react'
import { toast } from 'sonner'

const ChatNotificationToast = ({username, content, timestamp, t}) => {


    return (
        <div className="w-full max-w-xs min-w-xs min-w-[20rem] p-4 bg-white rounded-lg shadow-lg border-l-4 border-indigo-500 flex items-start space-x-3">
            <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                        {username.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {username}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    {content}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
              <button
                onClick={() => toast.dismiss(t)}
                className="text-gray-400 hover:text-gray-500"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
        </div>
    )
}

export default ChatNotificationToast
