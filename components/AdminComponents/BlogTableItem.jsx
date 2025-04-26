import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { Trash2 } from 'lucide-react';

const BlogTableItem = ({authorImg, title, author, date, deleteBlog, mongoId}) => {
  const BlogDate = new Date(date);
  
  return (
    <tr className='bg-white border-b hover:bg-gray-50'>
        <th scope='row' className='hidden sm:flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap'> 
            <div className="relative w-8 h-8">
              <Image 
                fill
                sizes="32px"
                src={assets.profile_icon} 
                alt='Author Image'
                className="rounded-full"
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base truncate max-w-[150px]">{author ? author : "No Author"}</p>
        </th>
        <td className='px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm md:text-base'>
            <div className="truncate max-w-[120px] sm:max-w-[200px]">
              {title ? title : "No Title"}
            </div>
        </td>
        <td className='px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap'>
            {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlog(mongoId)} className='px-3 sm:px-6 py-2 sm:py-4 cursor-pointer'>
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hover:text-red-700" />
        </td>
    </tr>
  )
}

export default BlogTableItem