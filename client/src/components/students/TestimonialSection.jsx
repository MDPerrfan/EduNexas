import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
const TestimonialSection = () => {
  const { backendUrl, getToken, testimonials,getTestimonials } = useContext(AppContext)

  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleTestimonialSubmit = async () => {
    const token =await getToken();
    if (!token) {
      return toast.warning("Login First!")
    }
    if (!feedback || rating === 0) {
      return toast.error("Please provide both feedback and rating.");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-testimonial`,
        { feedback, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setFeedback('');
        setRating(0);
        // optionally refetch testimonials if you have that functionality
      } else {
        toast.error(data.message);
        console.log(data.message)
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting testimonial.");
    }
  };
useEffect(()=>{
getTestimonials()
})
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
                <img className='w-16 rounded-full' src={item.userId.imageUrl} alt="" />
                <div className='flex flex-col items-start'>
                  <p>{item.name}</p>
                </div>
              </div>
              <div>
                <div className='flex p-5 '>
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={i < Math.floor(item.rating) ? assets.star : assets.star_blank} alt="*" />

                  ))}
                </div>
                <p className='px-5 text-gray-800 text-start'>{item.feedback}</p>
                <a href='#' className='text-start text-blue-600 p-5 underline'>Read more</a>
              </div>
            </div>
          ))
        }
      </div>
      <div className='my-10 p-5 md:mx-5 shadow-md rounded '>
        <h3 className='text-xl font-semibold text-gray-700 mb-2'>Share Your Testimonial</h3>
        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='flex flex-col items-center '>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder='Write your feedback...'
              className='w-60 md:w-96 h-24 p-2 border rounded mb-4'
            />
            <div className='flex items-center gap-2 mb-4'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < rating ? assets.star : assets.star_blank}
                  onClick={() => setRating(i + 1)}
                  className='w-6 cursor-pointer'
                />
              ))}
              <span className='text-sm text-gray-600'>(Click to rate)</span>
            </div>
          </div>

          <button
            onClick={handleTestimonialSubmit}
            className='bg-orange-500 text-white px-10 py-2 rounded hover:bg-blue-700'>
            Submit
          </button>
        </div>

      </div>

    </div>
  )
}

export default TestimonialSection
