import React from 'react'
import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiUser } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';



const Navbar = ({searchQuery, setSearchQuery}) => {
    
    
    
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

                    {/* Center - Search */}
                    {/* <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-indigo-300" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md bg-indigo-500 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div> */}

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
