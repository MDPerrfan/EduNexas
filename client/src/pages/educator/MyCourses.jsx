import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {
  const { currency, backendUrl, getToken} = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fectchEducatorCourses = async () => {
    try {
      const token =await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setCourses(data.courses)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    fectchEducatorCourses()
  }, [])
  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 p-4 md:pb-0 pt-8 '>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden '>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {
                courses.map((course) => (
                  <tr key={course._id} className='border-b border-gray-500/20'>
                    <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                      <img className='w-16' src={course.courseThumbnail} alt="" />
                      <span className='truncate hidden md:block'>{course.courseTitle}</span>
                    </td>
                    <td className='px-4'>
                      {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                    </td>
                    <td className=' px-8'>
                      {course.enrolledStudents.length}
                    </td>
                    <td className='px-4'>
                      {new Date(course.createdAt).toLocaleDateString()}
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

export default MyCourses
