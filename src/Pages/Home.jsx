import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { toast } from 'sonner';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import useDebounce from '../Utils/Hooks/UseDebounce';
import UserProfileCard from '../Components/UserProfileCard';
import ChatLayout from '../Components/ChatLayout';
import { useAppStateContext } from '../Utils/Context/AppStateContext';




const Home = () => {
 
  
  const {users, setUsers, isSidebarOpen, setIsSidebarOpen} = useAppStateContext();
  const userId = localStorage.getItem('userId')
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState(false);
  


  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/get-all-users/${userId}/?search=${debouncedSearch}`)
      
      setUsers(response.data)
    } catch (error) {
      console.error('sometheing', error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchAllUsers()
    }
  }, [debouncedSearch, userId])






  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar setIsSidebarOpen={setIsSidebarOpen}/>

      {/* Main Content - Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-full bg-white rounded-md shadow-md border border-gray-200 overflow-hidden flex">

          {/* Sidebar */}
            <Sidebar  
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
            />


            {/* Content Area */}
              <UserProfileCard
                users={users}
                setUsers={setUsers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                fetchAllUsers={fetchAllUsers}
                userId={userId}
                loading={loading}
              />
          

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

