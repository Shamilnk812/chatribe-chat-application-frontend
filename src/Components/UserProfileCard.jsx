import React, { act } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import axiosInstance from '../Utils/Axios/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../Utils/Hooks/UseDebounce'
import { FiSearch } from 'react-icons/fi';
import { toast } from 'sonner'
import { handleInterestRequest, handleSendInterest } from '../Utils/Api/InterestRequestApi'
import { useAppStateContext } from '../Utils/Context/AppStateContext'
import { getAvatarColor } from '../Utils/Helpers/GetAvatarColor'



import { MdChat } from "react-icons/md";





const UserProfileCard = ({users, setUsers, searchQuery, setSearchQuery, fetchAllUsers, userId}) => {


    const {pendingRequests, setPendingRequests, pendingRequestCount, setPendingRequestCount} = useAppStateContext();
    const navigate = useNavigate()
    
   
    const handleChat = async (recipientId) => {

        try {
            console.log('button clickedd')
            const response = await axiosInstance.post('chat/add-chat-rooms/', {
                user_id1: userId,
                user_id2: recipientId,
            })
            navigate('/chat')

        } catch (error) {
            console.error(' failed to create chat room', error)
        }
    }




    return (

        


        

       

           <div className="flex-1 flex flex-col overflow-hidden">
            {/* Fixed Header with Search */}
            <div className="pt-6 pb-4 px-6 bg-white border-b  border-gray-100 sticky top-0 z-10 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)]">
                 <h2 className="text-2xl font-semibold text-gray-600  text-center">
                    Connect with Amazing People
                </h2>
                <p className="text-gray-500 text-center mb-4">Discover and connect with people who share your interests</p>
                
                {/* Search Bar */}
                <div className="flex justify-center mb-2">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, username or interests..."
                            className="block w-full pl-12 pr-4 py-2 border-0 rounded-full bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200"
                        >
                            <div className="p-5 flex flex-col items-center">
                                {/* Profile Picture */}
                                <div className="relative mb-4">
                                    {user.profile_picture ? (
                                        <img
                                            src={user.profile_picture}
                                            alt={user.username}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                        />
                                    ) : (
                                        <div className={`w-16 h-16 rounded-full text-white text-xl flex items-center justify-center  ${getAvatarColor(user.username)}`}>
                                            {user.username?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* Username */}
                                <h3 className="text-lg font-semibold text-gray-600 mb-3">
                                    {/* {user.username} */}
                                    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                </h3>

                                {/* Action Buttons */}
                                <div className="w-full space-y-2">
                                    {user.interest_status === null && (
                                        <button
                                            className="w-full px-4 py-2 text-sm font-medium rounded-lg border border-fuchsia-500 text-fuchsia-500 hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-pink-600 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                                            onClick={() => handleSendInterest(user.id, users, setUsers, userId)} 
                                        >
                                            Connect
                                        </button>
                                    )}

                                    {user.interest_status?.status === 'pending' && (
                                        <div className="space-y-2">
                                            {user.interest_status.sent_by_me ? (
                                                <span className="block w-full px-4 py-2 text-sm font-medium text-center text-amber-600 bg-amber-50 rounded-lg border border-amber-100 cursor-not-allowed">
                                                    Request Sent
                                                </span>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => handleInterestRequest(user.interest_status.id , 'accepted', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId)} 
                                                        className="px-3 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleInterestRequest(user.interest_status.id , 'rejected', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount,userId)} 
                                                        className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Ignore
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {user.interest_status?.status === 'accepted' && (
                                        <button
                                            onClick={() => handleChat(user.id)}
                                                 className="w-full px-4 py-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-600 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"

                                        >
                                            <MdChat className="text-lg" /> Message
                                        </button>
                                    )}

                                    {user.interest_status?.status === 'rejected' && (
                                        <div className="space-y-2">
                                            <span className="block text-xs text-center text-gray-500 mb-1">
                                                {user.interest_status.sent_by_me
                                                    ? 'Request declined'
                                                    : 'You declined request'}
                                            </span>
                                            {user.interest_status.sent_by_me ? (
                                                <button
                                                    className="w-full px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                                    onClick={() => handleSendInterest(user.id, users, setUsers, userId)}
                                                >
                                                    Try Again
                                                </button>
                                            ) : (
                                                <button
                                                    className="w-full px-4 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                                    onClick={() => handleInterestRequest(user.interest_status.id , 'accepted', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId)} 
                                                >
                                                    Accept Now
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default UserProfileCard
