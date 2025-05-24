import React from 'react'
import { FiUserX } from 'react-icons/fi';

const NoUsersFound = () => {
  return (
     <div className="col-span-full flex flex-col items-center justify-center py-16 mt-4 text-gray-500 ">
      <FiUserX className="text-5xl mb-4 text-gray-400" />
      <h4 className="text-xl font-semibold">No users found</h4>
      <p className="text-sm mt-1 text-gray-400">Try adjusting your search or check back later.</p>
    </div>
  )
}

export default NoUsersFound
