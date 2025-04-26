import { Trash2 } from 'lucide-react';
import React from 'react';

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);
  
  // Format date for better display on mobile
  const formattedDate = {
    full: emailDate.toDateString(),
    short: `${emailDate.getMonth() + 1}/${emailDate.getDate()}/${String(emailDate.getFullYear()).slice(2)}`
  };

  return (
    <tr className='bg-white border-b text-left hover:bg-gray-50 transition-colors'> 
      <th scope='row' className='px-3 py-3 md:px-6 md:py-4 font-medium text-gray-900 break-all md:break-normal'>
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="text-sm md:text-base">
            {email ? email : "No Email"}
          </span>
          {/* Show date on mobile inline with email */}
          <span className="text-xs text-gray-500 mt-1 block sm:hidden">
            {formattedDate.short}
          </span>
        </div>
      </th>
      
      {/* Regular date column - hidden on mobile */}
      <td className='px-3 py-3 md:px-6 md:py-4 hidden sm:table-cell text-sm md:text-base'>
        {formattedDate.full}
      </td>
      
      {/* Delete button with better touch target */}
      <td className='px-3 py-3 md:px-6 md:py-4'>
        <button 
          onClick={() => deleteEmail(mongoId)}
          className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Delete subscription"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;