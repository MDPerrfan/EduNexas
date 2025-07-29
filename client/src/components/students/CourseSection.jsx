import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'
import Loading from './Loading'
const CourseSection = () => {
  const { allcourses } = useContext(AppContext)
  if(!allcourses){
    <Loading/>
  }
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='md:text-course-details-heading-large text-course-details-heading-small text-gray-800 py-2'>Learn from the best</h2>
      <p className='text-gray-500 text-sm md:text-base mt-2 lg:px-48'>Discover our Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt harum, facilis adipisci esse nisi dignissimos architecto at quam, reiciendis molestias repudiandae inventore, voluptates ipsam! Rerum assumenda aliquid ipsa ipsam vel!</p>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allcourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course}/>
        ))}
      </div>

      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className='text-gray-500 border px-10 py-3 rounded '>Show all courses</Link>
    </div>
  )
}

export default CourseSection
