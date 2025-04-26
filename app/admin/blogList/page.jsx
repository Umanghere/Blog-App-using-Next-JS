"use client"

import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");  
    setBlogs(response.data.blogs);
  }

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params:{
        id:mongoId
      }
    })
    toast.success(response.data.msg);
    fetchBlogs();
  }

  useEffect(()=>{
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 pt-4 sm:pt-6 md:pt-8 lg:pt-12 px-4 sm:px-8 md:px-12 lg:px-16'>
      <p className='text-xl sm:text-2xl font-medium'>All Blogs</p>
      <div className='relative h-[70vh] sm:h-[80vh] w-full max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbarHide'>
        <div className="min-w-full overflow-hidden">
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs sm:text-sm text-gray-700 text-left uppercase bg-gray-300'>
              <tr>
                <th scope='col' className='hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3'>
                  Author Name
                </th>
                <th scope='col' className='px-3 sm:px-6 py-2 sm:py-3'>
                  Blog Title
                </th>
                <th scope='col' className='px-3 sm:px-6 py-2 sm:py-3'>
                  Date
                </th>
                <th scope='col' className='px-3 sm:px-6 py-2 sm:py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => {
                return (
                  <BlogTableItem 
                    key={index} 
                    mongoId={item._id} 
                    title={item.title} 
                    author={item.author} 
                    authorImg={item.authorImg} 
                    date={item.date} 
                    deleteBlog={deleteBlog} 
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page