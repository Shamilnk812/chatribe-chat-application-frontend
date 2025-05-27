import React, { useEffect, useId } from 'react'
import { useState } from 'react';
import { FiUser, FiX } from 'react-icons/fi';
import { IoIosMenu } from "react-icons/io";
import { IoMdNotificationsOutline } from 'react-icons/io';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { handleInterestRequest } from '../Utils/Api/InterestRequestApi';
import { useAppStateContext } from '../Utils/Context/AppStateContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';





const Navbar = ({ setIsSidebarOpen }) => {


    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId')
    const access = localStorage.getItem('access_token')
    const navigate = useNavigate();



    const { users, setUsers, pendingRequests, setPendingRequests, pendingRequestCount, setPendingRequestCount } = useAppStateContext();

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('chat/get-interest-request/')
            setPendingRequests(response.data);
            setPendingRequestCount(response.data.length);

        } catch (error) {
            console.error('failed to fetch pending requests')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchPendingRequests();

    }, [])


    

    return (
        <nav className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo/Brand */}
                    <div className="flex items-center gap-3">
                        <button
                            className="block md:hidden p-2 rounded hover:bg-indigo-500"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <IoIosMenu className="h-6 w-6" />
                        </button>
                        <img
                            src="/chatribe-logo-2.png"
                            alt="Chatribe Logo"
                            className="h-14 w-24 object-contain cursor-pointer"
                            onClick={() => navigate('/home')}
                        />
                    </div>

                    {/* Right side - Navigation */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-1 rounded-full text-indigo-200 hover:text-white hover:bg-indigo-500">
                                <IoMdNotificationsOutline className="h-6 w-6" />
                                {pendingRequestCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {pendingRequestCount}
                                    </span>
                                )}
                            </button>

                        </div>


                          <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-2 top-12 w-80 bg-white text-gray-800 rounded-md shadow-xl z-50"
                                    >
                                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-semibold">Interest Requests</h3>
                                            <button
                                                className="hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
                                                onClick={() => setShowNotifications(false)}
                                            >
                                                <FiX className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="max-h-96 overflow-y-auto">
                                            {loading ? (
                                                <div className="p-4 text-center">Loading...</div>
                                            ) : pendingRequests.length === 0 ? (
                                                <div className="p-4 text-center text-gray-500">No pending requests</div>
                                            ) : (
                                                pendingRequests.map((request) => (
                                                    <div 
                                                        key={request.id}
                                                        className="p-4 border-b border-gray-100 hover:bg-gray-50"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            {request.sender.profile_picture ? (
                                                                <img
                                                                    src={request.sender.profile_picture}
                                                                    alt={request.sender.username}
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                    <FiUser className="text-indigo-600" />
                                                                </div>
                                                            )}
                                                            <div className="flex-1">
                                                                <h4 className="font-medium">{request.sender.username}</h4>
                                                                <div className="flex justify-between text-xs text-gray-500">
                                                                    <span>{new Date(request.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                                                                    <span>{new Date(request.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 mt-3">
                                                            <button
                                                                onClick={async () => {
                                                                    await handleInterestRequest(request.id, 'accepted', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId);
                                                                }}
                                                                className="flex-1 py-1 bg-green-100 text-green-700 rounded text-sm border border-green-300 hover:bg-green-200 transition-all duration-300"
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={async () => {
                                                                    await handleInterestRequest(request.id, 'rejected', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId);
                                                                }}
                                                                className="flex-1 py-1 bg-red-100 text-red-600 rounded text-sm border border-red-300 hover:bg-red-300 transition-all duration-300"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        

                    
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
