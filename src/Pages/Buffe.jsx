 <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Connect with Amazing People
                </h2>
                <p className="text-gray-500 text-center mb-8">Discover and connect with people who share your interests</p>
                
                {/* Search Bar */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, username or interests..."
                            className="block w-full pl-12 pr-4 py-3 border-0 rounded-full bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* User Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            {/* Profile Header */}
                            <div className="relative h-24 bg-gradient-to-r from-indigo-500 to-purple-600">
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.username}
                                        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                                        <FaUserCircle className="w-full h-full text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* User Content */}
                            <div className="pt-14 pb-5 px-5 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    {user.username}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    {user.bio || "Digital creator • Photography enthusiast • Coffee lover"}
                                </p>
                                
                                {/* Common Interests (dummy data) */}
                                <div className="flex flex-wrap justify-center gap-2 mb-5">
                                    <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full">Travel</span>
                                    <span className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-full">Music</span>
                                    <span className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded-full">Food</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col space-y-2">
                                    {user.interest_status === null && (
                                        <button
                                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm"
                                            onClick={() => handleSendInterest(user.id, users, setUsers, userId)} 
                                        >
                                            Send Interest
                                        </button>
                                    )}

                                    {user.interest_status?.status === 'pending' && (
                                        <div className="space-y-2">
                                            {user.interest_status.sent_by_me ? (
                                                <span className="inline-block px-4 py-2 text-sm font-medium bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-100">
                                                    Request Sent
                                                </span>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => handleInterestRequest(user.interest_status.id , 'accepted', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId)} 
                                                        className="px-3 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-100"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleInterestRequest(user.interest_status.id , 'rejected', users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount,userId)} 
                                                        className="px-3 py-2 text-sm font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {user.interest_status?.status === 'accepted' && (
                                        <button
                                            onClick={() => handleChat(user.id)}
                                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all shadow-sm"
                                        >
                                            Start Chatting
                                        </button>
                                    )}

                                    {user.interest_status?.status === 'rejected' && (
                                        <div className="space-y-2">
                                            <span className={`text-xs font-medium ${user.interest_status.sent_by_me ? 'text-red-500' : 'text-amber-500'}`}>
                                                {user.interest_status.sent_by_me
                                                    ? 'Your request was declined'
                                                    : 'You declined their request'}
                                            </span>
                                            {user.interest_status.sent_by_me ? (
                                                <button
                                                    className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100"
                                                    onClick={() => handleSendInterest(user.id, users, setUsers, userId)}
                                                >
                                                    Try Again
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-100"
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
        </div>

