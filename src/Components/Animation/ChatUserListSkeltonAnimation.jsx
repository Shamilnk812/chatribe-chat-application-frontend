import React from 'react';

const ChatUserListSkeleton = () => {
  return (
    <div className="flex items-center p-4 border-b border-gray-100 animate-pulse">
      <div className="relative mr-3">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div className="ml-2 w-5 h-5 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default ChatUserListSkeleton;