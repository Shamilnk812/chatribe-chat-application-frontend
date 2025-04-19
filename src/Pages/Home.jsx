import React from 'react'
import { useState } from 'react';
import { FaUserCog } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FiSearch, FiMessageSquare, FiUser, FiLogOut, FiSend, FiHome } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { toast } from 'sonner';


const Home = () => {
  
  const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
          await axiosInstance.post('/user/logout/', { refresh_token: refreshToken });
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
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
    <h1>this is home page</h1>
    </>
  );
}

export default Home

