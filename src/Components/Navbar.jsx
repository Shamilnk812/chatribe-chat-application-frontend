import React from 'react'
import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiUser } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';



const Navbar = () => {
    
    
    
    return (
        <nav className="w-full bg-indigo-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo/Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <FiMessageSquare className="h-6 w-6" />
                        </div>
                        <span className="ml-2 text-xl font-semibold">ConnectHub</span>
                    </div>

                    {/* Right side - Navigation */}
                    <div className="flex items-center space-x-4">
                        <button className="p-1 rounded-full text-indigo-200 hover:text-white hover:bg-indigo-500">
                            <IoMdNotificationsOutline className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
                                <FiUser className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
