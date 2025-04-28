import React from 'react'
import { FiMessageSquare, FiLogOut, FiHome } from 'react-icons/fi';
import { RiUserSearchLine } from 'react-icons/ri';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';



const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation(); 
   
    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                await axiosInstance.post('/user/logout/', { refresh_token: refreshToken });
            }
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userId');
            toast.success('You are logged out')
            navigate('/login')
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.clear();
            toast.error('logout failed.')

        }
    };



    return (
        <>
            {/* Sidebar */}
            <div className="w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
            <Link
                to="/home"
                className={`p-3 rounded-xl mb-4 ${location.pathname === '/home' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                <RiUserSearchLine className="w-6 h-6" />
            </Link>

            <Link
                to="/chat"
                className={`p-3 rounded-xl mb-4 ${location.pathname === '/chat' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                <FiMessageSquare className="w-6 h-6" />
            </Link>

            <button
                onClick={handleLogout}
                className="p-3 rounded-xl text-gray-500 hover:bg-gray-100 mt-auto"
            >
                <FiLogOut className="w-6 h-6" />
            </button>
        </div>
            {/* <div className="w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`p-3 rounded-xl mb-4 ${activeTab === 'home' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <RiUserSearchLine className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`p-3 rounded-xl mb-4 ${activeTab === 'chat' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <FiMessageSquare className="w-6 h-6" />
                </button>
                <button
                    onClick={handleLogout}
                    className="p-3 rounded-xl text-gray-500 hover:bg-gray-100 mt-auto"
                >
                    <FiLogOut className="w-6 h-6" />
                </button>
            </div> */}
        </>
    )
}

export default Sidebar
