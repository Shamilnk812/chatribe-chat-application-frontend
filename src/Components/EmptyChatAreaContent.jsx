import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiUserSearchLine } from 'react-icons/ri';



const EmptyChatAreaContent = () => {

    const navigate  = useNavigate()

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md mx-auto">
                {/* Animated message icon */}
                <div className="w-24 h-24 mx-auto mb-6 text-indigo-600">
                    <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-500 mb-3">
                    Start a Meaningful Conversation
                </h3>

                <p className="text-gray-400 mb-6">
                    Select a connection to chat or discover new people to share your thoughts with.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-2"
                    >
                     
                        <RiUserSearchLine  className="text-indigo-600"/> 
                        <span>Find Connections</span>
                    </button>
                </div>

                <div className="mt-8 text-sm text-gray-400 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Your conversations will appear here</span>
                </div>
            </div>
        </div>
    )
}

export default EmptyChatAreaContent
