import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [opensection,setOpensection]=useState({})
  const { allcourses, navigate, avgRating,calculateChaptertime } = useContext(AppContext);


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
  const toggleSection=(index)=>{
    setOpensection((prev)=>(
      {...prev,
        [index]: !prev[index],
      }
    ))
  }
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
              <p className=' text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})</p>
              <p className=' md:text-base text-sm text-gray-600'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}</p>
            </div>

          </div>
          <p className='mr-2 md:text-base text-sm text-gray-600'>Course by <span className='text-blue-600 underline'>({courseData.author})</span></p>
          <div className='my-5 '>
            <h1 className=" text-course-details-heading-small font-semibold mb-4 text-gray-700">Course Structure</h1>
            <div className='pt-5'>
            {courseData.courseContent.map((chapter,index)=>(
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img src={assets.down_arrow_icon} alt="arr_icon" className={`transform transition-transform ${opensection[index]?'rotate-180':''}`}/>
                    <p className='font-medium md:text-base'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length}lectures - {calculateChaptertime(chapter)}</p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${opensection[index] ? 'max-h-96':'max-h-0' }`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lec,i)=>(
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={assets.play_icon} alt="play_icon" className='w-4 h-4 mt-1'/>
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lec.lectureTitle}</p>
                          <div className='flex gap-2 '>
                            {lec.isPreviewFree && <p className='text-blue-500 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lec.lectureDuration*60*1000,{units:['h','m']})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            </div>
          </div>

        </div>

      </div>
      <div>{/* right column */}

      </div>
    </div>
  );
};

export default CourseDetails;
