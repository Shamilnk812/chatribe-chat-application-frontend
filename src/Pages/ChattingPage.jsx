import React from 'react'
import ChatLayout from '../Components/ChatLayout'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const ChattingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Full-width Navbar */}
     <Navbar />

      {/* Main Content - Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden flex">

           
          <Sidebar />


            {/* Content Area */}
   
            <ChatLayout/>
    

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChattingPage
