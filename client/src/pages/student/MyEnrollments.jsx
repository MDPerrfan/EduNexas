import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/students/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyEnrollments = () => {
  const { userData, enrolledcourses, calculateCourseDuration, navigate, backendUrl, calculateNoOfLectures, fetchUserEnrolledCourses, getToken } = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([])

  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const tempProgressArray = await Promise.all(
        enrolledcourses.map(async (course) => {
          const { data } = await axios.get(backendUrl + '/api/user/get-course-progress', { courseId: course._id }, { headers: { Authorization: `Bearer ${token}` } })
          if (data.success) {
            let totalLectures = calculateNoOfLectures(course);
            const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
            return { totalLectures, lectureCompleted }
          }else{
            console.log(data.message)
          }
        })
      )
      setProgressArray(tempProgressArray)
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    
    if (userData) {
      fetchUserEnrolledCourses()
    }
    console.log(enrolledcourses.length)
  }, [userData])

  useEffect(() => {
    if (enrolledcourses.length > 0) {
      getCourseProgress()
    }
  }, [enrolledcourses])
  return (
    <>
      <div className='md:px-28 lg:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>
        <table className='md:table-atuo table-fixed w-full overflow-hidden border-collapse mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700 '>
            {
              enrolledcourses.map((course, index) => (
                <tr className='border-b border-gray-500/0' key={index}>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex lg:flex-row flex-col items-center space-x-3'><img className='w-14 sm:w-24 md:w-28' src={course.courseThumbnail} alt="" />
                    <div className='flex-1 '>
                      <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                      <Line strokeWidth={3} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />
                    </div>
                  </td>
                  <td className='px-4 py-3 max-sm:hidden'>
                    {calculateCourseDuration(course)}
                  </td>
                  <td className='px-4 py-3 max-sm:hidden'>
                    {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}<span> Lectures</span>
                  </td>
                  <td className='px-4 py-3 max-sm:text-right'>
                    <button onClick={() => navigate('/player/' + course._id)} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-orange-500 max-sm:text-xs text-white'>
                      {
                        progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? "Completed" : "On Going"
                      }
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments
