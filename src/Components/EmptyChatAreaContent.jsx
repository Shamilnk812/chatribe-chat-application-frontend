import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiUserSearchLine } from 'react-icons/ri';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const EmptyChatAreaContent = () => {

    const navigate  = useNavigate()

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 mt-6 text-center">
            <div className="max-w-md mx-auto">
                {/* Animated message icon */}
                 {/* Lottie animation */}
                <div className="w-32 h-32 mx-auto mb-2">
                    <DotLottieReact
                        src="https://lottie.host/0c9617df-b1bc-447b-93a5-a2833c4d1104/74DmyvJGRD.lottie"
                        loop
                        autoplay
                    />
                </div>
               
                <h3 className="text-xl font-semibold text-gray-500 mb-3">
                    Start a Meaningful Conversation
                </h3>

                <p className="text-gray-400 text-sm mb-6">
                    Select a connection to chat or discover new people to share your thoughts with.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center justify-center px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors gap-2"
                    >
                     
                        <RiUserSearchLine  className="text-indigo-600"/> 
                        <span>Find Connections</span>
                    </button>
                </div>

                <div className="mt-4 text-sm text-gray-400 flex items-center justify-center">
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
