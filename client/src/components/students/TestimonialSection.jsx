import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const TestimonialSection = () => {
  const { testimonials } = useContext(AppContext)
  return (
    <div className='px-5'>
      <h2 className='text-3xl mb-3  text-gray-800 font-medium'>Testimonials</h2>
      <p className='text-gray-700 text-base'>Hear from our learners as they share their journeys of transformation, success, and how our
        <br /> platform has made a difference in their lives.</p>
      <div className='grid grid-cols-auto gap-8 my-10 md:p-5'>
        {
          testimonials.map((item, index) => (
            <div key={index} className='border border-r-1 rounded shadow-md overflow-hidden pb-5'>
                <div className='flex gap-3 items-center p-3 bg-gray-100'>
                  <img className='w-16' src={item.image} alt="" />
                  <div className='flex flex-col items-start'>
                    <p>{item.name}</p>
                    <p className='text-gray-500 text-sm'>{item.role}</p>
                  </div>
                </div>
                <div>
                  <div className='flex p-5 '>
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={i<Math.floor(item.rating) ? assets.star : assets.star_blank} alt="*" />

                    ))}
                  </div>
                  <p className='px-5 text-gray-800 text-start'>{item.feedback}</p>
                  <a href='#' className='text-start text-blue-600 p-5 underline'>Read more</a>
                </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default TestimonialSection
