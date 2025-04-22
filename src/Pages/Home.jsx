import React from 'react'
import { useState, useEffect } from 'react';
import { FaUserCog } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FiSearch, FiMessageSquare, FiUser, FiLogOut, FiSend, FiHome } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { toast } from 'sonner';
import { FaUserCircle } from 'react-icons/fa'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import useDebounce from '../Utils/Hooks/UseDebounce';
import UserProfileCard from '../Components/UserProfileCard';
import ChatLayout from '../Components/ChatLayout';




const Home = () => {


  const userId = localStorage.getItem('userId')
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('home')


  const navigate = useNavigate();


  const fetchAllUsers = async () => {
    try {
      const response = await axiosInstance.get(`/user/get-all-users/${userId}/?search=${debouncedSearch}`)
      console.log('users ', response.data)
      setUsers(response.data)
    } catch (error) {
      console.error('sometheing', error)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchAllUsers()
    }
  }, [debouncedSearch, userId])






  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Full-width Navbar */}
      <Navbar fetchAllUsers={fetchAllUsers} />

      {/* Main Content - Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden flex">


            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* Content Area */}

            {activeTab === 'home' && (
              <UserProfileCard
                users={users}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                fetchAllUsers={fetchAllUsers}
                userId={userId}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'chat' && (
              <ChatLayout />
            )}



          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

