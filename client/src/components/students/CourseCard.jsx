import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  return (
    <div className='my-10 border border-gray-500/30 rounded-lg shadow-sm overflow-hidden'>
      <Link to={'/course/'+course._id} onClick={()=>scrollTo(0,0)}>
         <img src={course.courseThumbnail} alt="" className='rounded-t-lg w-full'/>
         <div className='flex flex-col justify-start items-start px-5 py-3'>
            <h3 className='text-3xl font-semibold text-gray-800 text-start pb-2'>{course.courseTitle}</h3>
            <p className='text-gray-500'>{course.educator}</p>
            <div className='flex  items-center space-x-2'>
                <p className='text-start text-2xl text-gray-500'>4.5</p>
                <div className='flex'>
                    {[...Array(5)].map((_,i)=>(
                        <img key={i} src={assets.star} alt="*" className='w-3.5 h-3.5'/>
                    ))}
                </div>
                <p className='text-start text-2xl text-gray-500'>(22)</p>
            </div>
            <p className='text-3xl font-semibold text-gray-800'>{(course.coursePrice-course.discount*(course.coursePrice/100)).toFixed(2)}</p>
         </div>
      </Link>
    </div>
  )
}

export default CourseCard
