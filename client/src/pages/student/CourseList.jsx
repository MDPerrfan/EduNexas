import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/students/SearchBar'
import CourseCard from '../../components/students/CourseCard'
import Footer from '../../components/students/Footer'
import { useParams } from 'react-router-dom'

const CourseList = () => {
  const { allcourses, navigate } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredcourse] = useState([])
  useEffect(() => {
    if(allcourses && allcourses.length>0){
      const tempCourses = allcourses.slice()
      input ? 
      setFilteredcourse(
        tempCourses.filter(
          item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      )
      :
      setFilteredcourse(tempCourses)
    }
  }, [allcourses,input])
  return (
    <>
      <div className='lg:px-36 sm:px-10 md:px-20 pt-20 relative'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-5 px-5'>
          <div className=''>
            <h1 className='text-4xl font-semibold'>Course List</h1>
            <p className='text-balance p-1 cursor-pointer'><span onClick={() => navigate('/')} className='text-blue-600'>Home</span> / <span className='text-gray-500'>Course List</span></p>
          </div>
          <div>
            <SearchBar data={input}/>
          </div>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-5'>
          {
            filteredCourse.map((course, id) => (
              <CourseCard key={id} course={course} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>

  )
}

export default CourseList
