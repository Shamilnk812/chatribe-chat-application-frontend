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




const UserProfileCard = ({users, setUsers, searchQuery, setSearchQuery, fetchAllUsers, userId, setActiveTab}) => {

    // const userId = localStorage.getItem('userId')
    // const [searchQuery, setSearchQuery] = useState('');
    // const debouncedSearch = useDebounce(searchQuery, 500);
    // const [users, setUsers] = useState([])


    const navigate = useNavigate()
    
    const {pendingRequests, setPendingRequests, pendingRequestCount, setPendingRequestCount} = useAppStateContext();
   
    const handleChat = async (recipientId) => {

        try {
            console.log('button clickedd')
            const response = await axiosInstance.post('chat/add-chat-rooms/', {
                user_id1: userId,
                user_id2: recipientId,
            })
            // setActiveTab('chat')
            navigate('/chat')

        } catch (error) {
            console.error(' failed to create chat room', error)
        }
    }




    return (


        <div className="flex-1 overflow-y-auto p-6">
            {/* Centered Search Bar */}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users by name or username..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-600 mb-6 text-center">
                Discover People
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6 flex flex-col items-center">
                            {/* Profile Picture or Icon */}
                            <div className="w-20 h-20 mb-3">
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.username}
                                        className="w-full h-full rounded-full object-cover border"
                                    />
                                ) : (
                                    <FaUserCircle className="w-full h-full text-gray-400" />
                                )}
                            </div>

                            {/* Username */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {user.username}
                            </h3>

                            {/* Buttons */}
                            <div className="flex space-x-2">
                                {user.interest_status === null && (
                                    <button
                                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                        onClick={() => handleSendInterest(user.id, users, setUsers, userId)} 
                                        // onClick={() => handleSendInterest(user.id, fetchAllUsers)} 
                                    >
                                        Send Interest
                                    </button>
                                )}

                                {/* {user.interest_status?.status === 'pending' && (
                                    <span className="text-sm text-yellow-600 font-medium">
                                        {user.interest_status.sent_by_me ? 'Request Sent' : 'Request Received'}
                                    </span>
                                )} */}


                                {user.interest_status?.status === 'pending' && (
                                    <div>
                                        {user.interest_status.sent_by_me ? (
                                            <span className="text-sm text-yellow-600 font-medium">
                                                Request Sent
                                            </span>
                                        ) : (
                                            <>
                                            <button
                                                onClick={() => handleInterestRequest(user.interest_status.id , 'accepted', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId)} 
                                                className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Accept Request
                                            </button>
                                            <button
                                                onClick={() => handleInterestRequest(user.interest_status.id , 'rejected', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount,userId)} 
                                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Reject Request
                                            </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {user.interest_status?.status === 'accepted' && (
                                    <button
                                        onClick={() => handleChat(user.id)}
                                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Chat
                                    </button>
                                )}

                                {user.interest_status?.status === 'rejected' && (
                                    <div className="flex flex-col items-center space-y-1">
                                        <span className="text-sm text-red-500 font-medium">
                                            {user.interest_status.sent_by_me
                                                ? 'Your request was rejected'
                                                : 'You rejected their request'}
                                        </span>

                                        {user.interest_status.sent_by_me ? (
                                            <button
                                                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                                                onClick={() => handleSendInterest(user.id, users, setUsers, userId)}
                                            >
                                                Send Interest Again
                                            </button>
                                        ) : (
                                            <button
                                                className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
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
    )
}

export default UserProfileCard
