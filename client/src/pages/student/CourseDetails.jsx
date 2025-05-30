import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import { assets } from '../../assets/assets';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allcourses, navigate, avgRating } = useContext(AppContext);

  useEffect(() => {
    if (allcourses && allcourses.length > 0) {
      const foundCourse = allcourses.find(course => course._id === id);
      if (foundCourse) {
        setCourseData(foundCourse);
        console.log(courseData)
      } else {
        console.error('Course not found!');
      }
    }
  }, [allcourses, id]);

  if (!courseData) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'>{/* left column */}

      </div>
      <div className='max-w-xl z-10'>{/* left column */}
        <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-bold mb-4 text-gray-800">{courseData.courseTitle}</h1>
        <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} className="text-gray-600 md:text-base text-sm"></p>
        {/* review and ratings */}
        <div>
          <div className='flex items-center gap-1 mt-10'>
            <p className='mr-2 md:text-base text-sm text-gray-600'>{avgRating(courseData)}</p>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(avgRating(courseData)) ? assets.star : assets.star_blank} alt="*" className='w-3.5 h-3.5' />
            ))}
            <div className='flex items-center gap-2'>
              <p className=' text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length>1?"ratings":"rating"})</p>
              <p className=' md:text-base text-sm text-gray-600'>{courseData.enrolledStudents.length} students</p>
            </div>

          </div>
          <p className='mr-2 md:text-base text-sm text-gray-600'>Course by <span className='text-blue-600 underline'>({courseData.author})</span></p>
          <div className='my-5 '>
            <h1 className=" text-course-details-heading-small font-semibold mb-4 text-gray-700">Course Structure</h1>
          </div>

        </div>

      </div>
      <div>{/* right column */}

      </div>
    </div>
  );
};

export default CourseDetails;
