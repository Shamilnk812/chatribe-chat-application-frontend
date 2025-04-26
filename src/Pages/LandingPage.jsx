import React from 'react'
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/chatribe-logo-2.png"
            alt="Chatribe Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
        {/* <div className="text-2xl font-bold">ConnectMe</div> */}
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-white text-indigo-900 rounded-lg font-medium hover:bg-opacity-90 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Connect with <span className="text-pink-400">like-minded</span> people
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover new connections, share interests, and build meaningful relationships in a secure environment.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-pink-500 rounded-lg font-bold text-lg hover:bg-pink-600 transition text-center"
            >
              Get Started
            </Link>
            {/* <Link 
            to="/login" 
            className="px-8 py-4 bg-white bg-opacity-10 rounded-lg font-bold text-lg hover:bg-opacity-20 transition text-center"
          >
            Learn More
          </Link> */}
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative z-10">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-2 shadow-2xl">
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="p-4 bg-gray-800 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4 h-80 overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">A</div>
                      <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                        <p>Hey there! I saw we both love hiking. Want to chat?</p>
                        <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-indigo-600 rounded-lg p-3 max-w-xs">
                        <p>Sure! I'm always up for meeting fellow hikers.</p>
                        <p className="text-xs text-indigo-200 mt-1">10:32 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">B</div>
                      <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                        <p>We should plan a trip together sometime!</p>
                        <p className="text-xs text-gray-400 mt-1">10:33 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800">
                  <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
                    <input
                      type="text"
                      disabled
                      placeholder="Type a message..."
                      className="bg-transparent flex-1 outline-none text-white"
                    />
                    <button className="text-pink-500 hover:text-pink-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose Chatribe?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white bg-opacity-5 rounded-xl p-6 backdrop-blur-lg hover:bg-opacity-10 transition">
            <div className="w-14 h-14 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Meaningful Connections</h3>
            <p className="text-gray-300">Find people who share your interests and passions.</p>
          </div>
          <div className="bg-white bg-opacity-5 rounded-xl p-6 backdrop-blur-lg hover:bg-opacity-10 transition">
            <div className="w-14 h-14 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Chat</h3>
            <p className="text-gray-300">Instant messaging with end-to-end encryption for privacy.</p>
          </div>
          <div className="bg-white bg-opacity-5 rounded-xl p-6 backdrop-blur-lg hover:bg-opacity-10 transition">
            <div className="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
            <p className="text-gray-300">Your privacy and security are our top priorities.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white border-opacity-10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ConnectMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
