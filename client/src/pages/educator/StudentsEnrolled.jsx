import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
const StudentsEnrolled = () => {
  const { enrolledStudents } = useContext(AppContext)


  return enrolledStudents ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 p-4 md:pb-0 pt-8 '>
      <div className='w-full'>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden '>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>#</th>
                <th className='px-4 py-3 font-semibold truncate'>Students Name</th>
                <th className='px-4 py-3 font-semibold truncate'>Course Title</th>
                <th className='px-4 py-3 font-semibold truncate'>Date</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {
                enrolledStudents.map((item, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4'>{index + 1}</td>
                    <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                      <img className='w-16' src={item.student.imageUrl} alt="" />
                      <span className='truncate hidden md:block'>{item.student.name}</span>
                    </td>
                    <td className='px-4'>
                      {item.courseTitle}
                    </td>
                    <td className='px-4'>
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  ) :
    <Loading />
}

export default StudentsEnrolled
