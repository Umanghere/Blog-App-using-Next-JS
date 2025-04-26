import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-60px)] px-4 text-base sm:text-lg md:text-xl text-center'>
      <div className="bg-gray-100 p-6 sm:p-10 rounded-lg shadow-md max-w-md">
        <h2 className="text-lg sm:text-xl mb-4 font-semibold">Admin Dashboard</h2>
        <p>Please select an option from the sidebar to manage your blog.</p>
      </div>
    </div>
  )
}

export default page