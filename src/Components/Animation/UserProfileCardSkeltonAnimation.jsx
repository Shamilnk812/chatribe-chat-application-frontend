import React from 'react'

const UserProfileCardSkeletonAnimation = () => {
  return (
     <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-5 flex flex-col items-center">
        {/* Profile Picture Skeleton */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
        </div>

        {/* Username Skeleton */}
        <div className="h-5 w-3/4 mb-3 bg-gray-200 rounded animate-pulse"></div>

        {/* Button Skeleton */}
        <div className="w-full space-y-2">
          <div className="h-9 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCardSkeletonAnimation
